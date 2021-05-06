const express = require("express");

const router = express.Router();
const interpreterController = require("../controllers/interpreter");

router.get("/posts", interpreterController.getPosts);
router.post("/posts", interpreterController.createPost);

router.post("/run", interpreterController.run);

module.exports = router;
