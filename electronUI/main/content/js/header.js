document.querySelector(".sidebar").addEventListener("click",function(e) {
	//Hide current page and mark it inactive
	var oldActive = document.querySelector("div.item.active");
	oldActive.classList.remove("active");
	document.querySelector(`#${oldActive.getAttribute("for")}`).classList.remove("active");
	//Mark page associated with click as active
	e.target.classList.add("active");
	document.querySelector(`#${e.target.getAttribute("for")}`).classList.add("active");
})
