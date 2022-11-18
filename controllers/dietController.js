const Diet = require("../models/dietSchema");
const { StatusCodes } = require("http-status-codes");

// ==================get all diets ===================
const getAllDiets = async (req, res) => {
  const { name, page, current, createdFor } = req.query;
  const queryObject = {};

  if (current) {
    const diets = await Diet.find({
      createdFor: current,
      current: true,
    });
    res.status(StatusCodes.OK).json({ diets });
  }
  if (createdFor) {
    queryObject.createdFor = createdFor;
    const diets = await Diet.find(queryObject).lean();

    res.status(StatusCodes.OK).json({ diets });
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
    queryObject.createdBy = req.coach.coachId;

    const diet = await Diet.find(queryObject).lean();

    res.status(StatusCodes.OK).json({ diet });
  }

  if (page) {
    const page = req.query.page || 0;
    const dietsPerRequest = 10;
    const diets = await Diet.find({ createdBy: req.coach.coachId })
      .sort("-createdAt")
      .skip(page * dietsPerRequest)
      .limit(dietsPerRequest);

    res.status(StatusCodes.OK).json({ diets });
  }
};

// ================create diet ===================
const createDiet = async (req, res) => {
  req.body.createdBy = req.coach.coachId;
  const diet = await Diet.create({ ...req.body });
  res.status(StatusCodes.OK).json({ diet });
};

// =============get one diet plan ================
const getOneDiet = async (req, res) => {
  const {
    coach: { coachId },
    params: { id: dietId },
  } = req;

  const diet = await Diet.findOne({ createdBy: coachId, _id: dietId });

  res.status(StatusCodes.OK).json({ diet });
};

// =============update diet ========================

const updateDiet = async (req, res) => {
  const { update } = req.query;

  if (update) {
    const {
      params: { id: dietId },
    } = req;
    const diet = await Diet.findOneAndUpdate({ _id: dietId }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(StatusCodes.OK).json({ diet });
  } else {
    const {
      coach: { coachId },
      params: { id: dietId },
    } = req;

    const diet = await Diet.findOneAndUpdate(
      { createdBy: coachId, _id: dietId },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({ diet });
  }
};

const deleteDiet = async (req, res) => {
  const {
    coach: { coachId },
    params: { id: dietId },
  } = req;

  const diet = await Diet.findOneAndRemove({ createdBy: coachId, _id: dietId });

  res.status(StatusCodes.OK).send("diet was deleted ");
};

module.exports = {
  getAllDiets,
  getOneDiet,
  updateDiet,
  createDiet,
  deleteDiet,
};
