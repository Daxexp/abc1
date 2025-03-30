let map;
let marker;

function startTracking() {
    if (!navigator.geolocation) {
        document.getElementById("status").innerText = "Geolocation is not supported by your browser.";
        return;
    }

    document.getElementById("status").innerText = "Tracking live location...";

    navigator.geolocation.watchPosition(updatePosition, showError, {
        enableHighAccuracy: true,
        maximumAge: 0
    });
}

function updatePosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    if (!map) {
        map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        marker = L.marker([lat, lon]).addTo(map)
            .bindPopup("Fetching location...").openPopup();
    } else {
        map.setView([lat, lon], 13);
        marker.setLatLng([lat, lon]);
    }

    // Get location name
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
        .then(response => response.json())
        .then(data => {
            const locationName = data.display_name || "Unknown location";
            document.getElementById("status").innerText = `You are in: ${locationName}`;
            marker.bindPopup(locationName).openPopup();
        })
        .catch(() => {
            document.getElementById("status").innerText = `Latitude: ${lat}, Longitude: ${lon}`;
        });
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
