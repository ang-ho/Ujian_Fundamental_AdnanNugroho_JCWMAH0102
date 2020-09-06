// Buat Segitiga Siku Kiri
let cetak1 = "";
for (let baris = 1; baris <= 5; baris++) {
  for (let kolom = 1; kolom <= baris; kolom++) {
    if (kolom % 2 == 0) {
      cetak1 += "# ";
    } else {
      cetak1 += "* ";
    }
    cetak1 += "";
  }
  cetak1 += "\n";
}
console.log(cetak1);

// Buat Segitiga Pyramid
let cetak2 = "";
for (let baris = 1; baris <= 5; baris++) {
  for (let kolom = 5; kolom >= baris; kolom--) {
    cetak2 += " ";
  }
  for (let k = baris; k >= 1; k--) {
    if (k % 2 == 0) {
      cetak2 += "# ";
    } else {
      cetak2 += "* ";
    }
    cetak2 += "";
  }
  cetak2 += "\n";
}
console.log(cetak2);

// Buat Segitiga Siku Kanan
let cetak3 = "";
for (let i = 1; i <= 5; i++) {
  for (let j = 4; j >= i; j--) {
    cetak3 += " ";
  }
  for (let k = i; k >= 1; k--) {
    if (k % 2 != 0) {
      cetak3 += "*";
    } else {
      cetak3 += "#";
    }
  }
  cetak3 += "\n";
}
console.log(cetak3);

// Buat Shape Persegi
let cetak4 = "";
for (let baris = 1; baris <= 5; baris++) {
  for (let kolom = 1; kolom <= 5; kolom++) {
    if (kolom % 2 == 0) {
      cetak4 += "# ";
    } else {
      cetak4 += "* ";
    }
    cetak4 += "";
  }
  cetak4 += "\n";
}
console.log(cetak4);
