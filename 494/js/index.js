window.onload = function() {
	var is_toggled = true;
	/* Menu Toggle Code */
	$("#menu-toggle").click(function(e) {
		
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
		is_toggled = !is_toggled;
		if(is_toggled) {
			$("#page-closed").hide();
		}
		else {
			$("#page-closed").show();
		}
	});
	
	/* Swipe Events */
	$("#wrapper").on("swiperight", function(event) {
		alert("Trigger");
		if(is_toggled)
			$("#menu-toggle").trigger("click");
	}).on("swipeleft", function(event) {
		alert("Trigger2");
		if(!is_toggled)
			$("#menu-toggle").trigger("click");
	});
	
	
	/* Closed Menu Icon Logic */
	$("#page-closed").click(function() {
		$("#menu-toggle").trigger("click");
	});
	
	$("#page-closed").mouseover(function() {
		$("#page-closed-hamburger").attr("src", "img/menu-icons/hamburger.png");
	}).mouseout(function() {
		$("#page-closed-hamburger").attr("src", "img/menu-icons/hamburger_gray.png");
	});
	
	$("")
	
	/* Opens fileName into the frame, assuming the location can be found */
	function openInFrame(fileName) {
		highlightCurrentMenu(fileName); // Highlight the menu
		document.getElementById("frame").src = fileName + ".html"; // Open it
	}

	/* Init Menu Item Names and Styles*/
	var pages = ["home", "education", "experience", "projects", "senior_design", "about"];
	var pageColor = ["white-style", //home
					 "purple-style", //education
					 "red-style", //experience
					 "green-style",  //projects
					 "brown-style", //senior_design
					 "orange-style"];  //about

	/* Logical Class Used to Keep Context when Changing the iFrame*/
	function Page(page) {
		this.m = page;
		this.loadNext = function(e) {
			//e.preventDefault();
			$(window).scrollTop(0); //Scroll to the top of the parent if it is scrolled down
			
			
			openInFrame(this.m); // Open the Menu
		};
	};
	
	/* Init All the Menu Items to Open an IFrame */
	for(var p in pages) {
		var c = new Page(pages[p]);
		
		//Keep the context of what pages[p] should be for this menu item
		$("#"+pages[p]).click(c.loadNext.bind(c));
		
		//If the page's hash exists, open it. Otherwise, the default of Home.html will load
		if("#" + pages[p] === window.location.hash) {
			openInFrame(pages[p]);
		}
	}

	//lastMenu will not be undefined if the above method has ran (ie, a page's has does exist)
	if(lastMenu === undefined)
		openInFrame(pages[0]);
	
	
	/* Toggles the classes of the menu list to have the appropriate color shown */
	var lastMenu;
	function highlightCurrentMenu(currentMenu) {
		if(currentMenu != lastMenu) {
			for(var p in pages) {
				$("#" + pages[p]).parent().toggleClass(pageColor[pages.indexOf(lastMenu)]);
				$("#" + pages[p]).parent().toggleClass(pageColor[pages.indexOf(currentMenu)]);
				
				if(pages[p] === currentMenu || pages[p] === lastMenu) {
					$("#" + pages[p]).parent().toggleClass("selected");
				}
				
			}
			
			$("#github-link").mouseover(function() {
				$(this).children().attr("src", "img/menu-icons/github-" + pageColor[pages.indexOf(currentMenu)] + ".png");
			});
			$("#email-link").mouseover(function() {
				$(this).children().attr("src", "img/menu-icons/email-" + pageColor[pages.indexOf(currentMenu)] + ".png");
			});
			$("#linkedin-link").mouseover(function() {
				$(this).children().attr("src", "img/menu-icons/linkedin-" + pageColor[pages.indexOf(currentMenu)] + ".png");
			});
			
			lastMenu = currentMenu;
		}
	}
	
	$("#github-link").mouseout(function() {
		$(this).children().attr("src", "img/menu-icons/github-white.png");
	});
	$("#email-link").mouseout(function() {
		$(this).children().attr("src", "img/menu-icons/email-white.png");
	});
	$("#linkedin-link").mouseout(function() {
		$(this).children().attr("src", "img/menu-icons/linkedin-white.png");
	});
	
	
	$("[data-toggle='popover']").popover();
	
	//$("#linkedin-link").popover({html: true}).data('bs.popover').tip().attr("id", "popoverleft");
	
};