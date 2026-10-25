import Footer from "./components/Footer";
import Header from "./components/Header";
import EventControls from "./components/EventControls";
import VolunteerForm from "./components/VolunteerForm";
import EventList from "./components/EventList";
import useDbActions from "./hooks/appHelpers";
import "./App.css";
import { useState, useRef, useEffect, useMemo } from "react";

function App() {
  const { events, loading, error, createEvent, updateEvent, deleteEvent } =
    useDbActions();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const searchInputRef = useRef(null); // the reference to the search input element

  // Focus the search input when the component mounts
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const userQuery = searchText.trim().toLowerCase();
      const matchesSearch =
        !userQuery ||
        [
          event.title,
          event.organizer,
          event.date,
          event.category,
          event.status,
          event.location,
        ].some((value) => value.toLowerCase().includes(userQuery));

      return (
        matchesSearch &&
        (!category || event.category === category) &&
        (!status || event.status === status)
      );
    });
  }, [events, searchText, category, status]);

  const handleAddEvent = (event) => {
    createEvent(event);
  };

  const handleUpdateEvent = (event) => {
    updateEvent(event);
    setEditingEvent(null);
  };

  function handleDeleteEvent(id) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!shouldDelete) {
      return;
    }

    deleteEvent(id);

    if (editingEvent && editingEvent.id === id) {
      setEditingEvent(null);
    }
  }

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

      <main>
        <EventControls
          onAddEvent={handleAddEvent}
          searchText={searchText}
          onSearchChange={setSearchText}
          category={category}
          onCategoryChange={setCategory}
          status={status}
          onStatusChange={setStatus}
          searchInputRef={searchInputRef}
          onCancelEdit={handleCancelEdit}
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
