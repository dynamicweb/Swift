import { PageUpdater } from "./_pageupdater.js";
import { loadGoogleMaps } from "./_googlemaps.js";

const Places = (function () {
  // One entry per autocompleted input, so each form keeps its own Autocomplete and listeners
  var instances = [];

  return {
    // Loads the Maps API once, then inits. For templates that don't load the API themselves.
    load: function (apiKey, placesSettings) {
      return loadGoogleMaps(apiKey)
        .then(() => this.init(placesSettings))
        .catch((error) => console.error("Failed to load Google Places:", error));
    },

    // Read window.google at call time: the Maps API loads after swift.js, so a module-level reference is undefined
    init: async function (settings) {
      var input =
        settings.inputfield != null
          ? document.querySelector(settings.inputfield)
          : null;
      input =
        input == null
          ? document.querySelector("#EcomOrderDeliveryAddress")
          : input;
      input =
        input == null
          ? document.querySelector("#EcomOrderCustomerAddress")
          : input;
      input =
        input == null
          ? document.querySelector("#UserManagement_Form_Address")
          : input;

      if (input == null) return;

      // Fields are named {prefix}Address, {prefix}Zip, {prefix}Country, ...
      const fieldPrefix = settings.fieldPrefix ?? input.id.replace(/Address$/, "");
      const controller = new AbortController();
      const options = {
        componentRestrictions: { country: settings.currentCountry },
        fields: ["address_components"],
        strictBounds: false,
        types: ["address"],
      };

      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }, { signal: controller.signal });

      const { Autocomplete } = await window.google.maps.importLibrary("places");

      // htmx re-runs the init script on every swap: drop instances whose input is gone or is being re-inited
      instances = instances.filter((instance) => {
        if (instance.input.isConnected && instance.input !== input) return true;
        instance.destroy();
        return false;
      });

      // Google appends this Autocomplete's .pac-container to <body> asynchronously; catch it so destroy can remove it
      let container;
      const observer = new MutationObserver((mutations) => {
        container = mutations.flatMap((m) => [...m.addedNodes]).find((node) => node.classList?.contains("pac-container"));
        if (container) observer.disconnect();
      });
      observer.observe(document.body, { childList: true });
      const autocomplete = new Autocomplete(input, options);
      // fillInAddress refocuses Address, which can reopen the dropdown over the just-filled fields; keep it hidden until the user types
      autocomplete.addListener("place_changed", () => {
        if (container) container.style.visibility = "hidden";
        this.fillInAddress(autocomplete.getPlace(), fieldPrefix);
      });
      input.addEventListener("input", () => {
        if (container) container.style.visibility = "";
      }, { signal: controller.signal });
      input.setAttribute("autocomplete", "none");

      // htmx only swaps the State column on country change, so follow this address's own Country select
      (input.form ?? document).addEventListener("change", (e) => {
        if (e.target.id === fieldPrefix + "Country" || e.target.id === fieldPrefix + "CountryCode") {
          autocomplete.setComponentRestrictions({ country: [e.target.value] });
        }
      }, { signal: controller.signal });

      instances.push({
        input,
        destroy: () => {
          controller.abort();
          observer.disconnect();
          window.google.maps.event.clearInstanceListeners(autocomplete);
          container?.remove();
        },
      });
    },

    changeCountryWithAddressFormat: function () {
      const form = document.querySelector("#AddressForm");
      form.querySelector("input[name=AddAddressesForm]").remove();
      form.querySelector("input[name=ManageAddressesFormAction]").value = "Add";
      PageUpdater.Update(form);
    },

    fillInAddress: function (place, fieldPrefix) {
      // Get each component of the address from the place details,
      // and then fill-in the corresponding field on the form.
      // place.address_components are google.maps.GeocoderAddressComponent objects
      // which are documented at http://goo.gle/3l5i5Mr

      if (place.address_components != undefined) {
        var countrycode = "";
        var address = "";
        var streetnumber = "";
        var zip = "";
        var region = "";
        var country = "";
        var locality = "";
        var sublocality = "";

        for (const component of place.address_components) {
          const componentType = component.types[0];

          switch (componentType) {
          case "street_number": {
            streetnumber = component.short_name;
            break;
          }

          case "route": {
            address = component.short_name;
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
            countrycode = component.short_name;
            break;
          }
        }

        const addressField = document.querySelector(
          "#" + fieldPrefix + "Address"
        );
        if (addressField != null) {
          if (
            countrycode != "US" &&
            countrycode != "GB" &&
            countrycode != "AU" &&
            countrycode != "CA"
          ) {
            addressField.value = address + " " + streetnumber;
          } else {
            addressField.value = streetnumber + " " + address;
          }
        }

        const zipField = document.querySelector("#" + fieldPrefix + "Zip");
        if (zipField != null) {
          zipField.value = zip;
        }

        const regionField = document.querySelector(
          "#" + fieldPrefix + "Region"
        );
        if (regionField != null) {
          regionField.value = region;
        }

        const stateField = document.querySelector("#" + fieldPrefix + "State");
        if (stateField != null) {
          stateField.value = region;
        }

        var countryField = document.querySelector(
          "#" + fieldPrefix + "Country"
        );
        countryField =
          countryField == null
            ? document.querySelector("#" + fieldPrefix + "CountryCode")
            : countryField;
        if (countryField != null) {
          countryField.value = country;
        }

        const cityField = document.querySelector("#" + fieldPrefix + "City");
        if (cityField != null) {
          cityField.value = sublocality != "" ? sublocality : locality;
        }

        document.querySelector("#" + fieldPrefix + "Address").focus();
      }
    },
  };
})();

export { Places };
