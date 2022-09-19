const Workout = require("../models/workoutSchema");
const { StatusCodes } = require("http-status-codes");

// ===============get all workouts =================
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({ createdBy: req.coach.coachId });
  res.status(StatusCodes.OK).json({ workouts });
};

// ============get one specific workout ==================
const getOneWorkout = async (req, res) => {
  res.send("get one workout");
};

// ===============create workout ========================
const createWorkout = async (req, res) => {
  req.body.createdBy = req.coach.coachId;
  const workout = await Workout.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ workout });
};

// =============update workout =======================
const updateWorkout = async (req, res) => {
  res.send("update workout ");
};

// ===============delete workout ===================
const deleteWorkout = async (req, res) => {
  res.send("delete workout ");
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getOneWorkout,
  updateWorkout,
  deleteWorkout,
};
