const express = require("express");
const { body } = require("express-validator");
const feedbackController = require("../controllers/feedback");

const router = express.Router();

router.post(
  "/create",
  [body("email").isEmail().trim(), body("description").trim()],
  feedbackController.createFeedback
);

module.exports = router;
