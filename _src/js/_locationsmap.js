/* global google */

const LocationsMap = (function () {
  let map;
  let markers = [];
  let markersCount = 0;
  let infoWindow;
  let AdvancedMarkerElement; // set after import

  let settings = {
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
    mapId: null,
  };

  return {
    init: async function (mapSettings) {
      settings = mapSettings;

      // Import required libraries
      const { Map } = await google.maps.importLibrary("maps");
      ({ AdvancedMarkerElement } = await google.maps.importLibrary("marker"));

      const mapElement =
        settings.mapElement
          ? document.querySelector(settings.mapElement)
          : document.querySelector("#Map");
      const locationsListElement =
        settings.locationsListElement
          ? document.querySelector(settings.locationsListElement)
          : document.querySelector("#LocationsList");
      const searchbarElement =
        settings.searchbarElement
          ? document.querySelector(settings.searchbarElement)
          : document.querySelector("#MapSearch");
      const mapHeaderElement =
        settings.mapHeaderElement
          ? document.querySelector(settings.mapHeaderElement)
          : document.querySelector("#MapHeader");

      // Fine-tune to column size
      const colSize = mapElement.closest("[data-col-size]")
        ? mapElement.closest("[data-col-size]").getAttribute("data-col-size")
        : 12;

      if (colSize < 12) {
        mapElement.closest(".js-map-column").classList.remove("g-col-lg-8");
        mapElement.closest(".js-map-column").classList.add("g-col-lg-12");

        if (locationsListElement) {
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

      // Geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          LocationsMap.showCurrentPosition
        );
      } else {
        console.log("Geolocation is not supported by this browser");
      }

      // Create map
      map = new Map(mapElement, {
        center: { lat: settings.defaultLat, lng: settings.defaultLng },
        zoom: settings.initialZoomLevel,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },
        styles: settings.mapStyle,
        mapId: settings.mapId || undefined,
      });

      // Add markers
      settings.locations.forEach(function (location) {
        if (
          location.location &&
          typeof location.location === "object" &&
          typeof location.location.lat === "number" &&
          typeof location.location.lng === "number"
        ) {
          LocationsMap.markLocation(location);
          markersCount++;
        } else {
          console.error("Invalid location data: ", location);
        }
      });

      // Map idle event
      google.maps.event.addListener(map, "idle", function () {
        const locationsListElement = document.querySelector("#LocationsList");
        if (locationsListElement) locationsListElement.innerHTML = "";
        LocationsMap.updateLocationsList();
      });

      // Info window
      infoWindow = new google.maps.InfoWindow({
        maxWidth: 300,
        minWidth: 220,
      });

      // Search bar
      if (searchbarElement) {
        searchbarElement.addEventListener("submit", function (event) {
          event.preventDefault();
          const searchField = event.currentTarget.querySelector('[type="text"]');
          LocationsMap.geocode({
            address: searchField.value.replace(" ", "+"),
            region: settings.regionCode,
          });
        });
      }
    },

    showCurrentPosition: function (position) {
      map.setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },

    markLocation: function (location) {
      // Use PinElement for custom icon if provided
      let content = null;
      if (settings.mapIcon && (settings.mapIcon.path || settings.mapIcon.url)) {
        const pin = new google.maps.marker.PinElement({
          glyph: "",
        });
        content = pin.element;
      }

      const advancedMarker = new AdvancedMarkerElement({
        position: location.location,
        map,
        title: location.name,
        content: content,
      });
      advancedMarker.id = markersCount;

      // Event for AdvancedMarkerElement
      advancedMarker.addListener("gmp-click", function () {
        LocationsMap.openInfo(advancedMarker);
      });

      markers.push(advancedMarker);
    },

    updateLocationsList: function () {
      const bounds = map.getBounds();
      let markersFound = 0;

      for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        if (bounds && bounds.contains(marker.position)) {
          LocationsMap.renderLocationListItem(i, "AddToList");
          markersFound++;
        }
      }

      if (markersFound === 0) {
        const locationsListElement = document.querySelector("#LocationsList");
        if (!locationsListElement) return;
        const notificationElement = document.createElement("div");
        notificationElement.classList.add("alert", "alert-info");
        notificationElement.setAttribute("role", "alert");
        notificationElement.innerHTML = settings.noLocationsFoundLabel;
        locationsListElement.appendChild(notificationElement);
      }
    },

    renderLocationListItem: function (id, type) {
      const target = document.querySelector("#LocationsList");
      const location = settings.locations[id];
      const name = location.company !== "" ? location.company : location.name;

      const addressLineOne = location.address;
      const addressLineTwoArr = [];
      if (location.zip) addressLineTwoArr.push(location.zip);
      if (location.city) addressLineTwoArr.push(location.city);
      if (location.state) addressLineTwoArr.push(location.state);
      if (location.country) addressLineTwoArr.push(location.country);
      const addressLineTwo = addressLineTwoArr.join(", ");

      const addressLineThreeArr = [];
      if (location.email) addressLineThreeArr.push(location.email);
      if (location.phone) addressLineThreeArr.push(location.phone);
      const addressLineThree = addressLineThreeArr.join(", ");

      const listItemElement = document.createElement("button");
      listItemElement.type = "button";
      listItemElement.title = settings.listItemLabel;
      listItemElement.ariaLabel = settings.listItemLabel;
      listItemElement.style.cursor = "pointer";
      listItemElement.className =
        "list-group-item list-group-item-action text-break";

      const headerElement = document.createElement("h6");
      headerElement.className = "h6 w-75";
      headerElement.innerHTML = name;
      listItemElement.appendChild(headerElement);

      if (addressLineOne) {
        const addressLineElement = document.createElement("div");
        addressLineElement.innerHTML = addressLineOne;
        listItemElement.appendChild(addressLineElement);
      }
      if (addressLineTwo) {
        const addressLineElement = document.createElement("div");
        addressLineElement.innerHTML = addressLineTwo;
        listItemElement.appendChild(addressLineElement);
      }
      if (addressLineThree) {
        const addressLineElement = document.createElement("div");
        addressLineElement.innerHTML = addressLineThree;
        listItemElement.appendChild(addressLineElement);
      }

      if (type === "AddToList" && addressLineTwo) {
        const directionsElement = document.createElement("a");
        directionsElement.className =
          "btn btn-link icon-2 p-3 end-0 position-absolute top-0";
        directionsElement.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ' +
          'viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
          'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ' +
          'class="feather feather-corner-up-right"><polyline points="15 14 20 9 15 4"></polyline>' +
          '<path d="M4 20v-7a4 4 0 0 1 4-4h12"></path></svg>';
        directionsElement.href =
          "https://www.google.dk/maps/dir//" +
          location.address +
          "+" +
          addressLineTwoArr.join("+");
        directionsElement.target = "_blank";
        listItemElement.appendChild(directionsElement);
      }

      if (type === "AddToList") {
        listItemElement.setAttribute("data-location-number", id);
        listItemElement.addEventListener("click", LocationsMap.focusOnMarker);
        target.appendChild(listItemElement);
      } else if (type === "UpdateInfo") {
        const contentString = listItemElement.innerHTML;
        infoWindow.setContent(contentString);
      }
    },

    focusOnMarker: function (event) {
      infoWindow.close();
      const markerId = event.currentTarget.getAttribute("data-location-number");
      const selectedMarker = markers[markerId];
      map.setZoom(7);
      map.panTo(selectedMarker.position);
      LocationsMap.clearListItemSelection();
      LocationsMap.openInfo(selectedMarker);
    },

    openInfo: function (marker) {
      LocationsMap.renderLocationListItem(marker.id, "UpdateInfo");
      infoWindow.open({ anchor: marker, map });
      map.panTo(marker.position);
    },

    clearListItemSelection: function () {
      document
        .querySelectorAll("[data-location-number]")
        .forEach(function (locationItem) {
          locationItem.classList.remove("active");
        });
    },

    geocode: function (request) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(request, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          map.fitBounds(results[0].geometry.viewport);
        } else {
          console.log(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    },

    findNearestMarker: function (location) {
      const lat = location.lat();
      const lng = location.lng();
      const R = 6371;
      let distances = [];
      let closest = -1;

      markers.forEach(function (marker, index) {
        const mlat = marker.position.lat();
        const mlng = marker.position.lng();
        const dLat = ((mlat - lat) * Math.PI) / 180;
        const dLong = ((mlng - lng) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos((lat * Math.PI) / 180) *
            Math.cos((mlat * Math.PI) / 180) *
            Math.sin(dLong / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        distances[index] = d;
        if (closest === -1 || d < distances[closest]) closest = index;
      });

      LocationsMap.calcRoute(location, markers[closest].position);
    },

    calcRoute: function (start, end) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(start);
      bounds.extend(end);
      map.fitBounds(bounds);
    },
  };
})();

export { LocationsMap };
