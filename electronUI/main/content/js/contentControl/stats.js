var statsPage = new Vue({
	el: "#TeamStats",
	data: {
		team: new Team(cfg.teamInfo.number),
		stats: cfg.custom.statsToDisplay,
		data: [
			[
				{
					text: "",
					link: false,
					color: "#FF9800"
				}
			]
		], //2-dimensional array indexed data[y][x]
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

function setStats(team,switchPage,code) {
	if(switchPage) {
		document.querySelector("#TSButton").click();
	}

	//Reset Data
	statsPage.data = [
		[
			{
				text: "",
				link: false,
				color: "#FF9800"
			}
		]
	], //2-dimensional array indexed data[y][x]
	//Get matches for default team
	tba.getMatchesForTeam(team,(code) ? (code) : (cfg.competitionInfo.code)).then((data) => {

		//Labels
		for (var i = 0; i < cfg.custom.statsToDisplay.length; i++) {
			if(!statsPage.data[((i+1)*2)-1]) statsPage.data[((i+1)*2)-1] = [];
			if(!statsPage.data[((i+1)*2)]) statsPage.data[((i+1)*2)] = [];
			Vue.set(statsPage.data[((i+1)*2)-1],0,{
				text: `${cfg.custom.statsToDisplay[i]}`,
				link: false,
				style: ["bold"],
				color: "#3f51b5"
			});
			Vue.set(statsPage.data[((i+1)*2)],0,{
				text: `${cfg.custom.statsToDisplay[i]}`,
				link: false,
				style: ["bold"],
				color: "#d32f2f"
			});
		}

		var matches = data.filter(match => !!match.post_result_time);
		for (var i = 0; i < matches.length; i++) {
			//Headers
			Vue.set(statsPage.data[0],i+1/*Leave a space for labels*/,{
				text: `${matches[i].comp_level}${matches[i].match_number}`.toUpperCase(),
				link: true,
				style: ["bold","text-black"],
				color: "#FF9800",
				videos: matches[i].videos
			});

			//Stats
			for (var j = 0; j < cfg.custom.statsToDisplay.length; j++) {
				Vue.set(statsPage.data[((j+1)*2)-1],i+1,{
					text: `${matches[i].score_breakdown.blue[cfg.custom.statsToDisplay[j]]}`,
					link: false,
					bold: false,
					color: "#3f51b5"
				});
				Vue.set(statsPage.data[((j+1)*2)],i+1,{
					text: `${matches[i].score_breakdown.red[cfg.custom.statsToDisplay[j]]}`,
					link: false,
					bold: false,
					color: "#d32f2f"
				});
			}
		}

	});
}

nextMatch.setStats = setStats;

setStats(cfg.teamInfo.number);
