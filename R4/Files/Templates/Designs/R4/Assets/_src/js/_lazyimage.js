const Lazyimage = function() {
    
    return {

        Init() {
			if ('loading' in HTMLImageElement.prototype) {
				var lazyImages = document.querySelectorAll('[loading="lazy"]');

				for (var img of lazyImages) {
					if (!img.complete) {
						img.parentNode.classList.add('lazyimage-loading');
						img.addEventListener('load', lazyImageLoad, false);
						img.addEventListener('error', lazyImageError, false);
					}
				}

				function lazyImageLoad(e) {
					e.currentTarget.parentNode.classList.remove('lazyimage-loading');
				}

				function lazyImageError(e) {
					var parent = e.currentTarget.parentNode;
					parent.classList.remove('lazyimage-loading');
					parent.classList.add('lazyimage-error');
				}
			} // if 'loading' supported
        }
    }
}();

export { Lazyimage };
