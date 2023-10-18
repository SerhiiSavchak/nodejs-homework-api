const express = require("express");
const {
  getRegister,
  getLogin,
  getLogout,
  getCurrentUser,
  getUpdateSub,
  getUpdateAvatar,
  getVerifyEmail,
  getExtraVerifyEmail,
} = require("../../controllers/usersControllers");

const uploadFile = require("../../middlewares/upload");

const authenticate = require("../../middlewares/auth");

const router = express.Router();

router.patch("/", authenticate, getUpdateSub);

router.post("/register", getRegister);

router.post("/login", getLogin);

router.post("/logout", authenticate, getLogout);

router.get("/current", authenticate, getCurrentUser);

router.post("/verify", getExtraVerifyEmail);

router.get("/verify/:verificationToken", getVerifyEmail);

router.patch(
  "/avatars",
  authenticate,
  uploadFile.single("avatar"),
  getUpdateAvatar
);

module.exports = router;
