const express = require("express");
const router = express.Router();
const {
  getallClients,
  getoneClient,
  createNewClient,
  updateClient,
  deleteClient,
} = require("../controllers/ptClientController");

router.route("/").post(createNewClient).get(getallClients);
router.route("/:id").get(getoneClient).delete(deleteClient).patch(updateClient);

module.exports = router;
