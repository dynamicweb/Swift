const Places = function () {
	var autocomplete;

	var settings = {
		currentCountry: "DK",
		fieldPrefix: null,
		inputfield: null
	};

	return {
		init: function (placesSettings) {
			settings = placesSettings;

			var input = settings.inputfield != null ? document.querySelector(settings.inputfield) : null;
			input = input == null ? document.querySelector("#EcomOrderDeliveryAddress") : input;
			input = input == null ? document.querySelector("#EcomOrderCustomerAddress") : input;
			input = input == null ? document.querySelector("#UserManagement_Form_Address") : input;

			if (input != null) {
				const options = {
					componentRestrictions: { country: settings.currentCountry },
					fields: ["address_components"],
					strictBounds: false,
					types: ["address"]
				};

				input.addEventListener("keypress", function (e) {
					if (e.key === 'Enter') {
						e.preventDefault();
					}
				});

				autocomplete = new google.maps.places.Autocomplete(input, options)
				autocomplete.addListener("place_changed", swift.Places.fillInAddress);
				input.setAttribute("autocomplete", "none");
			}
		},

		changeCountry: function (countryCode) {
			autocomplete.setComponentRestrictions({
				country: [countryCode],
			});
		},

		fillInAddress: function () {
			var fieldPrefix = settings.fieldPrefix;
			fieldPrefix = document.querySelector("#EcomOrderDeliveryAddress") && fieldPrefix == null ? "EcomOrderDelivery" : fieldPrefix;
			fieldPrefix = document.querySelector("#EcomOrderCustomerAddress") && fieldPrefix == null ? "EcomOrderCustomer" : fieldPrefix;
			fieldPrefix = document.querySelector("#UserManagement_Form_Address") && fieldPrefix == null ? "UserManagement_Form_" : fieldPrefix;

			// Get the place details from the autocomplete object.
			const place = autocomplete.getPlace();

			// Get each component of the address from the place details,
			// and then fill-in the corresponding field on the form.
			// place.address_components are google.maps.GeocoderAddressComponent objects
			// which are documented at http://goo.gle/3l5i5Mr

			if (place.address_components != undefined) {
				var address = "";
				var zip = "";
				var region = "";
				var country = "";
				var locality = "";
				var sublocality = "";

				for (const component of place.address_components) {
					const componentType = component.types[0];

					switch (componentType) {
						case "route": {
							address = component.long_name;
							break;
						}

						case "postal_code": {
							zip = component.long_name;
							break;
						}
								
						case "postal_town": {
							locality = locality == "" ? component.long_name : locality;
							break;
						}

						case "locality": {
							locality = locality == "" ? component.long_name : locality;
							break;
						}

						case "sublocality_level_1": {
							sublocality = component.long_name;
							break;
						}

						case "administrative_area_level_1": {
							region = component.short_name;
							break;
						}

						case "country":
							country = component.short_name;
							break;
					}
				}

				const addressField = document.querySelector("#" + fieldPrefix + "Address");
				if (addressField != null) {
					addressField.value = address;
				}

				const zipField = document.querySelector("#" + fieldPrefix + "Zip");
				if (zipField != null) {
					zipField.value = zip;
				}

				const regionField = document.querySelector("#" + fieldPrefix + "Region");
				if (regionField != null) {
					regionField.value = region;
				}

				var countryField = document.querySelector("#" + fieldPrefix + "Country");
				countryField = countryField == null ? document.querySelector("#" + fieldPrefix + "CountryCode") : countryField;
				if (countryField != null) {
					countryField.value = country;
				}

				const cityField = document.querySelector("#" + fieldPrefix + "City");
				if (cityField != null) {
					cityField.value = sublocality != "" ? sublocality : locality;
				}

				document.querySelector("#" + fieldPrefix + "Address").focus();
			}
		}
	}
}();

export { Places };
