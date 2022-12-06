const Image = function () {

	return {
		init: function () {
			document.querySelectorAll(".js-image").forEach(function (imageElement) {
				const productElement = imageElement.closest(".js-product");
				const stretchyLink = productElement ? productElement.querySelector(".stretched-link") : null;

				if (stretchyLink && imageElement) {
					stretchyLink.addEventListener("mouseover", function (e) { swift.Image.switchImage(e); });
					stretchyLink.addEventListener("mouseout", function (e) { swift.Image.switchImage(e); });
				} else if (imageElement) {
					imageElement.addEventListener("mouseover", function (e) { swift.Image.switchImage(e); });
					imageElement.addEventListener("mouseout", function (e) { swift.Image.switchImage(e); });
				}
			});
		},

		switchImage: function (e) {
			const currentStretchLink = e.currentTarget;
			const currentImage = currentStretchLink.closest(".js-product") ? currentStretchLink.closest(".js-product").querySelector(".js-image") : currentStretchLink.closest("#content").querySelector(".js-image");

			if (currentImage) {
				const currentDefaultImage = currentImage.getAttribute("srcset");
				const currentAlternativeImage = currentImage.getAttribute("data-alternative-image");

				if (currentAlternativeImage) {
					currentImage.setAttribute("srcset", currentAlternativeImage);
					currentImage.setAttribute("data-alternative-image", currentDefaultImage);
				}
			}
		},
	}

}();

export { Image };
