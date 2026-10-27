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
  // Initialize for state as an empty form or with the info of the event the user is trying to edit
  const [form, setForm] = useState(() => editingEvent ?? emptyForm);
  // Track the previous editing event to reset form state if it changes
  const [previousEditingEvent, setPreviousEditingEvent] =
    useState(editingEvent);

  // if the user is making changes to the editing event, update the form with their changes
  // then update the form with the new editing event if it's changed to a different event
  if (editingEvent !== previousEditingEvent) {
    setPreviousEditingEvent(editingEvent);
    setForm(editingEvent ?? emptyForm);
  }

  /**
    Handles changes to the form input fields and updates the form state accordingly.
    @param {Object} e - The event object from the input change event.
    @returns {void}
  */
  const handleChange = (e) => {
    // Destructure the name and value from the input event
    // Update the form state with the new value for the corresponding target element
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  /**
   * Handles the form submission for adding/updating a volunteer event.
   * @param {Object} e - The event object from the form submit event.
   * @returns {void}
   */
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

    // If editing an existing event call the update callback, otherwise call the add callback. Then reset the form to empty
    if (editingEvent) {
      onUpdateEvent(form);
    } else {
      onAddEvent(form);
    }
    setForm(emptyForm);
  };

  /**
   * Handles cancellation of editing a volunteer event
   *
   * Resets the form to empty and invokes the onCancelEdit callback.
   * @returns {void}
   */
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
          <option value="">Select a category...</option>
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
          id="form-description"
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
