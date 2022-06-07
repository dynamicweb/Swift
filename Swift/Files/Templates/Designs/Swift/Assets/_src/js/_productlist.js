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

			if (e.currentTarget != undefined) {
				e.preventDefault(); 
			}

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
					if (responseTargetElement != null) {
						responseTargetElement.innerHTML = "";
					}

					var addPreloaderTimer = setTimeout(function () {
						var preloaderElement = document.createElement('div');
						preloaderElement.className = "d-flex p-4";
						var preloaderSpinner = document.createElement('div');
						preloaderSpinner.className = "spinner-border m-auto";
						preloaderElement.appendChild(preloaderSpinner);
						var helper = document.createElement('span');
						helper.className = "visually-hidden";
						helper.innerHTML = "Loading...";
						preloaderElement.appendChild(helper);

						if (responseTargetElement != null) {
							responseTargetElement.appendChild(preloaderElement);
						}
					}, 200); //Small delay to secure that the preloader is not loaded all the time
				}

				const newParams = new URLSearchParams(formData); //Get parameters from the form
				var url = new URL(form.action);	//Get the url from the form
				var pageId = url.searchParams.get("ID");

				if (pageId) {
					newParams.set("ID", pageId);
				}
				newParams.set("LayoutTemplate", "Swift_PageClean.cshtml"); //Set template to not include header and footer

				var newUrl = url.origin + url.pathname + "?" + newParams.toString(); //Create url with the new parameters 

				let response = await fetch(newUrl);
				if (response.ok) {
					//Update URL
					let updateUrl = "true";
					if (form.getAttribute("data-update-url") != undefined) {
						updateUrl = form.getAttribute("data-update-url");
					}

					if (updateUrl != "false") {
						newParams.delete("LayoutTemplate");

						var updatedUrl = window.location.origin + window.location.pathname + "?" + newParams;
						window.history.replaceState({}, '', decodeURI(updatedUrl));
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

				//Run scripts from the loaded html
				var scripts = Array.prototype.slice.call(responseTargetElement.getElementsByTagName("script"));
				for (var i = 0; i < scripts.length; i++) {
					if (scripts[i].src != "") {
						var tag = document.createElement("script");
						tag.src = scripts[i].src;
						document.getElementsByTagName("head")[0].appendChild(tag);
					}
					else {
						eval(scripts[i].innerHTML);
					}
				}

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
