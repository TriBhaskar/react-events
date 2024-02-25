import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

// Define the NewEvent component
export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: createNewEvent,
  }); // Create a mutation function to create a new event

  // Handle form submission
  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  // Render the NewEvent component
  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "Submitting..."}

        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            "Failed to create event. Please check your inputs and try again later"
          }
        />
      )}
    </Modal>
  );
}
