import { useEffect, useCallback, useState } from "react";

/**
 * Hook to manage database actions for volunteer events.
 * @returns {Object} An object containing the events array, loading state, error message, and CRUD functions for events.
 */
function useDbActions() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Load the full list of volunteer events from events.json
  useEffect(() => {
    // load events asynchronously when the component mounts
    async function loadEvents() {
      try {
        // Start loading and clear any previous errors
        setLoading(true);
        setError("");

        // Fetch the events from the JSON file and throw an error if the response is not ok
        const response = await fetch("/events.json");

        if (!response.ok) {
          throw new Error("Failed to load Volunteer Events");
        }

        // Parse the JSON response and update the events state with the loaded events
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    // Call the function to load events
    loadEvents();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Create a new event and add it to the events state
  const createEvent = useCallback((newEvent) => {
    // define the new volunteer event object to be added by spreading the its properties into a new object
    const eventToAdd = {
      ...newEvent,
    };
    // add the new event to the current list of events
    setEvents((currentEvents) => [...currentEvents, eventToAdd]);
  }, []);

  // update an existing event
  const updateEvent = useCallback((updatedEvent) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        // if the event ID matches the updated event's ID, merge the updates into the event object
        // otherwise, keep the event as is
        event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event,
      ),
    );
  }, []);

  // delete an existing event
  const deleteEvent = useCallback((eventId) => {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== eventId),
    );
  }, []);

  return { events, loading, error, createEvent, updateEvent, deleteEvent };
}

export default useDbActions;
