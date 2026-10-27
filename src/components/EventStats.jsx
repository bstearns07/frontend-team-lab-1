function EventStats({ events }) {
    const openEvents = events.length;
    const totalEvents = events.filter((event) => event.status === "upcoming").length;
    const urgentEvents = events.filter((event) => event.status === "past").length;

    return (
        <div className="event-stats">
            <div className="stat-card">
                <p className="stat-label">Open requests</p>
                <p className="stat-value">{openEvents}</p>
                <p className="stat-description">Neighbors looking for support</p>
            </div>
            <div className="stat-card">
                <p className="stat-label">Total volunteer sign-ups</p>
                <p className="stat-value">{totalEvents}</p>
                <p className="stat-description">Across 10 community requests</p>
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