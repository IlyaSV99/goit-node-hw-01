const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    
    return JSON.parse(contacts);
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id == contactId);
    if(!result) {
        return null;
    }
    return result;
  }

  async function updateContacts(contacts) {
   await fs.writeFile(contactsPath, JSON.stringify(contacts));
}
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id == contactId);
    if(idx === -1) {
        return null;
    }
    const [result] = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return result;
  }
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {id: uuidv4(), name, email, phone};
    contacts.push(newContact);
     updateContacts(contacts);
    return newContact;
  }

module.exports = {listContacts, getContactById, removeContact, addContact} ;