const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Tuliskan NAMA: ', (name) => {
  rl.question('Tuliskan no HP: ', (mobile) => {
    rl.question('Tuliskan email: ', (mail) => {
    const contact = { name, mobile,mail };
    let contacts = [];

    // Check if the contacts file exists111111
    if (fs.existsSync('contacts.json')) {
      const file = fs.readFileSync('contacts.json', 'utf8');
      contacts = JSON.parse(file);
    }

    contacts.push(contact);
    fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));

    console.log('Terimakasih');

    rl.close();
  });
});
});