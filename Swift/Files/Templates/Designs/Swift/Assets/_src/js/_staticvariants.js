const StaticVariants = function () {

	return {
		SwitchProduct: function (e, id, price, imagesrc) {
			console.log("sss");

			var target = e.currentTarget;

			var productImageElement = target.closest(".js-product").querySelector("#ProductImage_" + id);
			var productPriceElement = target.closest(".js-product").querySelector("#ProductPrice_" + id + " .text-price");

			if (productPriceElement) {
				productPriceElement.innerText = price;
			}

			if (productImageElement) {
				productImageElement.src = imagesrc;

				var imageSrcset = productImageElement.srcset;
				imageSrcset = imageSrcset.replace(/image=.*?&/g, 'image=' + imagesrc + "&");

				productImageElement.srcset = imageSrcset;
			}
		}
	}
}();

export { StaticVariants };
