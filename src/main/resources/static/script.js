const API_URL = "http://localhost:8080/api/potholes";

let latitude = null;
let longitude = null;

let map;
let markers = [];

let uploadedImage = "";

/* ===========================
   MAP
=========================== */

function initMap() {

    map = L.map('map').setView([12.823, 80.044], 12);

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; OpenStreetMap contributors'
        }
    ).addTo(map);

}

/* ===========================
   LOAD POTHOLES
=========================== */

async function loadPotholes() {

    const response = await fetch(API_URL);

    const potholes = await response.json();

    const container =
        document.getElementById("potholeList");

    container.innerHTML = "";

    // Remove old markers

    markers.forEach(marker => {
        map.removeLayer(marker);
    });

    markers = [];

    potholes.forEach(p => {

        container.innerHTML += `
            <div class="pothole-card">

                <h3>${p.roadName}</h3>

                <p>${p.description}</p>

                ${
                    p.imageUrl
                    ?
                    `<img
                    src="/uploads/potholes/${p.imageUrl}"
                    class="pothole-image">`
                    :
                    ""
                }

                <p>
                Severity:
                <span class="${p.severity.toLowerCase()}">
                    ${p.severity}
                </span>
            </p>

            <p>Status: ${p.status}</p>

            <p>Votes: 👍 ${p.votes}</p>

        </div>
    `;

        // Add marker if coordinates exist

        if (p.latitude && p.longitude) {

            const marker = L.marker([
                p.latitude,
                p.longitude
            ]).addTo(map);

            marker.bindPopup(
                `
                <b>${p.roadName}</b><br>
                ${p.description}<br>
                Severity: ${p.severity}<br>
                Status: ${p.status}<br>
                Votes: ${p.votes}
                `
            );

            markers.push(marker);
        }

    });

    // Dashboard Stats

    document.getElementById("totalReports")
        .innerText = potholes.length;

    document.getElementById("reportedCount")
        .innerText =
        potholes.filter(
            p => p.status === "REPORTED"
        ).length;

    document.getElementById("fixedCount")
        .innerText =
        potholes.filter(
            p => p.status === "FIXED"
        ).length;

}

/* ===========================
   GPS LOCATION
=========================== */

function getLocation() {

    navigator.geolocation.getCurrentPosition(

        function(position) {

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            document.getElementById("locationText")
                .innerText =
                `📍 Latitude: ${latitude.toFixed(6)}
Longitude: ${longitude.toFixed(6)}`;

        },

        function(error) {

            alert("Location access denied");

        }

    );

}

/* ===========================
   REPORT POTHOLE
=========================== */

async function reportPothole() {

    const file =
        document.getElementById(
            "imageFile"
        ).files[0];

    if(file){

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        const uploadResponse =
            await fetch(
                API_URL + "/upload",
                {
                    method:"POST",
                    body:formData
                }
            );

        uploadedImage =
            await uploadResponse.text();
    }

    const pothole = {

        roadName:
        document.getElementById("roadName").value,

        description:
        document.getElementById("description").value,

        severity:
        document.getElementById("severity").value,

        latitude: latitude,

        longitude: longitude,

        imageUrl: uploadedImage
    };

    await fetch(
        API_URL,
        {
            method:"POST",
            headers:{
                "Content-Type":
                    "application/json"
            },
            body:JSON.stringify(
                pothole
            )
        }
    );

    loadPotholes();
}

/* ===========================
   PAGE LOAD
=========================== */

window.onload = () => {

    initMap();

    loadPotholes();

};