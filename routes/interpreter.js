const express = require("express");
const isAuth = require("../middleware/isAuth");

const router = express.Router();
const interpreterController = require("../controllers/interpreter");

router.post("/run", isAuth, interpreterController.run);

module.exports = router;
