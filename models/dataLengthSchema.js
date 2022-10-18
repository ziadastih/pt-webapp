const mongoose = require("mongoose");

const dataLength = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
  },
  workoutLength: {
    type: Number,
    default: 0,
  },
  clientLength: {
    type: Number,
    default: 0,
  },
  dietLength: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("dataLength", dataLength);
