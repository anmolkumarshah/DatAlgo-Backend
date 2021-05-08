const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { body } = require("express-validator");
const User = require("../models/user");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter valid email address")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDocs) => {
          if (userDocs) {
            return Promise.reject("Email Address already exists!");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be 5 characters long"),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
