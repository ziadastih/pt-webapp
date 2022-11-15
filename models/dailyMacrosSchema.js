const mongoose = require("mongoose");

const dailyMacrosSchema = new mongoose.Schema({
  createdFor: {
    type: mongoose.Types.ObjectId,
  },
  totalMacros: {
    type: Object,
    default: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  },
  currentMacros: {
    type: Object,
    default: { calories: 0, prot: 0, carbs: 0, fat: 0 },
  },
  totalWorkouts: {
    type: Number,
    default: 0,
  },
  currentWorkouts: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("DailyMacros", dailyMacrosSchema);
