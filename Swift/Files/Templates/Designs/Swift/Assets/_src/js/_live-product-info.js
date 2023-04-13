const LiveProductInfo = function () {
	return {
		product: "",
		productPrice: "",
		
		config: {
			productInfoFeedAttr: "data-product-info-feed",
			priceFormattedAttr: "data-price-formatted",
			contentAttr: "content",
			productIdAttr: "data-product-id",
			productVariantIdAttr: "data-variant-id",
			showIfAttr: "data-show-if",
			innerSliderId: "tns1-iw",
			loaderClass: "spinner-border"
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
			productPriceQuantityFieldForLists: ".item_swift_productlistcompactview .js-quantity, .item_swift_productlistlistview .js-quantity",
			productPricePrice: ".js-text-price-price",
			stock: ".js-text-stock",
			expectedDelivery: ".js-text-expected-delivery",
			stockMessages: ".js-stock-state div, .js-stock-state small, .js-stock-state p",
			relatedProducts: "[id^='RelatedProducts']",
			content: "#content",
		},
		
		init: function() {
            const self = this;
            self.UpdateProductInfo();

			// NOTE: don't have a custom event that is fired after slider is loaded
			// https://doc.dynamicweb.com/forum/cms-standard-features/cms-standard-features/js-event-for-loaded-related-products
			const relatedProducts = document.querySelector(self.selectors.relatedProducts);
			if (relatedProducts) {
				const observer = new MutationObserver(function (mutationsList, observer) {
					mutationsList.forEach(function (m) {
						if (m.target.id === self.config.innerSliderId) {
							observer.disconnect();
							self.UpdateProductInfo(relatedProducts);
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
				
				const feedUrlArray = feedUrl.split('?');
				const query = new URLSearchParams(self.SanitizeParameters(feedUrlArray[1]));
				let fetchInit = {
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'GET'
				};
				
				const isPostMethod = query.has('RepositoryName');
				if (isPostMethod) {
					const productIds = getValueAndUpdateQuery(query, 'ProductIds', query.getAll('ProductIds').join(','), el.getAttribute(self.config.productIdAttr));
					const pageSize = getValueAndUpdateQuery(query, 'PageSize', parseInt(query.get('PageSize')), 100);
					const currencyCode = getValueAndUpdateQuery(query, 'CurrencyCode', query.get('CurrencyCode'), '');
					const countryCode = getValueAndUpdateQuery(query, 'CountryCode', query.get('CountryCode'), '');
					const shopId = getValueAndUpdateQuery(query, 'ShopId', query.get('ShopId'), '');
					const languageId = getValueAndUpdateQuery(query, 'LanguageId', query.get('LanguageId'), '');
					
					fetchInit.method = 'POST';
					fetchInit.body = JSON.stringify({ PageSize: pageSize, Parameters : { MainProductID : productIds }, CurrencyCode : currencyCode, CountryCode : countryCode, ShopId : shopId, LanguageId : languageId });
				}
				
				const path = feedUrlArray[0];
				const url = path + '?' + query.toString();
		
				fetch(url, fetchInit)
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
			
			function getValueAndUpdateQuery(query, parameter, value, fallbackValue) {
				query.delete(parameter);
				return self.GetValue(value, fallbackValue);
			}
		},

		UpdateValues: function (data, liveInfoContainers) {
			const self = this;
			liveInfoContainers.forEach(function (container) {
				self.product = self.GetProductData(container, data)
				const product = self.product;
				if (!product) return;

				removeLoaders(container);
				setProductPrice(container, product);
				setPriceMatrix(container, product);
				setStockLevel(container, product);
				setExpectedDelivery(container, product);
				updateVariantSelector(container);
				enableQuantityBoxesOnLegacyProductLists(container, product);
			});

			function removeLoaders(container) {
				container.querySelectorAll(self.selectors.loader).forEach(function (el){
					el.classList.remove(self.config.loaderClass);
				});
			}

			function setProductPrice(container, product) {
				if (product.Price != null && container.querySelectorAll(self.selectors.price)) {
					setPrice(container, product);
					setPriceWithVat(container, product);
					setPriceBeforeDiscount(container, product);
				}

				function setPrice(container, product) {
					const priceContainers = container.querySelectorAll(self.selectors.price);
					if (priceContainers.length > 0) {
						let price = product.Price.PriceFormatted;
						if(product.VariantInfo != null && isPdpWithVariantId())
						{
							if(product.VariantInfo.PriceMin != null && product.VariantInfo.PriceMax != null && product.VariantInfo.PriceMin.Price != product.VariantInfo.PriceMax.Price)
							{
								price = product.VariantInfo.PriceMin.PriceFormatted + " - " + product.VariantInfo.PriceMax.PriceFormatted;
							}
						}
						self.UpdateValue(priceContainers, price);
					}

					self.UpdateDataAttribute(container.querySelectorAll(self.selectors.priceFormatted), self.config.priceFormattedAttr, product.Price.PriceFormatted);
					self.UpdateDataAttribute(container.querySelectorAll(self.selectors.priceProp), self.config.contentAttr, product.Price.Price);
				}

				function setPriceWithVat(container, product) {
					const pricesWithVatContainers = container.querySelectorAll(self.selectors.priceWithVat);
					const isMasterProduct = product.VariantInfo.Price != null
					const productPriceWithVat = isMasterProduct ? product.VariantInfo.Price.PriceWithVat : product.Price.PriceWithVat;
					const productPriceWithVatFormatted = isMasterProduct ? product.VariantInfo.Price.PriceWithVatFormatted : product.Price.PriceWithVatFormatted;
					
					if (productPriceWithVat != null && pricesWithVatContainers.length > 0) {

						let priceWithVat = productPriceWithVatFormatted;
						if(product.VariantInfo != null)
						{
							if(product.VariantInfo.PriceMin != null && product.VariantInfo.PriceMax != null && product.VariantInfo.PriceMin.PriceWithVat != product.VariantInfo.PriceMax.PriceWithVat)
							{
								priceWithVat = product.VariantInfo.PriceMin.PriceWithVatFormatted + " - " + product.VariantInfo.PriceMax.PriceWithVatFormatted;
							}
						}

						priceWithVat = getDataSuffix(container, self.selectors.priceWithVat, priceWithVat);
						self.UpdateValue(pricesWithVatContainers, priceWithVat, true);
					}
				}

				function setPriceBeforeDiscount(container, product) {
					const priceBeforeDiscountContainers = container.querySelectorAll(self.selectors.priceBeforeDiscount);
					if (product.PriceBeforeDiscount != null && priceBeforeDiscountContainers.length > 0) {
						self.UpdateValue(priceBeforeDiscountContainers, product.PriceBeforeDiscount.PriceFormatted);
						self.ShowConditionalElement(priceBeforeDiscountContainers);
					}
				}

				function getDataSuffix(container, selector, value) {
					const subContainer = container.querySelector(selector);
					if (!subContainer) return value;

					const suffix = subContainer.getAttribute("data-suffix");
					if (suffix === "") return value;

					return value + " " + suffix;
				}

				function isPdpWithVariantId() {
					let isPdpWithVariantId = false;
					const linkElement = document.querySelector("link[itemprop='url']");
					if (linkElement) {
						const query = new URLSearchParams(linkElement.getAttribute("href"));
						const variantId = self.GetValue(parseInt(query.get('VariantID')), "");
						isPdpWithVariantId = variantId === "";
					}
					return isPdpWithVariantId;
				}
			}

			function setPriceMatrix(container, product) {
				if (product.Prices != null && product.Prices && container.querySelectorAll(self.selectors.productPriceQuantity) && container.querySelectorAll(self.selectors.productPricePrice)) {
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
			}

			function setStockLevel(container, product) {
				const stockContainers = container.querySelectorAll(self.selectors.stock);
				if (product.StockLevel != null && stockContainers.length > 0) {
					let stockLevel = product.StockLevel > 100 ? "100+" : product.StockLevel;
					self.UpdateValue(stockContainers, stockLevel);
					self.ShowConditionalElement(container.querySelectorAll(self.selectors.stockMessages));
				}

				if (product.NeverOutOfstock || (product.StockLevel != null && product.StockLevel > 0)) {
					let addToCart = container.querySelector(self.selectors.addToCart);
					if(addToCart != null){
						addToCart.removeAttribute("disabled");
					}
				}
			}

			function setExpectedDelivery(container, product) {
				const expectedDeliveryContainers = container.querySelectorAll(self.selectors.expectedDelivery);
				if (product.ExpectedDelivery != null && expectedDeliveryContainers.length > 0) {
					self.UpdateValue(expectedDeliveryContainers, product.ExpectedDelivery);
					self.ShowConditionalElement(container.querySelectorAll(self.selectors.expectedDelivery));
				}
			}

			function updateVariantSelector(container) {
				const variantSelector = container.querySelector(self.selectors.variantSelector);
				if(variantSelector != null){
					variantSelector.removeAttribute("disabled");
				}
			}
			
			function enableQuantityBoxesOnLegacyProductLists(container, product) {
				if (product.StockLevel && product.StockLevel > 0)
				{
					container.querySelectorAll(self.selectors.productPriceQuantityFieldForLists).forEach(function (el){
						el.disabled = false;
					});
				}
			}
		},

		GetProductData: function (container, data) {
			const self = this;
			const productId = container.getAttribute(self.config.productIdAttr);
    		const variantId = container.getAttribute(self.config.productVariantIdAttr);
			return data.Products ? data.Products.filter(function (el) {
        		return el.Id === productId && el.VariantId === variantId;
			})[0] : data;
		},

		GetVariantInfo: function (mainProduct, variantId) {
			if (mainProduct.VariantInfo != null && variantId !== "") {
				return GetVariantInfo(mainProduct.VariantInfo, variantId)
			}

			function GetVariantInfo(parentVariantInfo, variantId) {
				if (parentVariantInfo.VariantID === variantId) {
					return parentVariantInfo;
				}

				for (let v = 0; v < parentVariantInfo.VariantInfo.length ; v++) {
					const productVariantId = parentVariantInfo.VariantInfo[v].VariantID;

					if (productVariantId === variantId) {
						return parentVariantInfo.VariantInfo[v];
					}
					else if (variantId.startsWith(productVariantId)) {
						return GetVariantInfo(parentVariantInfo.VariantInfo[v], variantId);
					}
				}
			}
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
		},
		
		GetValue: function (value, fallbackValue) { return value ? value : fallbackValue },

		SanitizeParameters: function (str) { return str.replace(/[\r\t\n]/gm, '') }
	}
}();

export { LiveProductInfo };
