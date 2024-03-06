import { useIsFetching } from "@tanstack/react-query";

// Header component
export default function Header({ children }) {
  // Get the number of ongoing fetch requests
  const fetching = useIsFetching();

  return (
    <>
      {/* Show a progress bar if there are ongoing fetch requests */}
      <div id="main-header-loading">{fetching > 0 && <progress />}</div>

      {/* Main header */}
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
