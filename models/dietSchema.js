const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide diet name"],
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
  dietPlan: {
    type: Array,
    required: [true, "please provide plan"],
  },
});

module.exports = mongoose.model("diet", dietSchema);
