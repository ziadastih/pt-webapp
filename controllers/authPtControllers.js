const Coach = require("../models/ptschema");
const Client = require("../models/clientsModel");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const register = async (req, res) => {
  const coach = await Coach.create({ ...req.body });
  const token = coach.createJWT();
  res.status(StatusCodes.CREATED).json({ coach, token });
};

const login = async (req, res) => {
  // ============get mail and password from frontend
  const { email, password, role } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  if (role === "coach") {
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

    // ========set token inside our http cookie to make it safe =============
    res.cookie("token", token, {
      maxAge: "86400000",
      httpOnly: true,
    });

    // ===============send the json response ====================
    res.status(StatusCodes.OK).json({
      coach: {
        coachId: coach._id,
        coachFirstName: coach.firstName,
        coachLastName: coach.lastName,
        role: coach.role,
      },
    });
  } else if (role === "client") {
    // ============now searching in database for email of the client
    const client = await Client.findOne({ email });

    const isPasswordCorrect = await client.comparePassword(password);

    // if client not found means invalid credentials
    // =compare password / if password doesnt match throw error invalid credentials==========
    if (!client || !isPasswordCorrect || client.enabled === false) {
      throw new UnauthenticatedError("invalid credential");
    }

    // =========if everything is true we want to create a token for this session and get the coach id and coach name and send token to the frontend
    const token = client.createJWT();

    // ========set token inside our http cookie to make it safe =============
    res.cookie("token", token, {
      maxAge: "86400000",
      httpOnly: true,
    });

    // ===============send the json response ====================
    res.status(StatusCodes.OK).json({
      client: {
        clientId: client._id,
        clientName: client.firstName,
        clientLastName: client.lastName,
        role: client.role,
      },
    });
  }
};

const getCoach = async (req, res) => {
  const { id: coachId } = req.params;
  const coach = await Coach.findOne({
    _id: coachId,
  });
  if (!coach) {
    throw new NotFoundError(`no client with id ${coachId}`);
  }
  res.status(StatusCodes.OK).json({
    coach: {
      coachFirstName: coach.firstName,
      coachLastName: coach.lastName,
      email: coach.email,
      number: coach.number,
    },
  });
};

// ==================update======================

const updateCoach = async (req, res) => {
  const { id: coachId } = req.params;

  if (req.body.currentPassword) {
    const coach = await Coach.findOne({ _id: coachId });
    const isPasswordCorrect = await coach.comparePassword(
      req.body.currentPassword
    );

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("invalid credential");
    }
    let password = req.body.password;
    coach.password = password;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    await coach.save();
    res.status(StatusCodes.OK).json({
      coach: {
        coachFirstName: coach.firstName,
        coachLastName: coach.lastName,
        email: coach.email,
      },
    });
  } else {
    const coach = await Coach.findOneAndUpdate(
      {
        _id: coachId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!coach) {
      throw new NotFoundError(`no coach with id ${coachId}`);
    }
    res.status(StatusCodes.OK).json({
      coach: {
        coachFirstName: coach.firstName,
        coachLastName: coach.lastName,
        email: coach.email,
      },
    });
  }
};
// ===========logout function setting the token age to 0 ==============

const logout = async (req, res) => {
  await res.cookie("token", "", {
    maxAge: "0",
    httpOnly: true,
  });

  res.status(StatusCodes.OK).send("session is invalid");
};
module.exports = { register, login, logout, getCoach, updateCoach };
