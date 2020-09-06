let dbUser = [
    {
        username: "Admin",
        email: "admin@mail.com",
        password: "admin",
        role: "admin"
    },
    {
        username: "Adnan",
        email: "aldo@mail.com",
        password: "adnan",
        role: "user",
        belanja: []
    },
    {
        username: "Deden",
        email: "deden@mail.com",
        password: "deden",
        role: "user",
        belanja: []
    }
]

let dbProduk = [
    {
        id_produk: 1,
        nama_produk: "Jeruk",
        foto_produk: "https://jubi.co.id/wp-content/uploads/2020/06/Buah-jeruk-Tempo.co_.jpg ",
        desk_produk: "Warna Orange",
        stock_produk: 10,
        harga_produk: 5000
    },
    {
        id_produk: 2,
        nama_produk: "Mangga",
        foto_produk: "https://cf.shopee.co.id/file/24ee0aca50448191e93da0642c90466e ",
        desk_produk: "Manis Rasanya",
        stock_produk: 8,
        harga_produk: 8000
    },
    {
        id_produk: 3,
        nama_produk: "Alpukat",
        foto_produk: "https://ecs7.tokopedia.net/img/cache/700/product-1/2017/5/17/1651147/1651147_61e8a451-0f45-4c18-8a53-9aa7f6d296a6 ",
        desk_produk: "Hijau Warnanya",
        stock_produk: 20,
        harga_produk: 6000
    }
]

// let dbKeranjang = []
// let belanja = []

//Menampilkan fieldset sesuai dengan fieldSetID
document.getElementById("fieldRegister").style.display = "none"
document.getElementById("fieldLogin").style.display = "none"
document.getElementById("fieldTambahProduk").style.display = "none"
document.getElementById("fieldListProduk").style.display = "none"
document.getElementById("cart-page").style.display = "none"
document.getElementById("CheckOut").style.display = "none";

//Menampung untuk push database dari Form Registrasi
class DB_User {
    constructor(_username, _email, _password ) {
        this.username = _username;
        this.email = _email;
        this.password = _password;
        this.role = "user";
        this.belanja = [];
    }
}

//Menampung untuk push database dari Form Produk
class DB_Produk {
    constructor(_id_produk, _nama_produk, _foto_produk, _desk_produk, _stock_produk, _harga_produk,) {
        this.id_produk = _id_produk;
        this.nama_produk = _nama_produk;
        this.foto_produk = _foto_produk;
        this.desk_produk = _desk_produk;
        this.stock_produk = _stock_produk;
        this.harga_produk = _harga_produk;
    }
}

//Menampung untuk push database dari Keranjang
class DB_Belanja {
    constructor(_id, _foto, _nama_produk, _qty, _price) {
        this.id = _id;
        this.foto = _foto
        this.nama_produk = _nama_produk
        this.qty = _qty
        this.price = _price
        this.priceTotal = _price * _qty
    }
}

btMenu = (menu) => {
    if (menu == "regis") {
        document.getElementById("fieldRegister").style.display = "block"
        document.getElementById("fieldLogin").style.display = "none"
    } else if (menu == "login") {
        document.getElementById("fieldLogin").style.display = "block"
        document.getElementById("fieldRegister").style.display = "none"
    }
}

//Untuk Memberitahu Index berapa yang kita simpan
//Penampung index
let userLogin = null;
let belanja = [];
// Konfigurasi Button Keluar


btAddProduk = () => {
    let form = document.getElementById("formTambahProduk")
    console.log(dbProduk.length + 1, form.elements[0].value, form.elements[1].value, form.elements[2].value, form.elements[3].value, form.elements[4].value)

    if (form.elements[0].value == `` ||
        form.elements[1].value == `` ||
        form.elements[2].value == `` ||
        form.elements[3].value == `` ||
        form.elements[4].value == ``) {
        alert(`Lengkapi Data Anda`)
    } else {
        dbProduk.push(new DB_Produk(
            dbProduk.length + 1,
            form.elements[0].value,
            form.elements[1].value,
            form.elements[2].value,
            form.elements[3].value,
            form.elements[4].value,
        ))
        console.table(dbProduk)
        printProduk()
    }
}

printProduk = (idx, dataProduk = dbProduk) => {
    let tableElement = '';
    dataProduk.forEach((item, index) => {
        if (idx == index) {
            tableElement += `
            <tr>
            <td>${index + 1}</td>
            <td><input type="text" id="fotoBaru" value="${item.foto_produk}"/></td>
            <td><input type="text" id="namaBaru" value="${item.nama_produk}"/></td>
            <td><input type="text" id="deskBaru" value="${item.desk_produk}"/></td>
            <td><input type="text" id="stockBaru" value="${item.stock_produk}"/></td>
            <td><input type="text" id="hargaBaru" value="${item.harga_produk}"/></td>
            <td><button type="button" onclick="btSimpanProduk(${index})">Simpan </button><button type="button" onclick="printProduk()">Batal</button></td>
            </tr>
            `
        } else {
            tableElement += `
            <tr>
            <td>${index + 1}</td>
            <td><img src="${item.foto_produk}" width="120px"/></td>
            <td>${item.nama_produk}</td>
            <td>${item.desk_produk}</td>
            <td>${item.stock_produk}</td>
            <td>Rp. ${item.harga_produk}</td>
            <td>
            ${
                dbUser[userLogin].role == "user" ?
                    `<button type="button" onclick="btAddToChart(${index})" >Add to Chart </button>`
                    :
                    `<button type="button" onclick="btEditProduk(${index})">Edit </button><button type="button" onclick="btDeleteProduk()">Hapus</button></td>`
                }
            
            </tr>
            `
        }
    })
    document.getElementById("listProduk").innerHTML = tableElement
}
// printProduk()

// BUTTON TAMBAHAIN KE CHART DARI USER
btAddToChart = (idx) => {
    let qty = parseInt(prompt(`Masukkan Jumlahnya`))
    
    console.table(dbUser)
    if(dbProduk[idx].stock_produk < qty){
        alert(`Stock dari barang ${dbProduk[idx].nama_produk} Habis!`)
    } else{
        dbProduk[idx].stock_produk -= qty // MENGURANGI QTY
        dbUser[userLogin].belanja.push(new DB_Belanja(
            dbProduk[idx].id_produk, dbProduk[idx].foto_produk, dbProduk[idx].nama_produk, qty, dbProduk[idx].harga_produk, belanja,
        ))
    printKeranjang()
    printProduk() //REFRESH TAMPILAN SETELAH DIKURANGIN QTY NYA
    console.table(dbUser[userLogin].belanja)
    console.log(dbUser[userLogin].belanja)
    console.log(dbUser[userLogin].belanja)

    }
    
}

printKeranjang = () => {
    let tbElementCart = ""
    hargaTotal = 0
    dbUser[userLogin].belanja.forEach((item, index) => {
        tbElementCart += `
        <tr>
            <td>${index + 1}</td>
            <td><img src="${item.foto}" width="120px"/></td>
            <td>${item.nama_produk}</td>
            <td>${item.qty}</td>
            <td>${item.price}</td>
            <td>${item.priceTotal}</td>
            <td><button type="button" onclick="btEditQty(${index})">Edit</button>
            <button type="button" onclick="btDeleteKeranjang(${index})">Hapus</button></td>
        </tr>
        `
        hargaTotal += item.priceTotal
    })
    let tbCheckOut = `
    <tr>
        <td>Rp. ${hargaTotal}</td>
        <td><button type="button" onclick="btBayar()">Bayar</button></td>
    </tr>
    `;
    
    document.getElementById("listKeranjang").innerHTML = tbElementCart
    document.getElementById("ListCheckOut").innerHTML = tbCheckOut

    // let tbCheckOut = ""
    // dbKeranjang.forEach((item, index) => {
    //     tbCheckOut += `
    //     <tr>
    //         <td>${item.priceTotal}</td>
    //         <td><button type="button" onclick="btEditQty(${index})">Bayar</button></td>
    //     </tr>
    //     `
    // })
    
}
let hargaTotal
btBayar = () => {
    while(true){
    let uang = prompt(`Masukkan Uang Anda`)
    if(hargaTotal > uang){
        alert(`Uang Anda Kurang`)
        
    } else {
        alert(`Total Kembalian Anda Rp. ${uang-hargaTotal}`)
        alert(`Terima Kasih telah berbelanja di Tempat Kami`)
        hargaTotal = 0
        dbKeranjang.splice(idx, 1)
        printKeranjang()
        break

    }
    // let lagi = confirm('Ingin Berbelanja lagi?')
    //     if (!lagi) {
    //         break
    //     }
}

}

btDeleteKeranjang = (idx) => {
    let ind = dbProduk.findIndex((item) => item.id_produk == dbUser[belanja])
    dbProduk[ind].stock_produk += dbUser[belanja].qty
    dbUser[belanja].splice(idx, 1)
    printProduk()
    printKeranjang()
}

btDeleteProduk = (idx) => {
    dbProduk.splice(idx, 1)
    printProduk()
}

btEditProduk = (idx) => {
    console.log("Index Data:", idx)
    printProduk(idx)
}

btSimpanProduk = (idx) => {
    dbProduk[idx].foto_produk = document.getElementById("fotoBaru").value
    dbProduk[idx].nama_produk = document.getElementById("namaBaru").value
    dbProduk[idx].desk_produk = document.getElementById("deskBaru").value
    dbProduk[idx].stock_produk = parseInt(document.getElementById("stockBaru").value)
    dbProduk[idx].harga_produk = parseInt(document.getElementById("hargaBaru").value)
    printProduk()
}

btCariProduk = () => {
    // console.log(document.getElementById("cariProduk").value)
    let cariNamaProduk = document.getElementById("cariProduk").value
    let filterProduk = dbProduk.filter((item, index) => {
        let namaProdukLower = item.nama_produk.toLowerCase()
        let inputProdukLower = cariNamaProduk.toLowerCase()
        return namaProdukLower.includes(inputProdukLower)
    })
    // console.log(filterProduk)
    printProduk(null, filterProduk)
}

btCariStock = () => {
    let minStock = parseInt(document.getElementById("minStock").value)
    let maxStock = parsetInt(document.getElementById("maxStock").value)
    let cariStock = dbProduk.filter((item, index) => {
        return item.stock_produk >= minStock && item.stock_produk <= maxStock
    })

    printProduk(null, cariStock)
}

btCariHarga = () => {
    let minHarga = parseInt(document.getElementById("minHarga").value)
    let maxHarga = parsetInt(document.getElementById("maxHarga").value)
    let cariStock = dbProduk.filter((item, index) => {
        return item.harga_produk >= minHarga && item.harga_produk <= maxHarga
    })

    printProduk(null, cariStock)
}

btSortData = () => {
    let sortParam = document.getElementById("sortData").value
    let printSort = dbProduk.sort((a, b) => {
        if (sortParam == "namaAsc") {
            if (a.nama_produk < b.nama_produk) { return -1 }
            if (a.nama_produk > b.nama_produk) { return 1 }
            return 0
        } else if (sortParam == "hargaAsc" || sortParam == "hargaDsc") {
            return sortParam == "hargaAsc" ? a.harga_produk - b.harga_produk : b.harga_produk - a.harga_produk
        } else if (sortParam == "stockAsc" || sortParam == "stockDsc") {
            return sortParam == "stockAsc" ? a.stock_produk - b.stock_produk : b.stock_produk - a.stock_produk
        }
    })
    printProduk(null, printSort)
}

btEditQty = (idx) => {
    // console.table(dbUser[userLogin].belanja)
    // console.log(dbUser[userLogin].belanja[])
    let ind = dbProduk.findIndex((item) => {
        return item.id_produk == dbUser[userLogin].belanja
    })
    dbProduk[idx].stock_produk += dbUser[userLogin].belanja
    let editQty = parseInt(prompt("Qty", dbUser[userLogin].belanja[qty]))
    dbUser[userLogin].belanja[qty] = editQty
    // Merubah Total Harga
    dbUser[userLogin].belanja[qty] = dbUser[userLogin].belanja[price] * editQty
    dbProduk[ind].stock_produk -= editQty
    printProduk()
    printKeranjang()
}



// REGISTRASI LOGIN //

btRegis = () => {
    let form = document.getElementById("formRegister")
    console.log(form.elements[0].value, form.elements[1].value, form.elements[2].value)
    let pass = 4
    let cari = form.elements[0].value
    console.log("Ini Adalah Value Cari", cari)

    // Filter Database untuk Mencari Kesamaan Username pada Form
    let filterNama = dbUser.filter((item, index) => {
        let itemLower = item.username.toLocaleLowerCase()
        let inputLower = cari.toLocaleLowerCase()
        return itemLower.includes(inputLower)
    })

    // console.log("Ini Adalah Value Filter", filterNama)

    // Mengambil value dari form
    // DIPERHATIKAN APAKAH IF NYA SEJAJAR
    if (form.elements[0].value == `` || form.elements[1].value == `` || form.elements[2].value == ``) {
        alert(`Lengkapi Data Anda`)
    } else {
        // Proteksi nama Username dengan Form Registrasi
        if (cari.includes(filterNama)) {
            // Proteksi Email Salah
            if (form.elements[1].value.includes('@')) {
                if (form.elements[2].value.length <= pass) {
                    alert(`Password Minimal 4 Karakter`)
                } else {
                    dbUser.push(new DB_User(form.elements[0].value,
                        form.elements[1].value,
                        form.elements[2].value))
                    console.table(dbUser)
                }
            } else {
                alert(`Email Anda Salah`)
            }
        } else {
            alert(`Username "${cari}" Sudah Digunakan`)
        }
    } 

}

btLogin = () => {
    let getUsername = document.getElementById("loginUsername").value
    let getPassword = document.getElementById("loginPassword").value
    console.log("Cek Input Login:", getUsername, getPassword)

    if (document.getElementById("loginUsername").value == `` || document.getElementById("loginPassword").value == ``) {
        alert(`Lengkapi Data Anda`)
    } else {
        dbUser.forEach((item, index) => {
            //Item mewakili value dari arraynya
            if (item.username == getUsername && item.password == getPassword) {
                userLogin = index
                console.log(index)
                alert(`Selamat Datang "${getUsername}"`)
                document.getElementById("btLogOut").disabled = false
                document.getElementById("btLogIn").disabled = true
            }
        })
        if (userLogin != null) {
            // Ini adalah Admin sebagai
            if (dbUser[userLogin].role == "admin") {
                alert(`Kamu Adalah Admin`)
                document.getElementById("fieldTambahProduk").style.display = "block";
                document.getElementById("fieldListProduk").style.display = "block";
                document.getElementById("CheckOut").style.display = "none";
                printProduk()

            } else if (dbUser[userLogin].role == "user") {
                alert(`Kamu Adalah User`)
                document.getElementById("fieldListProduk").style.display = "block";
                document.getElementById("cart-page").style.display = "block";
                document.getElementById("fieldTambahProduk").style.display = "none";
                document.getElementById("CheckOut").style.display = "block";
                printProduk()
                printKeranjang()
            }

        } else {
            alert(`Maaf Akun Anda Belum Terdaftar`)
        }

    }
}

btLogout = () => {
    userLogin = null
    document.getElementById("btLogOut").disabled = true
    document.getElementById("btLogIn").disabled = false
    document.getElementById("fieldListProduk").style.display = "none";
    document.getElementById("cart-page").style.display = "none";
    document.getElementById("fieldTambahProduk").style.display = "none";
}