function EventControls({
  onAddEvent,
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
}) {
  return (
    <div className="event-controls">
      <div className="controls-header">
        <div className="col">
          <h2>Find a Way to Help</h2>
          <p>Browse local requests and choose one that fits your time.</p>
        </div>
      </div>

      <div className="filters">
        <div className="control">
          <label htmlFor="search">Search requests</label>
          <input
            id="search"
            type="text"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by request, organizer, date etc..."
          />
        </div>
        <div className="control">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Community Cleanup">Community Cleanup</option>
            <option value="Food Drive">Food Drive</option>
            <option value="Environmental">Environmental</option>
            <option value="Senior Services">Senior Services</option>
            <option value="Clothing Drive">Clothing Drive</option>
            <option value="Education">Education</option>
          </select>
        </div>
        <div className="control">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default EventControls;
