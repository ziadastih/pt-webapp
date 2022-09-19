const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "PLease provide a workout name"],
    maxLength: 50,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "coach",
    required: [true, "please provide coach"],
  },
  createdFor: {
    type: mongoose.Types.ObjectId,
    ref: "client",
  },
  exercices: {
    type: Array,
    required: [true, "please provide an exercise"],
  },
});

module.exports = mongoose.model("workout", workoutSchema);
