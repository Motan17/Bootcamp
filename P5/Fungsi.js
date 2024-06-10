const fs = require('fs');
const path = require('path');
const validator = require('validator');

const dataDir = path.join(__dirname, 'Doc');
const dataFilePath = path.join(dataDir, 'document.json');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const readJsonFile = (filePath) => {
    if (fs.existsSync(filePath)) return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return [];
};

const saveData = (data) => fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

const validateContact = (contact) => {
    if (contact.email && !validator.isEmail(contact.email)) return 'Invalid email format.';
    if (!validator.isMobilePhone(contact.mobile, 'id-ID')) return 'Invalid phone format.';
    return null;
};

const saveContact = (contact) => {
    const contacts = readJsonFile(dataFilePath);
    if (contacts.some(c => c.name.toLowerCase() === contact.name.toLowerCase())) return console.log(`The name "${contact.name}" already exists.`);
    const validationError = validateContact(contact);
    if (validationError) return console.log(validationError);
    contacts.push(contact);
    saveData(contacts);
    console.log('Contact saved successfully.');
};

const selectContact = () => {
    const contacts = readJsonFile(dataFilePath);
    if (contacts.length === 0) return console.log('No contacts found.');
    console.log('Contacts:', contacts.map((c, i) => `${i + 1}. Name: ${c.name}, Mobile: ${c.mobile}`).join('\n'));
};

const updateContact = (name, updatedInfo) => {
    const contacts = readJsonFile(dataFilePath);
    const contact = contacts.find(c => c.name === name);
    if (!contact) return console.log(`Contact with name "${name}" not found.`);
    Object.assign(contact, updatedInfo);
    saveData(contacts);
    console.log(`Contact "${name}" updated successfully.`);
};

const getContactDetails = (name) => {
    const contacts = readJsonFile(dataFilePath);
    const contact = contacts.find(c => c.name === name);
    if (!contact) return console.log(`Contact with name "${name}" not found.`);
    console.log('Contact Details:', `Name: ${contact.name}`, `Email: ${contact.email || 'N/A'}`, `Mobile: ${contact.mobile}`);
};

const deleteContact = (name) => {
    let contacts = readJsonFile(dataFilePath);
    const initialLength = contacts.length;
    contacts = contacts.filter(c => c.name !== name);
    if (contacts.length === initialLength) return console.log(`Contact with name "${name}" not found.`);
    saveData(contacts);
    console.log(`Contact "${name}" deleted successfully.`);
};

module.exports = { saveContact, selectContact, updateContact, getContactDetails, deleteContact };
