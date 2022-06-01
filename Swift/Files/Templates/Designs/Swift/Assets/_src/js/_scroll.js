const Scroll = function () {

	return {

		handleAlternativeTheme() {

			var themeChangers = document.querySelectorAll("[data-alternative-theme]");

			if (typeof (themeChangers) != 'undefined' && themeChangers != null) {
				document.addEventListener('scroll', function (e) {
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
				}, { passive: true } );
			}
		},

		setContentPosition() {
			var headerHeight = 100;
			document.querySelectorAll(".page-header").forEach(header => {
				/*The invisible header is 0*/
				headerHeight += header.offsetHeight;
			});

			document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
		},

		hideHeadersOnScroll() {

			const intersectElement = document.querySelector('[data-intersect]');

			if (typeof (intersectElement) != 'undefined' && intersectElement != null) {

				const options = {
					root: null,
					threshold: 1,
					rootMargin: '20%'
				};
				const callback = (entries) => {
				
					if (!entries[0].isIntersecting) {
						document.body.setAttribute("data-intersected", true);
					} else {
						document.body.setAttribute("data-intersected", false);
					}
				};

				let observer = new IntersectionObserver(callback, options);

				observer.observe(intersectElement);
			};
		}
	}
}();

export { Scroll };
