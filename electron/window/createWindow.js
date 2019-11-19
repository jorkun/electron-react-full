const path = require('path')
const {BrowserWindow, Menu } = require('electron')
const { appIcon } = require('../../config/app.config')
const {port} = require('../../config/dev.config')

const urls = require('./window-urls')

const { NODE_ENV } = process.env

const windowList = {}

const {updateHandler} = require('../update/index.js');
const feedUrl = 'http://127.0.0.1:91/downloads/'; // 更新包位置


/**
 * 通过 window-urls.js 中的 key 得到 url
 * @param {String} urlKey
 */
function getWindowUrl(key) {
  let url, hash = urls[key], config = {}
  if (typeof hash === 'object') {
    config = hash.config || {}
    hash = hash.url
  }
  if (NODE_ENV === 'development') {
    url = `http://localhost:${port}#${hash}`
  } else {
    url = `file://${path.join(__dirname, '../../dist/index.html')}#${hash}`
  }
  return { url, config }
}

/**
 * 创建一个子窗口
 * @param {String} urlKey
 * @param {Object} BrowserWindowOptions
 * @param {Boolean} trayClick 是否托盘双击
 */
function createWindow(key, options = {}, trayClick) {

　// 隐藏菜单栏
  Menu.setApplicationMenu(null)

  if(trayClick && windowList) {
    let key = Object.keys(windowList)[0];
    if(key) {
      let w = windowList[Object.keys(windowList)[0]];
      w.show();
      return w;
    }
  }
  let win = windowList[key]
  if (windowList[key]) {
    win.show()
    return win
  }

  const { url, config } = getWindowUrl(key)
  let from
  if (options.from) {
    from = options.from
    delete options.from
  }

  const defaultOptions = {
    icon: appIcon,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    show: false,
    frame: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true
    },
    ...config
  }
  win = new BrowserWindow(Object.assign(defaultOptions, options))
  if (from) win.from = from
  windowList[key] = win
  win.loadURL(url)
  win.once('ready-to-show', () => {
    win.show()
    // 打开控制台
    // win.webContents.openDevTools()
  })

  win.on('close', () => {
    delete windowList[key]
  })
  // updateHandler(win, feedUrl);
  return win
}
module.exports = {
  createWindow,
  getWindowUrl,
  windowList
}