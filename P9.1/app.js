const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const validator = require('validator'); // Import validator library

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { contacts: loadContacts() });
});

app.get('/add', (req, res) => {
    res.render('add-contact');
});

app.post('/add', (req, res) => {
    const { name, email, phone } = req.body;

    // Validate phone number
    if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
        return res.status(400).send('Invalid phone number format');
    }

    const contacts = loadContacts();
    contacts.push({ name, email, phone });

    saveContacts(contacts);

    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const contacts = loadContacts();
    const contact = contacts[id];

    res.render('edit-contact', { contact, id });
});

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;

    // Validate phone number
    if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
        return res.status(400).send('Invalid phone number format');
    }

    const contacts = loadContacts();
    contacts[id] = { name, email, phone };

    saveContacts(contacts);

    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const contacts = loadContacts();
    contacts.splice(id, 1);

    saveContacts(contacts);

    res.redirect('/');
});

// Helper functions
function loadContacts() {
    const contactsFilePath = path.join(__dirname, 'data', 'contacts.json');
    return JSON.parse(fs.readFileSync(contactsFilePath, 'utf8'));
}

function saveContacts(contacts) {
    const contactsFilePath = path.join(__dirname, 'data', 'contacts.json');
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
}

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
