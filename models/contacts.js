const Contact = require("../db/dbContacts");

const listContacts = async (userId, page, limit, favorite) => {
  const skip = (page - 1) * limit;
  const userParams = favorite
    ? { owner: userId, favorite: true }
    : { owner: userId };
  const contacts = await Contact.find(
    userParams,
    {},
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");

  return contacts || null;
};

const getContactById = async (contactId) => {
  const currentId = String(contactId);

  const contacts = await Contact.findById(currentId).populate(
    "owner",
    "email subscription"
  );

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

const addContact = async ({ name, email, phone }, userId) => {
  const newContact = { name, email, phone };

  const result = (
    await Contact.create({ ...newContact, owner: userId })
  ).populate("owner", "email subscription");

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
  }).populate("owner", "email subscription");
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
