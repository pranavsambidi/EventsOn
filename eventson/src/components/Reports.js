import React, { useEffect, useState } from "react";

function Reports() {
  const [reports, setReports] = useState([]); // Store all reports
  const [filteredReports, setFilteredReports] = useState([]); // Store filtered results
  const [search, setSearch] = useState(""); // Search keyword
  const [fromDate, setFromDate] = useState(""); // From date
  const [toDate, setToDate] = useState(""); // To date
  const [eventType, setEventType] = useState(""); // Event type
  const [selectedEvent, setSelectedEvent] = useState(null); // Store event details for modal

  // Fetch reports from backend
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("https://eventson-backend.onrender.com/events/reports");
      const data = await response.json();
      setReports(data);
      setFilteredReports(data); // Initially show all reports
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  // Filter reports based on user input
  const handleSearch = () => {
    let filtered = reports;

    // Filter by search keyword
    if (search) {
      filtered = filtered.filter(
        (report) =>
          report.name.toLowerCase().includes(search.toLowerCase()) ||
          report.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by date range
    if (fromDate) {
      filtered = filtered.filter(
        (report) => new Date(report.date) >= new Date(fromDate)
      );
    }
    if (toDate) {
      filtered = filtered.filter(
        (report) => new Date(report.date) <= new Date(toDate)
      );
    }

    // Filter by event type
    if (eventType && eventType !== "-- Select --") {
      filtered = filtered.filter((report) => report.eventType === eventType); // Fix here
    }

    setFilteredReports(filtered);
  };

  // Open modal with event details
  const openModal = (event) => {
    setSelectedEvent(event);
  };

  // Close modal
  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <div className="container">
        <h4 className="my-4">Filter Reports</h4>

        {/* Search Keywords */}
        <div className="my-2 col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Date Range */}
        <div className="row">
          <div className="my-2 col-lg-7">
            <div className="input-group">
              <span className="input-group-text">From date</span>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <span className="input-group-text">To date</span>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Event Type Dropdown */}
        <div className="row">
          <div className="my-2 col-lg-4">
            <div className="input-group">
              <label className="input-group-text">Event Type</label>
              <select
                className="form-select"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option>-- Select --</option>
                <option value="Presentation">Presentation</option>
                <option value="Meeting">Meeting</option>
                <option value="Fest">Fest</option>
                <option value="Workshop">Workshop</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="my-2 col-lg-4">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Search Results */}
        <h4 className="my-4">Search Results</h4>
        <div className="table my-4">
          <table className="table table-hover" style={{ minWidth: "600px" }}>
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Event Name</th>
                <th scope="col">Event Type</th>
                <th scope="col">Event Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => (
                <tr key={report._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{report.name}</td>
                  <td>{report.eventType}</td> {/* Fix here */}
                  <td className="desc">{report.description}</td>
                  <td>
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => openModal(report)}
                    >
                      <i className="fa fa-info-circle"></i> Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Event Preview */}
      {selectedEvent && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedEvent.name}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Type:</strong> {selectedEvent.eventType}</p> {/* Fix here */}
                <p><strong>Description:</strong> {selectedEvent.description}</p>
                <p><strong>Date:</strong> {selectedEvent.date ? new Date(selectedEvent.date).toDateString() : "N/A"}</p>
                <p><strong>Time:</strong> {selectedEvent.time || "Not Provided"}</p>
                <p><strong>Venue:</strong> {selectedEvent.venue || "TBD"}</p>
                <p><strong>Estimated Attendees:</strong> {selectedEvent.estimatedAttendees || "N/A"}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
