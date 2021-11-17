const Favorites = function () {

	return {
		Update: async function (e) {
			var clickedButton = e.currentTarget != undefined ? e.currentTarget : e;
			var form = e.currentTarget != undefined ? clickedButton.closest('form') : document.querySelector('#' + e);

			var productId = form.getAttribute('data-product-id');
			var variantId = form.getAttribute('data-variant-id');
			var productButton = document.querySelector('#FavoriteBtn_' + productId + variantId);

			let formData = new FormData(form);
			var fetchOptions = {
				method: 'POST',
				body: formData
			};

			//Fire the 'update' event
			let event = new CustomEvent("update.swift.favorites", {
				cancelable: true,
				detail: {
					formData: formData,
					parentEvent: e
				}
			});
			var globalDispatcher = document.dispatchEvent(event);

			if (globalDispatcher != false) {
				let response = await fetch(form.action, fetchOptions);

				if (response.ok) {
					Favorites.Success(response, formData, clickedButton, productButton);
				} else {
					Favorites.Error(response);
				}
			}
		},

		Success: async function (response, formData, clickedButton, productButton) {
			var favoriteNotification = document.querySelector("#favoriteNotificationToast");

			//Fire the 'updated'´event
			let event = new CustomEvent("updated.swift.cart", {
				cancelable: true,
				detail: {
					formData: formData
				}
			});
			var globalDispatcher = document.dispatchEvent(event);

			if (favoriteNotification && globalDispatcher != false) {
				var data = Object.fromEntries(formData.entries());
				var command = data.FavoriteCmd;
				var reloadPage = data.ReloadPage;

				if (command != null) {
					if (command == "addproducttofavoritelist" || command == "removeproductfromfavoritelist") {
						var favoriteToast = new bootstrap.Toast(favoriteNotification);
						favoriteToast.show();

						if (data.Thumbnail != "") {
							var imageElement = document.createElement('img');
							imageElement.src = data.Thumbnail;
							document.querySelector("#favoriteNotificationToast_Image").innerHTML = "";
							document.querySelector("#favoriteNotificationToast_Image").appendChild(imageElement);
						}
						document.querySelector("#favoriteNotificationToast_Text").innerHTML = data.ProductName;

						/* Update the specific product favorite icon */
						if (productButton) {
							var icon = productButton.querySelector('img');
							var currentIcon = icon.src;
							icon.src = icon.getAttribute("data-alt-icon");
							icon.setAttribute("data-alt-icon", icon);
						}
					}
				}

				if (reloadPage == "True" && command == "removeproductfromfavoritelist") {
					location.reload();
				}
			}
		},

		Error: function (e) {

		}
	}
}();

export { Favorites };
