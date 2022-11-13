const DailyMacros = require("../models/dailyMacrosSchema");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getOneDailyMacros = async (req, res) => {
  const { id } = req.params;
  const dailyMacros = await DailyMacros.findOne({ createdFor: id });

  if (!dailyMacros) {
    throw new NotFoundError(`no dailyMacros with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ dailyMacros });
};

const createDailyMacros = async (req, res) => {
  const dailyMacros = await DailyMacros.create({ ...req.body });

  res.status(StatusCodes.OK).json({ dailyMacros });
};

const updateDailyMacros = async (req, res) => {
  const { id } = req.params;
  const dailyMacros = await DailyMacros.findOneAndUpdate(
    {
      createdFor: id,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ dailyMacros });
};

module.exports = { getOneDailyMacros, createDailyMacros, updateDailyMacros };
