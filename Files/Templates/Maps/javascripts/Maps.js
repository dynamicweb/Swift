if (typeof Dynamicweb == 'undefined') {
	var Dynamicweb = {};
}

Dynamicweb.MapSettings = {};
Dynamicweb.Map = function(options) {};

(function(window, undefined) {
	var getDefaultSettings = function() {
		/**
		 * Default settings.
		 */
		return {
			elementId: null,
			map: {
				elementId: null,
				center: new google.maps.LatLng(0, 0),
				zoom: 0,
				mapTypeId: google.maps.MapTypeId.SATELLITE
			},
			marker: {
				showInfoWindowAction: 'click',
				icon: null
			},
			infoWindow: {
				className: 'dynamicweb-map-info-window',
				useSingleWindow: true
			},
			list: {
				elementId: null,
				fixHeight: false,
				scrollIntoView: false,
				showInfoWindowAction: false,
				showInfoWindowZoom: false,
				showOnlyLocationsOnMap: false,

				/**
				 * Comparison function used for sorting the list of locations
				 *
				 * @param {HTMLElement} a
				 * @param {HTMLElement} b
				 *
				 * @return {number}
				 */
				compareLocations: function(a, b) {
					var left = getAttribute(a, 'data-sort-value'),
					right = getAttribute(b, 'data-sort-value');
					if (isNumeric(left) && isNumeric(right)) {
						left = parseFloat(left);
						right = parseFloat(right);
					}
					if (left < right) {
						return -1;
					} else if (left > right) {
						return 1;
					}
					return 0;
				}
			},
			clusterer: {
				enabled: false,
				gridSize: 60, // (number) The grid size of a cluster in pixels.
				maxZoom: null, // (number) The maximum zoom level that a marker can be part of a cluster.
				zoomOnClick: true, // (boolean) Whether the default behaviour of clicking on a cluster is to zoom into it.
				averageCenter: false, // (boolean) Wether the center of each cluster should be the average of all markers in the cluster.
				minimumClusterSize: 2 // (number) The minimum number of markers to be in a cluster before the markers are hidden and a count is shown.
			},
			search: {
				/**
				 * Get content from a location for searching by content
				 *
				 * @param {HTMLElement} el
				 *
				 * @return {string} the content to search
				 */
				getContent: function(el) {
					return stripTags(el.innerHTML);
				},

				fitRadius: true,
				fitBounds: true,
				fitBoundsMaxZoom: 12,

				// @see https://developers.google.com/maps/documentation/javascript/reference#CircleOptions
				circleOptions: {
					fillColor: '#000000',
					fillOpacity: 0.1,
					strokeColor: '#ffffff',
					strokeOpacity: 1.0,
					strokeWeight: 1
				},
				currentLocation: {
					enabled: true,
					// @see https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions
					markerOptions: {
						icon: {
							path: google.maps.SymbolPath.CIRCLE,
							scale: 8,
							strokeColor: '#00f',
							strokeWeight: 1,
							fillColor: '#aaf',
							fillOpacity: 0.5
						}
					}
				},
				ignoreCase: true,

				findNearest: {
					// Number of locations to show in list
					limit: 1,
					// Number of location to show on map (by zooming) after "Find nearest" search
					zoomLimit: 1
				}
			}
		};
	},

	getEl = function(el) {
		if (typeof el === 'string') {
			el = document.getElementById(el);
		}
		return el;
	},

	getValue = function(el) {
		el = getEl(el);
		return el ? el.value : null;
	},

	setValue = function(el, value) {
		el = getEl(el);
		if (el) {
			el.value = value;
		}
	},

	getAttribute = function(el, name) {
		el = getEl(el);
		if (el) {
			return el.getAttribute(name);
		}
	},

	stripTags = function(s) {
		if (s) {
			s = s.replace(/<[^>]*>/g, '');
		}
		return s;
	},

	// @see http://stackoverflow.com/a/174921
	isNumeric = function(input) {
		return (input - 0) == input && (input+'').replace(/^\s+|\s+$/g, '').length > 0;
	},

	getSearchContent = function(el, settings) {
		el = getEl(el);
		if (el) {
			if (typeof el._searchContent == 'undefined') {
				el._searchContent = '';
				if (typeof settings.search.getContent != 'undefined') {
					el._searchContent = settings.search.getContent(el);
				}
				if (settings.search.ignoreCase) {
					el._searchContent = el._searchContent.toLowerCase();
				}
			}
			return el._searchContent;
		}
	},

	normalizeSpace = function(s) {
		if (s) {
			s = s.replace(/^\s+/, '').replace(/\s+$/, '').replace(/\s+/g, ' ');
		}
		return s;
	},

	// Get first element with specified name and, optionally, passing filter
	getElementByName = function(name, root, filter) {
		root = getEl(root);
		root || (root = document.body);
		var i, element, elements = root.getElementsByTagName(name);
		for (i = 0; element = elements[i]; i++) {
			if (!filter || filter(element)) {
				return element;
			}
		}
	},

	getElementsBy = function(filter, root, name) {
		root = getEl(root);
		root || (root = document.body);
		name || (name = '*');
		var i, element, allElements = root.getElementsByTagName(name),
		elements = [];
		for (i = 0; element = allElements[i]; i++) {
			if (!filter || filter(element)) {
				elements[elements.length] = element;
			}
		}
		return elements;
	},

	// @see http://stackoverflow.com/a/6160317
	hasClass = function(el, cls) {
		el = getEl(el);
		return el && el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	},

	addClass = function(el, cls) {
		el = getEl(el);
		if (el && !hasClass(el, cls)) {
			el.className = normalizeSpace(el.className+' '+cls);
		}
	},

	removeClass = function(el, cls) {
		el = getEl(el);
		if (el && hasClass(el, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			el.className = normalizeSpace(el.className.replace(reg, ' '));
		}
	},

	getStyle = function(el, name) {
		el = getEl(el);
		if (el && el.style[name]) {
			return el.style[name];
		}
	},

	setStyle = function(el, values) {
		var p;
		el = getEl(el);
		if (el) {
			for (p in values) if (values.hasOwnProperty(p)) {
				el.style[p] = values[p];
			}
		}
	},

	hide = function(el) {
		setStyle(el, {
			display: 'none'
		});
	},

	show = function(el) {
		setStyle(el, {
			display: 'block'
		});
	},

	processChildren = function(el, f, all) {
		var child;
		el = getEl(el);
		if (el) {
			for (child = el.firstChild; child; child = child.nextSibling) {
				if (all || child.nodeType === 1) {
					f(child);
				}
			}
		}
	},

	// @see http://stackoverflow.com/a/383245
	/*
	 * Recursively merge properties of two objects
	 */
	mergeRecursive = function(obj1, obj2) {
		for (var p in obj2) if (obj2.hasOwnProperty(p)) {
			try {
				// Property in destination object set; update its value.
				if ( obj2[p].constructor==Object ) {
					obj1[p] = mergeRecursive((typeof obj1[p] == 'undefined') ? {} : obj1[p], obj2[p]);
				} else {
					obj1[p] = obj2[p];
				}

			} catch(e) {
				// Property in destination object not set; create it and set its value.
				obj1[p] = obj2[p];
			}
		}

		return obj1;
	},

	// @see http://stackoverflow.com/a/4298672
	debouncer = function(func, timeout) {
		var timeoutID;
		timeout = timeout || 200;
		return function() {
			var scope = this, args = arguments;
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function() {
				func.apply( scope , Array.prototype.slice.call( args ) );
			}, timeout);
		};
	};

	Dynamicweb.Map = function(options) {
		var settings = mergeRecursive(mergeRecursive({}, Dynamicweb.MapSettings), options),

		element,
		mapElement,
		listElement,

		map = null,
		markers = [],
		clusterer = null,
		infoWindow,
		listPosition,
		showAllLocations,

		getInfoWindowContent = function(container) {
			var content = document.createElement('div');
			addClass(content, settings.infoWindow.className);
			processChildren(container, function(el) {
				content.appendChild(el.cloneNode(true));
			}, true);
			return content;
		},

		getInfoWindow = function(marker) {
			if (settings.infoWindow.useSingleWindow) {
				if (!infoWindow) {
					infoWindow = new google.maps.InfoWindow(settings.infoWindow);
				}
				infoWindow.setContent(getInfoWindowContent(marker._locationElement));
				marker._infoWindow = infoWindow;
			} else {
				if (!marker._infoWindow) {
					marker._infoWindow = new google.maps.InfoWindow(settings.infoWindow);
					marker._infoWindow.setContent(getInfoWindowContent(marker._locationElement));
				}
			}
			return marker._infoWindow;
		},

		showInfoWindow = function() {
			var marker = this,
			map = marker.getMap(),
			infoWindow = getInfoWindow(marker);
			if (infoWindow) {
				infoWindow.open(map, marker);
				if (marker._locationElement) {
					processChildren(listElement, function(el) {
						removeClass(el, 'current');
					});
					addClass(marker._locationElement, 'current');
					// if (settings.list.fixHeight && settings.list.scrollIntoView && marker._locationElement.scrollIntoView) {
					// @TODO: scroll into view *inside* container
					// marker._locationElement.scrollIntoView();
					// }
				}
			}
		},

		showMarker = function() {
			var marker = this._marker,
			cluster = getMarkerCluster(marker),
			bounds;
			if (marker && map) {
				showInfoWindow.apply(marker);
				map.panTo(marker.getPosition());
				if (cluster) {
					if (cluster.getSize() > 1) {
						try {
							bounds = cluster.getBounds();
						} catch (ex) {}
						if (bounds) {
							map.fitBounds(bounds);
						}
					}
				}
				if (settings.list.showInfoWindowZoom && (settings.list.showInfoWindowZoom > map.getZoom())) {
					map.setZoom(settings.list.showInfoWindowZoom);
				}
			}
		},

		showLocation = function(marker) {
			var cluster = getMarkerCluster(marker);
			if (!cluster) {
				marker.setMap(map);
			}
			removeClass(marker._locationElement, 'hidden');
		},

		hideLocation = function(marker) {
			marker.setMap(null);
			addClass(marker._locationElement, 'hidden');
		},

		filterBounds = null,

		/**
		 * Show locations (markers) within map bounds
		 */
		filterLocations = function(filter, config) {
			var i, marker, matches;

			config || (config = {});
			matches = [];
			filterBounds = null;

			for (i = 0; marker = markers[i]; i++) {
				if (!filter || filter(marker, marker._locationElement)) {
					showLocation(marker);
					if (!filterBounds) {
						filterBounds = new google.maps.LatLngBounds();
					}
					if (filterBounds) {
						filterBounds.extend(marker.getPosition());
					}
					matches.push(marker);
				} else {
					hideLocation(marker);
				}
			}

			if (!config.noZoom) {
				if (settings.search.fitBounds && filterBounds) {
					map.fitBounds(filterBounds);
					if (settings.search.fitBoundsMaxZoom && (settings.search.fitBoundsMaxZoom < map.getZoom())) {
						map.setZoom(settings.search.fitBoundsMaxZoom);
					}
				}
			}

			if (matches.length > 0) {
				hide(noMatchesEl);
			} else {
				show(noMatchesEl);
			}
		},

		resetFilter = function() {
			var i, marker;
			filterBounds = null;
			for (i = 0; i < markers.length; i++) {
				marker = markers[i];
				showLocation(marker);
				if (!filterBounds) {
					filterBounds = new google.maps.LatLngBounds();
				}
				if (filterBounds) {
					filterBounds.extend(marker.getPosition());
				}
			}
		},

		getMarkerCluster = function(marker) {
			var i, j, markers;
			if (clusterer) {
				clusters = clusterer.getClusters();
				if (clusters) {
					for (i = 0; i < clusters.length; i++) {
						markers = clusters[i].getMarkers();
						if (markers) {
							for (j = 0; j < markers.length; j++) {
								if (markers[j] == marker) {
									return clusters[i];
								}
							}
						}
					}
				}
			}
		},

		deg2rad = function(angle) {
			return (angle / 180) * Math.PI;
		},

		// @see https://developers.google.com/maps/articles/phpsqlsearch_v3
		// @see http://www.movable-type.co.uk/scripts/latlong.html
		getDistance = function(m0, m1) {
			var lat0 = deg2rad(m0.lat()),
			lng0 = deg2rad(m0.lng()),
			lat1 = deg2rad(m1.lat()),
			lng1 = deg2rad(m1.lng());

			return 6371000*Math.acos(Math.cos(lat0)*Math.cos(lat1)*Math.cos(lng1-lng0)+Math.sin(lat0)*Math.sin(lat1));
		},

		getSearchOrigin = function(results) {
			var bestResult = null, i, result, d, distance = Number.MAX_VALUE;

			if (results.length > 0) {
				// Get location closest to current map center
				for (i = 0; result = results[i]; i++) {
					d = getDistance(map.center, result.geometry.location);
					if (d < distance) {
						bestResult = result;
						distance = d;
					}
				}
			}

			return bestResult;
		},

		showCurrentLocation = function(show) {
			if (currentLocation) {
				if (!currentLocationMarker) {
					currentLocationMarker = new google.maps.Marker(settings.search.currentLocation.markerOptions);
				}
				if (currentLocationMarker) {
					currentLocationMarker.setPosition(currentLocation);
					if (show) {
						currentLocationMarker.setMap(map);
					} else {
						currentLocationMarker.setMap(null);
					}
				}
			}
		},

		currentLocation = null,

		getCurrentLocation = function(handler) {
			if (settings.search.currentLocation.enabled) {
				if (handler) {
					if (currentLocation) {
						handler(currentLocation);
					} else {
						if (typeof navigator.geolocation !== 'undefined') {
							navigator.geolocation.getCurrentPosition(function(position) {
								currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
								handler(currentLocation);
							});
						}
					}
				}
			}
		},

		searchForm,
		noMatchesEl = null,
		searchQueryField,
		searchRadiusField;
		searchCircle = null,
		currentLocationMarker = null,

		_geocoderCache = {},

		_searchLocationsByDistance = function(origin, config) {
			var radius,
			maxDistance = parseFloat(getValue(searchRadiusField)),
			unit = getAttribute(searchRadiusField, 'data-unit'),
			numberOfMatches = 0;

			config || (config = {});

			if (isNaN(maxDistance)) {
				maxDistance = 0;
			}

			resetSearch();

			switch (unit) {
			case 'km':
				radius = 1000*maxDistance;
				break;
			case 'mi':
				radius = 1609.344*maxDistance;
				break;
			default:
				radius = maxDistance;
				break;
			}

			filterLocations(function(marker) {
				var distance = getDistance(origin, marker.getPosition());
				if (distance < radius) {
					numberOfMatches++;
					return true;
				}
			});

			if (!searchCircle) {
				// @see https://developers.google.com/maps/documentation/javascript/reference#Circle
				searchCircle = new google.maps.Circle(settings.search.circleOptions);
			}
			if (searchCircle) {
				searchCircle.setMap(map);
				searchCircle.setCenter(origin);
				searchCircle.setRadius(radius);
			}

			if (settings.search.fitRadius && searchCircle) {
				map.fitBounds(searchCircle.getBounds());
			}

			showCurrentLocation(config.usesCurrentLocation);
		},

		_searchLocationsByDistanceGeocode = function(results, status) {
			var origin;
			if (status == google.maps.GeocoderStatus.OK) {
				origin = getSearchOrigin(results);
				if (origin) {
					_searchLocationsByDistance(origin.geometry.location);
				}
			}
		},

		searchLocationsByDistance = function() {
			var geocoder, query;
			query = normalizeSpace(getValue(searchQueryField));

			if (!query) {
				getCurrentLocation(function(location) {
					_searchLocationsByDistance(location, {
						usesCurrentLocation: true
					});
				});
				return;
			}

			if (_geocoderCache[query]) {
				_searchLocationsByDistanceGeocode(_geocoderCache[query].results, _geocoderCache[query].status);
			} else {
				geocoder = new google.maps.Geocoder();
				geocoder.geocode({
					address: query,
					bounds: map.getBounds()
				}, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						_geocoderCache[query] = {
							status: status,
							results: results
						};
					}
					_searchLocationsByDistanceGeocode(results, status);
				});
			}
		},

		searchLocationsByContent = function() {
			var query = normalizeSpace(getValue(searchQueryField));
			if (!query) {
				return;
			}

			if (settings.search.ignoreCase) {
				query = query.toLowerCase();
			}

			resetSearch();
			filterLocations(function(marker) {
				var el = marker._locationElement,
				content = getSearchContent(el, settings);
				return content.indexOf(query) > -1;
			});
		},

		_searchNearestGeocode = function(results, status) {
			var origin;
			if (status == google.maps.GeocoderStatus.OK) {
				origin = getSearchOrigin(results);
				if (origin) {
					_searchNearest(origin.geometry.location);
				}
			}
		},

		_searchNearest = function(origin, config) {
			var i, marker, bounds, limit, zoomLimit;

			config || (config = {});

			resetSearch();

			for (i = 0; marker = markers[i]; i++) {
				marker._locationElement._distance = marker._distance = getDistance(origin, marker.getPosition());
			}

			sortLocations({
				compareLocations: function(a, b) {
					if (a._distance < b._distance) {
						return -1;
					} else if (a._distance > b._distance) {
						return 1;
					}
					return 0;
				},
				sortOrder: 'asc'
			});

			limit = settings.search.findNearest.limit;

			filterLocations(function(marker) {
				return marker._locationElement._index < limit;
			});

			zoomLimit = settings.search.findNearest.zoomLimit;
			bounds = new google.maps.LatLngBounds();
			processChildren(listElement, function(el) {
				if (el._index < zoomLimit) {
					bounds.extend(el._marker.getPosition());
				}
			});
			if (config.usesCurrentLocation) {
				bounds.extend(origin);
			}
			map.fitBounds(bounds);

			showCurrentLocation(config.usesCurrentLocation);
		},

		searchNearest = function() {
			var geocoder,
			query = normalizeSpace(getValue(searchQueryField));
			if (!query) {
				getCurrentLocation(function(location) {
					_searchNearest(location, {
						usesCurrentLocation: true
					});
				});
				return;
			}

			if (_geocoderCache[query]) {
				_searchNearestGeocode(_geocoderCache[query].results, _geocoderCache[query].status);
			} else {
				geocoder = new google.maps.Geocoder();
				geocoder.geocode({
					address: query,
					bounds: map.getBounds()
				}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						_geocoderCache[query] = {
							status: status,
							results: results
						};
					}
					_searchNearestGeocode(results, status);
				});
			}
		},

		searchLocationsBy = function(filter) {
			resetSearch();
			filterLocations(filter);
		},

		searchLocations = function(event) {
			var el = event.target,
			type = getAttribute(el, 'data-search');

			if (type && settings.search[type]) {
				searchLocationsBy(settings.search[type]);
				return;
			}

			switch (type) {
			case 'content':
			case 'contents':
				searchLocationsByContent();
				break;
			case 'nearest':
				searchNearest();
				break;
			case 'distance':
			default:
				searchLocationsByDistance();
				break;
			}
		},

		resetSearch = function() {
			sortLocations();
			filterLocations(function(marker) {
				return true;
			}, {
				noZoom: true
			});
			if (searchCircle) {
				searchCircle.setMap(null);
			}
			if (currentLocationMarker) {
				currentLocationMarker.setMap(null);
			}
		},

		initLocationsFilters = function() {
			var i, j, container, filter,
			getFilterId = function(el) {
				return getAttribute(el, 'data-filter-value') || getAttribute(el, 'data-group-id');
			},
			getFilterIds = function(el) {
				var value = getAttribute(el, 'data-filter-values');
				return (value == null ? null : value.split(','));
			},
			containers = getElementsBy(function(el) {
				return hasClass(el, 'locations-filter') || hasClass(el, 'group-filter');
			}, element),

			filterLocationsHandler = function(event) {
				var filterId = getFilterId(this);
				resetFilter();

				processChildren(this.parentNode, function(el) {
					removeClass(el, 'active');
				});
				addClass(this, 'active');

				if (filterId != '*') {
					filterLocations(function(marker) {
						var i, id, ids = getFilterIds(marker._locationElement);
						if (ids) {
							for (i = 0; id = ids[i]; i++) {
								if (filterId == id) {
									return true;
								}
							}
						}
						return filterId == getFilterId(marker._locationElement);
					});
				}
			},

			filters,
			filterId,
			filterIds;

			if (containers) {
				for (i = 0; container = containers[i]; i++) {
					filters = getElementsBy(getFilterId, container);
					if (filters) {
						filterIds = {};
						for (j = 0; filter = filters[j]; j++) {
							filterId = getFilterId(filter);
							if (filterIds[filterId]) {
								// Duplicate filter
								filter.parentNode.removeChild(filter);
							} else {
								google.maps.event.addDomListener(filter, 'click', filterLocationsHandler);
								filterIds[filterId] = true;
							}
						}
					}
				}
			}
		},

		initSearch = function() {
			var i, buttons, button;

			searchForm = getElementByName('form', element);

			noMatchesEl = getElementByName('*', element, function(el) {
				return hasClass(el, 'no-matches');
			});

			hide(noMatchesEl);

			if (searchForm) {
				google.maps.event.addDomListener(searchForm, 'submit', function(event) {
					event.preventDefault ? event.preventDefault() : event.returnValue = false;
				});

				google.maps.event.addDomListener(searchForm, 'reset', function(event) {
					event.preventDefault ? event.preventDefault() : event.returnValue = false;
					resetSearch();
					setValue(searchQueryField, '');
				});

				searchQueryField = getElementByName('input', searchForm, function(el) {
					return el.type == 'text';
				});
				searchRadiusField = getElementByName('select', searchForm);

				buttons = getElementsBy(function(el) {
					return getAttribute(el, 'data-search') || el.type == 'submit';
				}, searchForm);
				for (i = 0; button = buttons[i]; i++) {
					google.maps.event.addDomListener(button, 'click', searchLocations);
				}
			}
		},

		sortLocations = function(config) {
			var i, item, items = [], compareLocations, sortOrder;
			config || (config = {});
			compareLocations = config.compareLocations ? config.compareLocations : settings.list.compareLocations;
			sortOrder = config.sortOrder ? config.sortOrder : getAttribute(listElement, 'data-sort-order');

			if (compareLocations != 'undefined') {
				for (item = listElement.firstChild; item; item = item.nextSibling) {
					if (item.nodeType == 1) {
						items.push(item);
					}
				}

				items.sort(function(a, b) {
					var result = compareLocations(a, b);
					return (sortOrder == 'desc') ? -result : result;
				});
				for (i = 0; item = items[i]; i++) {
					listElement.appendChild(item);
					item._index = i;
				}
			}
		},

		init = function() {
			var defaultSettings = getDefaultSettings();

			if (settings.map) {
				if (settings.map.center) {
					// Convert center from array to LatLng
					settings.map.center = new google.maps.LatLng(settings.map.center[0], settings.map.center[1]);
				}
				if (settings.map.mapType && google.maps.MapTypeId[settings.map.mapType]) {
					settings.map.mapTypeId = google.maps.MapTypeId[settings.map.mapType];
				}
			}

			settings = mergeRecursive(mergeRecursive({}, defaultSettings), settings);

			element = getEl(settings.elementId);
			mapElement = getEl(settings.map.elementId);
			listElement = getEl(settings.list.elementId);

			if (typeof MarkerClusterer == 'undefined') {
				settings.clusterer.enabled = false;
			}

			if (element) {
				listPosition = getAttribute(element, 'data-list-position');
				if (listPosition) {
					addClass(element, 'list-'+listPosition);
					switch (listPosition) {
					case 'left':
					case 'right':
						settings.list.fixHeight = true;
						settings.list.scrollIntoView = true;
						break;
					}
				}

				if (mapElement && listElement) {
					map = new google.maps.Map(mapElement, settings.map);
					if (!settings.clusterer.enabled) {
						settings.marker.map = map;
					}

					if (settings.list.fixHeight === true) {
						setStyle(listElement, {
							'height': getStyle(mapElement.parentNode, 'height'),
							'overflow': 'auto'
						});
					}

					// Create markers
					processChildren(listElement, function(el) {
						var lat = parseFloat(getAttribute(el, 'data-lat')),
						lng = parseFloat(getAttribute(el, 'data-lng')),
						title = getAttribute(el, 'data-title'),
						icon = getAttribute(el, 'data-icon'),
						markerOptions,
						marker;

						if (!isNaN(lat) && !isNaN(lng)) {
							markerOptions = mergeRecursive({}, mergeRecursive(settings.marker, {
								position: new google.maps.LatLng(lat, lng),
								title: title
							}));
							if (icon) {
								markerOptions.icon = icon;
							}

							marker = new google.maps.Marker(markerOptions);
							markers.push(marker);

							marker._locationElement = el;
							el._marker = marker;
							google.maps.event.addListener(marker, settings.marker.showInfoWindowAction, showInfoWindow);
							if (settings.list.showInfoWindowAction) {
								google.maps.event.addDomListener(el, settings.list.showInfoWindowAction, showMarker);
							}
						}
					});

					if (settings.clusterer.enabled) {
						clusterer = new MarkerClusterer(map, markers, settings.clusterer);
					}

					initLocationsFilters();
					initSearch();
					sortLocations();

					showAllLocations = getElementByName('*', element, function(el) {
						return hasClass(el, 'show-all-locations');
					});
					if (showAllLocations) {
						google.maps.event.addDomListener(showAllLocations, 'click', function() {
							resetSearch();
							resetFilter();
							if (filterBounds) {
								map.fitBounds(filterBounds);
							}
						});
					}

					if (settings.list.showOnlyLocationsOnMap) {
						google.maps.event.addListener(map, 'bounds_changed', debouncer(function() {
							var bounds = map.getBounds();
							if (bounds) {
								filterLocations(function(marker) {
									return bounds.contains(marker.getPosition());
								}, {
									noZoom: true
								});
							}
						}));
					}

					if (typeof settings.init != 'undefined') {
						settings.init({
							map: map
						});
					}
				}
			}
		};

		google.maps.event.addDomListener(window, 'load', init);
	};
}(window));
