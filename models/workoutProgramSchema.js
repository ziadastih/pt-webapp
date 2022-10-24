const { boolean } = require("joi");
const mongoose = require("mongoose");

const workoutProgramSchema = new mongoose.Schema(
  {
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
    current: {
      type: Boolean,
    },
    weeks: {
      type: Array,
      required: [true, "please provide a plan"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("workoutProgram", workoutProgramSchema);
