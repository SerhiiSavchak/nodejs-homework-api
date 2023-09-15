const Contact = require("../db/db");

const listContacts = async () => {
  const contacts = await Contact.find({});

  return contacts;
};

const getContactById = async (contactId) => {
  const currentId = String(contactId);

  const contacts = Contact.findById(currentId);

  return contacts || null;
};

const removeContact = async (contactId) => {
  const currentId = String(contactId);
  const currentContact = await getContactById(currentId);

  if (!currentContact) {
    return null;
  }
  await Contact.findByIdAndRemove({ _id: currentId });
  return currentContact || null;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = { name, email, phone };

  const result = await Contact.create(newContact);

  return result || null;
};

const updateContact = async (contactId, body) => {
  const currentId = String(contactId);

  const currentContact = await getContactById(currentId);

  if (!currentContact) {
    return null;
  }

  const result = await Contact.findByIdAndUpdate(currentId, body, {
    new: true,
  });

  return result || null;
};

const updateStatusContact = async (contactId, body) => {
  const currentId = String(contactId);

  const currentContact = await getContactById(currentId);
  if (!currentContact) {
    return null;
  }

  const result = await updateContact(contactId, body);

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
