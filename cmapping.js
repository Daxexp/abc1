function getLocation() {
    if (!navigator.geolocation) {
        document.getElementById("status").innerText = "Geolocation is not supported by your browser.";
        return;
    }

    document.getElementById("status").innerText = "Getting location...";

    navigator.geolocation.getCurrentPosition(showPosition, showError);
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById("status").innerText = `Latitude: ${lat}, Longitude: ${lon}`;

    const map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup("You are here!")
        .openPopup();

    // Send location data to the server
    fetch('https://your-deployed-server-url/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitude: lat, longitude: lon })
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("status").innerText = "Permission denied. Please allow location access.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("status").innerText = "Location information unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("status").innerText = "Request timed out.";
            break;
        default:
            document.getElementById("status").innerText = "An unknown error occurred.";
            break;
    }
}
