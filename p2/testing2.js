const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout

  });
  const fs = require ('fs');


  
  

  let nama = ""
  readline.question('Tuliskan NAMA :', name => 
  readline.question('Tuliskan JABATAN :', jabatan =>
  {
   
    console.log(`Hallo, nama saya ${name},` );
    console.log(`Saya bekerja sebagai ${jabatan} di Sekretariat BPK Penabur Jakarta`);

      fs.writeFileSync('test2.txt',`${ name + jabatan}`);
  
    readline.close();
  }));
    
 