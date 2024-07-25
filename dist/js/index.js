feather.replace()

// menu click
function clickMenu() {
    const items = document.getElementById('items')
    const container = document.getElementById('container');

    items.classList.toggle('hidden');
    container.classList.toggle('w-12');
}

// Fungsi logout
const logout = document.getElementById('logout');
logout.addEventListener('click', function() {
    localStorage.removeItem('login');
});

// fungsi tampil data
let dataAja = [
    {
        nama: 'A',
        jenis: 'Ayam',
        jenisKategori: 'ayam',
        gambar: '../img/ayam-bakar.jpg',
        deskripsi: 'Nasi, ayam goreng paha, kangkung, acar, selada, tahu, dan tempe',
        harga: 23000
    },
    {
        nama: 'B',
        jenis: 'Ayam',
        jenisKategori: 'ayam',
        gambar: '../img/nasi-ayamjpg.jpg',
        deskripsi: 'Nasi, ayam bakar paha, mie goreng, acar, sambal, dan orek tempe',
        harga: 25000
    },
    {
        nama: 'C',
        jenis: 'Ayam',
        jenisKategori: 'ayam',
        gambar: '../img/nasiliwet.jpg',
        deskripsi: 'Nasi Liwet, ayam goreng paha, tempe, timun, selada, tahu, dan sambal',
        harga: 30000
    },
    {
        nama: 'D',
        jenis: 'Ayam',
        jenisKategori: 'ayam',
        gambar: '../img/ayam-d.jpg',
        deskripsi: 'Nasi, ayam bakar paha, mie goreng, acar, sambal, orek tempe dan teh manis',
        harga: 35000
    },
    {
        nama: 'A',
        jenis: 'Ikan',
        jenisKategori: 'ikan',
        gambar: '../img/ikan-bakar.jpg',
        deskripsi: 'Nasi, ikan bakar, sambal, dan salad',
        harga: 26500,
    },
    {
        nama: 'B',
        jenis: 'Ikan',
        jenisKategori: 'ikan',
        gambar: '../img/ikan-goreng.jpg',
        deskripsi: 'Nasi, ikan goreng, sayuran, kol, timun, tahu, dan pisang',
        harga: 28000,
    },
    {
        nama: 'C',
        jenis: 'Ikan',
        jenisKategori: 'ikan',
        gambar: '../img/ikan-c.jpg',
        deskripsi: 'Nasi, pecel lele, sambal, timun, telor balado dan orek tempel',
        harga: 30000,
    },
    {
        nama: 'D',
        jenis: 'Ikan',
        jenisKategori: 'ikan',
        gambar: '../img/ikan-d.jpg',
        deskripsi: 'Nasi, ikan salmon, sambal, dan salad',
        harga: 35000,
    }
]

localStorage.setItem('menuList', JSON.stringify(dataAja));

// convert mata uang
const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(number);
};

function getData() {
    let dataMenu = JSON.parse(localStorage.getItem("menuList")) || [];
    let dataAbisTambah = JSON.parse(localStorage.getItem("menuAja")) || [];
    return [...dataMenu, ...dataAbisTambah];
}

function readData(){
    let tabel = document.getElementById('body-table');
    let semuaData = getData();
    let element = '';

    semuaData.forEach(dataLocal => {
        element += `<tr>
            <td class="text-center">Paket ${dataLocal.nama}</td>
            <td class="text-center">${dataLocal.jenis}</td>
            <td>
                <img src="${dataLocal.gambar}" alt="gambar-menu" class="w-full">
            </td>
            <td>${dataLocal.deskripsi}</td>
            <td class="text-center">${rupiah(dataLocal.harga)}</td>
            <td>
                <div class="flex gap-x-2 justify-center">
                    <i data-feather="edit" onclick="goToEdit('${dataLocal.nama}','${dataLocal.jenis}')" class="text-blue-950 cursor-pointer"></i>
                    <i data-feather="trash" onclick="hapusData(this, '${dataLocal.nama}')" class="text-blue-950 cursor-pointer"></i>
                </div>
            </td>
        </tr>`;
    });

    // dataAbisTambah.forEach(dataLocal => {
    //     element += `<tr>
    //         <td class="text-center">Paket ${dataLocal.nama}</td>
    //         <td class="text-center">${dataLocal.jenis}</td>
    //         <td>
    //             <img src="${dataLocal.gambar}" alt="gambar-menu" class="w-full">
    //         </td>
    //         <td>${dataLocal.deskripsi}</td>
    //         <td class="text-center">${rupiah(dataLocal.harga)}</td>
    //         <td>
    //             <div class="flex gap-x-2 justify-center">
    //                 <i data-feather="edit" onclick="goToEdit('${dataLocal.nama}','${dataLocal.jenis}')" class="text-blue-950 cursor-pointer"></i>
    //                 <i data-feather="trash" onclick="hapusData(this, '${dataLocal.nama}')" class="text-blue-950 cursor-pointer"></i>
    //             </div>
    //         </td>
    //     </tr>`;
    // });


    tabel.innerHTML = element;
    feather.replace()
}

// fungsi megarah edit data
function goToEdit(nama, jenis) {
    window.location.href = `edit.html?nama=${encodeURIComponent(nama)}&jenis=${encodeURIComponent(jenis)}&page=edit`;
}

// Fungsi hapus data
function hapusData(element, namaMenu) {
    let row = element.closest('tr');
    row.remove();

    let dataMenu = JSON.parse(localStorage.getItem("menuList"));
    let index = dataMenu.findIndex(item => item.nama === namaMenu);
    if (index !== -1) {
        dataMenu.splice(index, 1); 
        localStorage.setItem("menuList", JSON.stringify(dataMenu));
    }

    let indexAja = dataAja.findIndex(item => item.nama === namaMenu);
    if (indexAja !== -1) {
        dataAja.splice(indexAja, 1); 
    }
}

// tambah data
function tambahData(event) {
    event.preventDefault();

    const namaPaket = document.getElementById('namaPaket').value;
    const deskripsi = document.getElementById('deskripsi').value;
    const jenisMenu = document.getElementById('jenisMenu').value;
    const harga = document.getElementById('harga').value;
    const file = document.getElementById('file').files[0];

    // Konversi gambar ke base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        const base64String = reader.result;

        const menu = {
            nama: namaPaket,
            jenis: jenisMenu,
            jenisKategori: jenisMenu.toLowerCase(),
            deskripsi: deskripsi,
            gambar: base64String,
            harga: parseInt(harga),
        };

        const menuBaru = JSON.parse(localStorage.getItem("menuAja")) || [];
        menuBaru.push(menu);
        localStorage.setItem('menuAja', JSON.stringify(menuBaru));

        window.location.href = 'menu.html';
    };
}

// Event listener untuk form tambah-menu
document.getElementById('tambah-menu').addEventListener('submit', tambahData);

// edit data
let gambarTetap = '';

function fillEditForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const nama = urlParams.get('nama');
    const jenis = urlParams.get('jenis');

    if (nama && jenis) {
        const semuaData = getData();
        const item = semuaData.find(dataLocal => dataLocal.nama === nama && dataLocal.jenis === jenis);

        if (item) {
            document.getElementById('namaPaket').value = item.nama;
            document.getElementById('deskripsi').value = item.deskripsi;
            document.getElementById('jenisMenu').value = item.jenis;
            document.getElementById('harga').value = item.harga;
            gambarTetap = item.gambar;
        }
    }
}

// Fungsi untuk menyimpan perubahan pada form edit
function simpanPerubahan(event) {
    event.preventDefault();

    const namaPaket = document.getElementById('namaPaket').value;
    const deskripsi = document.getElementById('deskripsi').value;
    const jenisMenu = document.getElementById('jenisMenu').value;
    const harga = document.getElementById('harga').value;
    const file = document.getElementById('file').files[0];

    const processSave = (base64String) => {
        const menu = {
            nama: namaPaket,
            jenis: jenisMenu,
            jenisKategori: jenisMenu.toLowerCase(),
            deskripsi: deskripsi,
            gambar: base64String,
            harga: parseInt(harga),
        };

        let menuList = JSON.parse(localStorage.getItem("menuList")) || [];
        let menuAja = JSON.parse(localStorage.getItem("menuAja")) || [];

        // Update data pada menuList jika ditemukan
        let index = menuList.findIndex(item => item.nama === menu.nama && item.jenis === menu.jenis);
        if (index !== -1) {
            menuList[index] = menu;
            localStorage.setItem('menuList', JSON.stringify(menuList));
        }

        // Update data pada menuAja jika ditemukan
        let indexAja = menuAja.findIndex(item => item.nama === menu.nama && item.jenis === menu.jenis);
        if (indexAja !== -1) {
            menuAja[indexAja] = menu;
            localStorage.setItem('menuAja', JSON.stringify(menuAja));
        }

        window.location.href = 'menu.html';
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            processSave(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        processSave(gambarTetap); 
    }
}

document.getElementById('editMenu').addEventListener('submit', simpanPerubahan);

// cek status login
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('login');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    if (page === 'edit') {
        fillEditForm();
    } else {
        readData();
    }
});