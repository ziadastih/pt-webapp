const DataLength = require("../models/dataLengthSchema");
const { StatusCodes } = require("http-status-codes");

const getAllLength = async (req, res) => {
  const dataLength = await DataLength.find({
    createdBy: req.coach.coachId,
  });

  res.status(StatusCodes.OK).json({ dataLength });
};
const postLength = async (req, res) => {
  req.body.createdBy = req.coach.coachId;
  const dataLength = await DataLength.create({ ...req.body });
  res.status(StatusCodes.OK).json({ dataLength });
};
const updateLength = async (req, res) => {
  const {
    coach: { coachId },
  } = req;

  const dataLength = await DataLength.findOneAndUpdate(
    { createdBy: coachId },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ dataLength });
};

module.exports = { updateLength, postLength, getAllLength };
