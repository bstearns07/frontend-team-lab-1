import { useEffect, useCallback, useState } from "react";

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

        // Parse the JSON response and update the events state
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Create a new event and add it to the events state
  const createEvent = useCallback((newEvent) => {
    const eventToAdd = {
      ...newEvent,
    };

    setEvents((currentEvents) => [...currentEvents, eventToAdd]);
  }, []);

  // update an existing event
  const updateEvent = useCallback((updatedEvent) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
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
