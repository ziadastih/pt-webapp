const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const coachSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please provide firstname"],
    maxLength: 50,
    minLength: 3,
  },
  lastName: {
    type: String,
    required: [true, "please provide lastName"],
    maxLength: 50,
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  number: {
    type: Number,
  },
  role: {
    type: String,
    default: "coach",
  },
  coachImg: {
    type: Array,
  },
});

coachSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

coachSchema.methods.createJWT = function () {
  return jwt.sign(
    { coachId: this._id, coachName: this.firstName },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

coachSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Coach", coachSchema);
