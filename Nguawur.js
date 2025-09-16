// Data awal
let uang = 100000;
let inventory = {
    'Beras': 10,
    'Minyak': 10,
    'Indomie': 10,
    'Telur': 10,
};
let hargaBarang = {
    'Beras': 12000,
    'Minyak': 17000,
    'Indomie': 3500,
    'Telur': 2200,
};
let log = [];
let pelanggan = null;

// Membuat pelanggan random
function buatPelanggan() {
    const barangList = Object.keys(hargaBarang);
    let beli = {};
    let banyakBarang = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < banyakBarang; i++) {
        let barang = barangList[Math.floor(Math.random() * barangList.length)];
        beli[barang] = Math.floor(Math.random() * 3) + 1;
    }
    return beli;
}

// Tampilkan status game
function tampilStatus() {
    document.getElementById('status').innerHTML =
        `<b>Uang:</b> Rp${uang.toLocaleString()}<br>`;
}

// Tampilkan inventory
function tampilInventory() {
    let str = '<b>Stok Barang:</b><br>';
    for (let barang in inventory) {
        str += `${barang}: ${inventory[barang]}<br>`;
    }
    document.getElementById('inventory').innerHTML = str;
}

// Tampilkan log
function tampilLog() {
    document.getElementById('log').innerHTML =
        '<b>Log:</b><br>' + log.slice(-8).join('<br>');
}

// Tampilkan pelanggan
function tampilPelanggan() {
    if (!pelanggan) {
        document.getElementById('customer').innerHTML = '';
        document.getElementById('actions').innerHTML =
            '<button onclick="nextCustomer()">Layani Pelanggan Berikutnya</button>';
        return;
    }
    let str = '<b>Pelanggan ingin beli:</b><br>';
    for (let barang in pelanggan) {
        str += `${barang}: ${pelanggan[barang]}<br>`;
    }
    document.getElementById('customer').innerHTML = str;
    document.getElementById('actions').innerHTML =
        '<button onclick="prosesTransaksi()">Layani & Proses</button> ' +
        '<button onclick="tolakCustomer()">Tolak Pelanggan</button>';
}

// Proses transaksi
function prosesTransaksi() {
    let total = 0;
    let gagal = [];
    for (let barang in pelanggan) {
        if (inventory[barang] >= pelanggan[barang]) {
            total += hargaBarang[barang] * pelanggan[barang];
        } else {
            gagal.push(barang);
        }
    }
    if (gagal.length > 0) {
        log.push(`Transaksi gagal! Stok kurang untuk: ${gagal.join(', ')}`);
    } else {
        for (let barang in pelanggan) {
            inventory[barang] -= pelanggan[barang];
        }
        uang += total;
        log.push(`Transaksi berhasil! Pendapatan: Rp${total.toLocaleString()}`);
    }
    pelanggan = null;
    render();
}

// Lewati pelanggan
function tolakCustomer() {
    log.push('Pelanggan pergi tanpa membeli apapun.');
    pelanggan = null;
    render();
}

// Pelanggan baru
function nextCustomer() {
    pelanggan = buatPelanggan();
    render();
}

// Render semua
function render() {
    tampilStatus();
    tampilInventory();
    tampilLog();
    tampilPelanggan();
}

// Inisialisasi game
render();
