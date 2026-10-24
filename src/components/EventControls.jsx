import { useState } from "react";

function EventControls({ onAddEvent, data }) {
  const [searchText, setSearchText] = useState("");
  const filteredData = data.filter(event => {
    return (
      event.title.toLowerCase().includes(searchText.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchText.toLowerCase()) ||
      event.date.includes(searchText) ||
      event.category.toLowerCase().includes(searchText.toLowerCase()) ||
      event.status.toLowerCase().includes(searchText.toLowerCase()) ||
      event.location.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="event-controls">
        <div className="row">
            <h2>Find a Way to Help</h2>
            <button onClick={onAddEvent}>Add request</button>
        </div>
        <p>Browse local requests and choose one that fits your time.</p>
        <div className="row">
            <div className="control">
                <label for="search">Search requests</label>
                <input id="search" type="text" value={searchText} onChange={(e) => { setSearchText(e.target.value)}} placeholder="Search by request, organizer, date or other criteria" />
            </div>
            <div className="control">
                <label for="category">Category</label>
                <select id="category">
                    <option value="">All Categories</option>
                    <option value="Community Cleanup">Community Cleanup</option>
                    <option value="Food Drive">Food Drive</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Senior Services">Senior Services</option>
                    <option value="Clothing Drive">Clothing Drive</option>
                    <option value="Education">Education</option>
                </select>
            </div>
            <div className="col">
                <label for="status">Status</label>
                <select id="status">
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