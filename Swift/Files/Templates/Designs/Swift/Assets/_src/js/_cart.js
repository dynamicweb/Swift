const Cart = function () {
	let productId;
	let productVariantId;
	let productUnitId;
	let productName;
	let productVariantName;
	let productCurrency;
	let productReferer;
	let productPrice;
	let addQuantity;
	let isPendingQuote = "false";

	return {
		Update: async function (e) {
			//NP: clickedButton is not always the button. Sometimes it is the qty input field if [enter] is pressed
			const clickedButton = e.currentTarget != undefined ? e.currentTarget : e;
			const form = clickedButton.closest("form");
			const quantityField = form.querySelector('[name="Quantity"]');

			//Setup the form data
			let formData = new FormData(form);
			productId = formData.get("ProductId");
			productVariantId = formData.get("VariantId");
			productUnitId = formData.get("UnitID");
			productName = formData.get("ProductName");
			productVariantName = formData.get("ProductVariantName");
			productCurrency = formData.get("ProductCurrency");
			productReferer = formData.get("ProductReferer");
			productPrice = formData.get("ProductPrice");
			addQuantity = formData.get("Quantity") ? formData.get("Quantity") : 1;
			isPendingQuote = formData.get("PendingQuote") ? formData.get("PendingQuote") : "false";

			this.PushDataToGoogleAnalytics();

			let event = new CustomEvent("update.swift.cart", {
			//Fire the 'update' event
				cancelable: true,
				detail: {
					formData: formData,
					parentEvent: e
				}
			});
			let globalDispatcher = document.dispatchEvent(event);
			let localDispatcher = clickedButton.dispatchEvent(event);
			
			if (globalDispatcher != false && localDispatcher != false) {

				const isMinQuantityValid = this.ValidateMinQuantity(quantityField);
				const isStepQuantityValid = this.ValidateStepQuantity(quantityField);
				const isMaxQuantityValid = this.ValidateMaxQuantity(quantityField);
				const isValid = isMinQuantityValid && isStepQuantityValid && isMaxQuantityValid;
				quantityField.classList.remove("is-invalid");

				//The actual cart call (add to cart)
				if (isPendingQuote == "true") {
					PromptPendingQuoteMessage();
				}
				else if (isValid) {
					this.AddToCart(clickedButton, form, formData);
				} else if (!isMinQuantityValid) {
					this.PromptMinQuantityFailedWarning(quantityField, form);
				} else if (!isStepQuantityValid) {
					this.PromptStepQuantityFailedWarning(form);
				} else if (!isMaxQuantityValid) {
					quantityField.classList.add("is-invalid");
				} else {
					quantityField.classList.remove("is-invalid");
				}				
			}
		},
		PromptPendingQuoteMessage: function () {
			const pendingQuoteMessage = form.querySelector(".js-pending-quote-notice").innerHTML;
			document.querySelector("#DynamicModalContent").innerHTML = pendingQuoteMessage;

			let dynamicModal = new bootstrap.Modal(document.querySelector('#DynamicModal'), {
				backdrop: 'static'
			});
			dynamicModal.show();
		},
		AddToCart: async function (clickedButton, form, formData) {
			//UI updates
			const clickedButtonWidth = clickedButton.offsetWidth + "px";

			clickedButton.setAttribute("data-content", clickedButton.innerHTML);
			clickedButton.style.width = clickedButtonWidth;
			clickedButton.classList.add("disabled");
			clickedButton.disabled = true;
			clickedButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>circle-notch</title><g fill="#ffffff"><path d="M288 24.103v8.169a11.995 11.995 0 0 0 9.698 11.768C396.638 63.425 472 150.461 472 256c0 118.663-96.055 216-216 216-118.663 0-216-96.055-216-216 0-104.534 74.546-192.509 174.297-211.978A11.993 11.993 0 0 0 224 32.253v-8.147c0-7.523-6.845-13.193-14.237-11.798C94.472 34.048 7.364 135.575 8.004 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.789 504 256c0-121.187-86.924-222.067-201.824-243.704C294.807 10.908 288 16.604 288 24.103z"></path></g></svg>';

			Cart.GetMiniCarts(formData.get("minicartid")).forEach(function (el) {
				el.classList.add("mini-cart-quantity-added");
			});

			//Fetch
			const fetchOptions = {
				method: 'POST',
				body: formData
			};

			let response = await fetch(form.action, fetchOptions);

			if (response.ok) {
				Cart.Success(response, clickedButton, formData);
			} else {
				Cart.Error(response, clickedButton);
			}
		},
		UpdateOnEnterKey: function (e) {
			const input = e.currentTarget != undefined ? e.currentTarget : e;
			e.preventDefault();

			input.onkeydown = (e) => {
				if (e.keyCode === 13) {
					Cart.Update(e);
				}
			};
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
			let globalDispatcher = document.dispatchEvent(event);
			let localDispatcher = clickedButton.dispatchEvent(event);

			if (globalDispatcher != false && localDispatcher != false) {
				//Cleanup
				clickedButton.classList.remove("disabled");
				clickedButton.style.width = "";
				clickedButton.disabled = false;
				clickedButton.innerHTML = clickedButton.getAttribute("data-content");
				clickedButton.setAttribute("data-content", "");

				let removeFocusCssClassTimer = setTimeout(function () {
					Cart.GetMiniCarts(formData.get("minicartid")).forEach(function (el) {
						el.classList.remove("mini-cart-quantity-added");
					});
				}, 200);

				//Replace the markup (Update min carts counters)
				let totalQuantity = html != undefined ? html : 0;
				Cart.GetMiniCarts(formData.get("minicartid")).forEach(function (el) {
					el.innerHTML = "(" + totalQuantity.trim() + ")";
				});
				
			}
		},

		Error: async function (response, clickedButton) {
			//Cleanup
			let removeFocusCssClassTimer = setTimeout(function () {
				document.querySelectorAll(".js-cart-qty").forEach(function (el) {
					el.classList.remove("mini-cart-quantity-added");
				});
			}, 200);

			clickedButton.classList.remove("disabled");
			clickedButton.style.width = "";
			clickedButton.disabled = false;
			clickedButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>circle-notch</title><g fill="#ffffff"><path d="M288 24.103v8.169a11.995 11.995 0 0 0 9.698 11.768C396.638 63.425 472 150.461 472 256c0 118.663-96.055 216-216 216-118.663 0-216-96.055-216-216 0-104.534 74.546-192.509 174.297-211.978A11.993 11.993 0 0 0 224 32.253v-8.147c0-7.523-6.845-13.193-14.237-11.798C94.472 34.048 7.364 135.575 8.004 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.789 504 256c0-121.187-86.924-222.067-201.824-243.704C294.807 10.908 288 16.604 288 24.103z"></path></g></svg>';
		},

		PushDataToGoogleAnalytics: function() {
			if (typeof gtag !== "undefined") {
				gtag("event", "add_to_cart", {
					currency: productCurrency,
					value: productPrice,
					items: [
						{
							item_id: productId,
							item_name: productName,
							item_variant: productVariantName,
							currency: productCurrency,
							item_list_id: productReferer,
							price: productPrice,
							quantity: addQuantity
						}
					]
				});
			}
		},

		GetMiniCarts: function (miniCartId) {
			let miniCarts = [];

			if (miniCartId != null) {
				const miniCartElement = document.querySelector("#Cart_" + miniCartId);

				if (miniCartElement) {
					miniCarts = [miniCartElement];
				} else {
					console.log("Mini cart page is missing");
				}
			} else {
				miniCarts = document.querySelectorAll(".js-cart-qty");
			}

			return miniCarts;
		},
		ValidateMinQuantity: function (quantityField) {
			let isValid = true;

			if (quantityField != null) {
				const quantity = parseFloat(quantityField.value);
				const minQuantity = parseFloat(quantityField.min);
				isValid = quantity < minQuantity ? false : isValid;
			}

			return isValid;
		},
		ValidateMaxQuantity: function (quantityField) {

			const enteredValue = parseFloat(quantityField.value);
			const maxValue = parseFloat(quantityField.max);
			if (enteredValue > maxValue) {
				quantityField.value = maxValue;
				return false;
			}
			return true;
		},
		ValidateCartQuantity: function (inputElement) {
			const enteredValue = parseFloat(inputElement.value);
			const maxValue = parseFloat(inputElement.max);

			if (maxValue && enteredValue > maxValue) {
				inputElement.value = maxValue;
			}
		},
		
		ValidateStepQuantity: function (quantityField) {
			let isValid = true;

			if (quantityField != null) {
				const quantity = parseFloat(quantityField.value);
				const stepQty = parseFloat(quantityField.step);
				
				isValid = quantity % stepQty == 0;
			}
			
			return isValid;
		},
		PromptStepQuantityFailedWarning: function (form) {
			const dynamicModal = new bootstrap.Modal(document.querySelector('#DynamicModal'), {});
			const stepQuantityWarning = form.querySelector(".js-step-quantity-warning");

			const message = stepQuantityWarning.innerHTML;
			document.querySelector("#DynamicModalContent").innerHTML = message;

			if (!document.querySelector('#DynamicModal').classList.contains("show")) {
				dynamicModal.show();
			}
		},
		PromptMinQuantityFailedWarning: function (quantityField, form) {
			const dynamicModal = new bootstrap.Modal(document.querySelector('#DynamicModal'), { });
			const minQuantityWarning = form.querySelector(".js-min-quantity-warning");

			const message = minQuantityWarning.innerHTML;
			const minQuantity = parseFloat(quantityField.min);
			document.querySelector("#DynamicModalContent").innerHTML = message;

			if (!document.querySelector('#DynamicModal').classList.contains("show")) {
				dynamicModal.show();
			}
			
			quantityField.value = minQuantity;
			
		}
	}
}();

export { Cart };
