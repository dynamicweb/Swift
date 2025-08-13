/* global google */

class LocationsMap extends HTMLElement {
  // one shared loader per page to avoid duplicate script tags
  static _loaderPromise = null;

  constructor() {
    super();
    this.map = null;
    this.infoWindow = null;
    this.markers = [];
    this._initialized = false;

    // defaults (preserving your original behavior)
    this.defaults = {
      locations: [],
      mapStyle: [],
      defaultLat: 0,
      defaultLng: 0,
      initialZoomLevel: 6,
      regionCode: "DK",
      listItemLabel: "View location",
      directionsLabel: "Directions",
      noLocationsFoundLabel: "No options available in the selected area",
      mapElement: "#Map",
      locationsListElement: "#LocationsList",
      searchbarElement: "#MapSearch",
      mapIconUrl: null,
      focusZoomLevel: 7,
      directionsBaseUrl: "https://www.google.com/maps/dir/?api=1&destination=",
    };

    this.settings = { ...this.defaults };
  }

  connectedCallback() {
    if (this._initialized) return;

    // Read attributes -> settings
    this._readAttributesToSettings();

    // Ensure the map div exists (do NOT change its size)
    const mapDiv = document.querySelector(this.settings.mapElement);
    if (!mapDiv) {
      console.error("Map element not found:", this.settings.mapElement);
      return;
    }

    // Load Google Maps JS if needed, then init
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

  // --------- Attribute parsing ---------

  _readAttributesToSettings() {
    const parseJSON = (attr, fallback) => {
      const raw = this.getAttribute(attr);
      if (!raw) return fallback;
      try {
        return JSON.parse(raw);
      } catch {
        return fallback;
      }
    };

    this.settings = { ...this.defaults };

    this.settings.locations = parseJSON("locations", []);
    this.settings.mapStyle = parseJSON("map-style", []);

    this.settings.defaultLat = parseFloat(this.getAttribute("default-lat")) || this.defaults.defaultLat;
    this.settings.defaultLng = parseFloat(this.getAttribute("default-lng")) || this.defaults.defaultLng;
    this.settings.initialZoomLevel = parseInt(this.getAttribute("initial-zoom-level"), 10) || this.defaults.initialZoomLevel;

    this.settings.mapElement = this.getAttribute("map-element") || this.defaults.mapElement;
    this.settings.locationsListElement = this.getAttribute("locations-list-element") || this.defaults.locationsListElement;
    this.settings.searchbarElement = this.getAttribute("searchbar-element") || this.defaults.searchbarElement;

    this.settings.regionCode = this.getAttribute("region-code") || this.defaults.regionCode;
    this.settings.listItemLabel = this.getAttribute("list-item-label") || this.defaults.listItemLabel;
    this.settings.directionsLabel = this.getAttribute("directions-label") || this.defaults.directionsLabel;
    this.settings.noLocationsFoundLabel = this.getAttribute("no-locations-found-label") || this.defaults.noLocationsFoundLabel;

    this.settings.mapIconUrl = this.getAttribute("map-icon-url") || this.defaults.mapIconUrl;

    // normalize locations lat/lng
    this.settings.locations = this._normalizeLocations(this.settings.locations);
  }

  _normalizeLocations(arr) {
    return (arr || []).map((loc) => {
      const lat =
        (loc.Location && loc.Location.Lat) ??
        (loc.location && loc.location.lat) ??
        loc.lat;

      const lng =
        (loc.Location && loc.Location.Lng) ??
        (loc.location && loc.location.lng) ??
        loc.lng;

      return {
        ...loc,
        location:
          typeof lat === "number" && typeof lng === "number" ? { lat, lng } : null,
      };
    });
  }

  // --------- Google loader (prevents build-time "google is not defined") ---------

  _loadGoogleMaps(apiKey) {
    if (window.google && window.google.maps) return Promise.resolve();
    if (LocationsMap._loaderPromise) return LocationsMap._loaderPromise;

    LocationsMap._loaderPromise = new Promise((resolve, reject) => {
      // unique callback so multiple components won’t collide
      const cbName = "__swift_gmaps_init__" + Math.random().toString(36).slice(2);
      window[cbName] = () => {
        try { delete window[cbName]; } catch (err) {
          console.error("Failed to delete Google Maps callback:", err);
        }
        resolve();
      };

      const s = document.createElement("script");
      s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&callback=${cbName}`;
      s.async = true;
      s.defer = true;
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });

    return LocationsMap._loaderPromise;
  }

  // --------- Map & UI ---------

  _initMap() {
    const mapDiv = document.querySelector(this.settings.mapElement);
    if (!mapDiv) {
      console.error("Map element not found:", this.settings.mapElement);
      return;
    }

    this.map = new google.maps.Map(mapDiv, {
      center: { lat: this.settings.defaultLat, lng: this.settings.defaultLng },
      zoom: this.settings.initialZoomLevel,
      styles: Array.isArray(this.settings.mapStyle) ? this.settings.mapStyle : undefined,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
    });

    this.infoWindow = new google.maps.InfoWindow({ maxWidth: 300, minWidth: 220 });

    // Classic markers only (with corrected bottom-center anchor)
    this.markers = [];
    this.settings.locations.forEach((loc, i) => {
      if (!loc.location) return;
      this._createClassicMarker(loc, i);
    });

    // Build list initially and on idle (visible in viewport)
    this._buildLocationList();
    this.map.addListener("idle", () => this._buildLocationList());

    // Searchbar form (geocode)
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
          } else {
            console.log("Geocode failed:", status);
          }
        });
      });
    }
  }

  _createClassicMarker(location, index) {
    const icon = this.settings.mapIconUrl
      ? {
        url: this.settings.mapIconUrl,
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 32), // bottom-center (corrected)
      }
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

  // ---------- Template helpers (ADDED) ----------

  _computeCommon(loc) {
    const addressParts = [
      loc?.Address ?? loc?.address,
      loc?.Zip ?? loc?.zip,
      loc?.City ?? loc?.city,
      loc?.State ?? loc?.state,
      loc?.Country ?? loc?.country,
    ].filter(Boolean);

    return {
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
  }

  _bindByAttr(fragment, attrName, loc) {
    const vals = this._computeCommon(loc);

    fragment.querySelectorAll(`[${attrName}]`).forEach((el) => {
      const key = el.getAttribute(attrName);
      if (!key) return;

      // Important: don't overwrite the 'button' placeholder's inner HTML (it contains the directions icon)
      if (key === "button") {
        // leave the button content intact; event wiring happens in _buildLocationList
        return;
      }

      const v = (key in vals) ? vals[key] : (loc?.[key] ?? "");
      if (el.tagName && el.tagName.toLowerCase() === "a") {
        if (v) el.setAttribute("href", String(v));
        else el.removeAttribute("href");
      } else {
        el.textContent = v ? String(v) : "";
      }
    });
  }

  // ---------- InfoWindow now uses #info-window-template if present (ADDED) ----------

  _openInfo(marker) {
    const location = this.settings.locations[marker.id];
    if (!location) return;

    const tpl = document.getElementById("info-window-template");
    if (tpl && tpl.content) {
      const frag = tpl.content.cloneNode(true);
      // Fill placeholders in the template
      this._bindByAttr(frag, "data-swift-info", location);

      // Set header (if supported)
      const titleText = location?.Name || location?.name || "";
      if (typeof this.infoWindow.setHeaderContent === "function") {
        try { this.infoWindow.setHeaderContent(titleText); } catch (err) {
          console.error("Failed to set infoWindow header content:", err);
        }
      } else {
        // Fallback: prepend a header node
        const wrap = document.createElement("div");
        const h = document.createElement("h3");
        h.textContent = titleText;
        wrap.appendChild(h);
        wrap.appendChild(frag);
        this.infoWindow.setContent(wrap);
        this.infoWindow.open(this.map, marker);
        this.map.panTo(marker.getPosition());
        return;
      }

      // If header is set, use the fragment as the body
      const container = document.createElement("div");
      container.appendChild(frag);
      this.infoWindow.setContent(container);
      this.infoWindow.open(this.map, marker);
      this.map.panTo(marker.getPosition());
      return;
    }

    // Fallback to previous hardcoded body if template is missing
    const address = [
      location?.Address ?? location?.address,
      location?.Zip ?? location?.zip,
      location?.City ?? location?.city,
      location?.State ?? location?.state,
      location?.Country ?? location?.country,
    ].filter(Boolean).join(", ");

    const content = document.createElement("div");
    content.innerHTML = `
      <div>
        ${address ? `<p>${address}</p>` : ""}
        <div class="mt-2">
          <a
            href="${this._buildDirectionsUrl(location)}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${this.settings.directionsLabel}"
            title="${this.settings.directionsLabel}"
            style="display:inline-flex;align-items:center;gap:.25rem;text-decoration:none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-up-right"><polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path></svg>
            <span>${this.settings.directionsLabel}</span>
          </a>
        </div>
      </div>
    `;

    const titleFallback = location?.Name || location?.name || "";
    if (typeof this.infoWindow.setHeaderContent === "function") {
      try { this.infoWindow.setHeaderContent(titleFallback); } catch (err) {
        console.error("Failed to set infoWindow header content fallback:", err);
      }
    } else {
      const h = document.createElement("h3");
      h.textContent = titleFallback;
      content.prepend(h);
    }

    this.infoWindow.setContent(content);
    this.infoWindow.open(this.map, marker);
    this.map.panTo(marker.getPosition());
  }

  _buildDirectionsUrl(location) {
    if (location?.DirectionsUrl && String(location.DirectionsUrl).trim() !== "") {
      return location.DirectionsUrl;
    }
    const q = [location?.Address ?? location?.address, location?.Zip ?? location?.zip, location?.City ?? location?.city]
      .filter(Boolean)
      .join(" ");
    return `${this.defaults.directionsBaseUrl}${encodeURIComponent(q)}`;
  }

  _buildLocationList() {
    const listEl = document.querySelector(this.settings.locationsListElement);
    if (!listEl) return;

    listEl.innerHTML = "";
    const bounds = this.map.getBounds();

    const inView = this.settings.locations
      .map((loc, i) => ({ loc, i })) // keep original index for marker lookup
      .filter(({ loc }) => loc.location && (!bounds || bounds.contains(new google.maps.LatLng(loc.location))));

    if (inView.length === 0) {
      const noEl = document.createElement("div");
      noEl.textContent = this.settings.noLocationsFoundLabel;
      noEl.style.padding = "1rem";
      listEl.appendChild(noEl);
      return;
    }

    const tpl = document.querySelector("#location-item-template");
    inView.forEach(({ loc, i }) => {
      if (tpl?.content) {
        const clone = document.importNode(tpl.content, true);

        // Fill placeholders in the list item template
        this._bindByAttr(clone, "data-swift-loc", loc);

        // Click target
        const clickable =
          clone.querySelector("[data-swift-loc='button']") ||
          clone.querySelector("button") ||
          clone.firstElementChild;

        if (clickable) {
          clickable.setAttribute("data-location-number", i);
          clickable.addEventListener("click", () => this._focusMarker(i));
        }

        listEl.appendChild(clone);
      } else {
        // Simple fallback if template missing
        const li = document.createElement("li");
        li.textContent = loc?.Name || loc?.name || this.settings.listItemLabel;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => this._focusMarker(i));
        listEl.appendChild(li);
      }
    });
  }

  _focusMarker(index) {
    const marker = this.markers[index];
    if (!marker) return;
    const pos = marker.getPosition();
    if (pos) {
      this.map.setZoom(this.defaults.focusZoomLevel);
      this.map.panTo(pos);
    }
    this._openInfo(marker);
  }
}

customElements.define("swift-locations-map", LocationsMap);
export { LocationsMap };
