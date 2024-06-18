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

// TODO: @Wes-Leigh - Make a config file/encrypted file that contains all the SQL statments and we can call a predifined SQLs????? maybe even look at stored procedures......

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
    const connection = getConnection();
    const { ID, UserName, Password, isActive } = updatedData;
    connection.query(
        'UPDATE login SET UserName = ?, Password = ?, isActive = ? WHERE ID = ?',
        [UserName, Password, isActive, ID],
        (err, results) => {
            if (err) throw err;
            console.log('Data updated successfully');
        }
    );
}

/* This is a general purpose select function that returns data from the database.  
 * @date 2024-06-18
 * table = the table you want to update in the database
 * data = [column name, value]
*/ 
function selectAllQuery(table, data = ['null', 0]) {
    const connection = getConnection();
    const query = "SELECT * FROM " + table;
    // Data cannot be longer than 2 fields.
    //TODO: @Wes-Leigh - Need to tighten up checks here to make sure we dont abuse this too much.
    //TODO: @Wes-Leigh - Possibly add in more than just two for multiple checks.
    // Question: @Wes-Leigh - Maybe rather have a way to select from a list of predterimend selects.
    if (data.length > 2) throw (err);
    if (data[0] != 'null') query += " WHERE " + data[0] + " = " + data[1];
    connection.query(
        query,
        (err, results) => {
            if (err) throw err;
            console.log('Data updated successfully');
        }
    );
}

// selectUser stored procedure
async function selectUser(userID) {
    
    const connection = getConnection();
    
    const results = await connection.execute('CALL selectUser(:userID)', { userID });

    console.log("Stored procedure called successfully!");
    console.log("results:", results);

    if (Array.isArray(results) && results.length >= 2) {
        const [rows, fields] = results;
        console.log("Rows:", rows);
        console.log("Fields:", fields);
    }
}

// function selectUser(userID = 0) {
//     const connection = getConnection();
//     try {
//         // Call the stored procedure
//         const query = 'CALL selectUser(2)';
//         const rows = connection.query(query);
//         console.log("Stored procedure called successfully!");
//         console.log("Rows:", rows[0]);
//     } catch (error) {
//         console.error('Error calling stored procedure:', error);
//     } finally {
//     }
// }

module.exports = {
    fetchTableData,
    updateRowData,
    selectUser
};