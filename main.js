/**
 * @file        main.js
 * @description Main process script for the Electron application. This script initializes the main application window and handles the main process lifecycle events.
 * @version     1.0.2
 * @date        2024-06-18
 * @modified    2024-06-18
 * 
 * @author      Wes-Leigh Viljoen
 * @contact     wesleighviljoen@gmail.com
 * 
 * @author      Gavin Coertzen
 * @contact     gcoertzen@gmail.com
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
 *      - 1.0.0: Initial release.
 *      - 1.0.1: Added the monkey's name
 *      - 1.0.2: Fixed header of the file to be inline with standards.
 *   
 */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { connectToPrimaryDatabase } = require('./scripts/connection');
const { fetchTableData, updateRowData } = require('./scripts/queries');

let mainWindow;

// TODO: @GavinCZA can we make this able to load from a config file. I can give example of file for you.
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 1000,
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