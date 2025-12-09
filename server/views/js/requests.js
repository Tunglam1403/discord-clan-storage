async function loadRequests() {
    const res = await fetch("/api/requests");
    const data = await res.json();

    const table = document.getElementById("requests-table");
    table.innerHTML = "";

    data.forEach(req => {
        table.innerHTML += `
        <tr>
            <td>${req.username}</td>
            <td>${req.itemName}</td>
            <td>${req.itemType}</td>
            <td>${new Date(req.date).toLocaleString()}</td>
            <td>
                <button class="btn-approve" onclick="approveRequest('${req.id}')">✔</button>
                <button class="btn-deny" onclick="denyRequest('${req.id}')">✖</button>
            </td>
        </tr>`;
    });
}

async function approveRequest(id) {
    await fetch(`/api/requests/approve/${id}`, { method: "POST" });
    loadRequests();
}

async function denyRequest(id) {
    await fetch(`/api/requests/deny/${id}`, { method: "POST" });
    loadRequests();
}

loadRequests();
