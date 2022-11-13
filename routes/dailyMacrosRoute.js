const express = require("express");
const router = express.Router();
const {
  getOneDailyMacros,
  createDailyMacros,
} = require("../controllers/dailyMacrosController");

router.route("/").post(createDailyMacros);
router.route("/:id").get(getOneDailyMacros);

module.exports = router;
