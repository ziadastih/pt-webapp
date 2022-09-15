const coach = require("../models/ptschema");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const CoachAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("AUTHENTICATION INVALID");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.coach = { coachId: payload.coachId, coachName: payload.firstName };
    next();
  } catch (error) {
    throw new UnauthenticatedError("AUTHENTICATION INVALID");
  }
};

module.exports = CoachAuth;
