const ExpressBuy = function (){
	return {
		OpenReplacementModal: function(productCounter){
			const modalBody = document.querySelector("#replacementProductsModal .modal-body");
			const productArticle = document.querySelector("article[data-product-counter='" + productCounter + "']");
			const productReplacementFeed = productArticle.getAttribute("data-replacement-feed");
	
			swift.PageUpdater.UpdateFromUrl(modalBody, productReplacementFeed).then(function() {
				const productNameElement = productArticle.querySelector(".productName");
				const modalTitleProductName = document.querySelector("#modalTitleProductName");
				const modalProductCounter = document.querySelector("#modalProductCounter");
	
				modalTitleProductName.innerHTML = productNameElement.innerHTML
				modalProductCounter.value = productCounter;
			});
		},
	
		AcceptReplacementProduct: function (){
			const productCounter = document.querySelector("#modalProductCounter").value;
			const replacementArticle = document.querySelector("#replacementProductsModal .modal-body article");
			const productArticle = document.querySelector("article[data-product-counter='" + productCounter + "']");
	
			replacementArticle.classList.remove("d-none");
			productArticle.replaceWith(replacementArticle);
	
			this.UpdateReplacementElements(true);
		},
	
		RefuseReplacementProduct: function () {
			this.UpdateReplacementElements(false);
		},
	
		UpdateReplacementElements: function(replaced) {
			const productCounter = document.querySelector("#modalProductCounter").value;
	
			document.querySelectorAll(".productReplacementMessage[data-product-counter='" + productCounter + "']").forEach(function (messageElement) {
				messageElement.innerHTML = replaced ? messageElement.getAttribute("data-replaced-by-message") : messageElement.getAttribute("data-replace-refused-message");
			})
	
			document.querySelector(".productReplacementsButton[data-product-counter='" + productCounter + "']").remove();
		}
	}
}();

export { ExpressBuy };
