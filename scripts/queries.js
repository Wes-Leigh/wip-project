/**
 * @file        queries.js
 * @description Handles the data collection off the server.
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
const { getConnection } = require('./connection');

async function fetchTableData(id = 0) {
    const connection = getConnection();
    let query = 'SELECT * FROM login WHERE ID = ' + id;
    if (id==0) {query = 'SELECT * FROM login'}
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

function updateRowData(updatedData) {
    const { ID, UserName, Password, isActive } = updatedData;
    const connection = getConnection();
    connection.query(
        'UPDATE login SET UserName = ?, Password = ?, isActive = ? WHERE ID = ?',
        [UserName, Password, isActive, ID],
        (err, results) => {
            if (err) throw err;
            console.log('Data updated successfully');
        }
    );
}

module.exports = {
    fetchTableData,
    updateRowData
};