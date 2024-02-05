const data = [
    ["id", "name", "age"],
    [1, "John Doe", 24],
    [2, "Jane Doe", 25],
]

const table = document.createElement('table');
document.getElementById('root').appendChild(table);

data.forEach((row, i) => {
    const tr = document.createElement('tr');
    table.appendChild(tr);

    row.forEach(cell => {
        const tce = document.createElement(i === 0 ? 'th' : 'td');
        tr.appendChild(tce);
        tce.textContent = cell;
    });
});