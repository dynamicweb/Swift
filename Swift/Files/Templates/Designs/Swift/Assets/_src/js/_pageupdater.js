const PageUpdater = function () {

	return {
		Update: async function (e) {
			var clickedButton = e.currentTarget != undefined ? e.currentTarget : e;
			var form = clickedButton.closest("form");
			var preloader = form.getAttribute("data-preloader");
			var responseTargetElement = form.getAttribute("data-response-target-element") ? "#" + form.getAttribute("data-response-target-element") : "#content";
			var layoutTemplate = form.getAttribute("data-layout-template") ? form.getAttribute("data-layout-template") : "Swift_PageClean.cshtml";

			let formData = new FormData(form);
			formData.set("LayoutTemplate", layoutTemplate);
			var fetchOptions = {
				method: 'POST',
				body: formData
			};

			//Fire the 'update' event
			let event = new CustomEvent("update.swift.pageupdater", {
				cancelable: true,
				detail: {
					formData: formData,
					parentEvent: e
				}
			});
			var globalDispatcher = document.dispatchEvent(event);
			var localDispatcher = clickedButton.dispatchEvent(event);

			if (globalDispatcher != false && localDispatcher != false) {
				//UI updates
				if (preloader != "inline") {
					var addPreloaderTimer = setTimeout(function () {
						var overlayElement = document.createElement('div');
						overlayElement.className = "preloader-overlay";
						overlayElement.setAttribute('id', "overlay");
						var overlayElementIcon = document.createElement('div');
						overlayElementIcon.className = "preloader-overlay-icon";
						overlayElementIcon.style.top = window.pageYOffset + "px";
						overlayElement.appendChild(overlayElementIcon);

						if (form) {
							form.parentNode.insertBefore(overlayElement, form);
						}
					}, 200); //Small delay to secure that the preloader is not loaded all the time
				} else {
					var addPreloaderTimer = setTimeout(function () {
						var preloaderElement = document.createElement('div');
						preloaderElement.className = "preloader";
					}, 200); //Small delay to secure that the preloader is not loaded all the time
				}

				//Fetch
				let response = await fetch(form.action, fetchOptions);

				if (response.ok) {
					PageUpdater.Success(response, addPreloaderTimer, formData, responseTargetElement);
				} else {
					PageUpdater.Error(response, addPreloaderTimer);
				}
			}
		},
		
		Success: async function (response, addPreloaderTimer, formData, responseTargetElement) {
			clearTimeout(addPreloaderTimer);

			let html = await response.text().then(function (text) {
				return text;
			});

			//Fire the 'updated' event
			let event = new CustomEvent("updated.swift.pageupdater", {
				cancelable: true,
				detail: {
					cancelable: true,
					detail: {
						formData: formData,
						html: html
					}
				}
			});
			var globalDispatcher = document.dispatchEvent(event);

			if (globalDispatcher != false) {
				//Remove preloader
				if (document.querySelector("#overlay")) {
					document.querySelector("#overlay").parentNode.removeChild(document.querySelector("#overlay"));
				}

				console.log(html);

				//Replace content
				if (document.querySelector(responseTargetElement)) {
					document.querySelector(responseTargetElement).innerHTML = html;
				}
			}
		},
		
		Error: function (e, responseTargetElement, addPreloaderTimer) {
			clearTimeout(addPreloaderTimer);
		
			if (document.querySelector("#overlay")) {
				document.querySelector("#overlay").parentNode.removeChild(document.querySelector("#overlay"));
			}
		}
	}
}();

export { PageUpdater };
