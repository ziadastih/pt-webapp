const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema(
  {
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

    current: {
      type: Boolean,
    },
    macros: {
      type: Object,
    },
    meals: {
      type: Array,
      required: [true, "please provide meals"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("diet", dietSchema);
