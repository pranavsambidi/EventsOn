import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function Schedule() {
  const [formData, setFormData] = useState({
    name: "",
    eventType: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    estimatedAttendees: "",
  });

  const [showPreviewModal, setShowPreviewModal] = useState(false); // Preview modal
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling

  // Dropdown options
  const eventTypes = ["Seminar", "Workshop", "Conference", "Meeting", "Cultural Event"];
  const venues = ["Main Hall", "Auditorium", "Room A101", "Outdoor Stage"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Show Preview Modal
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreviewModal(true);
  };

  // Submit Request
  const handleRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://eventson-backend.onrender.com/events/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowPreviewModal(false); // Close preview modal
        setShowSuccessModal(true); // Show success modal
        setFormData({ // Reset form fields
          name: "",
          eventType: "",
          description: "",
          date: "",
          time: "",
          venue: "",
          estimatedAttendees: "",
        });
      } else {
        setError("Failed to save event. Please try again.");
      }
    } catch (err) {
      setError("Error connecting to server. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Schedule an Event</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Event Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Event Type</label>
          <select className="form-control" name="eventType" value={formData.eventType} onChange={handleChange} required>
            <option value="">-- Select Event Type --</option>
            {eventTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Venue</label>
          <select className="form-control" name="venue" value={formData.venue} onChange={handleChange} required>
            <option value="">-- Select Venue --</option>
            {venues.map((venue, index) => (
              <option key={index} value={venue}>{venue}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Estimated Attendees</label>
          <input type="number" className="form-control" name="estimatedAttendees" value={formData.estimatedAttendees} onChange={handleChange} required />
        </div>

        {/* Submit button - Opens Preview Modal */}
        <button type="submit" className="btn btn-secondary">Submit</button>
      </form>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Preview Event Details</h5>
              </div>
              <div className="modal-body">
                <p><strong>Event Name:</strong> {formData.name}</p>
                <p><strong>Event Type:</strong> {formData.eventType}</p>
                <p><strong>Description:</strong> {formData.description}</p>
                <p><strong>Date:</strong> {formData.date}</p>
                <p><strong>Time:</strong> {formData.time}</p>
                <p><strong>Venue:</strong> {formData.venue}</p>
                <p><strong>Estimated Attendees:</strong> {formData.estimatedAttendees}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowPreviewModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleRequest} disabled={loading}>
                  {loading ? "Submitting..." : "Request"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Success</h5>
              </div>
              <div className="modal-body">
                <p>Event details saved successfully!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Schedule;
