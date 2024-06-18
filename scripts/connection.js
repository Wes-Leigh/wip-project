/**
 * @file        connection.js
 * @description File handles the connection to the MySql server.
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
const mysql = require('mysql2');
let primaryConnection, backupConnection;

// We have two connections to the server as to avoid any issues with dns etc...
// TODO: Implement .env file @Wes-Leigh/@GavinCZA
function connectToPrimaryDatabase() {
    primaryConnection = mysql.createConnection({
        host: 'office-server',
        user: 'electronApp',
        password: '1ser@er5',
        database: 'linc_management',
        port: '3306',
        namedPlaceholders: true
    });

    primaryConnection.connect((err) => {
        if (err) {
            console.error('Failed to connect to primary database:', err);
            connectToBackupDatabase();
        } else {
            console.log('Connected to the primary MySQL database!');
        }
    });
}

// TODO: Implement .env file @Wes-Leigh/@GavinCZA
function connectToBackupDatabase() {
    backupConnection = mysql.createConnection({
        host: '100.113.125.14',
        user: 'electronApp',
        password: '1ser@er5',
        database: 'linc_management',
        port: '3306',
        namedPlaceholders: true
    });

    backupConnection.connect((err) => {
        if (err) throw err;
        console.log('Connected to the backup MySQL database!');
    });
}

function getConnection() {
    if (primaryConnection && primaryConnection.state !== 'disconnected') {
        return primaryConnection;
    } else if (backupConnection && backupConnection.state !== 'disconnected') {
        return backupConnection;
    } else {
        throw new Error('No database connection is available');
    }
}

module.exports = {
    connectToPrimaryDatabase,
    connectToBackupDatabase,
    getConnection
};