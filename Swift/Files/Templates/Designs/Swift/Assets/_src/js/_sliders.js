const Sliders = function () {
    
    return {

        init() {
            let sliders = document.querySelectorAll('.js-slider');

			if (sliders) {
				for (var i = 0; i < sliders.length; ++i) {
					var sliderContainer = sliders[i];
					var sliderIsInitialized = sliderContainer.classList.contains("tns-slider");
					var itemsInSlider = 5;
					var closestColumn = sliderContainer.closest("[data-col-size]");
					var currentLayout = sliderContainer.closest("[data-slider-layout]") != null ? sliderContainer.closest("[data-slider-layout]") : "top";

					if (closestColumn) {
						var columnSize = closestColumn.getAttribute("data-col-size");

						if (columnSize == 12) {
							itemsInSlider = 4;
						}
						if (columnSize == 10 || columnSize == 9 || columnSize == 8) {
							itemsInSlider = currentLayout != "top" ? 2 : 3;
						}
						if (columnSize == 6) {
							itemsInSlider = currentLayout != "top" ? 1 : 2;
						}
						if (columnSize == 4) {
							itemsInSlider = 1;
						}
						if (columnSize == 3 || columnSize == 2 || columnSize == 1) {
							itemsInSlider = 1;
						}
					}

					if (sliderIsInitialized == false) {
						var slider = tns({
							container: sliderContainer,
							controls: false,
							nav: false,
							items: 1.2,
							gutter: 16,
							loop: false,
							rewind: false,
							arrowKeys: false,
							lazyload: true,
							slideBy: 1,
							swipeAngle: 30,
							mouseDrag: true,
							preventScrollOnTouch: 'auto',
							responsive: {
								992: {
									mouseDrag: false,
									items: itemsInSlider,
									controls: true,
									controlsText: [
										'<span class="tns-controls-icon" style="height:3em; width: 3em;"><span class="visually-hidden">Previous</span><span class="icon-3"><svg viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg></span></span>',
										'<span class="tns-controls-icon" style="height:3em; width: 3em;"><span class="visually-hidden">Next</span><span class="icon-3"><svg viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg></span></span>'
									]
								}
							}
						});
					}
				}
			} 
        }
    }
}();

export { Sliders };
