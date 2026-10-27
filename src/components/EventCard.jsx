function EventCard({ event, onDelete, onEdit }) {
  function handleClick() {
    alert(
      `${event.title}
        Category: ${event.category}
        Location: ${event.location}
        ${event.description}`,
    );
  }

  return (
    <article className="event-card">
      <div className="event-card-header">
        <span className="category-label">{event.category}</span>
        <div className="status-badge">
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </div>
      </div>
      <h3>{event.title}</h3>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Time:</strong> {event.startTime} - {event.endTime}
      </p>
      <p>{event.description}</p>
      <div className="card-actions">
        <div className="details-row">
          <button
            type="button"
            className="details-button"
            onClick={handleClick}
          >
            View Details
          </button>
        </div>
        <div className="card-buttons">
          <button
            type="button"
            className="volunteer-button"
            onClick={handleClick}
          >
            Volunteer
          </button>
          <button
            type="button"
            className="edit-button"
            onClick={() => onEdit(event)}
          >
            Edit
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(event.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
