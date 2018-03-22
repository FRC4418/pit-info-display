var statsPage = new Vue({
	el: "#TeamStats",
	data: {
		team: new Team(cfg.teamInfo.number),
		stats: cfg.custom.statsToDisplay,
		matches: (function() {
			tba.getMatchesForTeam(cfg.teamInfo.number,cfg.competitionInfo.code).then((data) => statsPage.matches = data);
		})(),
	},
	methods: {
		watchVideo: function(match) {
			switch(match.videos[0].type) {
				case "youtube":
					loadInBrowser("http://youtube.com/watch?v="+match.videos[0].key);
					break;
				case "vimeo":
					loadInBrowser("http://vimeo.com/"+match.videos[0].key);
					break;
			}
		}
	}
});
