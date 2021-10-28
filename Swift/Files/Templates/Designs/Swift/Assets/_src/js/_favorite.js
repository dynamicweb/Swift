const Favorite = function () {

	return {
		Update: async function (e) {
			var clickedButton = e.currentTarget;
			var form = clickedButton.closest('form');

			var command = clickedButton.getAttribute('data-command');
			command = command == "add" ? "addproducttofavoritelist" : command;
			command = command == "remove" ? "removeproductfromfavoritelist" : command;
			form.querySelector('[name="FavoriteListId"]').value = clickedButton.getAttribute('data-list-id');
			form.querySelector('[name="FavoriteCmd"]').value = command;

			if (command == "addproducttofavoritelist") {
				clickedButton.setAttribute('data-command', 'remove');
				clickedButton.querySelector('.js-filled-favorite-icon').classList.remove('d-none');
				clickedButton.querySelector('.js-outline-favorite-icon').classList.add('d-none');
			} else {
				clickedButton.setAttribute('data-command', 'add');
				clickedButton.querySelector('.js-filled-favorite-icon').classList.add('d-none');
				clickedButton.querySelector('.js-outline-favorite-icon').classList.remove('d-none');
			}

			if (clickedButton.closest('form').querySelector('.js-any-filled-favorite-icon') != null) {
				var favoriteFound = false;
				clickedButton.closest('form').querySelectorAll('.js-filled-favorite-icon').forEach(function (icon) {
					if (!icon.classList.contains('d-none')) {
						favoriteFound = true;
					}
				});

				if (favoriteFound) {
					clickedButton.closest('form').querySelector('.js-any-filled-favorite-icon').classList.remove('d-none');
					clickedButton.closest('form').querySelector('.js-any-outline-favorite-icon').classList.add('d-none');
				} else {
					clickedButton.closest('form').querySelector('.js-any-filled-favorite-icon').classList.add('d-none');
					clickedButton.closest('form').querySelector('.js-any-outline-favorite-icon').classList.remove('d-none');
				}
			}

			let formData = new FormData(form);
			var fetchOptions = {
				method: 'POST',
				body: formData
			};

			//Fire the 'update' event
			let event = new CustomEvent("update.swift.favorite", {
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
					Favorite.Success(response, formData, clickedButton);
				} else {
					Favorite.Error(response);
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
							document.querySelector("#favoriteNotificationToast_Image").src = data.Thumbnail;
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

export { Favorite };
