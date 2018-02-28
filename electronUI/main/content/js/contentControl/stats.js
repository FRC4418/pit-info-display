var statsPage = new Vue({
	el: "#TeamStats",
	data: {
		team: new Team(cfg.teamInfo.number),
		stats: cfg.custom.statsToDisplay,
		matches: (function() {
			tba.getMatchesForTeam(78,"week0").then((data) => statsPage.matches = data);
		})(),
	}
});
