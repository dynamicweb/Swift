/* global google */

class LocationsMap extends HTMLElement {
  static _loaderPromise = null;

  constructor() {
    super();
    this.map = null;
    this.infoWindow = null;
    this.markers = [];
    this._initialized = false;
    this.settings = {};
  }

  connectedCallback() {
    if (this._initialized) return;

    this._readAttributesToSettings();

    const mapDiv = document.querySelector(this.settings.mapElement);
    if (!mapDiv) {
      console.error("Map element not found:", this.settings.mapElement);
      return;
    }

    const apiKey = this.getAttribute("api-key");
    if (!apiKey) {
      console.error("api-key attribute is required on <swift-locations-map>.");
      return;
    }

    this._loadGoogleMaps(apiKey)
      .then(() => this._initMap())
      .catch((err) => console.error("Failed to load Google Maps API:", err));

    this._initialized = true;
  }

  _readAttributesToSettings() {
    const parseJSON = (attr) => {
      const raw = this.getAttribute(attr);
      if (!raw) return undefined;
      try { return JSON.parse(raw); } catch { return undefined; }
    };

    this.settings.locations = parseJSON("locations");
    this.settings.mapStyle = parseJSON("map-style");

    const parseFloatAttr = (attr) => {
      const val = parseFloat(this.getAttribute(attr));
      return isNaN(val) ? undefined : val;
    };

    const parseIntAttr = (attr) => {
      const val = parseInt(this.getAttribute(attr), 10);
      return isNaN(val) ? undefined : val;
    };

    this.settings.defaultLat = parseFloatAttr("default-lat");
    this.settings.defaultLng = parseFloatAttr("default-lng");
    this.settings.initialZoomLevel = parseIntAttr("initial-zoom-level");

    this.settings.mapElement = this.getAttribute("map-element");
    this.settings.locationsListElement = this.getAttribute("locations-list-element");
    this.settings.searchbarElement = this.getAttribute("searchbar-element");

    this.settings.regionCode = this.getAttribute("region-code");
    this.settings.listItemLabel = this.getAttribute("list-item-label");
    this.settings.noLocationsFoundLabel = this.getAttribute("no-locations-found-label");

    this.settings.mapIconUrl = this.getAttribute("map-icon-url");

    this.settings.locations = this._normalizeLocations(this.settings.locations);
  }

  _normalizeLocations(arr) {
    return (arr || []).map((loc) => {
      const lat = (loc.Location && loc.Location.Lat) ?? (loc.location && loc.location.lat) ?? loc.lat;
      const lng = (loc.Location && loc.Location.Lng) ?? (loc.location && loc.location.lng) ?? loc.lng;
      return { ...loc, location: typeof lat === "number" && typeof lng === "number" ? { lat, lng } : null };
    });
  }

  _loadGoogleMaps(apiKey) {
    if (window.google && window.google.maps) return Promise.resolve();
    if (LocationsMap._loaderPromise) return LocationsMap._loaderPromise;

    LocationsMap._loaderPromise = new Promise((resolve, reject) => {
      const cbName = "__swift_gmaps_init__" + Math.random().toString(36).slice(2);
      window[cbName] = () => { try { delete window[cbName]; } catch {
        console.error("Maps not loaded");
      } resolve(); };
      const s = document.createElement("script");
      s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&callback=${cbName}`;
      s.async = true; s.defer = true;
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });

    return LocationsMap._loaderPromise;
  }

  _initMap() {
    const mapDiv = document.querySelector(this.settings.mapElement);
    if (!mapDiv) { console.error("Map element not found:", this.settings.mapElement); return; }

    this.map = new google.maps.Map(mapDiv, {
      center: { lat: this.settings.defaultLat, lng: this.settings.defaultLng },
      zoom: this.settings.initialZoomLevel,
      styles: Array.isArray(this.settings.mapStyle) ? this.settings.mapStyle : undefined,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
    });

    this.infoWindow = new google.maps.InfoWindow({ maxWidth: 300, minWidth: 220 });

    this.markers = [];
    this.settings.locations?.forEach((loc, i) => { if (loc.location) this._createClassicMarker(loc, i); });

    this._buildLocationList();
    this.map.addListener("idle", () => this._buildLocationList());

    const form = document.querySelector(this.settings.searchbarElement);
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector("input[type='text'], input");
        const value = input ? input.value.trim() : "";
        if (!value) return;

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: value, region: this.settings.regionCode }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results[0]) {
            this.map.fitBounds(results[0].geometry.viewport);
          } else { console.log("Geocode failed:", status); }
        });
      });
    }
  }

  _createClassicMarker(location, index) {
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
    marker.addListener("click", () => this._openInfo(marker));
    this.markers.push(marker);
  }

  _computeCommon(loc) {
    const addressParts = [
      loc?.Address ?? loc?.address,
      loc?.Zip ?? loc?.zip,
      loc?.City ?? loc?.city,
      loc?.State ?? loc?.state,
      loc?.Country ?? loc?.country
    ].filter(Boolean);

    // Standard fields
    const base = {
      Name: loc?.Name ?? loc?.name ?? "",
      Address: loc?.Address ?? loc?.address ?? "",
      Zip: loc?.Zip ?? loc?.zip ?? "",
      City: loc?.City ?? loc?.city ?? "",
      Country: loc?.Country ?? loc?.country ?? "",
      Phone: loc?.Phone ?? loc?.phone ?? "",
      Email: loc?.Email ?? loc?.email ?? "",
      AddressFull: addressParts.join(", "),
      DirectionsUrl: this._buildDirectionsUrl(loc),
    };

    // Merge all other fields dynamically
    Object.keys(loc).forEach((key) => {
      if (!(key in base)) {
        base[key] = loc[key];
      }
    });

    return base;
  }

  _bindByAttr(fragment, attrName, loc) {
    const vals = this._computeCommon(loc);
    fragment.querySelectorAll(`[${attrName}]`).forEach((el) => {
      const key = el.getAttribute(attrName);
      if (!key) return;
      if (key === "button") return;
      const v = (key in vals) ? vals[key] : (loc?.[key] ?? "");
      if (el.tagName?.toLowerCase() === "a") v ? el.setAttribute("href", String(v)) : el.removeAttribute("href");
      else el.textContent = v ? String(v) : "";
    });
  }

  _openInfo(marker) {
    const location = this.settings.locations[marker.id];
    if (!location) return;

    const tpl = document.querySelector('[data-template="info-window"]');

    // Set header (if supported)
    const titleText = location?.Name || location?.name || "";
    if (typeof this.infoWindow.setHeaderContent === "function") {
      try { this.infoWindow.setHeaderContent(titleText); } catch (err) {
        console.error("Failed to set infoWindow header content:", err);
      }
    } 

    if (tpl?.content) {
      const frag = tpl.content.cloneNode(true);
      this._bindByAttr(frag, "data-swift-info", location);
      const container = document.createElement("div");
      container.appendChild(frag);
      this.infoWindow.setContent(container);
      this.infoWindow.open(this.map, marker);
      this.map.panTo(marker.getPosition());
      return;
    }

    this.infoWindow.open(this.map, marker);
    this.map.panTo(marker.getPosition());
  }

  _buildDirectionsUrl(location) {
    if (location?.DirectionsUrl?.trim()) return location.DirectionsUrl;
    const q = [location?.Address ?? location?.address, location?.Zip ?? location?.zip, location?.City ?? location?.city].filter(Boolean).join(" ");
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
  }

  _buildLocationList() {
    const listEl = document.querySelector(this.settings.locationsListElement);
    if (!listEl) return;

    listEl.innerHTML = "";
    const bounds = this.map.getBounds();

    const inView = this.settings.locations?.map((loc, i) => ({ loc, i })).filter(({ loc }) => loc.location && (!bounds || bounds.contains(new google.maps.LatLng(loc.location)))) ?? [];

    if (!inView.length) {
      const noEl = document.createElement("div");
      noEl.textContent = this.settings.noLocationsFoundLabel || "No options available";
      noEl.style.padding = "1rem";
      listEl.appendChild(noEl);
      return;
    }

    const tpl = document.querySelector('[data-template="location-item"]');
    console.log(tpl);
    inView.forEach(({ loc, i }) => {
      if (!tpl?.content) return;
      const clone = document.importNode(tpl.content, true);
      this._bindByAttr(clone, "data-swift-loc", loc);
      const clickable = clone.querySelector("[data-swift-loc='button']") || clone.querySelector("button") || clone.firstElementChild;
      if (clickable) {
        clickable.setAttribute("data-location-number", i);
        clickable.addEventListener("click", () => this._focusMarker(i));
      }
      listEl.appendChild(clone);
    });
  }

  _focusMarker(index) {
    const marker = this.markers[index];
    if (!marker) return;
    const pos = marker.getPosition();
    if (pos) this.map.panTo(pos);
    this._openInfo(marker);
  }
}

customElements.define("swift-locations-map", LocationsMap);
export { LocationsMap };
