var map = L.map('map').setView([-23.30625393370716, -45.97175651174736], 12)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

function onMapClick(e) {
    console.log(e.latlng)
}

map.on('click', onMapClick)