var electron = require("electron");
//var os = require("os");
var fs = require("fs");
var abi = require("node-abi");
var spawn = require("child_process").spawn;

var arch = process.arch;
var platform = process.platform;
var electronVersion = process.versions.electron;
var vendor = `vendor/${platform}-${arch}-${abi.getAbi(electronVersion,"electron")}`

process.chdir(`${__dirname}/../node_modules/node-sass`);
//console.log(process.cwd());
//console.log(String(execSync("which node-gyp")));
var gyp = spawn("node-gyp",["rebuild",`--target=${electronVersion}`,`--arch=${arch}`,"--dist-url=https://atom.io/download/electron"],{cwd: process.cwd()});
gyp.stdout.on("data",function(data) {
	console.log(String(data));
});
gyp.stderr.on("data",function(data) {
	console.error(String(data));
});
gyp.on("close",function() {
	fs.mkdirSync(vendor);
	//console.log(fs);
	fs.renameSync("build/Release/binding.node",vendor+"/binding.node");
	process.exit();
});
