import React, { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState({ ongoing: [], upcoming: [], past: [] });
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ongoing");

  useEffect(() => {
    fetch("https://eventson-backend.onrender.com/events/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data.ongoing);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    setFilteredEvents(events[category]);
  };

  return (
    <div>
      <div className="mt-3 mb-3">
        <button
          className={`btn ms-md-3 ${activeCategory === "ongoing" ? "btn-primary" : "btn-dark"}`}
          onClick={() => handleFilter("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={`btn ms-md-3 ${activeCategory === "upcoming" ? "btn-primary" : "btn-dark"}`}
          onClick={() => handleFilter("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`btn ms-md-3 ${activeCategory === "past" ? "btn-primary" : "btn-dark"}`}
          onClick={() => handleFilter("past")}
        >
          Past
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4 container">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div className="col" key={event._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <h6 className="card-title">Event Description:</h6>
                  <p className="card-text">{event.description}</p>
                  <h6 className="card-subtitle mb-2 text-muted">Event Type:</h6>
                  <p className="card-text">{event.eventType}</p>
                  <h6 className="card-subtitle mb-2 text-muted">Event Time:</h6>
                  <p className="card-text">{event.time}</p>
                  <p className="card-text">
                    <small className="text-muted">{new Date(event.date).toDateString()}</small>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-end mt-5 me-5">No events found</h1>
        )}
      </div>
    </div>
  );
}

export default Events;
