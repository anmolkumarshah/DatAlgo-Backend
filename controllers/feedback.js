const { validationResult } = require("express-validator");
const Feedback = require("../models/feedback");

exports.createFeedback = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: error.array() });
  }
  const email = req.body.email;
  const description = req.body.description;
  const feedback = new Feedback({
    email: email,
    description: description,
  });

  try {
    const result = await feedback.save();
    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (e) {
    res.status(400).json({
      message: "Error",
      data: e,
    });
  }
};
