import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch event data using react-query
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  // Update event data using react-query mutation
  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      // Optimistic update
      const newEvent = data.event;
      await queryClient.cancelQueries({ queryKey: ["events", id] });
      const previousEvent = queryClient.getQueryData(["events", id]);
      queryClient.setQueryData(["events", id], newEvent);
      return { previousEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", id], context.previousEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", id]);
    },
  });

  // Handle form submission
  function handleSubmit(formData) {
    mutate({ id: id, event: formData });
    navigate("../");
  }

  // Handle modal close
  function handleClose() {
    navigate("../");
  }

  let content;
  if (isPending) {
    // Show loading indicator while fetching event data
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }
  if (isError) {
    // Show error message if there's an error fetching event data
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try again later.."
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }
  if (data) {
    // Show event form with pre-filled data if event data is available
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  // Render the modal with the content
  return <Modal onClose={handleClose}>{content}</Modal>;
}
