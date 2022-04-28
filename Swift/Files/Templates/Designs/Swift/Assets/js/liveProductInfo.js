let LiveProductInfo = function () {
	this.config = {
		productInfoFeedAttr: "data-product-info-feed",
		priceFormattedAttr: "data-price-formatted",
		contentAttr: "content",
		productIdAttr: "data-product-id",
		showIfAttr: "data-show-if",
		innerSliderId: "tns1-iw",
		loaderClass: "spinner-border",
	}
	
	this.selectors = {
		productInfoFeed: "[" + this.config.productInfoFeedAttr + "]",
		showIfAttr: "[" + this.config.showIfAttr + "]",
		liveInfo: ".js-live-info",
		loader: "." + this.config.loaderClass,
		addToCart: ".js-add-to-cart-button",
		variantSelector: ".js-variant-selector-button",
		price: ".js-text-price",
		priceWithVat: ".js-text-price-with-vat",
		priceFormatted: "[" + this.config.priceFormattedAttr + "]",
		priceProp: "[itemprop='price']",
		priceBeforeDiscount: ".js-text-decoration-line-through",
		productPricesContainer: ".product-prices-container",
		productPrices: ".product-prices",
		productPriceTemplate: ".product-prices-template",
		productPriceQuantity: ".js-text-price-quantity",
		productPricePrice: ".js-text-price-price",
		stock: ".js-text-stock",
		expectedDelivery: ".js-text-expected-delivery",
		stockMessages: ".js-stock-state small, .js-stock-state p",
		relatedProducts: "[id^='RelatedProducts']",
		content: "#content",
	}
}

LiveProductInfo.prototype.UpdateProductInfo = function(selector) {
	const self = this;
	const feedUrlElements = selector ? selector.querySelectorAll(self.selectors.productInfoFeed) : document.querySelectorAll(self.selectors.productInfoFeed);
	feedUrlElements.forEach(function (el) {
		const liveInfoContainers = el.querySelectorAll(self.selectors.liveInfo);
		if (liveInfoContainers.length) {
			let feedUrl = el.getAttribute(self.config.productInfoFeedAttr);
			fetch(feedUrl, {
				method: "GET"
			})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				return self.UpdateValues(data, liveInfoContainers)
			})
			.catch(function (error) {
				console.error(error)
			})
		}
	})
}

let product;
let productPrice;
LiveProductInfo.prototype.UpdateValues = function (data, liveInfoContainers) {
	const self = this;
	liveInfoContainers.forEach(function (container) {
		product = self.GetProductData(container, data)

		container.querySelectorAll(self.selectors.loader).forEach(function (el){
			el.classList.remove(self.config.loaderClass);
		});
		
		if (product.Price != null) {
			let price = product.Price.PriceFormatted;
			
			if(product.VariantInfo != null)
			{
				if(product.VariantInfo.PriceMin != null && product.VariantInfo.PriceMax != null && product.VariantInfo.PriceMin.Price != product.VariantInfo.PriceMax.Price)
				{
					price = product.VariantInfo.PriceMin.PriceFormatted + " - " + product.VariantInfo.PriceMax.PriceFormatted;
				}
			}
			
			self.UpdateValue(container.querySelectorAll(self.selectors.price), price);
			self.UpdateDataAttribute(container.querySelectorAll(self.selectors.priceFormatted), self.config.priceFormattedAttr, product.Price.PriceFormatted);
			self.UpdateDataAttribute(container.querySelectorAll(self.selectors.priceProp), self.config.contentAttr, product.Price.Price);
		
			if (product.Price.PriceWithVat != null) {
				let priceWithVat = product.Price.PriceWithVatFormatted;

				if(product.VariantInfo != null)
				{
					if(product.VariantInfo.PriceMin != null && product.VariantInfo.PriceMax != null && product.VariantInfo.PriceMin.PriceWithVat != product.VariantInfo.PriceMax.PriceWithVat)
					{
						priceWithVat = product.VariantInfo.PriceMin.PriceWithVatFormatted + " - " + product.VariantInfo.PriceMax.PriceWithVatFormatted;
					}
				}
				
				priceWithVat = getDataSuffix(container, self.selectors.priceWithVat, priceWithVat); 
				self.UpdateValue(container.querySelectorAll(self.selectors.priceWithVat), priceWithVat, true);
			}
			
			if (product.PriceBeforeDiscount != null) {
				self.UpdateValue(container.querySelectorAll(self.selectors.priceBeforeDiscount), product.PriceBeforeDiscount.PriceFormatted);
				self.ShowConditionalElement(container.querySelectorAll(self.selectors.priceBeforeDiscount));
			}
		}

		if (product.Prices != null && product.Prices.length > 0) {
			let productPricesContainers = container.querySelectorAll(self.selectors.productPricesContainer);

			productPricesContainers.forEach(function (productPricesTopContainer){
				let productPricesContainer = productPricesTopContainer.querySelector(self.selectors.productPrices);
				let template = productPricesContainer.querySelector(self.selectors.productPriceTemplate);
				productPricesContainer.innerHTML = "";
				
				product.Prices.forEach(function (quantityPrice){
					productPrice = quantityPrice;
					let priceContainer = template.cloneNode(true);
					self.UpdateValue(priceContainer.querySelectorAll(self.selectors.productPriceQuantity), quantityPrice.Quantity);
					self.UpdateValue(priceContainer.querySelectorAll(self.selectors.productPricePrice), quantityPrice.Price.PriceFormatted);
					self.ShowConditionalElement(priceContainer.querySelectorAll(self.selectors.showIfAttr));
					productPricesContainer.append(priceContainer);
				});
			});
			
			self.ShowConditionalElement(productPricesContainers);
		}

		if (product.StockLevel != null) {
			let stockLevel = product.StockLevel > 100 ? "100+" : product.StockLevel;
			self.UpdateValue(container.querySelectorAll(self.selectors.stock), stockLevel);
			self.ShowConditionalElement(container.querySelectorAll(self.selectors.stockMessages));
		}

		if (product.ExpectedDelivery != null) {
			self.UpdateValue(container.querySelectorAll(self.selectors.expectedDelivery), product.ExpectedDelivery);
			self.ShowConditionalElement(container.querySelectorAll(self.selectors.expectedDelivery));
		}

		if (product.NeverOutOfstock || (product.StockLevel != null && product.StockLevel > 0)) {
			let addToCart = container.querySelector(self.selectors.addToCart);
			if(addToCart != null){
				addToCart.removeAttribute("disabled");
			}
		}

		let variantSelector = container.querySelector(self.selectors.variantSelector);
		if(variantSelector != null){
			variantSelector.removeAttribute("disabled");
		}
	});
	
	function getDataSuffix(container, selector, value) {
		const subContainer = container.querySelector(selector);
		if (!subContainer) return value;
		
		const suffix = subContainer.getAttribute("data-suffix");
		if (suffix === "") return value;
		
		return value + " " + suffix;
	}
}

LiveProductInfo.prototype.GetProductData = function (container, data) {
	const productId = container.getAttribute(this.config.productIdAttr);
	return data.Products ? data.Products.filter(function (el) {
		return el.Id === productId;
	})[0] : data;
}

LiveProductInfo.prototype.UpdateValue = function (containers, value, showElement) {
	containers.forEach(function (c) {
		c.innerHTML = value;
		
		if (showElement) {
			c.classList.remove("d-none");
		}
	})
}

LiveProductInfo.prototype.UpdateDataAttribute = function (containers, attribute, value) {
	containers.forEach(function (c) {
		c.setAttribute(attribute, value)
	})
}

LiveProductInfo.prototype.ShowConditionalElement = function (containers) {
	const self = this;
	containers.forEach(function (c) {
		if (eval(c.getAttribute(self.config.showIfAttr))) {
			c.classList.remove("d-none");
		}
	})
}

LiveProductInfo = new LiveProductInfo();

document.addEventListener("DOMContentLoaded", function () {
	LiveProductInfo.UpdateProductInfo();

	// NOTE: don't have a custom event that is fired after slider is loaded
	// https://doc.dynamicweb.com/forum/cms-standard-features/cms-standard-features/js-event-for-loaded-related-products
	const relatedProducts = document.querySelector(LiveProductInfo.selectors.relatedProducts);
	if (relatedProducts) {
		const observer = new MutationObserver(function (mutationsList, observer) {
			mutationsList.forEach(function (m) {
				if (m.target.id === LiveProductInfo.config.innerSliderId) {
					observer.disconnect();
					LiveProductInfo.UpdateProductInfo(relatedProducts);
				}
			})	
		});

		observer.observe(relatedProducts, {childList: true, subtree: true});
	}
})

document.addEventListener("updated.swift.pageupdater", function () {
	const feedUrlElements = document.querySelectorAll(LiveProductInfo.selectors.productInfoFeed);
	
	if (feedUrlElements.length) {
		const content = document.querySelector(LiveProductInfo.selectors.content);
		if (content) {
			const observer = new MutationObserver(function (mutationsList, observer) {
				observer.disconnect();
				LiveProductInfo.UpdateProductInfo();
			});
	
			observer.observe(content, { childList: true });
		}
	}
})
