
const {app } = require('electron')
const { creatTray } = require('./tray')
const {createWindow} = require('./window')
const {initCapture} = require('./screenshot')

const { NODE_ENV } = process.env
let tray = null;
global.$api = require('./api')
global.$service= require('./service')
global.$proxy = require('./proxy');

if (NODE_ENV === 'development') {
  // react-developer-tools
  require('electron-debug')({ showDevTools: false })
  app.on('ready', () => {

    let installExtension = require('electron-devtools-installer')
    installExtension.default(installExtension.REACT_DEVELOPER_TOOLS).then(() => {
    }).catch(err => {
      console.log('Unable to install `react-developer-tools`: \n', err)
    })
  })
}

// 忽略证书相关错误
app.commandLine.appendSwitch('ignore-certificate-errors')
app.on('ready', () => {
  tray = creatTray()
  initCapture();
  createWindow('main')
  // globalShortcut.unregister("F12");
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  if(process.platform === 'win32' && tray) {
    tray.destroy()
  }
})


