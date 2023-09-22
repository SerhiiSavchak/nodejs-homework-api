const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContact,
  updateContactFavorite,
} = require("../../controllers/contactsControllers");

const isValidId = require("../../middlewares/isValidId");

const authenticate = require("../../middlewares/auth");

const express = require("express");

const router = express.Router();

router.get("/", authenticate, getAllContacts);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.delete("/:contactId", authenticate, isValidId, deleteContactById);

router.post("/", authenticate, addContact);

router.put("/:contactId", authenticate, isValidId, updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  updateContactFavorite
);

module.exports = router;
