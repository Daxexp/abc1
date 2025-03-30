function getLocation() {
    const statusElement = document.getElementById("status");

    if (!navigator.geolocation) {
        statusElement.innerText = "Geolocation is not supported by your browser.";
        return;
    }

    statusElement.innerText = "Getting location...";

    navigator.geolocation.getCurrentPosition(showPosition, showError);
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetchLocationName(lat, lon)
        .then(locationName => {
            updateStatus(`📍 You are at: ${locationName}`, lat, lon);
        })
        .catch(() => {
            updateStatus(`Latitude: ${lat}, Longitude: ${lon}`, lat, lon);
        });
}

function fetchLocationName(lat, lon) {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Consider fetching this from an environment variable or secure endpoint
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === "OK") {
                return data.results[0].formatted_address;
            } else {
                throw new Error('Geocoding failed');
            }
        });
}

function updateStatus(message, lat, lon) {
    const statusElement = document.getElementById("status");
    statusElement.innerText = message;

    // Display OpenStreetMap
    const map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup(`📍 You are here!`)
        .openPopup();
}

function showError(error) {
    const statusElement = document.getElementById("status");
    let message;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "❌ Permission denied. Please allow location access.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "⚠️ Location information unavailable.";
            break;
        case error.TIMEOUT:
            message = "⏳ Request timed out.";
            break;
        default:
            message = "❓ An unknown error occurred.";
            break;
    }
    statusElement.innerText = message;
}
