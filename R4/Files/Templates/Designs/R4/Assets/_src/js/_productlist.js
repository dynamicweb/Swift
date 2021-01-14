var ProductList = function () { }


ProductList.prototype.Update = async function (e) {
	var clickedButton = e.currentTarget;
	var form = clickedButton.closest("form");
	var responseTargetElement = "#" + form.getAttribute("data-response-target-element");

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

	let formData = new FormData(form);
	var fetchOptions = {
		method: 'POST',
		body: formData
	};
	let response = await fetch(form.action, fetchOptions);

	if (response.ok) {
		//Update URL
		let url = window.location.origin + window.location.pathname;
		const newParams = new URLSearchParams(formData);

		url += "?" + newParams.toString();
		window.history.pushState({}, '', url);

		//Success
		ProductList.Success(response, responseTargetElement, addPreloaderTimer);
	} else {
		ProductList.Error(response, responseTargetElement, addPreloaderTimer);
	}
}

ProductList.prototype.Success = async function (response, responseTargetElement, addPreloaderTimer) {
	clearTimeout(addPreloaderTimer);

	//Remove preloader
	if (document.querySelector("#overlay")) {
		document.querySelector("#overlay").parentNode.removeChild(document.querySelector("#overlay"));
	}

	//Replace content
	let html = await response.text().then(function (text) {
		return text;
	});

	document.querySelector(responseTargetElement).innerHTML = html;
}

ProductList.prototype.Error = function (e, responseTargetElement, addPreloaderTimer) {
	clearTimeout(addPreloaderTimer);

	if (document.querySelector("#overlay")) {
		document.querySelector("#overlay").parentNode.removeChild(document.querySelector("#overlay"));
	}
}

ProductList.prototype.ResetFacets = async function (e) {
	var clickedButton = e.currentTarget;
	var form = clickedButton.closest("form");

	form.querySelectorAll("input[type='checkbox']").forEach(function (el) {
		el.checked = false;
	});

	ProductList.Update(e);
}

var ProductList = new ProductList();
