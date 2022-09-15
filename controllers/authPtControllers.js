const Coach = require("../models/ptschema");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const register = async (req, res) => {
  const coach = await Coach.create({ ...req.body });
  const token = coach.createJWT();
  res.status(StatusCodes.CREATED).json({ coach, token });
};

const login = async (req, res) => {
  // ============get mail and password from frontend
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  // ============now searching in database for email
  const coach = await Coach.findOne({ email });
  const isPasswordCorrect = await coach.comparePassword(password);
  // if coach not found means invalid credentials
  // =compare password / if password doesnt match throw error invalid credentials==========
  if (!coach || !isPasswordCorrect) {
    throw new UnauthenticatedError("invalid credential");
  }

  // =========if everything is true we want to create a token for this session and get the coach id and coach name and send token to the frontend
  const token = coach.createJWT();
  res
    .status(StatusCodes.OK)
    .json({
      coach: {
        coachId: coach._id,
        coachName: coach.firstName,
        role: coach.role,
      },
      token,
    });
};

module.exports = { register, login };
