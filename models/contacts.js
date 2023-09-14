const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const currentId = String(contactId);

  const contacts = await listContacts();

  const result = contacts.find((contact) => contact.id === currentId);

  return result || null;
};

const removeContact = async (contactId) => {
  const currentId = String(contactId);

  const contacts = await listContacts();

  const currentContact = contacts.find((contact) => contact.id === currentId);

  if (currentContact) {
    const result = contacts.filter((contact) => contact.id !== currentId);

    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return currentContact || null;
  }
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = { name, email, phone, id: nanoid() };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact || null;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const currentId = String(contactId);

  const currentContact = await getContactById(currentId);

  if (!currentContact) {
    return null;
  }
  const newContactsList = contacts.filter(
    (contact) => contact.id !== contactId
  );

  const updateContact = { ...currentContact, ...body };
  newContactsList.push(updateContact);

  await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2));
  return updateContact || null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
