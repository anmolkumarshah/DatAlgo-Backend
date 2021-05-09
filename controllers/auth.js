const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "validation failed", error: errors.array() });
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashPw) => {
      const user = new User({
        email: email,
        password: hashPw,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      return res
        .status(200)
        .json({ message: "User created suffessfully", userId: result._id });
    })
    .catch((err) => {
      if (err) {
        return res.status(422).json({ message: "Internal error", error: err });
      }
    });
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: "User with this email was not found",
        desc: "no account found",
        error: true,
      });
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json({ message: "Wrong Password", error: true });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "1hr" }
    );

    return res
      .status(200)
      .json({ token: token, userId: user._id.toString(), error: false });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "login error", desc: e, error: true });
  }
};
