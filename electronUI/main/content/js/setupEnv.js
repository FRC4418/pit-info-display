var electron = require("electron");
var ipc = electron.ipcRenderer;
var remote = electron.remote;
var cfg = remote.getGlobal("cfg");
var tba = remote.getGlobal("tba");

class Team {
	constructor(teamNumber,enabled) {
		this.number = 0;
		this.name = "LOADING...";
		this.rank = 0;
		let self = this;
		tba.getTeam(teamNumber).then((team) => {//Get team data
			self.number = teamNumber;
			self.name = team.nickname;
			tba.callTBA(`/team/frc${teamNumber}/event/${new Date().getFullYear()}${cfg.competitionInfo.code}`).then(function(teamMeta) {
				self.rank = (!!teamMeta.Error) ? (0) : (teamMeta.qual.ranking.rank);
			});
		});
	}
}

tba.getMatchesForTeam = function(team,eventKey) {
	return new Promise(function(resolve) {
		tba.callTBA(`/team/frc${team}/event/${eventKey}/matches`).then(function(data) {
			resolve(data);
		});
	});
}

//Get next match
tba.getNextMatch = function(number,eventCode) {
	return new Promise(function(resolve) {
		try {
			tba.getMatchesForTeam(number,`${new Date().getFullYear()}${eventCode}`).then(function(matches) {
				//console.log(matches);
				for (var i = 0; i < matches.length; i++) {
					if(!!matches[i].actual_time) {
						resolve(matches[i]);
						return;
					}
				}
				resolve({ //DEBUG: match
					predicted_time: Math.ceil(new Date((new Date()).getTime() + (10*60*1000)).getTime()/1000),
					alliances: {
						red: {
							team_keys: [
								"frc4418",
								"frc5899",
								"frc1619"
							]
						},
						blue: {
							team_keys: [
								"frc4293",
								"frc1011",
								"frc1"
							]
						}
					}
				});
			}).catch(function(err) {
				console.error(err);
			});
		} catch(e) {
			console.error(e);
			tba.getNextMatch(number,eventCode);
		}
	});
}
