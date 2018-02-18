/*
*
* If you are cringing right now as to why I am running this in electron and not
* creating a browser window, rest assured there is a reason. This script is
* intended to be fully automated so that you don't have to worry about stupid
* semantics, and therefore needs access to the electron environment so that it
* knows how to do stuff so that it can work. It is NOT however, interactive, and
* therefore simply logs to the console.
*
*/
//var electron = require("electron");
var fs = require("fs");
var abi = require("node-abi");
var spawn = require("child_process").spawn;

//Get some information about your environment
var arch = process.arch;
var platform = process.platform;
var electronVersion = process.versions.electron;
var vendor = `vendor/${platform}-${arch}-${abi.getAbi(electronVersion,"electron")}`

//Change directory to node-sass module folder
process.chdir(`${__dirname}/../node_modules/node-sass`);

//Check if we even need to build
if(fs.existsSync(vendor+"/binding.node")) process.exit();

//Rebuild node-sass with node-gyp
var gyp = spawn("node-gyp",["rebuild",`--target=${electronVersion}`,`--arch=${arch}`,"--dist-url=https://atom.io/download/electron"],{cwd: process.cwd()});
//Attach node-gyp to console so you don't have a heart attack when your computer's
//fans sound like a jet engine
gyp.stdout.on("data",function(data) {
	console.log(String(data));
});
gyp.stderr.on("data",function(data) {
	console.error(String(data));
});
//When finished rebuilding, do stuff
gyp.on("close",function() {
	//Make a directory for the binding.node file so node-sass can find it
	fs.mkdirSync(vendor);
	//Move binding.node to the vendor dir we just made
	fs.renameSync("build/Release/binding.node",vendor+"/binding.node");
	//Exit the process cause electron will hang if we don't
	process.exit();
});
