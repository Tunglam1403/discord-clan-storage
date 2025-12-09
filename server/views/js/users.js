async function loadUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();

    const table = document.getElementById("users-table");
    table.innerHTML = "";

    data.forEach(user => {
        table.innerHTML += `
        <tr>
            <td>${user.username}</td>
            <td>${user.discordId}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn-deny" onclick="deleteUser('${user.id}')">🗑</button>
            </td>
        </tr>
        `;
    });
}

async function deleteUser(id) {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    loadUsers();
}

loadUsers();
