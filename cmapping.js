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

    // Use Google Maps Geocoding API for accurate location name
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=YOUR_GOOGLE_MAPS_API_KEY`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "OK") {
                const locationName = data.results[0].formatted_address;
                document.getElementById("status").innerText = `📍 You are at: ${locationName}`;
            } else {
                document.getElementById("status").innerText = `Latitude: ${lat}, Longitude: ${lon}`;
            }

            // Display OpenStreetMap
            const map = L.map('map').setView([lat, lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            L.marker([lat, lon]).addTo(map)
                .bindPopup(`📍 You are here!`)
                .openPopup();
        })
        .catch(() => {
            document.getElementById("status").innerText = `Latitude: ${lat}, Longitude: ${lon}`;
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("status").innerText = "❌ Permission denied. Please allow location access.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("status").innerText = "⚠️ Location information unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("status").innerText = "⏳ Request timed out.";
            break;
        default:
            document.getElementById("status").innerText = "❓ An unknown error occurred.";
            break;
    }
}
