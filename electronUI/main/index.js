//Get the path module for use in naming
var {BrowserWindow, ipcMain} = require("electron");
var path = require("path");
var windowName = path.basename(__dirname);

module.exports = function() {
	windows.set(windowName,new BrowserWindow({
		fullscreen: false,
		show: false
	}));
	windows.get(windowName).loadURL(`file://${__dirname}/content/index.html`);
	ipcMain.on("status",function(e,arg) {
		if(arg=="everything-is-loaded") {
			windows.get(windowName).setFullScreen(true);
			windows.get(windowName).show();
		}
	});
}
