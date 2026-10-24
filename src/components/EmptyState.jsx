function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <section className="empty-state">
      <h2>{title || "No Results"}</h2>
      <p>{message || "No data available."}</p>
      {actionLabel && onAction && (
        <button onClick={onAction}>{actionLabel}</button>
      )}
    </section>
  );
}

export default EmptyState;