// Render SASS files
// (makes it easier for people who don't know how to compile them)
var autoCompile = true;
if(autoCompile) {
	(function() {
		var sass = require("node-sass");
		sass.render({
			file: `${process.cwd()}/electronUI/main/content/sass/main.scss`
		},function(err,res) {
			//console.log(err,String(res.css));
			var css = document.createElement("style");
			css.textContent = String(res.css);
			document.head.appendChild(css);
		});
	})();
}

var scriptsToLoad = [ //This list is in order (scripts loaded synchronously (NOT RUN SYNCHRONOUSLY))
	"js/setupEnv.js",
	"js/header.js",
	"js/showWindow.js"
];

scriptsToLoad.reverse();

function loadScripts() {
	var script = document.createElement("script");
	script.src = scriptsToLoad.pop();
	script.onload = function() {
		if(scriptsToLoad.length > 0) loadScripts();
	};
	document.head.appendChild(script);
}

window.onload = loadScripts;
