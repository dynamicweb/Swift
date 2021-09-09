const ProductList = function () {

	return {
		init: function () {
			//Auto initialize
			document.querySelectorAll(".js-product-list").forEach(function (el) {
				ProductList.Update(el);
			});
		},

		Update: async function (e) {
			var clickedButton = e.currentTarget != undefined ? e.currentTarget : e;
			var form = clickedButton.closest("form");
			var responseTargetElement = document.querySelector("#" + form.getAttribute("data-response-target-element"));
			var preloader = form.getAttribute("data-preloader");

			let formData = new FormData(form);
			var fetchOptions = {
				method: 'POST',
				body: formData
			};

			//Fire the 'update' event
			let event = new CustomEvent("update.swift.productlist", {
				cancelable: true,
				detail: {
					formData: formData,
					parentEvent: e
				}
			});
			var globalDispatcher = document.dispatchEvent(event);
			var localDispatcher = clickedButton.dispatchEvent(event);

			if (globalDispatcher != false && localDispatcher != false) {
				if (preloader != "inline") {
					var addPreloaderTimer = setTimeout(function () {
						var overlayElement = document.createElement('div');
						overlayElement.className = "preloader-overlay";
						overlayElement.setAttribute('id', "overlay");
						var overlayElementIcon = document.createElement('div');
						overlayElementIcon.className = "spinner-border";
						overlayElementIcon.style.top = window.pageYOffset + "px";
						overlayElement.appendChild(overlayElementIcon);

						if (form) {
							form.parentNode.insertBefore(overlayElement, form);
						}
					}, 200); //Small delay to secure that the preloader is not loaded all the time
				} else {
					var addPreloaderTimer = setTimeout(function () {
						var preloaderElement = document.createElement('div');
						preloaderElement.className = "spinner-border";
						preloaderElement.style.margin = "auto";
						var helper = document.createElement('span');
						helper.className = "visually-hidden";
						helper.innerHTML = "Loading...";
						preloaderElement.appendChild(helper);
						responseTargetElement.appendChild(preloaderElement);
					}, 200); //Small delay to secure that the preloader is not loaded all the time
				}

				let response = await fetch(form.action, fetchOptions);

				if (response.ok) {
					//Update URL
					let url = window.location.origin + window.location.pathname;
					const newParams = new URLSearchParams(formData);
					let updateUrl = "true";

					if (form.getAttribute("data-update-url") != undefined) {
						updateUrl = form.getAttribute("data-update-url");
					}

					if (updateUrl != "false") {
						url += "?" + newParams.toString();
						window.history.replaceState({}, '', decodeURI(url));
					}

					ProductList.Success(response, responseTargetElement, addPreloaderTimer, formData);
				} else {
					ProductList.Error(response, responseTargetElement, addPreloaderTimer);
				}
			}
		},

		Success: async function (response, responseTargetElement, addPreloaderTimer, formData) {
			clearTimeout(addPreloaderTimer);

			//Replace content
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

				//Replace the markup
				responseTargetElement.innerHTML = html;

				//Initialize all the sliders
				swift.Sliders.init();

				//Modal
				var requestType = formData.get("RequestType");

				if (screen.width < 768 && document.querySelector('#FacetsModal') && requestType != "UpdateList") {
					var facetsModal = new bootstrap.Modal(document.querySelector('#FacetsModal'), { backdrop: false });
					facetsModal.show();

					var backdrop = document.querySelector('.modal-backdrop');
					if (backdrop) {
						backdrop.parentElement.removeChild(backdrop);
					}
				}
			}
		},

		Error: function (e, responseTargetElement, addPreloaderTimer) {
			clearTimeout(addPreloaderTimer);

			if (document.querySelector("#overlay")) {
				document.querySelector("#overlay").parentNode.removeChild(document.querySelector("#overlay"));
			}
		},

		ResetFacets: async function (e) {
			var clickedButton = e.currentTarget;
			var form = clickedButton.closest("form");
			let formData = new FormData(form);

			//Fire the 'resetfacets' event
			let event = new CustomEvent("resetfacets.swift.productlist", {
				cancelable: true,
				detail: {
					formData: formData,
					parentEvent: e
				}
			});
			var globalDispatcher = document.dispatchEvent(event);
			var localDispatcher = clickedButton.dispatchEvent(event);

			if (globalDispatcher != false && localDispatcher != false) {
				form.querySelectorAll("input[type='checkbox']").forEach(function (el) {
					el.checked = false;
				});

				ProductList.Update(e);
			}
		}
	}

}();

export { ProductList };
