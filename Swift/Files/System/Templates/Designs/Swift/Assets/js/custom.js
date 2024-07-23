const customSwift = function () {
	'use strict';
	return {
		version: '1.0.0',
		init() {
			console.log("Script was loaded...");
			this.load();
		},
		load() {
			alert("Load called from init...");
		}
	}
}();

window.customSwift = customSwift;

window.addEventListener('load', () => {
	customSwift.init();
});
