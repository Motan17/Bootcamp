const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout

  });
  

  let nama = ""
  readline.question('NAMA :', name => 
  readline.question('JABATAN :', jabatan =>
  readline.question('Tuliskan angka A  :', data1  =>
  readline.question('Tuliskan angka B :', data2 =>
  {
    let num1 = parseInt(data1,10)
    let num2 = parseInt(data2,10)
      let data3 =num1+num2;
    console.log(`Hallo, nama saya ${name},` );
    console.log(`Saya bekerja sebagai ${jabatan} di Sekretariat BPK Penabur Jakarta`);
    console.log(`Angka A ${data1} + Angka ${data2}= ${data3}`);
    readline.close();
  }))));
  