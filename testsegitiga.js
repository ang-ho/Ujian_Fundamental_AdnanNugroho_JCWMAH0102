let column = ""

// Segitiga Siku
// for (let i = 1;i <= 5; i++){
//     for (let j = 5; j >= i; j--){
//         column += "# "
//     }
//     column += "\n"
// }


let huruf = ["A","B","C","D","E","F","G","H","I","J"]
let isi = ''
// Segitiga Terbalik
for (let i = huruf[0];i <= huruf[9]; i++){
    
    for (let j = huruf[9]; j >= i; j--){
        isi += "A"
    }
    isi += "\n"
}

console.log(isi)