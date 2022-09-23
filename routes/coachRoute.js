const express = require("express");
const router = express.Router();
const { getCoach } = require("../controllers/authPtControllers");

router.route("/:id").get(getCoach);

module.exports = router;
