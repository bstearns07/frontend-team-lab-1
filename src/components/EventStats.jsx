function EventStats({ events }) {
  const overallEvents = events.length;
  const totalEvents = events.reduce(
    (total, event) => total + (event.numVolunteers ? event.numVolunteers : 0),
    0,
  );
  const urgentEvents = events.filter(
    (event) => event.status === "urgent",
  ).length;

  return (
    <div className="event-stats">
      <div className="stat-card">
        <p className="stat-label">Overall requests</p>
        <p className="stat-value">{overallEvents}</p>
        <p className="stat-description">Neighbors looking for support</p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Total volunteer sign-ups</p>
        <p className="stat-value">{totalEvents}</p>
        <p className="stat-description">
          Across {overallEvents} community requests
        </p>
      </div>
      <div className="stat-card">
        <p className="stat-label">Urgent events</p>
        <p className="stat-value">{urgentEvents}</p>
        <p className="stat-description">Time-sensitive requests need help</p>
      </div>
    </div>
  );
}

export default EventStats;
