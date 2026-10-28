import Footer from "./components/Footer";
import Header from "./components/Header";
import EventControls from "./components/EventControls";
import VolunteerForm from "./components/VolunteerForm";
import EventList from "./components/EventList";
import useDbActions from "./hooks/appHelpers";
import "./App.css";
import { useState, useRef, useEffect, useMemo } from "react";
import EventStats from "./components/EventStats";
import Pagination from "./components/Pagination";

function App() {
  // Destructure the custom hook to manage database actions and state
  const { events, loading, error, createEvent, updateEvent, deleteEvent } =
    useDbActions();

  // Initialize state App state
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const searchInputRef = useRef(null);

  // Focus the search input when the component mounts
  // to prevent focusing before the search input exists, check if loading is false before focusing
  // then rerun the effect when loading changes
  useEffect(() => {
    if (!loading) {
      searchInputRef.current?.focus();
    }
  }, [loading]);

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

  // pagination state
  const EVENTS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / EVENTS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages); // used so deleting the last card on the last page doesn't leave an empty page

  /**
   * Defines the events to be displayed on the current page based on pagination.
   */
  const paginatedEvents = useMemo(() => {
    // To skip over the events from previous pages, calculate the index to start on based on the current page
    const startIndex = (safePage - 1) * EVENTS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + EVENTS_PER_PAGE);
  }, [filteredEvents, safePage]);

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
          onSearchChange={(value) => {
            setSearchText(value);
            setCurrentPage(1);
          }}
          category={category}
          onCategoryChange={(value) => {
            setCategory(value);
            setCurrentPage(1);
          }}
          status={status}
          onStatusChange={(value) => {
            setStatus(value);
            setCurrentPage(1);
          }}
          searchInputRef={searchInputRef}
          onCancelEdit={handleCancelEdit}
          onClearFilters={() => {
            setSearchText("");
            setCategory("");
            setStatus("");
            setCurrentPage(1);
          }}
        />

        <EventList
          events={paginatedEvents}
          onEditEvent={setEditingEvent}
          onDeleteEvent={handleDeleteEvent}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <VolunteerForm
          onAddEvent={handleAddEvent}
          onUpdateEvent={handleUpdateEvent}
          editingEvent={editingEvent}
          onCancelEdit={() => setEditingEvent(null)}
        />

        <Footer />
      </main>
    </>
  );
}

export default App;
