//Intercept window.open to use embedded browser
var browserView = document.querySelector("#BrowserView");
window.openLegacy = window.open;
window.open = loadInBrowser;

function loadInBrowser(url) {
	//Hide current page and mark it inactive
	document.querySelector("#BButton").click();
	setTimeout(function() {
		browserView.loadURL(url);
	},10);
}

//Browser Controls

//LiveStream
tba.getEvent(cfg.competitionInfo.code).then((res) => {
	if(res.webcasts.length>0) {
		document.querySelector("#LiveStreamView").src = (function() {
			switch(res.webcasts[cfg.webcastIndex].type) {
				case "twitch":
					return "https://player.twitch.tv/?channel="+res.webcasts[cfg.webcastIndex].channel;
			}
		})();
	}
});
