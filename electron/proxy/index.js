/**
 * @Author: Zhao Kunkun
 * @Date: 2019-11-15 16:58:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-11-15 16:59:04
 */

const { BrowserWindow, ipcMain, dialog, app } = require('electron');
// 用户设置proxy时更新session代理
ipcMain.on('set-proxy', (event, proxy, username, password) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.webContents.session.setProxy(
        {
            proxyRules: proxy
        },
        () => {
            dialog.showMessageBox({
                message: '代理设置成功:' + proxy
            });
        }
    );
    if(!username || !password) return;
    /* replace the username and password with your own credentials */
    app.on('login', function(event, webContents, request, authInfo, callback) {
        console.log('login event triggered');
        event.preventDefault();
        callback(username, password);
    });
});