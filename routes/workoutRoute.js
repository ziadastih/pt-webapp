const express = require("express");

const router = express.Router();
const {
  createWorkout,
  getOneWorkout,
  getAllWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

router.route("/").post(createWorkout).get(getAllWorkouts);
router
  .route("/:id")
  .get(getOneWorkout)
  .patch(updateWorkout)
  .delete(deleteWorkout);

module.exports = router;
