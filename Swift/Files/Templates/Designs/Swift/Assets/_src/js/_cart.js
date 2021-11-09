const Cart = function () {
	return {
		Update: async function (e) {
			var clickedButton = e.currentTarget != undefined ? e.currentTarget : e;

			//Setup the form data
			var form = clickedButton.closest("form");
			let formData = new FormData(form);
			var fetchOptions = {
				method: 'POST',
				body: formData
			};

			//Fire the 'update' event
			let event = new CustomEvent("update.swift.cart", {
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
				var clickedButtonWidth = clickedButton.width + "px";

				clickedButton.setAttribute("data-content", clickedButton.innerHTML);
				clickedButton.style.width = clickedButtonWidth;
				clickedButton.classList.add("disabled");
				clickedButton.disabled = true;
				clickedButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>circle-notch</title><g fill="#ffffff"><path d="M288 24.103v8.169a11.995 11.995 0 0 0 9.698 11.768C396.638 63.425 472 150.461 472 256c0 118.663-96.055 216-216 216-118.663 0-216-96.055-216-216 0-104.534 74.546-192.509 174.297-211.978A11.993 11.993 0 0 0 224 32.253v-8.147c0-7.523-6.845-13.193-14.237-11.798C94.472 34.048 7.364 135.575 8.004 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.789 504 256c0-121.187-86.924-222.067-201.824-243.704C294.807 10.908 288 16.604 288 24.103z"></path></g></svg>';

				document.querySelectorAll(".js-cart-qty").forEach(function (el) {
					el.classList.add("mini-cart-quantity-added");
				});

				//Fetch
				let response = await fetch(form.action, fetchOptions);

				if (response.ok) {
					Cart.Success(response, clickedButton, formData);
				} else {
					Cart.Error(response, clickedButton);
				}
			}
		},

		Success: async function (response, clickedButton, formData) {
			let html = await response.text().then(function (text) {
				return text;
			});

			//Fire the 'updated'´event
			let event = new CustomEvent("updated.swift.cart", {
				cancelable: true,
				detail: {
					formData: formData,
					html: html
				}
			});
			var globalDispatcher = document.dispatchEvent(event);
			var localDispatcher = clickedButton.dispatchEvent(event);

			if (globalDispatcher != false && localDispatcher != false) {
				//Cleanup
				clickedButton.classList.remove("disabled");
				clickedButton.style.width = "auto";
				clickedButton.disabled = false;
				clickedButton.innerHTML = clickedButton.getAttribute("data-content");
				clickedButton.setAttribute("data-content", "");

				var removeFocusCssClassTimer = setTimeout(function () {
					document.querySelectorAll(".js-cart-qty").forEach(function (el) {
						el.classList.remove("mini-cart-quantity-added");
					});
				}, 200);

				//Replace the markup
				var totalQuantity = html != undefined ? html : 0;
				document.querySelectorAll(".js-cart-qty").forEach(function (el) {
					el.innerHTML = "(" + totalQuantity.trim() + ")";
				})
			}
		},

		Error: async function (response, clickedButton) {
			//Cleanup
			var removeFocusCssClassTimer = setTimeout(function () {
				document.querySelectorAll(".js-cart-qty").forEach(function (el) {
					el.classList.remove("mini-cart-quantity-added");
				});
			}, 200);

			clickedButton.classList.remove("disabled");
			clickedButton.style.width = "auto";
			clickedButton.disabled = false;
			clickedButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>circle-notch</title><g fill="#ffffff"><path d="M288 24.103v8.169a11.995 11.995 0 0 0 9.698 11.768C396.638 63.425 472 150.461 472 256c0 118.663-96.055 216-216 216-118.663 0-216-96.055-216-216 0-104.534 74.546-192.509 174.297-211.978A11.993 11.993 0 0 0 224 32.253v-8.147c0-7.523-6.845-13.193-14.237-11.798C94.472 34.048 7.364 135.575 8.004 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.789 504 256c0-121.187-86.924-222.067-201.824-243.704C294.807 10.908 288 16.604 288 24.103z"></path></g></svg>';
		},

		QuantityValidate: function (event) {
			var quantityField = event.target;
			var feedbackElement = quantityField.closest(".js-input-group").querySelector(".invalid-feedback");
			var isValid = quantityField.checkValidity();

			if (!isValid) {
				quantityField.classList.add("is-invalid");
				feedbackElement.classList.remove("d-none");
			} else {
				quantityField.classList.remove("is-invalid");
				feedbackElement.classList.add("d-none");
			}
		}
	}
}();

export { Cart };
