const User = require("../db/dbUsers");
const hashApi = require("../helpers/hashPassword");
const tokenApi = require("../helpers/token");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const changeAvatarSize = require("../helpers/jimp");

const createUser = async (body) => {
  const { email } = body;
  const user = await User.findOne({ email });

  if (user) {
    return null;
  }
  const hashPassword = await hashApi.getHashPassword(body.password);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...body,
    password: hashPassword,
    avatarURL,
  });

  return (
    {
      user: {
        email: newUser.email,
        password: body.password,
      },
    } || null
  );
};

const loginUser = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ email });

  const isValidPass = await hashApi.compareHashPassword(
    password,
    user.password
  );
  console.log(user);
  if (!user || !isValidPass) {
    return null;
  }

  const token = tokenApi.createToken({ _id: user._id });
  await User.findOneAndUpdate({ email }, { token });
  return (
    {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    } || null
  );
};

const logoutUser = async (userId) => {
  const currentId = String(userId);

  const user = User.findById(currentId);
  if (!user) {
    return null;
  }

  const result = await User.findByIdAndUpdate(currentId, { token: null });
  return result || null;
};

const currentUser = async (userId) => {
  const currentId = String(userId);

  const user = await User.findById(currentId);

  if (!user) {
    return null;
  }

  return { email: user.email, subscription: user.subscription } || null;
};

const updateSupUser = async (userId, body) => {
  const currentId = String(userId);

  const user = await User.findById(currentId);
  if (!user) {
    return null;
  }
  await User.findByIdAndUpdate(currentId, {
    subscription: body.subscription,
  });
  return { message: "Subscription updated successful" } || null;
};

const updateAvatarUser = async (file, userId) => {
  const currentId = String(userId);

  const avatarsDir = path.join(__dirname, "../", "public", "avatars");

  const { path: tempUpload, originalname } = file;

  await changeAvatarSize(tempUpload);

  const filename = `${currentId}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatarPath = path.join("avatars", filename);

  await User.findByIdAndUpdate(currentId, { avatarURL: avatarPath });
  return { avatarURL: avatarPath };
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSupUser,
  updateAvatarUser,
};
