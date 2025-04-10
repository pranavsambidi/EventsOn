const express = require("express");
const router = express.Router();
const Event = require("../Models/Event");

// POST: Add New Event
router.post("/add", async (req, res) => {
  try {
    console.log("Received event data:", req.body); // Log received data

    const { name, eventType, description, date, time, venue, estimatedAttendees, refreshmentItems } = req.body;

    if (!name || !description || !date) {
      console.log("❌ Missing required fields:", { name, description, date });
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newEvent = new Event({
      name,
      eventType: eventType || "General",
      description,
      date: new Date(date),
      time: time || "Not Provided",
      venue: venue || "TBD",
      estimatedAttendees: estimatedAttendees || 0,
      refreshmentItems: refreshmentItems || [],
      status: "Pending",
    });

    await newEvent.save();
    console.log("✅ Event saved successfully!");

    res.status(201).json({ success: true, message: "Event created successfully" });
  } catch (error) {
    console.error("❌ Error saving event:", error);
    res.status(500).json({ success: false, message: "Server error while saving event." });
  }
});


//GET: Fetch All Event Requests (For Admins)
router.get("/requests", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 }); // Fetch latest events first
    res.json(events);
  } catch (error) {
    console.error("Error fetching event requests:", error);
    res.status(500).json({ message: "Server error while fetching event requests." });
  }
});

//PUT: Update Event Status (Approval/Rejection)
router.put("/update/:id", async (req, res) => {
  try {
    const { status } = req.body;

    // Ensure status is valid
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, message: `Event status updated to ${status}` });
  } catch (error) {
    console.error("Error updating event status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


//GET: Categorize Events into Ongoing, Upcoming, and Past
router.get("/events", async (req, res) => {
  try {
    const today = new Date().setHours(0, 0, 0, 0);
    const events = await Event.find({ status: "Approved" });

    const categorizedEvents = {
      ongoing: [],
      upcoming: [],
      past: [],
    };

    events.forEach((event) => {
      const eventDate = new Date(event.date).setHours(0, 0, 0, 0);
      if (eventDate === today) {
        categorizedEvents.ongoing.push(event);
      } else if (eventDate > today) {
        categorizedEvents.upcoming.push(event);
      } else {
        categorizedEvents.past.push(event);
      }
    });

    res.json(categorizedEvents);
  } catch (error) {
    console.error("Error fetching categorized events:", error);
    res.status(500).json({ message: "Server error while fetching events." });
  }
});

//GET: Fetch All Events for Reports
router.get("/reports", async (req, res) => {
  try {
    const reports = await Event.find().sort({ date: -1 });
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Server error while fetching reports." });
  }
});

//POST: Search/Filter Events
router.post("/search", async (req, res) => {
  try {
    const { search, fromDate, toDate, eventType } = req.body;
    let query = { status: "Approved" };

    // Keyword search (event name or description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Date range filter
    if (fromDate && toDate) {
      query.date = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    } else if (fromDate) {
      query.date = { $gte: new Date(fromDate) };
    } else if (toDate) {
      query.date = { $lte: new Date(toDate) };
    }

    // Filter by event type
    if (eventType && eventType !== "-- Select --") {
      query.eventType = eventType;
    }

    const filteredEvents = await Event.find(query).sort({ date: -1 });
    res.json(filteredEvents);
  } catch (error) {
    console.error("Error filtering events:", error);
    res.status(500).json({ message: "Server error while filtering events." });
  }
});

module.exports = router;
