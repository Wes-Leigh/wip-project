/**
 * @file        preload.js
 * @description This is for the security of the application only allowing certain exposure of files.
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

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchTableData: (id) => ipcRenderer.invoke('fetch-table-data', id),
    saveDetails: (updatedData) => ipcRenderer.send('save-details', updatedData),
    logInCheck: (userDetails) => ipcRenderer.invoke('log-in-user', userDetails),
    navigate: (view) => ipcRenderer.send('navigate', view)
});