const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  speaker: {
    type: String,
    required: true,
  },
  volunteers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vol",
  },
  postedBy: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model("event", eventSchema);
module.exports = Event;
