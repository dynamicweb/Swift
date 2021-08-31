const Scroll = function() {
    
    return {

        init() {
			document.addEventListener('scroll', function (e) {
				var themeChangers = document.querySelectorAll("[data-alternative-theme]");

				themeChangers.forEach(function (element) {
					var currentTheme = element.getAttribute("class");
					var mainTheme = element.getAttribute("data-main-theme");
					var alternativeTheme = element.getAttribute("data-alternative-theme");

					var headerElement = element.closest("header");
					var headerHeight = headerElement ? headerElement.clientHeight : 0;

					if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
						if (currentTheme !== mainTheme) {
							var alternativeThemeClasses = alternativeTheme.split(" ");
							for (var i = 0; i < alternativeThemeClasses.length; i++) {
								if (alternativeThemeClasses[i] != "") {
									element.classList.remove(alternativeThemeClasses[i]);
								}
							}

							var mainThemeClasses = mainTheme.split(" ");
							for (var i = 0; i < mainThemeClasses.length; i++) {
								if (mainThemeClasses[i] != "") {
									element.classList.add(mainThemeClasses[i]);
								}
							}
						}
					} else {
						if (currentTheme !== alternativeTheme) {
							var mainThemeClasses = mainTheme.split(" ");
							for (var i = 0; i < mainThemeClasses.length; i++) {
								if (mainThemeClasses[i] != "") {
									element.classList.remove(mainThemeClasses[i]);
								}
							}

							var alternativeThemeClasses = alternativeTheme.split(" ");
							for (var i = 0; i < alternativeThemeClasses.length; i++) {
								if (alternativeThemeClasses[i] != "") {
									element.classList.add(alternativeThemeClasses[i]);
								}
							}
						}
					}
				});

				//Hideable elements
				var hideableElements = document.querySelectorAll(".js-hide-on-scroll");

				if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
					hideableElements.forEach(function (element) {
						element.classList.add("d-none");
					});
				} else {
					hideableElements.forEach(function (element) {
						element.classList.remove("d-none");
					});
				}
			});
		},

		setContentPosition() {

			const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
			var headerHeight = 100;
			var desktopHeader = document.querySelector("#page-header-dekstop");
			var mobileHeader = document.querySelector("#page-header-mobile");

			if (viewportWidth > 992 && desktopHeader) {
				headerHeight = desktopHeader.clientHeight;
			} else if (mobileHeader) {
				headerHeight = mobileHeader.clientHeight;
			}
			document.documentElement.style.setProperty('--header-height', headerHeight + 'px');

		}
    }
}();

export { Scroll };
