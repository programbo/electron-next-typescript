// Native
const { join } = require('path')
const { format } = require('url')

// Packages
const { BrowserWindow, app } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext({
    development: './build/renderer',
    production: './renderer'
  })

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  const url = isDev
    ? 'http://localhost:8000/start'
    : format({
        pathname: join(__dirname, '../renderer/start/index.html'),
        protocol: 'file:',
        slashes: true
      })

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)
