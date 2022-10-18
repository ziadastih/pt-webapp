const express = require("express");
const router = express.Router();
const {
  getAllLength,
  updateLength,
  postLength,
} = require("../controllers/dataLengthController");

router.route("/").post(postLength).get(getAllLength).patch(updateLength);

module.exports = router;
