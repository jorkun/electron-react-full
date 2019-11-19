/**
 * @Author: Zhao Kunkun
 * @Date: 2019-10-11 16:59:04
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-10-11 17:08:11
 */

const {globalShortcut, ipcMain} = require('electron')
const ShortcutCapture = require('shortcut-capture')
let shortcutCapture = null;
// 初始化截图
const initCapture = ()=>{

    shortcutCapture = new ShortcutCapture()
    // 绑定快捷键
    globalShortcut.register('ctrl+shift+a', () => shortcutCapture.shortcutCapture());
    // 拿取截图后返回信息
    // shortcutCapture.on('capture', ({dataURL, bounds}) => console.log(dataURL, bounds));
    ipcMain.on('capture-screen', () => shortcutCapture.shortcutCapture())

}
module.exports = {initCapture, shortcutCapture};