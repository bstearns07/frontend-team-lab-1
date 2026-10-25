import Footer from "./components/Footer";
import Header from "./components/Header";
import EventControls from "./components/EventControls";
import "./App.css";
import events from "../public/events.json";
import { useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const filteredEvents = events.filter((event) => {
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

  return (
    <>
      <Header />
      <EventControls
        onAddEvent={() => {}}
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
      />
      <Footer />
    </>
  );
}

export default App;
