const Diet = require("../models/dietSchema");
const { StatusCodes } = require("http-status-codes");

// ==================get all diets ===================
const getAllDiets = async (req, res) => {
  const { name, count, length } = req.query;
  const queryObject = {};
  if (length) {
    const diet = await Diet.find({
      createdBy: req.coach.coachId,
    });
    let number = diet.length;

    res.status(StatusCodes.OK).json({ number });
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
    queryObject.createdBy = req.coach.coachId;

    const diet = await Diet.find(queryObject).lean();

    res.status(StatusCodes.OK).json({ diet });
  }

  if (count) {
    const diets = await Diet.find({ createdBy: req.coach.coachId })
      .lean()

      .limit(count);
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
