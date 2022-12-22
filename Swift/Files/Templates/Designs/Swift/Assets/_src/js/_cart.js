const Cart = function () {
	return {
		Update: async function (e) {
			const clickedButton = e.currentTarget != undefined ? e.currentTarget : e;

			//Setup the form data
			const form = clickedButton.closest("form");
			let formData = new FormData(form);
			const fetchOptions = {
				method: 'POST',
				body: formData
			};

			const productId = formData.get("ProductId");
			const productVariantId = formData.get("VariantId");
			const productUnitId = formData.get("UnitID");
			const productName = formData.get("ProductName");
			const productVariantName = formData.get("ProductVariantName");
			const productCurrency = formData.get("ProductCurrency");
			const productReferer = formData.get("ProductReferer");
			const productPrice = formData.get("ProductPrice");
			const addQuantity = formData.get("Quantity") ? formData.get("Quantity") : 1;
			const stockQuantity = formData.get("Stock") ? formData.get("Stock") : 9999999;
			const getReservedAmount = formData.get("GetReservedAmount") ? formData.get("GetReservedAmount") : "false";

			// Push data to Google Analytics
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

			let event = new CustomEvent("update.swift.cart", {
			//Fire the 'update' event
				cancelable: true,
				detail: {
					formData: formData,
					parentEvent: e
				}
			});
			var globalDispatcher = document.dispatchEvent(event);
			var localDispatcher = clickedButton.dispatchEvent(event);

			if (globalDispatcher != false && localDispatcher != false) {
				let reservedAmount = 0;

				if (getReservedAmount == "true" && stockQuantity != 9999999) {
					const getReservedFormData = new FormData();
					getReservedFormData.append("GetReservedAmount", true);
					getReservedFormData.append("ProductId", productId);

					if (addQuantity != null) {
						getReservedFormData.append("Quantity", addQuantity);
					}

					if (productUnitId != null) {
						getReservedFormData.append("UnitId", productUnitId);
					}

					if (productVariantId != null) {
						getReservedFormData.append("VariantId", productVariantId);
					}

					const getReservedAmountfetchOptions = {
						method: 'POST',
						body: getReservedFormData
					};

					let response = await fetch(form.action, getReservedAmountfetchOptions);

					if (response.ok) {
						let amount = await response.text().then(function (text) {
							return text;
						});

						reservedAmount = amount;
					} else {
						Cart.Error(response, clickedButton);
					}
				}

				if (getReservedAmount == "false" || ((parseInt(addQuantity) + parseInt(reservedAmount)) <= parseInt(stockQuantity))) {
					//UI updates
					var clickedButtonWidth = clickedButton.offsetWidth + "px";

					clickedButton.setAttribute("data-content", clickedButton.innerHTML);
					clickedButton.style.width = clickedButtonWidth;
					clickedButton.classList.add("disabled");
					clickedButton.disabled = true;
					clickedButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>circle-notch</title><g fill="#ffffff"><path d="M288 24.103v8.169a11.995 11.995 0 0 0 9.698 11.768C396.638 63.425 472 150.461 472 256c0 118.663-96.055 216-216 216-118.663 0-216-96.055-216-216 0-104.534 74.546-192.509 174.297-211.978A11.993 11.993 0 0 0 224 32.253v-8.147c0-7.523-6.845-13.193-14.237-11.798C94.472 34.048 7.364 135.575 8.004 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.789 504 256c0-121.187-86.924-222.067-201.824-243.704C294.807 10.908 288 16.604 288 24.103z"></path></g></svg>';

					Cart.GetMiniCarts(formData.get("minicartid")).forEach(function (el) {
						el.classList.add("mini-cart-quantity-added");
					});

					//Fetch
					let response = await fetch(form.action, fetchOptions);

					if (response.ok) {
						Cart.Success(response, clickedButton, formData, reservedAmount);
					} else {
						Cart.Error(response, clickedButton);
					}
				} else {
					const outOfStockMessage = form.querySelector(".js-out-of-stock-notice").innerHTML;
					document.querySelector("#DynamicModalContent").innerHTML = outOfStockMessage;

					if (form.querySelector('[name="Quantity"]')) {
						form.querySelector('[name="Quantity"]').value = 1;
					}

					var dynamicModal = new bootstrap.Modal(document.querySelector('#DynamicModal'), {
						backdrop: 'static'
					});

					dynamicModal.show();
				}
			}
		},

		UpdateOnEnterKey: async function (e) {
			var input = e.currentTarget != undefined ? e.currentTarget : e;

			input.onkeydown = (e) => {
				if (e.keyCode === 13) {
					e.preventDefault()
					Cart.Update(e);
					input.value = 0;
				}
			};
		},

		Success: async function (response, clickedButton, formData, reservedAmount = 0) {
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
					Cart.GetMiniCarts(formData.get("minicartid")).forEach(function (el) {
						el.classList.remove("mini-cart-quantity-added");
					});
				}, 200);

				//Replace the markup
				var totalQuantity = html != undefined ? html : 0;

				Cart.GetMiniCarts(formData.get("minicartid")).forEach(function (el) {
					el.innerHTML = "(" + totalQuantity.trim() + ")";
				});

				//Update stock
				if (formData.get("GetReservedAmount") == "true") {
					const stockLevelElement = clickedButton.closest(".js-product") ? clickedButton.closest(".js-product").querySelector(".js-text-stock") : clickedButton.closest("#content").querySelector(".js-text-stock");

					if (stockLevelElement) {
						const stockQuantity = formData.get("Stock") ? formData.get("Stock") : 9999999;
						const addQuantity = formData.get("Quantity");

						if (stockQuantity != 9999999) {
							stockLevelElement.innerHTML = (parseInt(stockQuantity) - parseInt(addQuantity) - parseInt(reservedAmount));
						}
					}
				}
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

		GetMiniCarts: function (miniCartId) {
			var miniCarts = [];

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
