const Sliders = function() {
    
    return {

        init() {
            let sliders = document.querySelectorAll('.js-slider');
    
            for (var i = 0; i < sliders.length; ++i) {
                var sliderContainer = sliders[i];
                var closestColumn = sliderContainer.closest("[class^='col-']");
                var colMdClassIndex = closestColumn.getAttribute("class").search("col-md-") + 7;
                var parentColumnSize = closestColumn.getAttribute("class").charAt(colMdClassIndex) + closestColumn.getAttribute("class").charAt(colMdClassIndex + 1);
    
                var itemsInSlider = 5;
    
                if (parentColumnSize == 12) {
                    itemsInSlider = 4;
                }
                if (parentColumnSize == 10 || parentColumnSize == 9 || parentColumnSize == 8) {
                    itemsInSlider = 3;
                }
                if (parentColumnSize == 6) {
                    itemsInSlider = 2;
                }
                if (parentColumnSize == 4) {
                    itemsInSlider = 1;
                }
                if (parentColumnSize == 3 || parentColumnSize == 2 || parentColumnSize == 1) {
                    itemsInSlider = 1;
                }
    
                var slider = tns({
                    container: sliderContainer,
					controls: false,
					items: 1.2,
					gutter: 16,
                    loop: false,
					rewind: false,
                    arrowKeys: false,
                    lazyload: true,
					slideBy: "page",
					responsive: {
                        992: {
							items: itemsInSlider,
							controls: true,
							controlsText: ['<div class="tns-controls-icon" style="height:3em; width: 3em;"><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg></div>',
								'<div class="tns-controls-icon" style="height:3em; width: 3em;"><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg></div>'],
                        }
                    },
                    mouseDrag: true,
                    navPosition: 'bottom'
                });
            }
        }
    }
}();

export { Sliders };
