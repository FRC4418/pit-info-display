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
		this.enabled = true;
		let self = this;
		tba.getTeam(teamNumber).then((team) => {//Get team data
			self.number = teamNumber;
			self.name = team.nickname;
			self.rank = 0;
			self.enabled = true
		});
	}
}
