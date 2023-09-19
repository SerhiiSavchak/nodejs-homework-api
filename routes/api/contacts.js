const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContact,
  updateContactFavorite,
} = require("../../controllers/contactsControllers");

const express = require("express");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.delete("/:contactId", deleteContactById);

router.post("/", addContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", updateContactFavorite);

module.exports = router;
