const fs = require('fs').promises;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

(async () => {
  const name = await question('Tuliskan NAMA: ');
  const mobile = await question('Tuliskan no HP: ');
  const mail = await question('Tuliskan email: ');

  const contact = { name, mobile, mail };
  
  try {
    const file = await fs.readFile('test.json', 'utf8').catch(() => '[]');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    await fs.writeFile('test.json', JSON.stringify(contacts, null, 2));
    console.log('Terimakasih');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    rl.close();
  }
})();
