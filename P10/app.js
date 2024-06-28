// app.j

const { app, port } = require('./koneksi');
const {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    validateEmail,
    validatehp
} = require('./fungsi');

// Routes
app.get('/', (req, res) => {
    res.render('index', { data: { title: 'Index', message: 'Show Navigation for more actions' } });
});

app.get('/about', (req, res) => {
    res.render('about', { data: { title: 'About' } });
});

app.get('/contact', async (req, res) => {
    try {
        const contacts = await getAllContacts();
        res.render('contact', { data: { title: 'Contact', message: 'Contact List', contact: contacts }, messages: req.flash('success') });
    } catch (error) {
        res.status(404).render('404', { data: { title: '404', message: error } });
    }
});

app.get('/add-contact', (req, res) => {
    res.render('forms', { data: { title: 'Contact', message: 'Add Contact' }, messages: req.flash('error') });
});

app.post('/contact/add', async (req, res) => {
    const { nama,hp, email } = req.body;

    if (!validateEmail(email)) {
        req.flash('error', 'Invalid email format');
        return res.redirect('/add-contact');
    }

    if (!validatehp(hp)) {
        req.flash('error', 'Invalid hp format');
        return res.redirect('/add-contact');
    }

    try {
        await createContact(nama,hp, email);
        req.flash('success', 'Contact added successfully');
        res.redirect('/contact');
    } catch (error) {
        req.flash('error', 'Failed to add contact');
        res.redirect('/add-contact');
    }
});

app.delete('/delete-contact/:id', async (req, res) => {
    const contactId = parseInt(req.params.id, 10);

    try {
        await deleteContact(contactId);
        req.flash('success', `Contact with ID ${contactId} deleted successfully`);
    } catch (error) {
        req.flash('error', `Failed to delete contact with ID ${contactId}`);
    }
    res.redirect('/contact');
});

app.get('/edit-contact/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const contact = await getContactById(id);

        if (!contact) {
            return res.status(404).render('404', { data: { title: '404', message: 'Contact not found' } });
        }

        res.render('forms', { data: { title: 'Contact', message: 'Edit Contact', contact }, messages: req.flash('error') });
    } catch (error) {
        res.status(500).render('500', { data: { title: '500', message: 'Internal Server Error' } });
    }
});

app.put('/contact/edit', async (req, res) => {
    const { id, nama,hp, email } = req.body;

    if (!validateEmail(email) || !validatehp(hp)) {
        req.flash('error', 'Invalid email or hp format');
        return res.redirect(`/edit-contact/${id}`);
    }

    try {
        await updateContact(id, nama,hp, email);
        req.flash('success', 'Contact updated successfully');
    } catch (error) {
        req.flash('error', 'Failed to update contact');
    }
    res.redirect('/contact');
});

app.get('/contact/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const contact = await getContactById(id);

        if (!contact) {
            return res.status(404).render('404', { data: { title: '404', message: 'Contact not found' } });
        }

        res.render('contact-details', { data: { title: 'Contact Details', message: 'Contact Details', contact } });
    } catch (error) {
        res.status(500).render('500', { data: { title: '400', message: 'Internal Server Error' } });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { data: { title: '404', message: 'Page Not Found' }, layout: 'layouts/error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
