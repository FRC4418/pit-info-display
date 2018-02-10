// Render SASS files
// (makes it easier for people who don't know how or care to compile them)
(function() {
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
})();

// Load everything else
(function() {
	var scriptsToLoad = [ //This list is in order (scripts loaded synchronously (NOT RUN SYNCHRONOUSLY))
		"https://cdn.jsdelivr.net/npm/vue",		//Vue library
		"js/setupEnv.js",						//Set up envoronment (mostly electron stuff)
		"js/sidebar.js",						//Set up the sidebar to switch pages
		"js/contentControl/nextMatch.js",		//Set up the vue controller for #NextMatch
		"js/contentControl/stats.js",			//Set up the vue controller for #TeamStats
		"js/showWindow.js"						//Tell the main process we are done loading
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
})();
