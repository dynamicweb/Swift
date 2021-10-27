const Favorite = function () {

	return {
		Add: function (e) {
			var clickedButton = e.currentTarget;
			var form = clickedButton.closest('form');
			form.querySelector('[name="FavoriteListId"]').value = clickedButton.getAttribute('data-list-id');
			form.querySelector('[name="FavoriteCmd"]').value = "addproducttofavoritelist";
			swift.PageUpdater.Update(form);
		},

		Remove: function (e) {
			var clickedButton = e.currentTarget;
			var form = clickedButton.closest('form');
			form.querySelector('[name="FavoriteListId"]').value = clickedButton.getAttribute('data-list-id');
			form.querySelector('[name="FavoriteCmd"]').value = "removeproductfromfavoritelist";
			swift.PageUpdater.Update(form);
		},

		Success: function () {
			var favoriteNotification = document.querySelector("#favoriteNotificationToast");

			if (favoriteNotification && event.detail.formData) {
				var data = Object.fromEntries(event.detail.formData.entries());
				var command = data.FavoriteCmd;

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
			}
		}
	}
}();

export { Favorite };
