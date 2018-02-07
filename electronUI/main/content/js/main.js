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

window.onload = function() {
	([
		"js/header.js"
	]).forEach(function(scriptSrc) {
		var script = document.createElement("script");
		script.src = scriptSrc;
		document.head.appendChild(script);
	});
}
