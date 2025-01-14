const userApi = require("../models/users");
const Joi = require("../helpers/validateUser");
const HttpError = require("../helpers/httpError");

const getRegister = async (req, res, next) => {
  try {
    const validate = Joi.validateUser(req.body);

    if (validate.error) {
      throw HttpError(400, validate.error.details[0].message);
    }

    const data = await userApi.createUser(req.body);

    if (!data) {
      throw HttpError(409, "Email in use");
    }
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getLogin = async (req, res, next) => {
  try {
    const validate = Joi.validateUser(req.body);

    if (validate.error) {
      throw HttpError(400, validate.error.details[0].message);
    }

    const data = await userApi.loginUser(req.body);

    if (!data) {
      throw HttpError(401, "Email or password is wrong");
    }
    if (data === "Email not verify") {
      throw HttpError(401, "Email not verify");
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    if (
      error.message === "Cannot read properties of null (reading 'password')"
    ) {
      error.message = "Email or password is wrong";
      next(error);
    }
    next(error);
  }
};

const getLogout = async (req, res, next) => {
  try {
    const data = await userApi.logoutUser(req.user);

    if (!data) {
      throw HttpError(401, "Not authorized");
    }

    req.user = null;
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const data = await userApi.currentUser(req.user);

    if (!data) {
      throw HttpError(401, "Not authorized");
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    next(error);
  }
};
const getUpdateSub = async (req, res, next) => {
  try {
    const validate = Joi.validateSub(req.body);

    if (validate.error) {
      throw HttpError(400, validate.error.details[0].message);
    }

    const data = await userApi.updateSupUser(req.user, req.body);

    if (!data) {
      throw HttpError(401, "Not authorized");
    }

    res.status(201).json(data);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const getUpdateAvatar = async (req, res, next) => {
  try {
    const data = await userApi.updateAvatarUser(req.file, req.user);
    if (!data) {
      throw HttpError(401, "Not authorized");
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const getVerifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const data = await userApi.verifyUser(verificationToken);
    if (!data) {
      throw HttpError(404, "User not found");
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const getExtraVerifyEmail = async (req, res, next) => {
  try {
    const validate = Joi.validateEmail(req.body);

    if (validate.error) {
      throw HttpError(400, validate.error.details[0].message);
    }

    const data = await userApi.extraVerifyUser(req.body);

    if (!data) {
      throw HttpError(404, "User not found");
    }
    if (data.message === "Verification has already been passed") {
      res.status(400).json(data);
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = {
  getRegister,
  getLogin,
  getLogout,
  getCurrentUser,
  getUpdateSub,
  getUpdateAvatar,
  getVerifyEmail,
  getExtraVerifyEmail,
};
