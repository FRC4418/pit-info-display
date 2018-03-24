var electron = require("electron");
var ipc = electron.ipcRenderer;
var remote = electron.remote;
var cfg = remote.getGlobal("cfg");
var tba = remote.getGlobal("tba");

class Team {
	constructor(teamNumber,enabled) {
		let self = this;
		this.promise = new Promise((resolve) => {
			tba.getTeam(teamNumber).then((team) => { // Get team data
				//console.log("GetTeam");
				self.number = teamNumber;
				self.name = team.nickname;
				tba.getTeamAtEvent(teamNumber,cfg.competitionInfo.code).then(function(teamMeta) {
					//console.log("AtEvent");
					self.rank = (!teamMeta) ? ("?") : ((!!teamMeta.Error) ? ("Err") : (teamMeta.qual.ranking.rank));
					// console.log(self,this);
					resolve(self);
				});
			});
		});
		this.number = 0;
		this.name = "LOADING...";
		this.rank = 0;
	}
}

tba.getNextMatchLegacy = tba.getNextMatch;
tba.getNextMatch = function(team,eventCode) {
	return new Promise(function(resolve) {
		tba.getNextMatchLegacy(team,eventCode).then(resolve).catch(function(err) {
			if(err=="Matches not available") {
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
			}
		});
	});
}
