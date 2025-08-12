
class LocationsMap extends HTMLElement {
  constructor() {
    super();

    /** @type {google.maps.Map|null} */
    this.map = null;

    /** @type {google.maps.InfoWindow|null} */
    this.infoWindow = null;

    this.AdvancedMarkerElement = null;
    this.markers = [];

    this.defaults = {
      locations: [],
      mapStyle: [],
      defaultLat: 0,
      defaultLng: 0,
      initialZoomLevel: 4,
      regionCode: "DK",
      listItemLabel: "View location",
      directionsLabel: "Directions",
      noLocationsFoundLabel: "No options available in the selected area",
      mapElement: "#Map",
      locationsListElement: "#LocationsList",
      searchbarElement: "#MapSearch",
      mapIcon: {}, // { url, width, height }
      mapId: null,
      geolocationEnabled: true,
      focusZoomLevel: 7,
      directionsBaseUrl: "https://www.google.com/maps/dir/?api=1&destination=",
    };

    this.settings = { ...this.defaults };
    this._initialized = false;

    this._idleListener = null;
  }

  static get observedAttributes() {
    return [
      "api-key",
      "map-element",
      "locations-list-element",
      "searchbar-element",
      "map-style",
      "locations",
      "default-lat",
      "default-lng",
      "initial-zoom-level",
      "map-id",
      "map-icon",
      "geolocation-enabled",
      "focus-zoom-level",
      "directions-base-url",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue === null) return;

    switch (name) {
    case "api-key":
      this._apiKey = newValue;
      break;
    case "geolocation-enabled":
      this.settings.geolocationEnabled = newValue !== "false";
      break;
    case "focus-zoom-level":
      this.settings.focusZoomLevel = parseInt(newValue, 10) || this.defaults.focusZoomLevel;
      break;
    case "directions-base-url":
      this.settings.directionsBaseUrl = newValue || this.defaults.directionsBaseUrl;
      break;
    case "locations":
      try {
        this.settings.locations = JSON.parse(newValue);
      } catch {
        this.settings.locations = [];
      }
      if (this._initialized) {
        // Normalize and refresh markers
        this.settings.locations = this.normalizeLocations(this.settings.locations);
        this._addMarkers();
        this._buildLocationList();
      }
      break;
    default:
      this.setAttribute(name, newValue);
    }
  }


  connectedCallback() {
    if (this._initialized) return;

    this._readAttributesToSettings();

    let mapEl = document.querySelector(this.settings.mapElement);
    if (!mapEl) {
      const fallbackId = `swift-map-${Math.random().toString(36).slice(2, 9)}`;
      const div = document.createElement("div");
      div.id = fallbackId;
      div.style.width = "100%";
      div.style.height = "400px";
      this.appendChild(div);
      this.settings.mapElement = `#${fallbackId}`;
      mapEl = div;
    }

    const needLoad = this._apiKey && !(window.google && window.google.maps);
    const loadPromise = needLoad ? this._loadGoogleMaps(this._apiKey) : Promise.resolve();

    loadPromise
      .then(() => this._initMap())
      .catch((err) => console.error("Failed to load Google Maps API:", err));

    this._initialized = true;
  }

  disconnectedCallback() {
    // Remove map event listeners on disconnect
    if (this._idleListener && this.map) {
      window.google.maps.event.removeListener(this._idleListener);
      this._idleListener = null;
    }

    // Remove any event listeners on buttons in the location list (optional cleanup)
    const listEl = document.querySelector(this.settings.locationsListElement);
    if (listEl) {
      listEl.querySelectorAll("[data-location-number]").forEach((btn) => {
        btn.replaceWith(btn.cloneNode(true)); // simple way to remove all listeners
      });
    }
  }

  _readAttributesToSettings() {
    this.settings = { ...this.defaults };

    const parseJSONAttr = (attrName) => {
      const raw = this.getAttribute(attrName);
      if (!raw) return undefined;
      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    };

    const mapAttr = (attrName, settingKey, parser) => {
      const raw = this.getAttribute(attrName);
      if (raw == null) return;
      try {
        this.settings[settingKey] = parser ? parser(raw) : raw;
      } catch {
        this.settings[settingKey] = raw;
      }
    };

    mapAttr("map-element", "mapElement");
    mapAttr("locations-list-element", "locationsListElement");
    mapAttr("searchbar-element", "searchbarElement");
    mapAttr("map-id", "mapId");
    mapAttr("default-lat", "defaultLat", (v) => parseFloat(v));
    mapAttr("default-lng", "defaultLng", (v) => parseFloat(v));
    mapAttr("initial-zoom-level", "initialZoomLevel", (v) => parseInt(v, 10));
    mapAttr("focus-zoom-level", "focusZoomLevel", (v) => parseInt(v, 10));
    mapAttr("geolocation-enabled", "geolocationEnabled", (v) => v !== "false");
    mapAttr("directions-base-url", "directionsBaseUrl");

    const styleVal = parseJSONAttr("map-style");
    if (styleVal) this.settings.mapStyle = styleVal;

    const locs = parseJSONAttr("locations");
    if (locs) this.settings.locations = locs;

    const iconVal = parseJSONAttr("map-icon");
    if (iconVal) this.settings.mapIcon = iconVal;

    const key = this.getAttribute("api-key");
    if (key) this._apiKey = key;
  }

  _loadGoogleMaps(apiKey, libraries = ["places", "marker"]) {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        apiKey
      )}&libraries=${encodeURIComponent(libraries.join(","))}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }

  normalizeLocations(arr) {
    return (arr || []).map((loc) => {
      const out = { ...loc };
      const lat =
        (loc.Location && loc.Location.Lat) ??
        (loc.location && loc.location.lat) ??
        loc.lat;
      const lng =
        (loc.Location && loc.Location.Lng) ??
        (loc.location && loc.location.lng) ??
        loc.lng;
      if (typeof lat === "number" && typeof lng === "number") {
        out.location = { lat, lng };
      } else {
        out.location = null;
      }
      return out;
    });
  }

  getMarkerPosition(marker) {
    if (!marker) return null;
    if (typeof marker.getPosition === "function") return marker.getPosition();
    const p = marker.position;
    if (!p) return null;
    if (typeof p.lat === "function") return p;
    if (typeof p.lat === "number" && typeof p.lng === "number")
      return new window.google.maps.LatLng(p.lat, p.lng);
    return null;
  }

  getDeepValue(obj, key) {
    if (!obj || !key) return undefined;
    if (!key.includes(".")) return obj[key];
    return key.split(".").reduce((o, k) => (o && k in o ? o[k] : undefined), obj);
  }

  bindDataFromAttributes(fragment, attrName, location) {
    const reservedKeys = ["button"];

    const computed = {
      AddressFull: (() => {
        const parts = [];
        if (location?.Address) parts.push(location.Address);
        if (location?.Zip) parts.push(location.Zip);
        if (location?.City) parts.push(location.City);
        if (location?.State) parts.push(location.State);
        if (location?.Country) parts.push(location.Country);
        return parts.join(", ");
      })(),
      Contact: [location?.Email, location?.Phone].filter(Boolean).join(" • "),
      DirectionsUrl:
        location?.DirectionsUrl ||
        `${this.settings.directionsBaseUrl}${encodeURIComponent(
          [location?.Address, location?.Zip, location?.City].filter(Boolean).join(" ")
        )}`,
    };

    const nodes = fragment.querySelectorAll(`[${attrName}]`);
    nodes.forEach((el) => {
      const key = el.getAttribute(attrName);
      if (!key) return;
      if (reservedKeys.includes(key)) return;

      let value = Object.prototype.hasOwnProperty.call(computed, key)
        ? computed[key]
        : this.getDeepValue(location, key);

      if (el.tagName && el.tagName.toLowerCase() === "a") {
        if (value === undefined || value === null || value === "") {
          el.removeAttribute("href");
        } else {
          el.href = String(value);
        }
      } else {
        el.textContent = value !== undefined && value !== null ? String(value) : "";
      }
    });
  }

  createAdvancedMarker(location) {
    const wrap = document.createElement("div");
    wrap.style.position = "absolute";
    wrap.style.left = "50%";
    wrap.style.top = "50%";
    wrap.style.transform = "translate(-50%, -100%)";

    if (this.settings.mapIcon && this.settings.mapIcon.url) {
      const img = document.createElement("img");
      img.src = this.settings.mapIcon.url;
      img.alt = location?.Name || location?.name || "";
      img.draggable = false;
      img.style.display = "block";
      img.style.pointerEvents = "none";
      img.style.width = (this.settings.mapIcon.width || 32) + "px";
      img.style.height = (this.settings.mapIcon.height || 32) + "px";
      wrap.appendChild(img);
    } else {
      const pin = new window.google.maps.marker.PinElement();
      wrap.appendChild(pin.element);
    }

    const marker = new this.AdvancedMarkerElement({
      position: location.location,
      map: this.map,
      title: location?.Name || location?.name || "",
      content: wrap,
    });

    marker.id = this.markers.length;
    marker.addListener("gmp-click", () => this.openInfo(marker));
    this.markers.push(marker);
    return marker;
  }

  createClassicMarker(location) {
    const w = this.settings.mapIcon.width || 32;
    const h = this.settings.mapIcon.height || 32;
    const iconOptions =
      this.settings.mapIcon && this.settings.mapIcon.url
        ? {
          url: this.settings.mapIcon.url,
          scaledSize: new window.google.maps.Size(w, h),
          anchor: new window.google.maps.Point(Math.round(w / 2), Math.round(h)),
        }
        : null;

    const marker = new window.google.maps.Marker({
      position: location.location,
      map: this.map,
      title: location?.Name || location?.name || "",
      icon: iconOptions,
    });

    marker.id = this.markers.length;
    marker.addListener("click", () => this.openInfo(marker));
    this.markers.push(marker);
    return marker;
  }

  _initMap() {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not loaded.");
      return;
    }

    if (this.settings.mapId) {
      this.settings.mapStyle = null;
    }

    this.map = new window.google.maps.Map(document.querySelector(this.settings.mapElement), {
      center: {
        lat: this.settings.defaultLat || 0,
        lng: this.settings.defaultLng || 0,
      },
      zoom: this.settings.initialZoomLevel,
      mapId: this.settings.mapId || undefined,
      styles: this.settings.mapStyle,
      streetViewControl: false,
    });

    this.infoWindow = new window.google.maps.InfoWindow();

    this.markers = [];
    this.settings.locations = this.normalizeLocations(this.settings.locations);

    // Try to import AdvancedMarkerElement if possible
    window.google.maps.importLibrary("marker")
      .then(({ AdvancedMarkerElement }) => {
        this.AdvancedMarkerElement = AdvancedMarkerElement;
        this._addMarkers();
      })
      .catch(() => {
        this.AdvancedMarkerElement = null;
        this._addMarkers();
      });

    // Center on geolocation if enabled and available
    if (this.settings.geolocationEnabled && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          this.map.setCenter({ lat: latitude, lng: longitude });
          this.map.setZoom(this.settings.initialZoomLevel);
        },
        () => {},
        { timeout: 2000 }
      );
    }

    // Add debounced idle listener to rebuild location list after map moves
    let idleTimeout = null;
    this._idleListener = this.map.addListener("idle", () => {
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => this._buildLocationList(), 200);
    });

    this._buildLocationList();
  }

  _addMarkers() {
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];

    this.settings.locations.forEach((location) => {
      if (!location.location) return;

      if (this.AdvancedMarkerElement) {
        this.createAdvancedMarker(location);
      } else {
        this.createClassicMarker(location);
      }
    });
  }

  openInfo(marker) {
    const location = this.settings.locations[marker.id];
    if (!location) return;

    if (this.infoWindow) {
      this.infoWindow.close();
    }

    const infoEl = document.createElement("div");
    infoEl.innerHTML = `
      <h3>${location.Name || location.name || ""}</h3>
      <p>${location.Address || ""}</p>
      <a href="${location.DirectionsUrl || this.settings.directionsBaseUrl}" target="_blank" rel="noopener">${this.settings.directionsLabel}</a>
    `;

    this.infoWindow.setContent(infoEl);
    const pos = this.getMarkerPosition(marker);
    if (pos) {
      this.infoWindow.open(this.map, marker);
    }
  }

  _buildLocationList() {
    const listEl = document.querySelector(this.settings.locationsListElement);
    if (!listEl) return;

    const fragment = document.createDocumentFragment();
    listEl.innerHTML = "";

    const filteredLocations = this.settings.locations.filter((loc) => {
      if (!loc.location) return false;
      return this.map.getBounds()?.contains(loc.location);
    });

    if (filteredLocations.length === 0) {
      const noEl = document.createElement("div");
      noEl.textContent = this.settings.noLocationsFoundLabel;
      noEl.style.padding = "1em";
      fragment.appendChild(noEl);
    } else {
      filteredLocations.forEach((loc, idx) => {
        const li = document.createElement("li");
        li.textContent = loc.Name || loc.name || "Unknown location";
        li.style.cursor = "pointer";
        li.setAttribute("data-location-number", idx);

        li.addEventListener("click", () => {
          const marker = this.markers[idx];
          if (marker) {
            this.map.panTo(loc.location);
            this.map.setZoom(this.settings.focusZoomLevel);
            this.openInfo(marker);
          }
        });

        fragment.appendChild(li);
      });
    }

    listEl.appendChild(fragment);
  }
}

customElements.define("swift-locations-map", LocationsMap);

// Export so older import sites expecting LocationsMap still work
export { LocationsMap };
