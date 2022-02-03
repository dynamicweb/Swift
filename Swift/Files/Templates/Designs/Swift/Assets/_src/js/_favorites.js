const Favorites = function () {

	return {
		Toggle: function (e, url, type) {
			if (type == 'single-list') { //Only one favorite list is available
				swift.PageUpdater.UpdateFromUrl(e, url);
			} else if (type == 'multiple-lists') { //Multiple favorite lists are available
				var clickedButton = e.currentTarget != undefined ? e.currentTarget : e;
				clickedButton.setAttribute('data-response-target-element', 'DynamicOffcanvas');
				swift.PageUpdater.UpdateFromUrl(e, url);

				var dynamicOffcanvas = new bootstrap.Offcanvas(document.querySelector('#DynamicOffcanvas'))
				dynamicOffcanvas.show();
			} else if (type == 'remove-from-list') { //Simple remove the product from the list
				window.location = url;
			}
		},

		Update: async function (e) {
			var clickedButton = e.currentTarget != undefined ? e.currentTarget : document.querySelector('#' + e);
			var form = e.currentTarget != undefined ? clickedButton.closest('form') : document.querySelector('#' + e);

			var productId = form.getAttribute('data-product-id');
			var variantId = form.getAttribute('data-variant-id');
			var productButton = document.querySelector('#FavoriteBtn_' + productId + variantId);

			//The command is used when there is multiple lists to choose from (Change the command + listid on the form)
			if (clickedButton.getAttribute('data-command') != null) {
				var command = clickedButton.getAttribute('data-command');

				if (command != null) {
					command = command == "add" ? "addproducttofavoritelist" : command;
					command = command == "remove" ? "removeproductfromfavoritelist" : command;
					form.querySelector('[name="FavoriteListId"]').value = clickedButton.getAttribute('data-list-id');
					form.querySelector('[name="FavoriteCmd"]').value = command;
				}
			}

			var inAnyCurrentList = false;
			clickedButton.closest('form').querySelectorAll('[data-in-this-list]').forEach(function (favoriteListButton) {
				if (favoriteListButton.getAttribute('data-in-this-list') == "True") {
					inAnyCurrentList = true;
				}
			});

			var clickedButtonState = clickedButton.getAttribute("data-in-this-list");
			if (clickedButtonState != null) {
				if (clickedButtonState == "True") {
					clickedButton.setAttribute("data-in-this-list", "False");
				} else {
					clickedButton.setAttribute("data-in-this-list", "True");
				}
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

			if (globalDispatcher != false) {
				let response = await fetch(form.action, fetchOptions);

				if (response.ok) {
					Favorites.Success(response, formData, clickedButton, productButton, inAnyCurrentList);
				} else {
					Favorites.Error(response);
				}
			}
		},

		Success: async function (response, formData, clickedButton, productButton, inAnyCurrentList) {
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
							var found = false;
							var inAnyList = false;
							clickedButton.closest('form').querySelectorAll('[data-in-this-list]').forEach(function (favoriteListButton) {
								if (favoriteListButton.getAttribute('data-in-this-list') == "True") {
									inAnyList = true;
								}
								found = true;
							});

							if (found == true) { //Chech if anything changed in any of the favorite lists. If yes, change the icon on the product favorite button.
								if (inAnyCurrentList != inAnyList) {
									var icon = productButton.querySelector('.favorite-icon');

									if (icon.querySelector('.not-in-list').classList.contains('d-none')) {
										icon.querySelector('.in-list').classList.add('d-none');
										icon.querySelector('.not-in-list').classList.remove('d-none');
									} else {
										icon.querySelector('.in-list').classList.remove('d-none');
										icon.querySelector('.not-in-list').classList.add('d-none');
									}
								}
							} else {
								var icon = productButton.querySelector('.favorite-icon');

								if (icon.querySelector('.not-in-list').classList.contains('d-none')) {
									icon.querySelector('.in-list').classList.add('d-none');
									icon.querySelector('.not-in-list').classList.remove('d-none');
								} else {
									icon.querySelector('.in-list').classList.remove('d-none');
									icon.querySelector('.not-in-list').classList.add('d-none');
								}
							}
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
