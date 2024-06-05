var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


console.log("Kalkulator");
console.log("============");
console.log("1. Tambah(+)");
console.log("2. Kurang(-)");
console.log("3. Bagi(/)");
console.log("4. Kali(*)");

rl.question("Pilihan anda : " ,function(pilihan){
  console.log("Anda Memilih Menu  " + pilihan );
  rl.question("Masukan Bilangan pertama : " ,function(jawabanpertama){
   rl.question("Masukan Bilangan kedua : " ,function(jawabankedua){



         console.log("-----------------------------------------");
      console.log("Bilangan Pertama Anda  " + jawabanpertama );
      console.log("Bilangan Kedua Anda  " + jawabankedua );
         console.log("-----------------------------------------");
      if(pilihan == "1"){
       console.log("Hasilnya :" +(Int(jawabanpertama) + Int(jawabankedua)));
      }else if(pilihan == "2"){
       console.log("Hasilnya :" +(Int(jawabanpertama) - Int(jawabankedua)));
      }else if(pilihan == "3"){
       console.log("Hasilnya :" +(Int(jawabanpertama) / Int(jawabankedua)));
      }else if(pilihan == "4"){
       console.log("Hasilnya :" +(Int(jawabanpertama) * Int(jawabankedua)));
      }else{
        console.log("Pilihan anda tidak tersedia");
      }
       
     rl.close();
   });     
     });
});