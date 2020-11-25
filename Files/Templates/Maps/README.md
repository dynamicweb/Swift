Title:	Dynamicweb Maps

Dynamicweb Maps
===============

* [Introduction][]
* [Sorting][]
* [Filtering][]
* [Searching][]
* [Custom configuration][]

# Introduction #

This document describes the features of the Dynamicweb Maps
Module. The best way to understand hwo to use the Maps module is
probably by taking a look at the example templates in the
[templates folder](templates/).

Basically the map consists of a list of *locations* and corresponding
*markers* on a map. The map can also have a *search form* with a
number of controls for filtering and searching the locations and markers.

Using basic html5 markup it is possible to do most things that are needed, but if
need be it is also possible to use JavaScript to do more advanced
stuff.


# Sorting #

In order to sort the locations all that is needed is to specify a
*data-sort-value* attribute on each location element, e.g.

	<li data-sort-value="<!--@Name-->"> … </li>

If the sort values are numeric, the sorting will be numeric
value. Otherwise, the sorting will be lexicographic.

The sort order can be specified using a *data-sort-order* attribute on
the list element, e.g.

	<ol id="<!--@ListElementID-->" data-sort-order="desc">

## Custom sorting ##

It is possible to use a custom function for comparing locations. The comparison function is defined using JavaScript like this at the bottom of the Maps template

	<script>(function() {
	var stripTags = function(s) {
		if (s) {
			s = s.replace(/<[^>]*>/g, '');
		}
		return s;
	}

	Dynamicweb.MapSettings = {
		list: {
			/**
			 * Compare locations by length of textual content
			 *
			 * @param {HTMLElement} a
			 * @param {HTMLElement} b
			 *
			 * @return {number}
			 */
			compareLocations: function(a, b) {
				var left = stripTags(a.innerHTML).length,
				right = stripTags(b.innerHTML).length;
				if (left < right) {
					return -1;
				} else if (left > right) {
					return 1;
				}
				return 0;
			}
		}
	}
	}())</script>
	<!--@InitScript-->

See [templates/Maps-sorting-custom.html](templates/Maps-sorting-custom.html) for another example.


# Filtering #

The list of locations (and hence the markers) can be filtered to just
display the ones matching a given *filter value*. The filter value of
a locations is set by the *data-filter-value* attribute, e.g.

	<li data-filter-value="<!--@GroupName-->"> … </li>

*Filter controls*, i.e. controls to apply a filter, are defined inside
 an element with class "locations-filter":

	<div class="locations-filter">
		<button data-filter-value="Retailer">Show Retailers</button>
		<button data-filter-value="Wholesaler">Show wholesalers</button>
		<button data-filter-value="*">Show all</button>
	</div>

Whenever a filter control is pressed, a filter will be applied with
the filter value of the control. Use "*" as filter value to show all
locations. The active filter control will have the CSS class "active"
applied.

If two or more filter controls have the same filter value, only the
first one having the value will be displayed.

Filter controls for filtering on group name can easily be created
using the UserGroup loop:

	<!--@LoopStart(UserGroups)-->
	<!--@HeaderStart-->
	<div class="locations-filter">
		<!--@HeaderEnd-->
		<button data-filter-value="<!--@Name-->">
			<!--@If Defined(Icon)--><img class="icon" src="<!--@Icon-->" /><!--@EndIf(Icon)-->
			<!--@Name--></button>
		<!--@FooterStart-->
		<button data-filter-value="*"><!--@Translate(Show_all, "Show all")--></button>
	</div>
	<!--@FooterEnd-->
	<!--@LoopEnd(UserGroups)-->


# Searching #

The Maps module can perform a number of different searches:

* Search by distance from a given address
* Find nearest location from a given address
* Search by text content of locations
* Custom search

"Search by distance" and "Find nearest" uses a *search origin* to find the locations that match the search. The search origin can come from two places

	1. A user specified search query that's [geocoded into a geographic location](https://developers.google.com/maps/documentation/geocoding/)
	2. From the actual location of the browser, e.g. using a gps sensor in a smartphone

If no search query is specified, the browser location will be used (unless disabled by configuration or if the user does not allow the use).

## Search controls ##

The search can take parameters from a search form defined in the Maps template. Some controls are automatically picked up but the Maps module for searching

1. The first *input* element with type="text" will be used for the search query text
2. The first *select* element will be used to specify the distance when searching by distance
3. Any element with a *data-search* attribute will perform a search. The search type depends on the value of the *data-search* attribute

	1. ``<button data-search="distance"/>`` Find locations within the given distance from the search origin
	2. ``<button data-search="nearest"/>`` Find the location that's nearest to the search origin
	3. ``<button data-search="content"/>`` Search locations by text content
	4. ``<button data-search="«filter name»"/>`` Search locations by a custom filter function named «filter name»

See [Maps-search.html](templates/Maps-search.html) for examples.


# Custom configuration #

As seen above – and in the examples – most settings can be controlled
using html markup, but sometimes something more is needed and for this
it's possible to set custom configuration using JavaScript.

The way to add custom configuration to the Maps module, is to add the following at the end of a Maps template

	<script>
	Dynamicweb.MapSettings = {
		...
	}</script>
	<!--@InitScript-->

In the Dynamicweb.MapSettings variable any default configuration (see [Maps.js](javascripts/Maps.js)) can be overridden or extended. See

* [Maps-custom.html](templates/Maps-custom.html)
* [Maps-sorting-custom.html](templates/Maps-sorting-custom.html)
* [Maps-search-content-custom.html](templates/Maps-search-content-custom.html)
* [Maps-current-location-custom.html](templates/Maps-current-location-custom.html)

for examples.