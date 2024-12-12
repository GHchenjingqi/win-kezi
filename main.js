const { app, BrowserWindow, Menu, globalShortcut } = require('electron')
const path = require('path')
const config = require('./config')
let mainWindow = null
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: 'icon.ico', // 确保路径正确
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            sandbox: true,                 // 启用沙箱
            allowRunningInsecureContent: false,  // 禁止运行不安全的内容
            webSecurity: true,             // 启用 web 安全性
            preload: path.join(__dirname, 'preload.js')  // 确保指向正确的预加载脚本路径
        },
        autoHideMenuBar: true,     // 自动隐藏菜单栏
    })
    // 如果确实需要设置拼写检查器，使用这些有效的语言代码
    mainWindow.webContents.session.setSpellCheckerLanguages(['en-US']) // 英语
    // 或者完全禁用拼写检查
    mainWindow.webContents.session.setSpellCheckerEnabled(false)
    // 加载 Vue 打包后的 index.html
    if(config.web){
        mainWindow.loadFile(path.join(__dirname, config.webEnter ))
    }else{
        mainWindow.loadFile(path.join(__dirname, config.appEnter))
    }
    // 创建本地快捷键菜单
    const menu = Menu.buildFromTemplate([
        {
            label: '', // 空标签
            submenu: [
                {
                    label: '',  // 空标签
                    accelerator: 'F12',
                    click: () => {
                        mainWindow.webContents.toggleDevTools()
                    }
                }
            ]
        }
    ])

    // 设置菜单
    Menu.setApplicationMenu(menu)
    // 如果是开发环境，打开开发者工具
    // mainWindow.webContents.openDevTools()
}

// 在 app ready 之前设置语言
app.on('ready', () => {
    // 如果需要设置其他语言相关配置，可以在这里设置
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
}) 