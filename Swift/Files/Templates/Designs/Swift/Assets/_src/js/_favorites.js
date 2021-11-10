const Favorites = function () {

	return {
		GetList: function (e) {
			var clickedButton = e.currentTarget;
			swift.PageUpdater.Update(clickedButton);
		},

		Update: async function (e) {
			var clickedButton = e.currentTarget;
			var form = clickedButton.closest('form');

			var productId = clickedButton.getAttribute('data-product-id');
			var variantId = clickedButton.getAttribute('data-variant-id');
			var productBtn = document.querySelector('#FavoriteBtn_' + productId + variantId);

			var command = clickedButton.getAttribute('data-command');
			command = command == "add" ? "addproducttofavoritelist" : command;
			command = command == "remove" ? "removeproductfromfavoritelist" : command;
			form.querySelector('[name="FavoriteListId"]').value = clickedButton.getAttribute('data-list-id');
			form.querySelector('[name="FavoriteCmd"]').value = command;

			/* Update the clicked button */
			if (command == "addproducttofavoritelist") {
				clickedButton.setAttribute('data-command', 'remove');
				clickedButton.querySelector('.js-filled-favorite-icon').classList.remove('d-none');
				clickedButton.querySelector('.js-outline-favorite-icon').classList.add('d-none');
			} else {
				clickedButton.setAttribute('data-command', 'add');
				clickedButton.querySelector('.js-filled-favorite-icon').classList.add('d-none');
				clickedButton.querySelector('.js-outline-favorite-icon').classList.remove('d-none');
			}

			/* Update the specific product favorite icon */
			if (clickedButton.closest('form') && productBtn) {
				var favoriteFound = false;
				clickedButton.closest('form').querySelectorAll('.js-filled-favorite-icon').forEach(function (icon) {
					if (!icon.classList.contains('d-none')) {
						favoriteFound = true;
					}
				});

				if (favoriteFound) {
					productBtn.querySelector('.js-any-filled-favorite-icon').classList.remove('d-none');
					productBtn.querySelector('.js-any-outline-favorite-icon').classList.add('d-none');
				} else {
					productBtn.querySelector('.js-any-filled-favorite-icon').classList.add('d-none');
					productBtn.querySelector('.js-any-outline-favorite-icon').classList.remove('d-none');
				}

				productBtn.blur();
			}

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
			var localDispatcher = clickedButton.dispatchEvent(event);

			if (globalDispatcher != false && localDispatcher != false) {
				let response = await fetch(form.action, fetchOptions);

				if (response.ok) {
					Favorites.Success(response, formData, clickedButton);
				} else {
					Favorites.Error(response);
				}
			}
		},

		Success: async function (response, formData, clickedButton) {
			var favoriteNotification = document.querySelector("#favoriteNotificationToast");

			//Fire the 'updated'´event
			let event = new CustomEvent("updated.swift.cart", {
				cancelable: true,
				detail: {
					formData: formData
				}
			});
			var globalDispatcher = document.dispatchEvent(event);
			var localDispatcher = clickedButton.dispatchEvent(event);

			if (favoriteNotification && globalDispatcher != false && localDispatcher != false) {
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
