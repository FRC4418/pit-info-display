document.querySelector(".sidebar").addEventListener("click",function(e) {

	if(e.target.classList.contains("item")) {
		//Hide current page and mark it inactive
		var oldActive = document.querySelector("div.item.active");
		oldActive.classList.remove("active");
		var oldActivePage = document.querySelector(`#${oldActive.getAttribute("for")}`);
		oldActivePage.classList.remove("active");
		oldActivePage.classList.add("hidden");
		//Mark page associated with click as active
		e.target.classList.add("active");
		var newActive = document.querySelector(`#${e.target.getAttribute("for")}`);
		newActive.classList.remove("hidden");
		newActive.classList.add("active");
	}

})
