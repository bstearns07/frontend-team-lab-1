import Footer from "./components/Footer";
import Header from "./components/Header";
import EventControls from "./components/EventControls";
import VolunteerForm from "./components/VolunteerForm";
import EventList from "./components/EventList";
import useDbActions from "./hooks/appHelpers";
import "./App.css";
import { useState, useRef, useEffect, useMemo } from "react";
import EventStats from "./components/EventStats";

function App() {
  // Destructure the custom hook to manage database actions and state
  const { events, loading, error, createEvent, updateEvent, deleteEvent } =
    useDbActions();
  // Initialize state for search, category, status, and editing event
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  // Reference to the search input element for focusing the input when the component mounts
  const searchInputRef = useRef(null);

  // Focus the search input when the component mounts
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // define filtered events using useMemo to so it only recalculates when dependencies change
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Convert the search text to lowercase and trim whitespace for comparison
      const userQuery = searchText.trim().toLowerCase();
      // Check if the event matches the search query in any of the relevant fields
      const matchesSearch =
        // if the user didn't enter a search query, matchesSearch will be true for all events
        // otherwise, check if any of the relevant fields contain the search query
        !userQuery ||
        [
          event.title,
          event.organizer,
          event.date,
          event.category,
          event.status,
          event.location,
        ].some((value) => value.toLowerCase().includes(userQuery));

      // return whether a match was found
      // if no category or status filter is selected, all events will match those criteria
      // otherwise only events matching filters being used will be included
      return (
        matchesSearch &&
        (!category || event.category === category) &&
        (!status || event.status === status)
      );
    });
  }, [events, searchText, category, status]);

  /**
   * Handles adding a new event.
   * @param {*} event - The event object to be added.
   */
  const handleAddEvent = (event) => {
    createEvent(event);
  };

  /**
   * Handles updating an existing event.
   * @param {*} event - The event object with updated information.
   */
  const handleUpdateEvent = (event) => {
    updateEvent(event);
    setEditingEvent(null);
  };

  /**
   * Handles deleting an event.
   * @param {*} id - The ID of the event to be deleted.
   */
  function handleDeleteEvent(id) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!shouldDelete) {
      return;
    }

    deleteEvent(id);

    // If the deleted event was being edited, reset the editing state
    if (editingEvent && editingEvent.id === id) {
      setEditingEvent(null);
    }
  }

  /**
   * Handles cancellation of editing an event by resetting the editing state.
   * @returns {void}
   */
  function handleCancelEdit() {
    setEditingEvent(null);
  }

  if (loading) {
    return (
      <div className="status-message">
        <p>Finding upcoming campus events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message error">
        <h2>Campus Pulse could not load.</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <EventStats events={events} />
      <main>
      
        <EventControls
          searchText={searchText}
          onSearchChange={setSearchText}
          category={category}
          onCategoryChange={setCategory}
          status={status}
          onStatusChange={setStatus}
          searchInputRef={searchInputRef}
          onCancelEdit={handleCancelEdit}
          onClearFilters={() => {
            setSearchText("");
            setCategory("");
            setStatus("");
          }}
        />
        <VolunteerForm
          onAddEvent={handleAddEvent}
          onUpdateEvent={handleUpdateEvent}
          editingEvent={editingEvent}
          onCancelEdit={() => setEditingEvent(null)}
        />

        <EventList
          events={filteredEvents}
          onEditEvent={setEditingEvent}
          onDeleteEvent={handleDeleteEvent}
        />
        <Footer />
      </main>
    </>
  );
}

export default App;
