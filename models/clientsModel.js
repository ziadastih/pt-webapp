const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.Email_Api);
const clientSchema = new mongoose.Schema(
  {
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

      minlength: 6,
    },
    role: {
      type: String,
      default: "client",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Coach",
      required: [true, "please provide coach"],
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

clientSchema.pre("save", async function () {
  // if (!this.isModified("password")) return;
  let chars = `qwertyuiopasdfghjklzxcvbnmAQWERTYUIOPSDFGHJKLZXCVBNM1234567890!@#$%^&*()_+`;

  let randomPass = ``;
  let lengthOfPass = 12;
  for (let i = 0; i < lengthOfPass; i++) {
    randomPass += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const msg = {
    to: this.email,
    from: "ziadastih12@gmail.com",

    template_id: process.env.template_id,

    dynamic_template_data: {
      clientName: this.firstName[0].toUpperCase() + this.firstName.substring(1),
      clientPassword: randomPass,
      year: new Date().getFullYear(),
    },
  };
  sgMail.send(msg, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(randomPass, salt);
});

clientSchema.methods.createJWT = function () {
  return jwt.sign(
    { clientId: this._id, clientName: this.firstName },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

clientSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Client", clientSchema);
