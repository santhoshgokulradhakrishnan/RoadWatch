const API_URL = "http://localhost:8080/api/potholes";

async function loadPotholes() {

    const response = await fetch(API_URL);

    const potholes = await response.json();

    const container =
        document.getElementById("potholeList");

    container.innerHTML = "";

    potholes.forEach(p => {

        container.innerHTML += `
            <div class="pothole-card">
                <h3>${p.roadName}</h3>
                <p>${p.description}</p>
                <p>Severity: ${p.severity}</p>
                <p>Status: ${p.status}</p>
                <p>Votes: ${p.votes}</p>
            </div>
        `;

    });

}

async function reportPothole() {

    const pothole = {

        roadName:
        document.getElementById("roadName").value,

        description:
        document.getElementById("description").value,

        severity:
        document.getElementById("severity").value
    };

    await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(pothole)
    });

    loadPotholes();

}

loadPotholes();