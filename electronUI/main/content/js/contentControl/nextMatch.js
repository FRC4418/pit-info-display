let debug = require("debug")("NextMatch");
var nextMatch = new Vue({
	el: "#NextMatch",
	data: {
		currentTime: "LOADING...",
		ampm: "",
		time: "LOADING...",      //match.time           <--Scheduled time
		timeUntil: "LOADING...", //match.actual_time    <--The actual time the match occurred. Not preemptively available.
					   			 //match.predicted_time <--The time predicted by TBA
		lineup: [
			[{ //Red   Alliance
				number: 0,
				name: "Fetching team list...",
				rank: 0
			}],
			[{ //Blue  Alliance
				number: 0,
				name: "Fetching team list...",
				rank: 0
			}]
		]
		/*teamStats: {
			number: 0,     //team.team_number
			name: "",      //team.nickname
			website: "",   //team.website
			rookieYear: 0, //team.rookie_year
			lastMatch: {
				powerups: {
					force: false,    //match.?
					levitate: false, //match.?
					boost: false     //match.?
				},
				scores: {
					auto: 0,   //match.score_breakdown.auto_points
					teleop: 0, //match.score_breakdown.teleop_points
				},
			}
		}*/
	},
	methods: {
		setStats: (data) => console.log("Not ready yet!",data)
	}
});

//Current Time
(function() {
	//Make it so the seconds appear when you click the time
	let withSeconds = false;
	var timeCard = document.querySelector(".time");
	timeCard.addEventListener("mousedown",function() {
		withSeconds = true;
	});
	timeCard.addEventListener("mouseup",function() {
		withSeconds = false;
	});
	timeCard.addEventListener("touchstart",function() {
		withSeconds = true;
	});
	timeCard.addEventListener("touchend",function() {
		withSeconds = false;
	});

	//Actually do the thing and update the time
	function updateCurrentTime() {
		requestAnimationFrame(updateCurrentTime); //Make sure this runs every tick
		var time = new Date(); //Get current time`
		var hours = time.getHours();
		var minutes = (time.getMinutes()/10>=1) ? (time.getMinutes()) : ("0"+time.getMinutes());
		var seconds = (time.getSeconds()/10>=1) ? (time.getSeconds()) : ("0"+time.getSeconds());

		//Set values on-screen
		nextMatch.ampm = (hours/12>=1) ? ("PM") : ("AM");
		nextMatch.currentTime = `${(hours%12==0) ? ("12") : (hours%12)}:${minutes}${(withSeconds) ? (`:${seconds}`) : ("")}`;
	}
	updateCurrentTime();
})();

(function() {
	//Populate data for our next match
	var nextMatchTBA;
	var nextMatchTimeTBA;
	function populateNextMatch() {
		return new Promise(function(resolve) {
			tba.getNextMatch(cfg.teamInfo.number,cfg.competitionInfo.code).then(function(match) {
				debug(match);
				nextMatchTBA = match;
				nextMatchTimeTBA = new Date(match.predicted_time*1000);
				var hours = (nextMatchTimeTBA.getHours()%12==0) ? ("12") : (nextMatchTimeTBA.getHours()%12);
				var minutes = (nextMatchTimeTBA.getMinutes()<10) ? (`0${nextMatchTimeTBA.getMinutes()}`) : (nextMatchTimeTBA.getMinutes());
				nextMatch.time = `${hours}:${minutes} ${(nextMatchTimeTBA.getHours>=12) ? ("PM") : ("AM")}`
				//Populate alliances
				//red alliance
				nextMatch.lineup[0] = match.alliances.red.team_keys.map(function(teamKey) {
					return new Team(Number(teamKey.replace("frc","")));
				});
				//Blue alliance
				nextMatch.lineup[1] = match.alliances.blue.team_keys.map(function(teamKey) {
					return new Team(Number(teamKey.replace("frc","")));
				});
				requestAnimationFrame(updateMatchTime);
				resolve();
			}).catch(function(err) {
				if(err=="Matches not available") {
					nextMatch.lineup[0] = [];
					nextMatch.lineup[1] = [];
					nextMatch.time = "No more matches!";
					console.log("No more matches");
					setTimeout(populateNextMatch,30*1000); //Check again in 30 seconds (between QMs and finals)
				}

			});
		});
	}

	//Animate next match countdown
	let shouldContact = true;
	function updateMatchTime() {

		//Make sure this runs every tick
		requestAnimationFrame(updateMatchTime);

		var currentTime = new Date();
		var difference = nextMatchTimeTBA.getTime()-currentTime.getTime();
		if(difference<=0) {
			if(shouldContact) {
				debug("running");
				shouldContact = false;
				populateNextMatch().then(function() {
					shouldContact = true;
				});
			}
		} else {
			//Format time
			var hours = Math.floor((difference % (1000 * 60 * 60 * 24))/(1000 * 60 * 60));
			var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((difference % (1000 * 60)) / 1000);

			var displaySeconds = true;
			var formattedCountdown = (displaySeconds) ? (
				`${(hours*60)+minutes}:${(seconds<10)?("0"+seconds):(seconds)}`
			) : (
				`${(hours*60)+minutes} min`
			);

			//Push time to screen
			nextMatch.timeUntil = formattedCountdown;
		}

	}
	populateNextMatch();
	//updateMatchTime(); //Start executing (called after getting next match time to avoid console error spamming)
})();
