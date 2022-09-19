const express = require("express");
const router = express.Router();
const {
  createDiet,
  getAllDiets,
  getOneDiet,
  updateDiet,
  deleteDiet,
} = require("../controllers/dietController");

router.route("/").post(createDiet).get(getAllDiets);
router.route("/:id").get(getOneDiet).patch(updateDiet).delete(deleteDiet);

module.exports = router;
