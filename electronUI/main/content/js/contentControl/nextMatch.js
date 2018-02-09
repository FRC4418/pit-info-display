var nextMatch = new Vue({
	el: "#NextMatch",
	data: {
		currentTime: "1:43 PM",
		time: "1:53 PM",      //match.time           <--Scheduled time
		timeUntil: "10:00", //match.actual_time    <--The actual time the match occurred. Not preemptively available.
					   //match.predicted_time <--The time predicted by TBA
		lineup: [
			[new Team(4418)], //Red   Alliance
			[new Team(4418)]  //Blue  Alliance
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
