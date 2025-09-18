/* global google */
class LocationsMap extends HTMLElement {
  static loaderPromise = null;

  constructor() {
    super();
    this.map = null;
    this.infoWindow = null;
    this.markers = [];
    this.initialized = false;
    this.mapElement = null;
    this.locationsListElement = null;
    this.searchbarElement = null;
    this.settings = {};
    this.bindingAttrName = "data-swift-location"; 
  }

  connectedCallback() {
    if (this.initialized) return;

    const bootstrap = () => {
      this.mapElement = this.querySelector('[data-swift-locations-map]');
      this.locationsListElement = this.querySelector('[data-swift-locations-list]');
      this.searchbarElement = this.querySelector('[data-swift-locationsearch]');

      if (!this.mapElement) {
        console.error("Map element not found inside <swift-locations-map> (expected [data-swift-locations-map]).");
        return;
      }

      this.readAttributesToSettings();

      const apiKey = this.getAttribute("api-key");
      if (!apiKey) {
        console.error("api-key attribute is required on <swift-locations-map>.");
        return;
      }

      this.loadGoogleMaps(apiKey)
        .then(() => this.initMap())
        .catch((error) => console.error("Failed to load Google Maps API:", error));

      this.initialized = true;
    };

    if (document.readyState === "loading") {
      const onReady = () => {
        document.removeEventListener("DOMContentLoaded", onReady);
        requestAnimationFrame(bootstrap);
      };
      document.addEventListener("DOMContentLoaded", onReady);
    } else {
      requestAnimationFrame(bootstrap);
    }
  }

  readAttributesToSettings() {
    const parseJSON = (attributeName) => {
      const raw = this.getAttribute(attributeName);
      if (!raw) return undefined;
      try { return JSON.parse(raw); } catch { return undefined; }
    };

    const parseFloatAttr = (attributeName) => {
      const value = parseFloat(this.getAttribute(attributeName));
      return isNaN(value) ? undefined : value;
    };

    const parseIntAttr = (attributeName) => {
      const value = parseInt(this.getAttribute(attributeName), 10);
      return isNaN(value) ? undefined : value;
    };

    this.settings.locations = this.normalizeLocations(parseJSON("locations"));
    this.settings.mapStyle = parseJSON("map-style");
    this.settings.defaultLat = parseFloatAttr("default-lat");
    this.settings.defaultLng = parseFloatAttr("default-lng");
    this.settings.initialZoomLevel = parseIntAttr("initial-zoom-level");
    this.settings.regionCode = this.getAttribute("region-code") || undefined;
    this.settings.noLocationsFoundLabel = this.getAttribute("no-locations-found-label") || "No options available";
    this.settings.mapIconUrl = this.getAttribute("map-icon-url") || undefined;
  }

  normalizeLocations(array) {
    return (array || []).map((location) => {
      const lat =
        (location.Location && location.Location.Lat) ??
        (location.location && location.location.lat) ??
        location.lat;

      const lng =
        (location.Location && location.Location.Lng) ??
        (location.location && location.location.lng) ??
        location.lng;

      return {
        ...location,
        location: typeof lat === "number" && typeof lng === "number" ? { lat, lng } : null
      };
    });
  }

  loadGoogleMaps(apiKey) {
    if (window.google && window.google.maps) return Promise.resolve();
    if (LocationsMap.loaderPromise) return LocationsMap.loaderPromise;

    LocationsMap.loaderPromise = new Promise((resolve, reject) => {
      const callbackName = "__swift_gmaps_init__" + Math.random().toString(36).slice(2);
      window[callbackName] = () => {
        try { delete window[callbackName]; } catch { console.error("Maps not loaded"); }
        resolve();
      };
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&callback=${callbackName}`;
      script.async = true;
      script.defer = true;
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });

    return LocationsMap.loaderPromise;
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement, {
      center: { lat: this.settings.defaultLat, lng: this.settings.defaultLng },
      zoom: this.settings.initialZoomLevel,
      styles: Array.isArray(this.settings.mapStyle) ? this.settings.mapStyle : undefined,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
    });

    this.infoWindow = new google.maps.InfoWindow({ maxWidth: 300, minWidth: 220 });

    this.markers = [];
    this.settings.locations?.forEach((location, index) => {
      if (location.location) this.createClassicMarker(location, index);
    });

    this.buildLocationList();
    this.map.addListener("idle", () => this.buildLocationList());

    if (this.searchbarElement) {
      this.searchbarElement.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = this.searchbarElement.querySelector("input[type='text'], input");
        const value = input ? input.value.trim() : "";
        if (!value) return;

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: value, region: this.settings.regionCode }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results[0]) {
            this.map.fitBounds(results[0].geometry.viewport);
          } else {
            console.error("Geocode failed:", status);
          }
        });
      });
    }
  }

  createClassicMarker(location, index) {
    const icon = this.settings.mapIconUrl
      ? { url: this.settings.mapIconUrl, scaledSize: new google.maps.Size(32, 32), anchor: new google.maps.Point(16, 32) }
      : null;

    const marker = new google.maps.Marker({
      position: location.location,
      map: this.map,
      title: location?.Name || location?.name || "",
      icon,
    });

    marker.id = index;
    marker.addListener("click", () => this.openInfo(marker));
    this.markers.push(marker);
  }

  computeCommon(location) {
    const addressParts = [
      location?.Address ?? location?.address,
      location?.Zip ?? location?.zip,
      location?.City ?? location?.city,
      location?.State ?? location?.state,
      location?.Country ?? location?.country
    ].filter(Boolean);

    const base = {
      Name: location?.Name ?? location?.name ?? "",
      Address: location?.Address ?? location?.address ?? "",
      Zip: location?.Zip ?? location?.zip ?? "",
      City: location?.City ?? location?.city ?? "",
      Country: location?.Country ?? location?.country ?? "",
      Phone: location?.Phone ?? location?.phone ?? "",
      Email: location?.Email ?? location?.email ?? "",
      AddressFull: addressParts.join(", "),
      DirectionsUrl: this.buildDirectionsUrl(location),
    };

    Object.keys(location).forEach((key) => {
      if (!(key in base)) base[key] = location[key];
    });

    return base;
  }

  bindByAttr(fragment, attributeName, location) {
    const values = this.computeCommon(location);
    fragment.querySelectorAll(`[${attributeName}]`).forEach((element) => {
      const key = element.getAttribute(attributeName);
      if (!key || key === "button") return;
      const value = (key in values) ? values[key] : (location?.[key] ?? "");
      if (element.tagName?.toLowerCase() === "a") {
        value ? element.setAttribute("href", String(value)) : element.removeAttribute("href");
      } else {
        element.textContent = value ? String(value) : "";
      }
    });
  }

  openInfo(marker) {
    const location = this.settings.locations[marker.id];
    if (!location) return;

    const template =
      this.querySelector('[data-swift-template="info-window"]') ||
      document.querySelector('[data-swift-template="info-window"]');

    const titleText = location?.Name || location?.name || "";
    if (typeof this.infoWindow.setHeaderContent === "function") {
      try { this.infoWindow.setHeaderContent(titleText); } catch (error) {
        console.error("Failed to set infoWindow header content:", error);
      }
    }

    if (template?.content) {
      const fragment = template.content.cloneNode(true);
      this.bindByAttr(fragment, this.bindingAttrName, location);
      const container = document.createElement("div");
      container.appendChild(fragment);
      this.infoWindow.setContent(container);
    } else {
      const container = document.createElement("div");
      const nameElement = document.createElement("div");
      nameElement.textContent = titleText;
      nameElement.style.fontWeight = "600";
      const addressElement = document.createElement("div");
      addressElement.textContent = this.computeCommon(location).AddressFull;
      container.appendChild(nameElement);
      container.appendChild(addressElement);
      this.infoWindow.setContent(container);
    }

    this.infoWindow.open(this.map, marker);
    this.map.panTo(marker.getPosition());
  }

  buildDirectionsUrl(location) {
    if (location?.DirectionsUrl?.trim()) return location.DirectionsUrl;
    const destinationQuery = [
      location?.Address ?? location?.address,
      location?.Zip ?? location?.zip,
      location?.City ?? location?.city
    ].filter(Boolean).join(" ");
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}`;
  }

  buildLocationList() {
    if (!this.locationsListElement) return;

    this.locationsListElement.innerHTML = "";
    const bounds = this.map.getBounds();

    const inView =
      this.settings.locations
        ?.map((location, index) => ({ location, index }))
        .filter(({ location }) =>
          location.location &&
          (!bounds || bounds.contains(new google.maps.LatLng(location.location)))
        ) ?? [];

    if (!inView.length) {
      const noLocationsElement = document.createElement("div");
      noLocationsElement.textContent = this.settings.noLocationsFoundLabel || "No options available";
      noLocationsElement.style.padding = "1rem";
      this.locationsListElement.appendChild(noLocationsElement);
      return;
    }

    const template =
      this.querySelector('[data-swift-template="location-item"]') ||
      document.querySelector('[data-swift-template="location-item"]');

    if (template?.content) {
      inView.forEach(({ location, index }) => {
        const clone = document.importNode(template.content, true);
        this.bindByAttr(clone, this.bindingAttrName, location);
        const clickable =
          clone.querySelector(`[${this.bindingAttrName}='button']`) ||
          clone.querySelector("button") ||
          clone.firstElementChild;
        if (clickable) {
          clickable.setAttribute("data-location-number", index);
          clickable.addEventListener("click", () => this.focusMarker(index));
        }
        this.locationsListElement.appendChild(clone);
      });
      return;
    }

    inView.forEach(({ location, index }) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "list-group-item list-group-item-action";
      const name = location?.Name || location?.name || `Location ${index + 1}`;
      const address = this.computeCommon(location).AddressFull;
      item.textContent = address ? `${name} — ${address}` : name;
      item.addEventListener("click", () => this.focusMarker(index));
      this.locationsListElement.appendChild(item);
    });
  }

  focusMarker(index) {
    const marker = this.markers[index];
    if (!marker) return;
    const position = marker.getPosition();
    if (position) this.map.panTo(position);
    this.openInfo(marker);
  }
}

customElements.define("swift-locations-map", LocationsMap);
export { LocationsMap };
