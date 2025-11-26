const data = JSON.parse(sessionStorage.getItem('donationData'));

// Summary
if (!data) {
    document.getElementById('summary').innerHTML = "<p>Data tidak ditemukan.</p>";
} else {
    document.getElementById('summary').innerHTML = `
        <div class="summary-item">Nama: <span>${data.name}</span></div>
        <div class="summary-item">Email: <span>${data.email}</span></div>
        <div class="summary-item">Telepon: <span>${data.phone}</span></div>
        <div class="summary-item">Jumlah Donasi: <span>Rp ${parseInt(data.amount).toLocaleString()}</span></div>
        <div class="summary-item">Metode Pembayaran: <span>${data.method.toUpperCase()}</span></div>
        ${data.message ? `<div class="summary-item">Pesan: <span>${data.message}</span></div>` : ''}
    `;
}

// Payment card
const qrContainer = document.getElementById('qrContainer');
const paymentNumber = document.querySelector('.payment-number span');
const paymentIcon = document.querySelector('.payment-number i');
const qrNote = document.getElementById('qrNote');

if (data) {
    let number = "";
    let color = "";
    let iconClass = "";

    switch(data.method) {
        case "gopay":
            number = "085657424907";
            color = "linear-gradient(135deg,#00b14f,#00ff88)";
            iconClass = "fab fa-google-pay";
            qrNote.innerText = "Gunakan aplikasi GoPay untuk transfer.";
            break;
        case "ovo":
            number = "08122223333";
            color = "linear-gradient(135deg,#7b2ff7,#f107a3)";
            iconClass = "fas fa-wallet";
            qrNote.innerText = "Gunakan aplikasi OVO untuk transfer.";
            break;
        case "bank":
            number = "123456789012 (BCA - MBG Foundation)";
            color = "linear-gradient(135deg,#ff6b35,#ff9a55)";
            iconClass = "fas fa-university";
            qrNote.innerText = "Transfer via bank sesuai nomor di atas.";
            break;
        default:
            number = "Nomor belum tersedia";
            color = "#ccc";
            iconClass = "fas fa-info-circle";
            qrNote.innerText = "";
    }

    qrContainer.style.background = color;
    paymentNumber.innerText = number;
    paymentIcon.className = iconClass;

    setTimeout(() => qrContainer.classList.add('visible'), 200);
}

// Copy button
document.getElementById('copyBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(paymentNumber.innerText).then(() => {
        alert('Nomor pembayaran berhasil dicopy!');
    });
});

// Finish button
document.getElementById('finishDonation').addEventListener('click', function() {
    alert("Terima kasih! Donasi ini hanya simulasi dan tidak memproses pembayaran apa pun.");
    sessionStorage.clear();
    window.location.href = "index.html";
});
