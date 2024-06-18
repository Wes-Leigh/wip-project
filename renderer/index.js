/**
 * @file        index.js
 * @description The renderer script for index.html as the main window for application.
 * @version     1.0.0
 * @date        2024-06-18
 * @modified    2024-06-18
 * @author      Wes-Leigh Viljoen
 * @contact     wesleighviljoen@gmail.com
 *
 * @license     TBA
 * 
 * @dependencies
 *   - electron: ^24.0.0
 *   - path: ^0.12.7
 * 
 * @notes
 *   Ensure that all required dependencies are installed before running this script.
 * 
 * @changelog
 *   - 1.0.0: Initial release.
 *   
 */

window.electronAPI.fetchTableData(0).then((data) => {
    displayTable(data);
});

function displayTable(data) {
    const tableBody = document.getElementById('table-body');
    data.forEach((row) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.ID}</td>
            <td>${row.UserName}</td>
            <td>${row.Password}</td>
            <td>${row.isActive}</td>
            <td><button type="button" class="btn btn-primary" onclick="loadDetailView(${row.ID})">View</button></td>
        `;
        tableBody.appendChild(tr);
    });
}

function loadDetailView(id) {
    window.electronAPI.navigate('detail.html');
    window.localStorage.setItem('rowID', id);
}