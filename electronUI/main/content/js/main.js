// Load everything else
(function() {
	var scriptsToLoad = [ //This list is in order (scripts loaded synchronously (NOT RUN SYNCHRONOUSLY))
		"https://cdn.jsdelivr.net/npm/vue",		//Vue library
		"js/setupEnv.js",						//Set up envoronment (mostly electron stuff)
		"js/browserHandler.js",					//Set up browser to intercept new windows
		"js/loadSass.js",						//Render SCSS files
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
