var homePage = new Vue({
	el: "#Home",
	data: {
		teamPageURL: ""
	}
});

//Get team web page
tba.getTeam(cfg.teamInfo.number).then(function(teamData) {
	homePage.teamPageURL = teamData.website;
});
