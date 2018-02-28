//Import some nodes
//Global so we don't have to continuously import it.
global.cfg = require(`${__dirname}/config.json`); //This will be where we store our team number and other required info
var electron = require("electron"), //This gets electron, the framework that we use to make this run natively.
	app = electron.app; //This gets the app object, which lets us control things like program events and chrome flags
//tba is the blue alliance API, which we will use to get data about the competition.
global.tba = new (require("tbav3"))(cfg.tbaKey);
//windows holds the BrowserWindow objects for each window. Window names within the map should be the same as the folder they are in
global.windows = new Map(); //We make this global so that any window can access itself and other windows

//When all the windows close, kill the process (so you don't have a million electron processes running in the background)
app.on("window-all-closed",function() {
	process.exit();
});

//When Chromium embedded is loaded, require modules
app.on("ready",function() {
	require(`${__dirname}/electronUI/main/index.js`)();
});
