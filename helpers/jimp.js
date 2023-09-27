const Jimp = require("jimp");

const changeAvatarSize = async (avatarPath) => {
  const newSizeAvatar = await Jimp.read(avatarPath);
  await newSizeAvatar.resize(250, 250).writeAsync(avatarPath);
};

module.exports = changeAvatarSize;
