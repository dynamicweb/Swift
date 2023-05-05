const ExpressBuy = function (){
	return {
		OpenReplacementModal: function(productCounter){
			const modalBody = document.querySelector("#replacementProductsModal .modal-body");
			const productArticle = document.querySelector("article[data-product-counter='" + productCounter + "']");
			const productReplacementFeed = productArticle.getAttribute("data-replacement-feed");
	
			swift.PageUpdater.UpdateFromUrl(modalBody, productReplacementFeed).then(function() {
				const productNameElement = productArticle.querySelector(".productName");
				const modalTitleProductName = document.querySelector("#modalTitleProductName");
	
				modalTitleProductName.innerHTML = productNameElement.innerHTML
				sessionStorage.setItem("productCounter", productCounter);
			});
		},
	
		AcceptReplacementProduct: function (){
			const productCounter = sessionStorage.getItem("productCounter");
			const replacementArticle = document.querySelector("#replacementProductsModal .modal-body article");
			const productArticle = document.querySelector("article[data-product-counter='" + productCounter + "']");
			
			productArticle.replaceWith(replacementArticle);
			this.UpdateReplacementElements(productCounter, true);
		},
	
		RefuseReplacementProduct: function () {
			const productCounter = sessionStorage.getItem("productCounter");
			this.UpdateReplacementElements(sessionStorage.getItem("productCounter"), false);
		},
	
		UpdateReplacementElements: function(productCounter, replaced) {
			document.querySelectorAll(".productReplacementMessage[data-product-counter='" + productCounter + "']").forEach(function (messageElement) {
				messageElement.innerHTML = replaced ? messageElement.getAttribute("data-replaced-by-message") : messageElement.getAttribute("data-replace-refused-message");
			})
			document.querySelector(".productReplacementsButton[data-product-counter='" + productCounter + "']").remove();
			sessionStorage.removeItem("productCounter");
		}
	}
}();

export { ExpressBuy };
