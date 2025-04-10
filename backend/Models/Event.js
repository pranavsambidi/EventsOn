const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  eventType: { 
    type: String, 
    enum: ["Seminar", "Workshop", "Conference", "Meeting", "Cultural Event"], // ✅ Added "Cultural Event"
    required: true 
  },
  description: {
    type: String,
    required: true,
  },
  date: { type: Date, required: false },
  time: { type: String, required: false }, 
  venue: {
    type: String,
    required: true,
  },
  estimatedAttendees: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Event", EventSchema);
