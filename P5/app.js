const yargs = require('yargs');
const { saveContact, selectContact, updateContact, getContactDetails, deleteContact } = require('./Fungsi');


const addHandler = (argv) => saveContact({ name: argv.name, email: argv.email, mobile: argv.mobile });
const selectHandler = () => selectContact();
const updateHandler = (argv) => {
    const updatedInfo = { email: argv.email, mobile: argv.mobile, name: argv.newName };
    updateContact(argv.name, updatedInfo);
};
const getDetailsHandler = (argv) => getContactDetails(argv.name);
const deleteHandler = (argv) => deleteContact(argv.name);


yargs.command('Add', 'Add a new contact', {
    name: { describe: 'Contact Name', demandOption: true, type: 'string' },
    email: { describe: 'Contact Email', type: 'string' },
    mobile: { describe: 'Contact Mobile', demandOption: true, type: 'string' }
}, addHandler)
.command('List', 'Display all contacts', selectHandler)
.command('Update', 'Update contact information', {
    name: { describe: 'Existing Contact Name', demandOption: true, type: 'string' },
    newName: { describe: 'New Contact Name', type: 'string' },
    email: { describe: 'New Contact Email', type: 'string' },
    mobile: { describe: 'New Contact Mobile', type: 'string' }
}, updateHandler)
.command('Detail', 'Get contact details by name', {
    name: { describe: 'Contact Name', demandOption: true, type: 'string' }
}, getDetailsHandler)
.command('Delete', 'Delete contact by name', {
    name: { describe: 'Contact Name', demandOption: true, type: 'string' }
}, deleteHandler)
.parse();
