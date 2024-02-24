// Importing necessary dependencies
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Events from "./components/Events/Events.jsx";
import EventDetails from "./components/Events/EventDetails.jsx";
import NewEvent from "./components/Events/NewEvent.jsx";
import EditEvent from "./components/Events/EditEvent.jsx";

// Creating the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/events" />,
  },
  {
    path: "/events",
    element: <Events />,

    children: [
      {
        path: "/events/new",
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    children: [
      {
        path: "/events/:id/edit",
        element: <EditEvent />,
      },
    ],
  },
]);

// Creating an instance of QueryClient
const queryClient = new QueryClient();

// App component
function App() {
  return (
    // Providing QueryClient to the app
    <QueryClientProvider client={queryClient}>
      {/* Providing Router configuration to the app */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
