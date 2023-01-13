const VariantSelector = function () {

	return {
		init: function () {
			//Auto initialize
			document.querySelectorAll(".js-variant-selector").forEach(function (variantSelector) {
				VariantSelector.UpdateAllVariants(variantSelector);
				VariantSelector.CheckSelectionComplete(variantSelector, false);

			});
		},

		OptionClick: function (e) {
			var clickedButton = e.currentTarget;
			var variantSelectorElement = clickedButton.closest(".js-variant-selector");
			clickedButton.blur();

			//Fire the 'optionclick' event
			let event = new CustomEvent("optionclick.swift.variantselector", {
				cancelable: true,
				detail: {
					parentEvent: e
				}
			});
			var globalDispatcher = document.dispatchEvent(event);
			var localDispatcher = clickedButton.dispatchEvent(event);

			if (globalDispatcher != false && localDispatcher != false) {
				VariantSelector.ToggleActiveState(clickedButton);
				VariantSelector.UpdateAllVariants(variantSelectorElement);
				VariantSelector.CheckSelectionComplete(variantSelectorElement, true);
			}
		},	    

		UpdateAllVariants: function (variantSelectorElement) {
			var combinations = variantSelectorElement.getAttribute("data-combinations");
			combinations = combinations.split(",");

			//Go through each option, in their group, and check the availability
			variantSelectorElement.querySelectorAll(".js-variant-option").forEach(function (option) {
				var groupId = option.closest(".js-variant-group").getAttribute("data-group-id");
				var variantId = option.getAttribute("data-variant-id");

				option.classList.add("in-active");

				var show = VariantSelector.IsOptionAvailable(variantSelectorElement, variantId, groupId, combinations);
				if (show == true) {
					option.classList.remove("in-active");
				}
			});
		},

		IsOptionAvailable: function (variantSelectorElement, currentVariantId, currentGroupId, combinations) {
			var show = false;
			var selections = [];

			//Add the VariantId we are testing for
			selections.push(currentVariantId);

			//Find all selections, excluding selections in the current group
			variantSelectorElement.querySelectorAll(".js-variant-option").forEach(function (option) {
				var parentGroupId = option.closest(".js-variant-group").getAttribute("data-group-id");

				if (parentGroupId != currentGroupId) {
					if (option.classList.contains("active")) {
						var activeVariantId = option.getAttribute("data-variant-id");
						selections.push(activeVariantId);
					}
				}
			});

			var selectionsTotal = selections.length;

			//Compare the selections with the available combinations
			combinations.forEach(function (combi) {
				var selectionsCount = 0;
				var combiVariantIds = combi.split(".");

				combiVariantIds.forEach(function (combiVariantId) {
					selections.forEach(function (selectionVariantId) {
						if (combiVariantId == selectionVariantId) {
							selectionsCount++;
						}
					});
				});

				if (selectionsCount == selectionsTotal) {
					show = true;
				}
			});

			return show;
		}, 

		ToggleActiveState: function (clickedButton) {
			var isButton = clickedButton.localName === "button";
			var inactiveClicked = isButton ? clickedButton.classList.contains("in-active") : clickedButton.selectedOptions[0].classList.contains("in-active");
			var isAlreadyActive = isButton ? clickedButton.classList.contains("active") : clickedButton.selectedOptions[0].classList.contains("active");
			
			//Allow clicking in-active options
			if (inactiveClicked) {
				clickedButton.closest(".js-variant-selector").querySelectorAll(".js-variant-option").forEach(function (option) {
					option.classList.remove("active");
				});
			}
			
			//Remove all active options in the current group
			clickedButton.closest(".js-variant-group").querySelectorAll(".js-variant-option").forEach(function (option) {
				option.classList.remove("active");
			});

			//Add active to the selected options
			if (!isAlreadyActive) {
				if (isButton) {
					clickedButton.classList.add("active");
				}
				else {
					clickedButton.selectedOptions[0].classList.add("active");
				}
			}
		},

		CheckSelectionComplete: function (variantSelectorElement, updatePage) {
			var selections = [];
			var selectionCount = 0;
			var totalGroups = variantSelectorElement.querySelectorAll(".js-variant-group").length;

			variantSelectorElement.querySelectorAll(".js-variant-option").forEach(function (option) {
				if (option.classList.contains("active")) {
					var activeVariantId = option.getAttribute("data-variant-id");
					selections.push(activeVariantId);
					selectionCount++;
				}
			});

			if (selectionCount == totalGroups && updatePage) {
				//Fire the 'selectioncomplete' event
				let event = new CustomEvent("selectioncomplete.swift.variantselector", {
					cancelable: true,
					detail: {
						selections: selections
					}
				});

				var variantIdElement = variantSelectorElement.querySelector("[name='variantid']");

				if (variantIdElement) {
					variantIdElement.value = selections.join(".");
				}

				var globalDispatcher = document.dispatchEvent(event);
				var localDispatcher = variantSelectorElement.dispatchEvent(event);

				if (globalDispatcher != false && localDispatcher != false) {
					//Update the url

					if (variantSelectorElement.getAttribute("data-base-url")) {
						var url = variantSelectorElement.getAttribute("data-base-url");
						url += "&variantid=" + selections.join(".");
					} else {
						var url = new URL(window.location);
						var searchParams = url.searchParams;
						searchParams.set('variantid', selections.join("."));
						url.search = searchParams.toString();
					}

					window.history.replaceState({}, '', decodeURI(url));

					//Call the async PageUpdater
					swift.PageUpdater.Update(variantSelectorElement);

					//Set the friendly url returned from the request
					variantSelectorElement.addEventListener("updated.swift.pageupdater", function (data) {
						var htmlTempContainer = document.createElement('div');
						htmlTempContainer.innerHTML = data.detail.html;

						if (htmlTempContainer.querySelector(".js-variant-selector").getAttribute("data-friendly-url")) {
							window.history.replaceState({}, '', htmlTempContainer.querySelector(".js-variant-selector").getAttribute("data-friendly-url"));
						}

						VariantSelector.init();
					});
				}
			}
		}
	}
}();

export { VariantSelector };
