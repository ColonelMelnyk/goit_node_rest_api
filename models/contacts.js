const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");
 const contactsPath = path.join(__dirname, "contacts.json");
const listContacts = async ()=> {
 const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
  }
  
const getContactById  = async(contactId) => {
   const id = String(contactId);
   const allContacts = await listContacts();
   const searchResult = allContacts.find(contact => contact.id === id)
   return searchResult || null;

  }
  
  const removeContact = async(contactId) => {
    const id = String(contactId);
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === id);
    if(index === -1){
        return null;
    }
    const [result] = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return result;
  }
  
  const addContact = async(name, email, phone) => {
    const allContacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
    }
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;

  }

  module.exports ={
  listContacts,
  getContactById,
  removeContact,
  addContact,
  }