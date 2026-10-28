import EmptyState from "./EmptyState";
import EventCard from "./EventCard";

function EventList({ events, onEditEvent, onDeleteEvent, onAddVolunteer }) {
  if (events.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container">
      <section className="event-list">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={onDeleteEvent}
            onEdit={onEditEvent}
            onAddVolunteer={onAddVolunteer}
          />
        ))}
      </section>
    </div>
  );
}

export default EventList;
