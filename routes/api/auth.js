const express = require("express");
const {
  getRegister,
  getLogin,
  getLogout,
  getCurrentUser,
  getUpdateSub,
  getUpdateAvatar,
} = require("../../controllers/usersControllers");

const uploadFile = require("../../middlewares/upload");

const authenticate = require("../../middlewares/auth");

const router = express.Router();

router.post("/register", getRegister);

router.post("/login", getLogin);

router.post("/logout", authenticate, getLogout);

router.get("/current", authenticate, getCurrentUser);

router.patch("/", authenticate, getUpdateSub);

router.patch(
  "/avatars",
  authenticate,
  uploadFile.single("avatar"),
  getUpdateAvatar
);

module.exports = router;
