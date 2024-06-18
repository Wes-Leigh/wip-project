/**
 * @file        detail.js
 * @description Renderer for the details.html window.
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

//TODO: Need to refactor.
document.addEventListener('DOMContentLoaded', () => {
    const rowID = window.localStorage.getItem('rowID');
    if (rowID) {
        // Fetch data for the specific row (You may need to add a method to fetch a single row's data)
        fetchRowData(rowID).then((rowData) => {
            document.getElementById('ID').value = rowData[0].ID;
            document.getElementById('UserName').value = rowData[0].UserName;
            document.getElementById('Password').value = rowData[0].Password;
            document.getElementById('isActive').value = rowData[0].isActive;
        });
    }
});

function saveDetails() {
    const updatedData = {
        ID: document.getElementById('ID').value,
        UserName: document.getElementById('UserName').value,
        Password: document.getElementById('Password').value,
        isActive: document.getElementById('isActive').value
    };
    window.electronAPI.saveDetails(updatedData);
    window.electronAPI.navigate('index.html');
}

function fetchRowData(id) {
    return window.electronAPI.fetchTableData(id);
}