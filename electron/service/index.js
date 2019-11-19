// const { syncReplyService, asyncReplyService, asyncOnceReplyService } = require('./utils')
// const { SyncPing, AsyncPing, AsyncOncePing } = require('../endpoints')

// syncReplyService(SyncPing, () => {
//     return 'pong'
// })

// asyncReplyService(AsyncPing, () => {
//     return 'async pong'
// })

// asyncOnceReplyService(AsyncOncePing, async (event, arg) => {
//     return 'async once pong'
// })
const fs = require('fs');
const os = require('os');
const path = require('path');
const { BrowserWindow, ipcMain, dialog } = require('electron');


ipcMain.on('print-to-pdf', (event) => {
  const pdfPath = path.join(os.tmpdir(), 'report.pdf')
  const win = BrowserWindow.fromWebContents(event.sender)
  // 使用默认打印参数
  win.webContents.printToPDF({
  marginsType:2,
  pageSize: 'A4',
  landscape: true,
  printSelectionOnly: false,
  printBackground: true
  }, (error, data) => {
    if (error) {
      dialog.showErrorBox('导出失败', error)
    }
    fs.writeFile(pdfPath, data, (error) => {
      if (error) {
        dialog.showErrorBox('导出失败', '文件被其他应用占用')
      }
      // shell.showItemInFolder(`file://${pdfPath}`)
      // event.sender.send('wrote-pdf', pdfPath)
      win.loadURL('file://' + pdfPath)
    })
  })

})
