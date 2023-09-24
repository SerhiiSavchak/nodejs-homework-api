const contactsAPI = require("../models/contacts");
const HttpError = require("../helpers/httpError");
const Joi = require("../helpers/validateContact");

const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, favorite } = req.query;

    const data = await contactsAPI.listContacts(
      req.user,
      page,
      limit,
      favorite
    );

    res.status(200).json(data);
  } catch (error) {
    next(HttpError(404, "Error request"));
  }
};

const getContactById = async (req, res, next) => {
  try {
    const data = await contactsAPI.getContactById(req.params.contactId);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const data = await contactsAPI.removeContact(req.params.contactId);

    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const validate = Joi.validateContact(req.body);

    if (validate.error) {
      throw HttpError(400, validate.error.details[0].message);
    }

    const data = await contactsAPI.addContact(req.body, req.user);

    if (!data) {
      throw HttpError(404);
    }

    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }
    const validate = Joi.validateContact(req.body);
    if (validate.error) {
      throw HttpError(400, validate.error.details[0].message);
    }
    const data = await contactsAPI.updateContact(
      req.params.contactId,
      req.body
    );

    if (!data) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const updateContactFavorite = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing field favorite");
    }

    const validate = Joi.validateFavorite(req.body);
    if (validate.error) {
      throw HttpError(400, validate.error.details[0].message);
    }

    const data = await contactsAPI.updateStatusContact(
      req.params.contactId,
      req.body
    );

    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContactById,
  addContact,
  updateContact,
  updateContactFavorite,
};
