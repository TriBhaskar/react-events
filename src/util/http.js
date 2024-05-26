import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
/**
 * Fetches events from the server based on the provided search term.
 * @param {Object} options - The options for fetching events.
 * @param {AbortSignal} options.signal - The signal object used to abort the fetch request.
 * @param {string} options.searchTerm - The search term to filter events.
 * @returns {Promise<Array>} - A promise that resolves to an array of events.
 * @throws {Error} - If an error occurs while fetching the events.
 */
export async function fetchEvents({ signal, searchTerm, max }) {
  let url = "https://react-events-fksu.vercel.app/events";

  if (searchTerm && max) {
    url += "?search=" + searchTerm + "&max=" + max;
  } else if (searchTerm) {
    url += "?search=" + searchTerm;
  } else if (max) {
    url += "?max=" + max;
  }

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(eventData) {
  const response = await fetch(`https://react-events-fksu.vercel.app/events`, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch(
    `https://react-events-fksu.vercel.app/events/images`,
    {
      signal,
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

export async function fetchEvent({ id, signal }) {
  const response = await fetch(
    `https://react-events-fksu.vercel.app/events/${id}`,
    {
      signal,
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function deleteEvent({ id }) {
  const response = await fetch(
    `https://react-events-fksu.vercel.app/events/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
export async function updateEvent({ id, event }) {
  const response = await fetch(
    `https://react-events-fksu.vercel.app/events/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ event }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while updating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
