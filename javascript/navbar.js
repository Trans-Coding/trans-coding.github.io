	window.onscroll = function(){stickyFunction()};

	var navbar = document.getElementById("main_navbar");

	var headerTop = document.getElementById("header_top");

	var marginTop = 0;//window.getComputedStyle(document.body).getPropertyValue('margin-top').match(/(\d+)/)[0];

	var stickyPosition = navbar.offsetTop;

	var headerTopPosition = headerTop.offsetTop;

	function stickyFunction(){
		if( (window.pageYOffset - marginTop - headerTopPosition) >= stickyPosition){
			navbar.classList.add("sticky");
		} else{
			navbar.classList.remove("sticky");
		}
	}