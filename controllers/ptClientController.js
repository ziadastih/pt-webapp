const Client = require("../models/clientsModel");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.Email_Api);
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// =================get all clients with certain query === ============
const getallClients = async (req, res) => {
  const { name, count, length } = req.query;
  const queryObject = {};

  if (length) {
    const client = await Client.find({
      createdBy: req.coach.coachId,
    });
    let number = client.length;

    res.status(StatusCodes.OK).json({ number });
  }

  if (name) {
    queryObject.firstName = { $regex: name, $options: "i" };

    queryObject.createdBy = req.coach.coachId;

    const clients = await Client.find(queryObject).lean();

    const clientsInfo = clients.map((obj) => {
      return {
        clientFirstName: obj.firstName,
        clientLastName: obj.lastName,
        clientId: obj._id,
        createdAt: obj.createdAt,
      };
    });
    res.status(StatusCodes.OK).json({ clientsInfo });
  }

  if (count) {
    const clients = await Client.find({ createdBy: req.coach.coachId });
    const clientsInfo = clients.map((obj) => {
      return {
        clientFirstName: obj.firstName,
        clientLastName: obj.lastName,
        clientId: obj._id,
        createdAt: obj.createdAt,
      };
    });

    res.status(StatusCodes.OK).json({
      clientsInfo,
    });
  }
};

// ===============get one client ============
//  we need to check both id coach and client so in case someone provided the client id he cant access it cause he want the user id which he doesnt have access to it

const getoneClient = async (req, res) => {
  const {
    coach: { coachId },
    params: { id: clientId },
  } = req;
  const client = await Client.findOne({
    _id: clientId,
  });

  if (!client) {
    throw new NotFoundError(`no client with id ${clientId}`);
  }
  res.status(StatusCodes.OK).json({
    client: {
      clientFirstName: client.firstName,
      clientLastName: client.lastName,
      createdAt: client.createdAt,
      createdBy: client.createdBy,
      enabled: client.enabled,
      email: client.email,
      number: client.number,
    },
  });
};
// ================== create new client =============
const createNewClient = async (req, res) => {
  // ===we refer the created by directly to the coach.coachId
  req.body.createdBy = req.coach.coachId;

  const msg = {
    to: req.body.email,
    from: "ziadastih12@gmail.com",

    template_id: process.env.template_id,

    dynamic_template_data: {
      clientName:
        req.body.firstName[0].toUpperCase() + req.body.firstName.substring(1),
      clientPassword: req.body.password,
      year: new Date().getFullYear(),
    },
  };
  sgMail.send(msg, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
  // ============create random password  ===========================

  const client = await Client.create({ ...req.body });

  const token = client.createJWT();
  res.status(StatusCodes.CREATED).json({
    client: {
      clientFirstName: client.firstName,
      clientLastName: client.lastName,
      createdAt: client.createdAt,
      createdBy: client.createdBy,
      enabled: client.enabled,
      email: client.email,
      number: client.number,
    },
  });
};

// =============update client ===============
const updateClient = async (req, res) => {
  if (req.body.enabled) {
    const {
      coach: { coachId },
      params: { id: clientId },
    } = req;

    const client = await Client.findOneAndUpdate(
      {
        _id: clientId,
        createdBy: coachId,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!client) {
      throw new NotFoundError(`client not fount with id ${clientId} `);
    }
    res.status(StatusCodes.OK).json({
      client: {
        clientFirstName: client.firstName,
        clientLastName: client.lastName,
        createdAt: client.createdAt,
        createdBy: client.createdBy,
        enabled: client.enabled,
        email: client.email,
        number: client.number,
      },
    });
  } else if (req.body.password) {
    const { id: clientId } = req.params;

    const client = await Client.findOne({ _id: clientId });

    const isPasswordCorrect = await client.comparePassword(
      req.body.currentPassword
    );

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("invalid credential");
    }
    let password = req.body.password;
    client.password = password;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    await client.save();
    res.status(StatusCodes.OK).json({
      client: {
        clientFirstName: client.firstName,
        clientLastName: client.lastName,
        createdAt: client.createdAt,
        createdBy: client.createdBy,
        enabled: client.enabled,
        email: client.email,
        number: client.number,
      },
    });
  } else {
    const { id: clientId } = req.params;

    const client = await Client.findOneAndUpdate(
      {
        _id: clientId,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!client) {
      throw new NotFoundError(`client not fount with id ${clientId} `);
    }
    res.status(StatusCodes.OK).json({
      client: {
        clientFirstName: client.firstName,
        clientLastName: client.lastName,
        createdAt: client.createdAt,
        createdBy: client.createdBy,
        enabled: client.enabled,
        email: client.email,
        number: client.number,
      },
    });
  }
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
