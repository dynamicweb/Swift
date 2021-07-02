const PageUpdater = function () {

	return {
		Update: async function (e) {
			var clickedButton = e.currentTarget != undefined ? e.currentTarget : e;
			var form = clickedButton.closest("form");
			var preloader = form.getAttribute("data-preloader");

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
			
		
			let formData = new FormData(form);
			formData.set("LayoutTemplate", "R4_PageClean.cshtml");
			var fetchOptions = {
				method: 'POST',
				body: formData
			};
			let response = await fetch(form.action, fetchOptions);

			if (response.ok) {
				//Success
				PageUpdater.Success(response, addPreloaderTimer, formData);
			} else {
				PageUpdater.Error(response, addPreloaderTimer);
			}
		},
		
		Success: async function (response, addPreloaderTimer, formData) {
			clearTimeout(addPreloaderTimer);
		
			//Remove preloader
			if (document.querySelector("#overlay")) {
				document.querySelector("#overlay").parentNode.removeChild(document.querySelector("#overlay"));
			}

			//Replace content
			if (document.querySelector("#content")) {
				let html = await response.text().then(function (text) {
					return text;
				});

				document.querySelector("#content").innerHTML = html;
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
