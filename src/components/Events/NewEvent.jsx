import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "../../util/http.js";

// Define the NewEvent component
export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
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
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
      </EventForm>
    </Modal>
  );
}
