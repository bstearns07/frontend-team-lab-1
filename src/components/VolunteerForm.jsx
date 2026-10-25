import { useState } from "react";

const emptyForm = {
  title: "",
  date: "",
  organizer: "",
  startTime: "",
  endTime: "",
  location: "",
  category: "",
  description: "",
};

function VolunteerForm({
  onAddEvent,
  onUpdateEvent,
  editingEvent,
  onCancelEdit,
}) {
  const [form, setForm] = useState(() => editingEvent ?? emptyForm);
  const [previousEditingEvent, setPreviousEditingEvent] =
    useState(editingEvent);

  if (editingEvent !== previousEditingEvent) {
    setPreviousEditingEvent(editingEvent);
    setForm(editingEvent ?? emptyForm);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields before submitting
    if (
      !form.title ||
      !form.date ||
      !form.organizer ||
      !form.startTime ||
      !form.endTime ||
      !form.location ||
      !form.category ||
      !form.description
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingEvent) {
      onUpdateEvent(form);
    } else {
      onAddEvent(form);
    }
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    onCancelEdit();
  };

  return (
    <aside className="volunteer-form">
      <h2>{editingEvent ? "Edit Request" : "Add a Volunteer Request"}</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <label htmlFor="date">Date</label>
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Date"
        />
        <label htmlFor="organizer">Organizer</label>
        <input
          name="organizer"
          value={form.organizer}
          onChange={handleChange}
          placeholder="Organizer"
        />
        <label htmlFor="startTime">Start Time</label>
        <input
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          placeholder="Start Time"
        />
        <label htmlFor="endTime">End Time</label>
        <input
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          placeholder="End Time"
        />
        <label htmlFor="location">Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <label htmlFor="category">Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">All Categories</option>
          <option value="Community Cleanup">Community Cleanup</option>
          <option value="Food Drive">Food Drive</option>
          <option value="Environmental">Environmental</option>
          <option value="Senior Services">Senior Services</option>
          <option value="Clothing Drive">Clothing Drive</option>
          <option value="Education">Education</option>
        </select>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">{editingEvent ? "Update" : "Add"} Event</button>
        {editingEvent && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>
    </aside>
  );
}

export default VolunteerForm;
