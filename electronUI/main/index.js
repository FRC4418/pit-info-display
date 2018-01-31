//Get the path module for use in naming
var {BrowserWindow} = require("electron");
var path = require("path");
var windowName = path.basename(__dirname);

module.exports = function() {
	windows.set(windowName,new BrowserWindow({
		fullscreen: true
	}));
	windows.get(windowName).loadURL(`file://${__dirname}/content/index.html`);
}
