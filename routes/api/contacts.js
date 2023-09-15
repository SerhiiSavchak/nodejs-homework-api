const express = require("express");
const router = express.Router();
const contactsAPI = require("../../models/contacts");

const Joi = require("../../helpers/validateData");

router.get("/", async (req, res, next) => {
  try {
    const data = await contactsAPI.listContacts();

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Error request" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const data = await contactsAPI.getContactById(req.params.contactId);
    if (!data) {
      throw new Error();
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const data = await contactsAPI.removeContact(req.params.contactId);

    if (!data) {
      throw new Error();
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validate = Joi.validateData(req.body);

    if (validate.error) {
      const errorMessage = { message: validate.error.details[0].message };
      return res.status(400).json(errorMessage);
    }

    const data = await contactsAPI.addContact(req.body);

    if (!data) {
      throw new Error();
    }

    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: `missing fields` });
      return;
    }
    const validate = Joi.validateData(req.body);
    if (validate.error) {
      const errorMessage = { message: validate.error.details[0].message };
      return res.status(400).json(errorMessage);
    }
    const data = await contactsAPI.updateContact(
      req.params.contactId,
      req.body
    );

    if (!data) {
      throw new Error();
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Not found" });
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: `missing field favorite` });
    }

    const validate = Joi.validateFavorite(req.body);
    if (validate.error) {
      const errorMessage = { message: validate.error.details[0].message };
      return res.status(400).json(errorMessage);
    }

    const data = await contactsAPI.updateStatusContact(
      req.params.contactId,
      req.body
    );

    if (!data) {
      throw new Error();
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Not found" });
  }
});
module.exports = router;
