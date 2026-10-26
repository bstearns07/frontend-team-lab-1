import "../App.css";

function EventStats({ events }) {
  const openEvents = events.length;
  const totalEvents = events.filter((event) => event.status === "upcoming").length;
  const urgentEvents = events.filter((event) => event.status === "past").length;

  return (
    <div className="event-stats">
      <h2>Event Statistics</h2>
      <p>Open Events: {openEvents}</p>
      <p>Total Volunteer Sign-Ups: {totalEvents}</p>
      <p>Urgent Events: {urgentEvents}</p>
    </div>
  );
}

export default EventStats;