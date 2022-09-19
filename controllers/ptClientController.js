const Client = require("../models/clientsModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
// =================get all clients ============
const getallClients = async (req, res) => {
  const clients = await Client.find({ createdBy: req.coach.coachId });
  res.status(StatusCodes.OK).json({ clients });
};

// ===============get one client ============
//  we need to check both id coach and client so in case someone provided the client id he cant access it cause he want the user id which he doesnt have access to it

const getoneClient = async (req, res) => {
  const {
    coach: { coachId },
    params: { clientId },
  } = req;
  const client = await Client.findOne({
    createdBy: coachId,
    _Id: clientId,
  });
  if (!client) {
    throw new NotFoundError(`no client with id ${clientId}`);
  }
  res.status(StatusCodes.OK).json({ client });
};
// ================== create new client =============
const createNewClient = async (req, res) => {
  // ===we refer the created by directly to the coach.coachId
  req.body.createdBy = req.coach.coachId;
  const client = await Client.create({ ...req.body });
  const token = client.createJWT();
  res.status(StatusCodes.CREATED).json({ client, token });
};

// =============update client ===============
const updateClient = async (req, res) => {
  const {
    coach: { coachId },
    params: { id: clientId },
  } = req;

  const client = await Client.findOneAndUpdate(
    {
      _Id: clientId,
      createdBy: coachId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!client) {
    throw new NotFoundError(`client not fount with id ${clientId} `);
  }
  res.status(StatusCodes.OK).json({ client });
};

// ================ delete client ==============
const deleteClient = async (req, res) => {
  const {
    coach: { coachId },
    params: { id: clientId },
  } = req;

  const client = await Client.findOneAndRemove({
    _id: clientId,
    createdBy: coachId,
  });
  res.status(StatusCodes.OK).send("client was deleted");
};

module.exports = {
  getallClients,
  getoneClient,
  createNewClient,
  updateClient,
  deleteClient,
};
