const fs = require('fs').promises;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name);
const isValidMobile = (mobile) => /^0\d{5,15}$/.test(mobile);
const isValidEmail = (mail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

const getValidatedInput = async (query, validationFunc, errorMessage) => {
  while (true) {
    const input = await question(query);
    if (validationFunc(input)) {
      return input;
    }
    console.log(errorMessage);
  }
};

(async () => {
  const name = await getValidatedInput('Tuliskan NAMA Anda: ', isValidName, 'Nama tidak valid. Harus berisi hanya huruf dan spasi.');
  const mobile = await getValidatedInput('Tuliskan no HP (7-15 digit angka dan dimulai dari 0): ', isValidMobile, 'Nomor HP tidak valid. Harus berisi 7-15 digit.');
  const mail = await getValidatedInput('Tuliskan email: ', isValidEmail, 'Email tidak valid.');

  const contact = { name, mobile, mail };

  try {
    const fileContent = await fs.readFile('test.json', 'utf8').catch(() => '[]');
    const contacts = fileContent.trim() ? JSON.parse(fileContent) : [];
    contacts.push(contact);
    await fs.writeFile('test.json', JSON.stringify(contacts, null, 2));
    console.log('Terimakasih Data Anda Sudah di simpan');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    rl.close();
  }
})();
