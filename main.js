/**
 * @file        main.js
 * @description Main process script for the Electron application. This script initializes the main application window and handles the main process lifecycle events.
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

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { connectToPrimaryDatabase } = require('./scripts/connection');
const { fetchTableData, updateRowData } = require('./scripts/queries');

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, // Recommended for security
            enableRemoteModule: false // Deprecated, ensure it's false
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'html', 'index.html'));
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    connectToPrimaryDatabase();
    createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});

ipcMain.handle('fetch-table-data', (event, id) => {
    return fetchTableData(id);
});

ipcMain.on('save-details', (event, updatedData) => {
    updateRowData(updatedData);
});

ipcMain.on('navigate', (event, view) => {
    mainWindow.loadFile(path.join(__dirname, 'html', view));
});