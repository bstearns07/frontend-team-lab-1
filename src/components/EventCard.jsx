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
      <span className="category-label">{event.category}</span>
      <h3>{event.title}</h3>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Time:</strong> {event.time}
      </p>
      <p>{event.description}</p>
      <button onClick={handleClick}>View Details</button>
      <div className="card-buttons">
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
    </article>
  );
}

export default EventCard;
