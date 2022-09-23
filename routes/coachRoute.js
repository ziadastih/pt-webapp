const express = require("express");
const router = express.Router();
const { getCoach, updateCoach } = require("../controllers/authPtControllers");

router.route("/:id").get(getCoach).patch(updateCoach);

module.exports = router;
