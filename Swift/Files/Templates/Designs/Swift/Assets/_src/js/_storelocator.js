const StoreLocator = function() {
	return {
		init() {
			console.log("map start");
			function initMap() {
				const map = new google.maps.Map(document.getElementById('map'), {
					zoom: 7,
					center: { lat: 52.632469, lng: -1.689423 },
				});
			}
			console.log("map stop");
		}
	}
}();

export { StoreLocator };
