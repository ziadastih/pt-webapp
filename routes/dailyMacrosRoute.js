const express = require("express");
const router = express.Router();
const {
  getOneDailyMacros,
  createDailyMacros,
  updateDailyMacros,
} = require("../controllers/dailyMacrosController");

router.route("/").post(createDailyMacros);
router.route("/:id").get(getOneDailyMacros).patch(updateDailyMacros);

module.exports = router;
