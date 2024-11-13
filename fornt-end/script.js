// Fungsi untuk mengambil data dari API dan menampilkannya
async function fetchData() {
    try {
        const response = await fetch('http://localhost/rest-suhu/get.php');
        const data = await response.json();

        // Menampilkan data summary
        document.getElementById('suhuMax').textContent = data.suhumax;
        document.getElementById('suhuMin').textContent = data.suhumin;
        document.getElementById('suhuRata').textContent = data.suhurata;

        // Menyiapkan data untuk grafik
        const labels = data.nilai_suhu_max_humid_max.map(item => item.ts);
        const suhuData = data.nilai_suhu_max_humid_max.map(item => parseFloat(item.suhu));
        const humidData = data.nilai_suhu_max_humid_max.map(item => parseFloat(item.humid));

        // Membuat grafik suhu menggunakan Chart.js
        const ctx = document.getElementById('suhuChart').getContext('2d');
        new Chart(ctx, {
            type: 'line', // Tipe grafik: garis
            data: {
                labels: labels, // Label sumbu x (timestamp)
                datasets: [
                    {
                        label: 'Suhu (°C)',
                        data: suhuData,
                        borderColor: 'rgba(255, 99, 132, 1)', // Warna garis suhu
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.3 // Untuk membuat garis menjadi sedikit melengkung
                    },
                    {
                        label: 'Humidity (%)',
                        data: humidData,
                        borderColor: 'rgba(54, 162, 235, 1)', // Warna garis humidity
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Timestamp'
                        },
                        ticks: {
                            maxTicksLimit: 10 // Membatasi jumlah label waktu agar tidak terlalu rapat
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Nilai'
                        },
                        beginAtZero: true
                    }
                }
            }
        });

        // Menampilkan data mount_year_max
        const mountYearList = document.getElementById('mountYearList');
        data.mount_year_max.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.mount_years;
            mountYearList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Memanggil fungsi fetchData saat halaman dimuat
window.onload = fetchData;