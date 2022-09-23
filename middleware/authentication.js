const coach = require("../models/ptschema");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const CoachAuth = async (req, res, next) => {
  const { token } = req.cookies;

  // ============make sure both tokens are present ============
  if (!token) {
    throw new UnauthenticatedError("AUTHENTICATION INVALID");
  }

  // ============next step after gym should see if the token is expired then i refresh it and then i should adjust the time for the main token for 5 mins only and the refresh token maybe , max 1 or 2 hours

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the routes
    req.coach = { coachId: payload.coachId, coachName: payload.firstName };
    next();
  } catch (error) {
    throw new UnauthenticatedError("AUTHENTICATION INVALID");
  }
};

module.exports = CoachAuth;
