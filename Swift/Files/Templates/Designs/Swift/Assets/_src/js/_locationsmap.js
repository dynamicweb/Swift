const LocationsMap = function () {
	var markers = [];
	var markersCount = 0;
	var defaultLat = 0;
	var defaultLng = 0;
	var initialZoomLevel = 4;

	var directionsLabel = "Directions";

	var infoWindow = new google.maps.InfoWindow({
		maxWidth: 300,
		minWidth: 220
	});

	return {
		init: function () {
			// Set the geocoder
			geocoder = new google.maps.Geocoder();

			// Set initial map center
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showCurrentPosition);
			} else {
				console.log("Geolocation is not supported by this browser");
			}

			const myMapCenter = {
				lat: defaultLat,
				lng: defaultLng
			};

			// Create the map
			var map = new google.maps.Map(document.getElementById('map'), {
				center: myMapCenter,
				zoom: initialZoomLevel,
				disableDefaultUI: true,
				zoomControl: true,
				zoomControlOptions: {
					position: google.maps.ControlPosition.RIGHT_TOP,
				},
				styles: mapStyle
			});

			// Markup map
			locations.forEach(function (location) {
				marklocation(location);
				markersCount++;
			});

			// Map is idle
			google.maps.event.addListener(map, 'idle', function () {
				var locationsListElement = document.querySelector("#locationsList");
				locationsListElement.innerHTML = "";

				updateLocationsList();
			});

			//Search on map (geocode)
			document.querySelector("#mapSearchButton").addEventListener("click", function (event) {
				geocode({ address: event.currentTarget.value })
			});
		},

		// Show the current GEO position
		showCurrentPosition: function (position) {
			const pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
			map.setCenter(pos);
		},

		// Create a marker and set its position
		marklocation: function(location){
			var marker = new google.maps.Marker({
				icon: {
					path: "M4,6C2.9,6,2,5.1,2,4s0.9-2,2-2s2,0.9,2,2S5.1,6,4,6 M4,0C1.8,0,0,1.8,0,4c0,3,4,7.4,4,7.4S8,7,8,4C8,1.8,6.2,0,4,0z",
					fillColor: "black",
					fillOpacity: 1,
					strokeWeight: 0,
					scale: 2
				},
				map: map,
				position: location.location,
				title: location.name,
				id: markersCount
			});

			// show location info when marker is clicked
			marker.addListener('click', function () {
				openInfo(marker);
			});

			markers.push(marker); // Keep marker instances in a global array

		},

		//Update the location list based on the visible area on the map
		updateLocationsList: function() {
			var bounds = map.getBounds();
			var markersFound = 0;

			for (var i = 0; i < markers.length; i++) {
				var marker = markers[i];

				if (bounds.contains(marker.getPosition()) === true) {
					renderLocationListItem(i, "AddToList");
					markersFound++;
				}
			}

			if (markersFound == 0) {
				var locationsListElement = document.querySelector("#locationsList");

				var notificationElement = document.createElement('div');
				notificationElement.classList.add("alert");
				notificationElement.classList.add("alert-info");
				notificationElement.setAttribute("role", "alert");
				notificationElement.innerHTML = "@Translate("No options available in the selected area")";
				locationsListElement.appendChild(notificationElement);
			}
		},

		//Render the list item
		renderLocationListItem: function(id, type) {
			var target = document.querySelector("#locationsList");

			//Data
			var location = locations[id];
			var name = location.company != "" ? location.company : location.name;
			var addressLineOne = location.address;
			var addressLineTwoArr = [];
			if (location.zip != "") {
				addressLineTwoArr.push(location.zip);
			}
			if (location.city != "") {
				addressLineTwoArr.push(location.city);
			}
			if (location.state != "") {
				addressLineTwoArr.push(location.state);
			}
			if (location.country != "") {
				addressLineTwoArr.push(location.country);
			}
			var addressLineTwo = addressLineTwoArr.join(", ");

			var addressLineThreeArr = [];
			if (location.email != "") {
				addressLineThreeArr.push(location.email);
			}
			if (location.phone != "") {
				addressLineThreeArr.push(location.phone);
			}
			var addressLineThree = addressLineThreeArr.join(", ");

			//List element
			var listÌtemElement = document.createElement('div');
			listÌtemElement.style.cursor = "pointer";
			listÌtemElement.className = "list-group-item";

			var containerElement = document.createElement('div');
			containerElement.className = "d-flex";
			listÌtemElement.appendChild(containerElement);

			//Left column
			var columnOneElement = document.createElement('div');
			columnOneElement.className = "flex-fill";

			var headerElement = document.createElement('h6');
			headerElement.className = "h6";
			headerElement.innerHTML = name;
			columnOneElement.appendChild(headerElement);

			if (addressLineOne != "") {
				var addressLineElement = document.createElement('div');
				addressLineElement.innerHTML = addressLineOne;
				columnOneElement.appendChild(addressLineElement);
			}

			if (addressLineTwo != "") {
				var addressLineElement = document.createElement('div');
				addressLineElement.innerHTML = addressLineTwo;
				columnOneElement.appendChild(addressLineElement);
			}

			if (addressLineThree != "") {
				var addressLineElement = document.createElement('div');
				addressLineElement.innerHTML = addressLineThree;
				columnOneElement.appendChild(addressLineElement);
			}

			containerElement.appendChild(columnOneElement);

			//Directions - In list
			if (type == "AddToList" && addressLineTwo != "") {
				var columnTwoElement = document.createElement('div');

				var directionsElement = document.createElement('a');
				directionsElement.className = "btn icon-2 pe-0 pt-0";
				directionsElement.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-corner-up-right\"><polyline points=\"15 14 20 9 15 4\"></polyline><path d=\"M4 20v-7a4 4 0 0 1 4-4h12\"></path></svg>";
				directionsElement.title = directionsLabel;
				directionsElement.href = "https://www.google.dk/maps/dir//" + addressLineTwoArr.join("+");
				directionsElement.target = "_blank";
				columnTwoElement.appendChild(directionsElement);

				containerElement.appendChild(columnTwoElement);
			}

			//Directions in info
			if (type == "UpdateInfo" && addressLineTwo != "") {
				var directionsElement = document.createElement('a');
				directionsElement.className = "btn btn-primary w-100 mt-3";
				directionsElement.innerHTML = directionsLabel;
				directionsElement.title = directionsLabel;
				directionsElement.href = "https://www.google.dk/maps/dir//" + addressLineTwoArr.join("+");
				directionsElement.target = "_blank";
				listÌtemElement.appendChild(directionsElement);
			}

			if (type == "AddToList") {
				listÌtemElement.setAttribute("data-location-number", id);
				listÌtemElement.addEventListener("click", focusOnMarker);
				target.appendChild(listÌtemElement);
			} else if (type == "UpdateInfo") {
				var contentString = listÌtemElement.innerHTML;
				infoWindow.setContent(contentString);
			}
		},

		//Move the map to the selected marker location
		focusOnMarker: function (event) {
			infoWindow.close();

			var markerId = event.currentTarget.getAttribute("data-location-number");
			var selectedMarker = markers[markerId];

			map.setZoom(7);
			map.panTo(selectedMarker.getPosition());

			clearListItemSelection();

			event.currentTarget.classList.add("active");

			openInfo(selectedMarker)
		},

		//Click on marker
		openInfo: function (marker) {
			renderLocationListItem(marker.id, "UpdateInfo");
			infoWindow.open(map, marker);

			map.panTo(marker.getPosition());
		},

		//Clear list item selection
		clearListItemSelection: function () {
			document.querySelectorAll("[data-location-number]").forEach(function (locationItem) {
				locationItem.classList.remove("active");
			});
		},

		//Get position from address and move the map to the location
		geocode: function (request) {
			var geocoder = new google.maps.Geocoder();
			var address = document.querySelector("#mapSearch").value;
			encodeURI(address.replace(" ", "+"));

			geocoder.geocode({ 'address': address, 'region': '@(regionCode)' }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					map.setZoom(14);
					map.panTo(results[0].geometry.location);
				} else {
					console.log('Geocode was not successful for the following reason: ' + status);
				}
			});
		}
	}
}();

export { LocationsMap };
