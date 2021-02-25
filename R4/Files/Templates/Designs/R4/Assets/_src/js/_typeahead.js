const Typeahead = function() {
	var tabIndex = -1;
	var tabIndexOld = 0;
	var timeout;

	return {
		suggest: function(e, searchField){
			if (e.key === "ArrowUp" || e.key === "ArrowDown") {
				//handle dropdown navigation if present
				document.querySelectorAll(".js-type-ahead-menu").forEach(function (menu) {
					if (menu.classList.contains("show")) {
						debounce(() => handleArrowNavigation(e.key, menu), 100)();
						return;
					}
				});

				console.log(tabIndex);
			} else {
				tabIndex = -1;
				if (searchField.value.length > 0) {
					var val = searchField.value;

					document.querySelectorAll(".js-type-ahead-field").forEach(function(field) {
						field.setAttribute("data-original", val)
					});
		
					debounce(() => getSuggestions(searchField), 100)();
				} else {
					hidedd();
				}
			}

			if (e.key === "Escape") {
				//Revert back to the original value last entered in the input field
				const highlightedItems = userList.querySelectorAll(".highlighted");

				document.querySelectorAll(".js-type-ahead-field").forEach(function(field) {
					field.value = field.getAttribute("data-original");
				});

				hidedd();
				return;
			}

			if (e.key === "Tab") {
				return;
			}
		},

		handleTab: function(e) {
			if (e.key === "Tab") {
				//keep selection from dropdown navigation but do not submit search
				e.preventDefault();
				hidedd();
				return;
			}
		},

		handleArrowNavigation: function(key, menu) {
			var elements = menu.getElementsByClassName("dropdown-item");
			if (!elements || elements.length < 1) {
				return;
			}
			if (key === "ArrowUp") {
				tabIndex--;
			} else {
				tabIndex++;
			}

			if (tabIndex < 0 || tabIndex > elements.length - 1) {
				tabIndex = 0;
			}

			menu.setAttribute("data-tabindex", tabIndex);
			if (tabIndex > -1) {
				elements[tabIndex].classList.add("focus");
				var suggestionElement = elements[tabIndex];

				preSelectSuggestion(suggestionElement);

				if (tabIndexOld != tabIndex && elements[tabIndexOld]) {
					elements[tabIndexOld].classList.remove("focus");
				}
				tabIndexOld = tabIndex;
			}
		},

		getSuggestions: async function (searchField) {
			var resultsPageId = searchField.closest(".js-suggest-form").getAttribute("data-search-results-page");
			var searchUrl = "/Default.aspx?ID=" + resultsPageId + "&feed=true&redirect=false&eq=" + encodeURIComponent(searchField.value.toLowerCase());
			let response = await fetch(searchUrl);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
				alert(response.status + '\n' + responseText);
			} else {
				let html = await response.text().then(function (text) {
					return text;
				});

				displaySuggestions(html);
			}
		},

		displaySuggestions: function(data) {
			if (data.length > 5) {
				document.querySelectorAll(".js-type-ahead-menu").forEach(function(menu) {
					menu.innerHTML = data;
				});
				showdd();
			}
		},

		selectSuggestion_: function(inputValue) {
			document.querySelectorAll(".js-type-ahead-field").forEach(function (field) {
				field.value = inputValue;

				if (field.value != "") {
					elm.closest(".js-type-ahead-dropdown").querySelector(".js-suggest-form").submit();
				}
			});
		},

		preSelectSuggestion: function(elm) {
			var suggestionElement = elm.getElementsByClassName("js-suggestion")[0];

			document.querySelectorAll(".js-type-ahead-field").forEach(function (field) {
				field.value = suggestionElement.innerText;

				var formElm = field.closest(".js-suggest-form");
				var parm = formElm.querySelector(".js-type-ahead-parameter");
				if (elm.getAttribute("data-param") && elm.getAttribute("data-paramvalue")) {
					parm.setAttribute("name", elm.getAttribute("data-param"));
					parm.setAttribute("value", elm.getAttribute("data-paramvalue"));

					if (elm.getAttribute("data-param").includes("ProductId")) {
						var productDetailPage = formElm.getAttribute("data-product-details-page");
						formElm.setAttribute("action", productDetailPage);
					} else {
						var productListPage = formElm.getAttribute("data-product-list-page");
						formElm.setAttribute("action", productListPage);
					}
				} else {
					parm.removeAttribute("name");
					parm.removeAttribute("value");

				}
			});
		},

		selectSuggestion: function(elm) {
			preSelectSuggestion(elm);

			elm.closest(".js-type-ahead-dropdown").querySelector(".js-suggest-form").submit();
		},

		showdd: function() {
			document.querySelectorAll(".js-type-ahead-menu").forEach(function (dropdown) {
				if (dropdown.innerHTML != "") {
					dropdown.classList.add("show");
				}    
			});
			document.querySelectorAll(".js-type-ahead-dropdown").forEach(function (dropdown) {
				dropdown.classList.add("show");
			});
		},

		hidedd: function() {
			document.querySelectorAll(".js-type-ahead-dropdown").forEach(function (dropdown) {
				dropdown.classList.remove("show");
			});
			document.querySelectorAll(".js-type-ahead-menu").forEach(function (dropdown) {
				dropdown.classList.remove("show");
			});
		},

		debounce: function(func, wait, immediate) {
			return function () {
				var context = this, args = arguments;
				var later = function () {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		},

		goToPage: function(aTag) {
			var pageTitle = aTag.getAttribute("title");
			navigateToPage(aTag.href);
			history.pushState(null, pageTitle, aTag.href);
			if (pageTitle != null) {
				document.title = pageTitle;
			}
			return false;
		},

		navigateToPage: async function(href) {
			var fetchHref = href;
			if (href.indexOf("?") > 0) {
				fetchHref += "&feed=true"
			} else {
				fetchHref += "?feed=true"
			}
			let response = await fetch(fetchHref);

			if (!response.ok) {
				throw new Error('HTTP error! status: ${response.status}');
			} else {
				let html = await response.text().then(function (text) {
					return text;
				});

				document.querySelectorAll(".js-async-placeholder").forEach(function(placeholder) {
					placeholder.outerHTML = html;
				});
			}
			window.scrollTo(0, 0);
		},

		init: function(){
			document.body.addEventListener('click', hidedd);
			document.querySelectorAll(".js-type-ahead-field").forEach(function (field) {
				field.addEventListener('focus', showdd);
				field.addEventListener('keyup', (e) => suggest(e, field))
				field.addEventListener('keydown', (e) => handleTab(e));
			});
		}
	}

}();

export {Typeahead};
