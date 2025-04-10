import React, { useEffect, useState } from "react";

function Requests() {
  const [requests, setRequests] = useState([]); // Store event requests
  const [filter, setFilter] = useState("Pending"); // Store filter state

  // Fetch event requests from backend
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:8080/events/requests");
      const data = await response.json();
      setRequests(data); // Store in state
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  // Update event status (Approve or Reject)
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:8080/events/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();
      if (result.success) {
        alert(`Event ${status}!`);
        fetchRequests(); // Refresh the list
      } else {
        alert("Error updating status");
      }
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div className="mt-3">
        <button
          className={`btn ms-md-3 ${filter === "Pending" ? "btn-primary" : "btn-dark"}`}
          onClick={() => setFilter("Pending")}
        >
          Pending
        </button>
        <button
          className={`btn ms-md-3 ${filter === "Approved" ? "btn-primary" : "btn-dark"}`}
          onClick={() => setFilter("Approved")}
        >
          Approved
        </button>
        <button
          className={`btn ms-md-3 ${filter === "Rejected" ? "btn-primary" : "btn-dark"}`}
          onClick={() => setFilter("Rejected")}
        >
          Rejected
        </button>
      </div>
      <br />

      {/* Display Requests */}
      <div className="container">
        {requests
          .filter((event) => event.status === filter) // Filter by status
          .map((event) => (
            <div className="card text-center my-3" key={event._id}>
              <div className="card-header mt-3">
                <h4>{event.name}</h4>
              </div>
              <div className="card-body">
                <p className="card-title">Event Details:</p>
                <h5 className="card-text"><strong>Description:</strong> {event.description}</h5>
                <h5 className="card-text"><strong>Event Type:</strong> {event.eventType}</h5>
                <h5 className="card-text"><strong>Venue:</strong> {event.venue || "TBD"}</h5>
                <h5 className="card-text"><strong>Estimated Attendees:</strong> {event.estimatedAttendees || "Not Provided"}</h5>
                <h5 className="card-text">
                  <strong>Time:</strong> {event.time || "Not Provided"}
                </h5>
                <h5 className="card-text">
                  <strong>Date:</strong> {event.date ? new Date(event.date).toDateString() : "Date not available"}
                </h5>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-success me-2"
                  onClick={() => updateStatus(event._id, "Approved")}
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => updateStatus(event._id, "Rejected")}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Requests;
