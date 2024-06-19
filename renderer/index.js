/**
 * @file        index.js
 * @description Renderer file for Index.js
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
 * 
 * @notes
 *   
 * 
 * @changelog
 *      - 1.0.0: Initial release.
 *   
 */

function logIn() {
    const userDetails = {
        userName: document.getElementById('userName').value,
        password: document.getElementById('password').value
    };
    const userID = window.electronAPI.logInCheck(userDetails);
    console.log(userID);
    
    if ( userID > 0){
        console.log('log in');
        window.electronAPI.navigate('dashboard.html');
    }
    else{
        window.electronAPI.navigate('index.html');
        throw("Incorrect Details");
    }
    
}