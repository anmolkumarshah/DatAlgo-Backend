const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");

  try {
    const decoadedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (!decoadedToken) {
      return res
        .status(401)
        .json({ message: "Not Authanticated", error: true });
    }
    req.userId = decoadedToken.userId;
    next();
  } catch (e) {
    return res.status(500).json({ message: "Not Authanticated", error: true });
  }
};
