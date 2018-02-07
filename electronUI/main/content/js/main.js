window.onload = function() {
	([
		"js/header.js"
	]).forEach(function(scriptSrc) {
		var script = document.createElement("script");
		script.src = scriptSrc;
		document.head.appendChild(script);
	});
}
