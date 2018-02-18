// Render SASS files
// (makes it easier for people who don't know how or care to compile them)
(function() {
	var autoCompile = true;
	if(autoCompile) {
		(function() {
			var sass = require("node-sass");
			sass.render({
				file: `${process.cwd()}/electronUI/main/content/sass/main.scss`,
				importer: function(url,prev,done) {
					if(url=="js://vars") {
						return {contents: `
							$team-logo: url(${cfg.teamInfo.logo});

							$primary-base: ${cfg.teamInfo.colors["primary-base"]};
							$primary-base-text: ${cfg.teamInfo.colors["primary-base-text"]};
							$primary-light: ${cfg.teamInfo.colors["primary-light"]};
							$primary-light-text: ${cfg.teamInfo.colors["primary-light-text"]};
							$primary-dark: ${cfg.teamInfo.colors["primary-dark"]};
							$primary-dark-text: ${cfg.teamInfo.colors["primary-dark-text"]};

							$secondary-base: ${cfg.teamInfo.colors["secondary-base"]};
							$secondary-base-text: ${cfg.teamInfo.colors["secondary-base-text"]};
							$secondary-light: ${cfg.teamInfo.colors["secondary-light"]};
							$secondary-light-text: ${cfg.teamInfo.colors["secondary-light-text"]};
							$secondary-dark: ${cfg.teamInfo.colors["secondary-dark"]};
							$secondary-dark-text: ${cfg.teamInfo.colors["secondary-dark-text"]};
						`};
					}
				}
			},function(err,res) {
				//console.log(err,String(res.css));
				var css = document.createElement("style");
				css.textContent = String(res.css);
				document.head.appendChild(css);
			});
		})();
	}
})();
