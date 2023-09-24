const express = require("express");
const {
  getRegister,
  getLogin,
  getLogout,
  getCurrentUser,
  getUpdateSub,
} = require("../../controllers/usersControllers");

const authenticate = require("../../middlewares/auth");

const router = express.Router();

router.post("/register", getRegister);

router.post("/login", getLogin);

router.post("/logout", authenticate, getLogout);

router.get("/current", authenticate, getCurrentUser);

router.patch("/", authenticate, getUpdateSub);

module.exports = router;
