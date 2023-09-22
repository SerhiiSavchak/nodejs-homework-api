const tokenApi = require("../helpers/token");
const User = require("../db/dbUsers");
const HttpError = require("../helpers/httpError");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      next(HttpError(401, "Not authorized"));
    }

    const isValidToken = tokenApi.isValidToken(token);

    const user = await User.findById(isValidToken);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = isValidToken;

    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      next(HttpError(401, "Not authorized"));
    }
    next(error);
  }
};

module.exports = auth;
