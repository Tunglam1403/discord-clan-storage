async function loadItems() {
    const res = await fetch("/api/items");
    const data = await res.json();

    const table = document.getElementById("items-table");
    table.innerHTML = "";

    data.forEach(item => {
        table.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.type}</td>
            <td>${item.quantity}</td>
        </tr>
        `;
    });
}

loadItems();
