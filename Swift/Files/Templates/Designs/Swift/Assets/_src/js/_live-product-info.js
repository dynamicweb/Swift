const LiveProductInfo = function () {
	return {
		product: "",
		productPrice: "",
		
		config: {
			productInfoFeedAttr: "data-product-info-feed",
			priceFormattedAttr: "data-price-formatted",
			contentAttr: "content",
			productIdAttr: "data-product-id",
			showIfAttr: "data-show-if",
			innerSliderId: "tns1-iw",
			loaderClass: "spinner-border",
		},

		selectors: {
			productInfoFeed: "[data-product-info-feed]",
			showIfAttr: "[data-show-if]",
			liveInfo: ".js-live-info",
			loader: ".spinner-border",
			addToCart: ".js-add-to-cart-button",
			variantSelector: ".js-variant-selector-button",
			price: ".js-text-price",
			priceWithVat: ".js-text-price-with-vat",
			priceFormatted: "[data-price-formatted]",
			priceProp: "[itemprop='price']",
			priceBeforeDiscount: ".js-text-decoration-line-through",
			productPricesContainer: ".product-prices-container",
			productPrices: ".product-prices",
			productPriceTemplate: ".product-prices-template",
			productPriceQuantity: ".js-text-price-quantity",
			productPricePrice: ".js-text-price-price",
			stock: ".js-text-stock",
			expectedDelivery: ".js-text-expected-delivery",
			stockMessages: ".js-stock-state div, .js-stock-state small, .js-stock-state p",
			relatedProducts: "[id^='RelatedProducts']",
			content: "#content",
		},
		
		init: function() {
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
			});
		},

		UpdateProductInfo: function(selector) {
			const self = this;
			const feedUrlElements = selector ? selector.querySelectorAll(self.selectors.productInfoFeed) : document.querySelectorAll(self.selectors.productInfoFeed);
			const liveInfoContainers = document.querySelectorAll(self.selectors.liveInfo);
			
			if (!(feedUrlElements && liveInfoContainers.length)) return;

			let uniqueFeeds = [];
			feedUrlElements.forEach(function (el) {
				const feedUrl = el.getAttribute(self.config.productInfoFeedAttr);
				if (uniqueFeeds.includes(feedUrl)) return;
				uniqueFeeds.push(feedUrl);
				
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
			})
		},

		UpdateValues: function (data, liveInfoContainers) {
			const self = this;
			liveInfoContainers.forEach(function (container) {
				self.product = self.GetProductData(container, data)
				const product = self.product;
				if (!product) return;
				
				container.querySelectorAll(self.selectors.loader).forEach(function (el){
					el.classList.remove(self.config.loaderClass);
				});

				if (self.product.Price != null && container.querySelectorAll(self.selectors.price)) {
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

				if (product.Prices != null && product.Prices.length > 0 && priceContainer.querySelectorAll(self.selectors.productPriceQuantity) && priceContainer.querySelectorAll(self.selectors.productPricePrice)) {
					let productPricesContainers = container.querySelectorAll(self.selectors.productPricesContainer);

					productPricesContainers.forEach(function (productPricesTopContainer){
						let productPricesContainer = productPricesTopContainer.querySelector(self.selectors.productPrices);
						let template = productPricesContainer.querySelector(self.selectors.productPriceTemplate);
						productPricesContainer.innerHTML = "";

						product.Prices.forEach(function (quantityPrice){
							self.productPrice = quantityPrice;
							let priceContainer = template.cloneNode(true);
							self.UpdateValue(priceContainer.querySelectorAll(self.selectors.productPriceQuantity), quantityPrice.Quantity);
							self.UpdateValue(priceContainer.querySelectorAll(self.selectors.productPricePrice), quantityPrice.Price.PriceFormatted);
							self.ShowConditionalElement(priceContainer.querySelectorAll(self.selectors.showIfAttr));
							productPricesContainer.append(priceContainer);
						});
					});

					self.ShowConditionalElement(productPricesContainers);
				}

				if (product.StockLevel != null && container.querySelectorAll(self.selectors.stock)) {
					let stockLevel = product.StockLevel > 100 ? "100+" : product.StockLevel;
					self.UpdateValue(container.querySelectorAll(self.selectors.stock), stockLevel);
					self.ShowConditionalElement(container.querySelectorAll(self.selectors.stockMessages));
				}

				if (product.ExpectedDelivery != null && container.querySelectorAll(self.selectors.expectedDelivery)) {
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
		},

		GetProductData: function (container, data) {
			const self = this;
			const productId = container.getAttribute(self.config.productIdAttr);
			return data.Products ? data.Products.filter(function (el) {
				return el.Id === productId;
			})[0] : data;
		},

		UpdateValue: function (containers, value, showElement) {
			containers.forEach(function (c) {
				c.innerHTML = value;

				if (showElement) {
					c.classList.remove("d-none");
				}
			})
		},

		UpdateDataAttribute: function (containers, attribute, value) {
			containers.forEach(function (c) {
				c.setAttribute(attribute, value)
			})
		},

		ShowConditionalElement: function (containers) {
			const self = this;
			containers.forEach(function (c) {
				if (eval(c.getAttribute(self.config.showIfAttr))) {
					c.classList.remove("d-none");
				}
			})
		}
	}
}();

export { LiveProductInfo };
