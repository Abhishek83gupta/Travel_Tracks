const express = require("express");
const router = express.Router();

const { signup, login, getUser} = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/get-user", verifyToken, getUser);


module.exports = router;