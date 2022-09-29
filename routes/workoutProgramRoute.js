const express = require("express");

const router = express.Router();
const {
  createWorkoutProgram,
  getOneWorkoutProgram,
  getAllWorkoutPrograms,
  updateWorkoutProgram,
  deleteWorkoutProgram,
} = require("../controllers/workoutController");

router.route("/").post(createWorkoutProgram).get(getAllWorkoutPrograms);
router
  .route("/:id")
  .get(getOneWorkoutProgram)
  .patch(updateWorkoutProgram)
  .delete(deleteWorkoutProgram);

module.exports = router;
