const WorkoutProgram = require("../models/workoutProgramSchema");
const { StatusCodes } = require("http-status-codes");

// ===============get all workouts =================
const getAllWorkoutPrograms = async (req, res) => {
  const { name, page } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
    queryObject.createdBy = req.coach.coachId;

    const workoutprograms = await WorkoutProgram.find(queryObject).lean();

    res.status(StatusCodes.OK).json({ workoutprograms });
  }

  if (page) {
    const page = req.query.page || 0;
    const WorkoutsPerRequest = 20;
    const workoutprograms = await WorkoutProgram.find({
      createdBy: req.coach.coachId,
    })
      .collation({ locale: "en", strength: 1 })
      .sort({ name: 1 })
      .skip(page * WorkoutsPerRequest)
      .limit(WorkoutsPerRequest);

    res.status(StatusCodes.OK).json({ workoutprograms });
  }
};

// ============get one specific workout ==================
const getOneWorkoutProgram = async (req, res) => {
  const {
    coach: { coachId },
    params: { id: workoutProgramId },
  } = req;

  const workoutProgram = await WorkoutProgram.findOne({
    createdBy: coachId,
    _id: workoutProgramId,
  });

  res.status(StatusCodes.OK).json({ workoutProgram });
};

// ===============create workout ========================
const createWorkoutProgram = async (req, res) => {
  req.body.createdBy = req.coach.coachId;
  const workoutProgram = await WorkoutProgram.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ workoutProgram });
};

// =============update workout =======================
const updateWorkoutProgram = async (req, res) => {
  const {
    coach: { coachId },
    params: { id: workoutProgramId },
  } = req;
  const workoutProgram = await WorkoutProgram.findOneAndUpdate(
    {
      createdBy: coachId,
      _id: workoutProgramId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ workoutProgram });
};

// ===============delete workout ===================
const deleteWorkoutProgram = async (req, res) => {
  const {
    coach: { coachId },
    params: { id: workoutProgramId },
  } = req;

  const workoutProgram = await WorkoutProgram.findOneAndRemove({
    _id: workoutProgramId,
    createdBy: coachId,
  });
  res.status(StatusCodes.OK).send("workout was deleted");
};

module.exports = {
  createWorkoutProgram,
  getAllWorkoutPrograms,
  getOneWorkoutProgram,
  updateWorkoutProgram,
  deleteWorkoutProgram,
};
