const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout

  });
  

  let nama = ""
  readline.question('Tuliskan NAMA :', name => 
  readline.question('Tuliskan JABATAN :', jabatan =>
  {
   
    console.log(`Hallo, nama saya ${name},` );
    console.log(`Saya bekerja sebagai ${jabatan} di Sekretariat BPK Penabur Jakarta`);
   
    readline.close();
  }));
  