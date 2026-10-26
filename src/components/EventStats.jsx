function EventStats({ events }) {
    const openEvents = events.length;
    const totalEvents = events.filter((event) => event.status === "upcoming").length;
    const urgentEvents = events.filter((event) => event.status === "past").length;

    return (
        <div className="event-stats">
            <div className="openEvents">
                <h4>Open Events: {openEvents}</h4>
                <p>Neighbors looking for support</p>
            </div>
            <div className="totalEvents">
                <h4>Total Volunteer Sign-Ups: {totalEvents}</h4>
                <p> Across 10 community requests</p>
            </div>
            <div className="urgentEvents">
                <h4>Urgent Events: {urgentEvents}</h4>
                <p> Time-sensitive requests need help</p>
            </div>
        </div>
    );
}

export default EventStats;