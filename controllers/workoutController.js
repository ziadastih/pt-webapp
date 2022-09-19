const Workout = require("../models/workoutSchema");
const { StatusCodes } = require("http-status-codes");

// ===============get all workouts =================
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({ createdBy: req.coach.coachId });
  res.status(StatusCodes.OK).json({ workouts });
};

// ============get one specific workout ==================
const getOneWorkout = async (req, res) => {
  const {
    coach: { coachId },
    params: { id: workoutId },
  } = req;

  const workout = await Workout.findOne({
    createdBy: coachId,
    _id: workoutId,
  });

  res.status(StatusCodes.OK).json({ workout });
};

// ===============create workout ========================
const createWorkout = async (req, res) => {
  req.body.createdBy = req.coach.coachId;
  const workout = await Workout.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ workout });
};

// =============update workout =======================
const updateWorkout = async (req, res) => {
  const {
    coach: { coachId },
    params: { id: workoutId },
  } = req;
  const workout = await Workout.findOneAndUpdate(
    {
      createdBy: coachId,
      _id: workoutId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ workout });
};

// ===============delete workout ===================
const deleteWorkout = async (req, res) => {
  const {
    coach: { coachId },
    params: { id: workoutId },
  } = req;

  const workout = await Workout.findOneAndRemove({
    _id: workoutId,
    createdBy: coachId,
  });
  res.status(StatusCodes.OK).send("workout was deleted");
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getOneWorkout,
  updateWorkout,
  deleteWorkout,
};
