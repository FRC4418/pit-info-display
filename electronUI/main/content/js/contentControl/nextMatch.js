var nextMatch = new Vue({
	el: "#NextMatch",
	data: {
		currentTime: "1:43:00",
		ampm: "PM",
		time: "1:45 PM",      //match.time           <--Scheduled time
		timeUntil: "2:34", //match.actual_time    <--The actual time the match occurred. Not preemptively available.
					   //match.predicted_time <--The time predicted by TBA
		lineup: [
			[new Team(4418),new Team(5899),new Team(1619)], //Red   Alliance
			[new Team(4293),new Team(1011),new Team(4499)]  //Blue  Alliance
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
	}
});

//Current Time
(function() {
	let withSeconds = false;
	var timeCard = document.querySelector(".time");
	timeCard.addEventListener("mousedown",function() {
		withSeconds = true;
	});
	timeCard.addEventListener("mouseup",function() {
		withSeconds = false;
	});
	timeCard.addEventListener("touchdown",function() {
		withSeconds = true;
	});
	timeCard.addEventListener("touchup",function() {
		withSeconds = false;
	});
	function updateCurrentTime() {
		requestAnimationFrame(updateCurrentTime);
		var time = new Date();
		//DEBUG: var hours = 5;
		var hours = time.getHours();
		var minutes = (time.getMinutes()/10>=1) ? (time.getMinutes()) : ("0"+time.getMinutes());
		var seconds = (time.getSeconds()/10>=1) ? (time.getSeconds()) : ("0"+time.getSeconds());

		nextMatch.ampm = (hours/12>=1) ? ("PM") : ("AM");
		nextMatch.currentTime = `${(hours%12==0) ? ("12") : (hours%12)}:${minutes}${(withSeconds) ? (`:${seconds}`) : ("")}`;
	}
	updateCurrentTime();
})();
