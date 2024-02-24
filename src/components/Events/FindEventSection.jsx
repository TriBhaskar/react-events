import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { fetchEvents } from "../../util/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";

export default function FindEventSection() {
  const searchElement = useRef(); // Reference to the search input element
  const [searchTerm, setSearchTerm] = useState(); // State to store the search term

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", { search: searchTerm }], // Query key for caching
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }), // Function to fetch events
    enabled: searchTerm !== undefined, // Enable the query when search term is defined
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value); // Update the search term state
  }

  let content = <p>Please enter a search term to find events.</p>; // Default content

  if (isLoading) {
    content = <LoadingIndicator />; // Show loading indicator while fetching events
  }
  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events."} // Show error message if fetching events failed
      />
    );
  }
  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement} // Bind the search input element to the reference
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
