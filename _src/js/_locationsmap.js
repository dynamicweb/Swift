

const LocationsMap = (function () {
  var map;
  var markers = [];
  var markersCount = 0;
  var infoWindow;

  var settings = {
    locations: [],
    mapStyle: [],
    defaultLat: 0.0,
    defaultLng: 0.0,
    initialZoomLevel: 4,
    regionCode: "DK",
    listItemLabel: "View location",
    directionsLabel: "Directions",
    noLocationsFoundLabel: "No options available in the selected area",
    mapElement: null,
    locationsListElement: null,
    searchbarElement: null,
    mapHeaderElement: null,
    mapIcon: {},
  };

  return {
    init: function (mapSettings) {
      settings = mapSettings;

      var mapElement =
        settings.mapElement != null
          ? document.querySelector(settings.mapElement)
          : document.querySelector("#Map");
      var locationsListElement =
        settings.locationsListElement != null
          ? document.querySelector(settings.locationsListElement)
          : document.querySelector("#LocationsList");
      var searchbarElement =
        settings.searchbarElement != null
          ? document.querySelector(settings.searchbarElement)
          : document.querySelector("#MapSearch");
      var mapHeaderElement =
        settings.mapHeaderElement != null
          ? document.querySelector(settings.mapHeaderElement)
          : document.querySelector("#MapHeader");

      //Fintune to the column that contains the map
      var colSize = mapElement.closest("[data-col-size]")
        ? mapElement.closest("[data-col-size]").getAttribute("data-col-size")
        : 12;

      if (colSize < 12) {
        mapElement.closest(".js-map-column").classList.remove("g-col-lg-8");
        mapElement.closest(".js-map-column").classList.add("g-col-lg-12");

        if (locationsListElement != null) {
          locationsListElement
            .closest(".js-locations-list-column")
            .classList.add("d-lg-none");
        }
      }

      if (colSize < 6) {
        if (searchbarElement) {
          searchbarElement
            .closest(".js-map-search-column")
            .classList.remove("g-col-lg-4");
          searchbarElement
            .closest(".js-map-search-column")
            .classList.add("g-col-lg-12");
        }
        if (mapHeaderElement) {
          mapHeaderElement.classList.remove("g-col-lg-8");
          mapHeaderElement.classList.add("g-col-lg-12");
        }
      }

      // Set initial map center
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          LocationsMap.showCurrentPosition
        );
      } else {
        console.log("Geolocation is not supported by this browser");
      }

      // Create the map instance
      map = new window.google.maps.Map(mapElement, {
        center: {
          lat: settings.defaultLat,
          lng: settings.defaultLng,
        },
        zoom: settings.initialZoomLevel,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_TOP,
        },
        styles: settings.mapStyle,
      });

      // Add markers
      settings.locations.forEach(function (location) {
        LocationsMap.markLocation(location);
        markersCount++;
      });

      // Map is idle
      window.google.maps.event.addListener(map, "idle", function () {
        var locationsListElement = document.querySelector("#LocationsList");
        locationsListElement.innerHTML = "";

        LocationsMap.updateLocationsList();
      });

      // Info window
      infoWindow = new window.google.maps.InfoWindow({
        maxWidth: 300,
        minWidth: 220,
      });

      // Search on map (geocode)
      searchbarElement.addEventListener("submit", function (event) {
        event.preventDefault();

        var searchField = event.currentTarget.querySelector('[type="text"]');

        LocationsMap.geocode({
          address: searchField.value.replace(" ", "+"),
          region: settings.regionCode,
        });
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
    markLocation: function (location) {
      let marker;

      if (settings.mapIcon.path || settings.mapIcon.url) {
        settings.mapIcon.scaledSize = new window.google.maps.Size(35, 35);

        marker = new window.google.maps.Marker({
          icon: settings.mapIcon,
          map: map,
          position: location.location,
          title: location.name,
          id: markersCount,
        });
      } else {
        marker = new window.google.maps.Marker({
          map: map,
          position: location.location,
          title: location.name,
          id: markersCount,
        });
      }

      // show location info when marker is clicked
      marker.addListener("click", function () {
        LocationsMap.openInfo(marker);
      });

      markers.push(marker); // Keep marker instances in a global array
    },

    // Update the location list based on the visible area on the map
    updateLocationsList: function () {
      var bounds = map.getBounds();
      var markersFound = 0;

      for (var i = 0; i < markers.length; i++) {
        var marker = markers[i];

        if (bounds.contains(marker.getPosition()) === true) {
          LocationsMap.renderLocationListItem(i, "AddToList");
          markersFound++;
        }
      }

      if (markersFound == 0) {
        var locationsListElement = document.querySelector("#LocationsList");

        var notificationElement = document.createElement("div");
        notificationElement.classList.add("alert");
        notificationElement.classList.add("alert-info");
        notificationElement.setAttribute("role", "alert");
        notificationElement.innerHTML = settings.noLocationsFoundLabel;
        locationsListElement.appendChild(notificationElement);
      }
    },

    // Render the list item
    renderLocationListItem: function (id, type) {
      const target = document.querySelector("#LocationsList");

      // Data
      const location = settings.locations[id];
      const name = location.company != "" ? location.company : location.name;
      const addressLineOne = location.address;
      const addressLineTwoArr = [];
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
      const addressLineTwo = addressLineTwoArr.join(", ");

      const addressLineThreeArr = [];
      if (location.email != "") {
        addressLineThreeArr.push(location.email);
      }
      if (location.phone != "") {
        addressLineThreeArr.push(location.phone);
      }
      const addressLineThree = addressLineThreeArr.join(", ");

      // List element
      const listItemElement = document.createElement("button");
      listItemElement.type = "button";
      listItemElement.title = settings.listItemLabel;
      listItemElement.ariaLabel = settings.listItemLabel;
      listItemElement.style.cursor = "pointer";
      listItemElement.className = "list-group-item list-group-item-action text-break";

      const headerElement = document.createElement("h6");
      headerElement.className = "h6 w-75";
      headerElement.innerHTML = name;
      listItemElement.appendChild(headerElement);

      if (addressLineOne != "") {
        const addressLineElement = document.createElement("div");
        addressLineElement.innerHTML = addressLineOne;
        listItemElement.appendChild(addressLineElement);
      }

      if (addressLineTwo != "") {
        const addressLineElement = document.createElement("div");
        addressLineElement.innerHTML = addressLineTwo;
        listItemElement.appendChild(addressLineElement);
      }

      if (addressLineThree != "") {
        const addressLineElement = document.createElement("div");
        addressLineElement.innerHTML = addressLineThree;
        listItemElement.appendChild(addressLineElement);
      }

      // Directions - In list
      if (type == "AddToList" && addressLineTwo != "") {
        const directionsElement = document.createElement("button");
        directionsElement.type = "button";
        directionsElement.className = "btn btn-link icon-2 p-3 end-0 position-absolute top-0";
        directionsElement.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-up-right"><polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path></svg>';
        directionsElement.title = settings.directionsLabel;
        directionsElement.setAttribute("aria-label", settings.directionsLabel);
        directionsElement.href =
          "https://www.google.dk/maps/dir//" +
          location.address +
          "+" +
          addressLineTwoArr.join("+");
        directionsElement.target = "_blank";
        listItemElement.appendChild(directionsElement);
      }

      // Directions in info
      if (type == "UpdateInfo" && addressLineTwo != "") {
        const directionsElement = document.createElement("a");
        directionsElement.className = "btn btn-primary w-100 mt-3";
        directionsElement.innerHTML = settings.directionsLabel;
        directionsElement.title = settings.directionsLabel;
        directionsElement.href =
          "https://www.google.dk/maps/dir//" +
          location.address +
          "+" +
          addressLineTwoArr.join("+");
        directionsElement.target = "_blank";
        listItemElement.appendChild(directionsElement);
      }

      if (type == "AddToList") {
        listItemElement.setAttribute("data-location-number", id);
        listItemElement.addEventListener("click", LocationsMap.focusOnMarker);
        target.appendChild(listItemElement);
      } else if (type == "UpdateInfo") {
        var contentString = listItemElement.innerHTML;
        infoWindow.setContent(contentString);
      }
    },

    // Move the map to the selected marker location
    focusOnMarker: function (event) {
      infoWindow.close();

      var markerId = event.currentTarget.getAttribute("data-location-number");
      var selectedMarker = markers[markerId];

      map.setZoom(7);
      map.panTo(selectedMarker.getPosition());

      LocationsMap.clearListItemSelection();
      LocationsMap.openInfo(selectedMarker);
    },

    // Click on marker
    openInfo: function (marker) {
      LocationsMap.renderLocationListItem(marker.id, "UpdateInfo");
      infoWindow.open(map, marker);

      map.panTo(marker.getPosition());
    },

    // Clear list item selection
    clearListItemSelection: function () {
      document
        .querySelectorAll("[data-location-number]")
        .forEach(function (locationItem) {
          locationItem.classList.remove("active");
        });
    },

    // Get position from address and move the map to the location
    geocode: function (request) {
      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(request, function (results, status) {
        if (status == window.google.maps.GeocoderStatus.OK) {
          // To adjust Zoom Level
          var bound = results[0].geometry.viewport;
          map.fitBounds(bound);
        } else {
          console.log(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    },

    // Find the nearest marker to a position
    findNearestMarker: function (location) {
      var lat = location.lat();
      var lng = location.lng();

      var R = 6371; // radius of earth in km
      var distances = [];
      var closest = -1;
      var counter = 0;

      markers.forEach(function (marker) {
        var mlat = marker.position.lat();
        var mlng = marker.position.lng();
        var dLat = ((mlat - lat) * Math.PI) / 180;
        var dLong = ((mlng - lng) * Math.PI) / 180;
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat * Math.PI) / 180) *
          Math.cos((lat * Math.PI) / 180) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        distances[counter] = d;
        if (closest == -1 || d < distances[closest]) {
          closest = counter;
        }

        counter++;
      });

      LocationsMap.calcRoute(location, markers[closest].getPosition());
    },

    // Calculate route
    calcRoute: function (start, end) {
      var bounds = new window.google.maps.LatLngBounds();
      bounds.extend(start);
      bounds.extend(end);
      map.fitBounds(bounds);
    },
  };
})();

export { LocationsMap };
