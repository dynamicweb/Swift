const Typeahead = (function () {
  var tabIndex = -1;
  var tabIndexOld = 0;
  var timeout;
  var controller = new AbortController();

  return {
    suggest: function (e, searchField) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        // handle dropdown navigation if present
        document
          .querySelectorAll(".js-type-ahead-menu")
          .forEach(function (menu) {
            if (menu.classList.contains("show")) {
              Typeahead.debounce(
                () => Typeahead.handleArrowNavigation(e.key, menu),
                50
              )();
              return;
            }
          });
      } else {
        tabIndex = -1;
        if (searchField.value.length > 0) {
          var val = searchField.value;

          document
            .querySelectorAll(".js-type-ahead-field")
            .forEach(function (field) {
              field.setAttribute("data-original", val);
            });

          Typeahead.debounce(
            () => Typeahead.getSuggestions(searchField),
            300
          )();
        } else {
          Typeahead.hideSearchResults();
        }
      }

      if (e.key === "Escape") {
        // Revert back to the original value last entered in the input field
        document
          .querySelectorAll(".js-type-ahead-field")
          .forEach(function (field) {
            field.value = field.getAttribute("data-original");
          });

        Typeahead.hideSearchResults();
        return;
      }

      if (e.key === "Tab") {
        return;
      }
    },

    handleTab: function (e) {
      if (e.key === "Tab") {
        //keep selection from dropdown navigation but do not submit search
        Typeahead.hideSearchResults();
        return;
      }
    },

    handleArrowNavigation: function (key, menu) {
      var elements = menu.getElementsByClassName("dropdown-item");
      if (!elements || elements.length < 1) {
        return;
      }
      if (key === "ArrowUp") {
        tabIndex--;
      } else {
        tabIndex++;
      }

      if (tabIndex < 0 || tabIndex > elements.length - 1) {
        tabIndex = 0;
      }

      menu.setAttribute("data-tabindex", tabIndex);
      if (tabIndex > -1) {
        elements[tabIndex].classList.add("active");
        var suggestionElement = elements[tabIndex];

        Typeahead.preSelectSuggestion(suggestionElement);

        if (tabIndexOld != tabIndex && elements[tabIndexOld]) {
          elements[tabIndexOld].classList.remove("active");
        }
        tabIndexOld = tabIndex;
      }
    },

    getSuggestions: async function (searchField) {
      if (searchField.value.trim() != "") {
        var resultsPageId = searchField
          .closest(".js-suggest-form")
          .getAttribute("data-search-results-page");
        var defaultDetailsPageId = searchField
          .closest(".js-suggest-form")
          .getAttribute("data-product-details-page-id");
        var searchUrl =
          "/Default.aspx?ID=" +
          resultsPageId +
          "&defaultpdpId=" +
          defaultDetailsPageId +
          "&IsVariant=false&redirect=false&eq=" +
          encodeURIComponent(searchField.value.toLowerCase());

        const signal = controller.signal;
        let abortError = false;
        let response = await fetch(searchUrl, { signal }).catch(function (
          //error
        ) {
          abortError = true;
        });

        if (!abortError) {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            let html = await response.text().then(function (text) {
              return text;
            });

            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            var listElements = doc.querySelectorAll("li");

            Typeahead.displaySuggestions(listElements, searchField);
          }
        }
      }
    },

    displaySuggestions: function (listElements, searchField) {
      var closestDropdown = searchField.closest(".js-type-ahead-dropdown");
      var dropdownMenu = closestDropdown.querySelector(".js-type-ahead-menu");

      dropdownMenu.innerHTML = "";

      listElements.forEach(function (element) {
        dropdownMenu.appendChild(element);
      });

      Typeahead.showSearchResults(searchField);
    },

    selectSuggestion_: function (inputValue) {
      document
        .querySelectorAll(".js-type-ahead-field")
        .forEach(function (field) {
          field.value = inputValue;

          /*
          if (field.value != "") {
            elm
              .closest(".js-type-ahead-dropdown")
              .querySelector(".js-suggest-form")
              .submit();
          }
          */
        });
    },

    preSelectSuggestion: function (elm) {
      var suggestionElement = elm.querySelector(".js-suggestion");

      document
        .querySelectorAll(".js-type-ahead-field")
        .forEach(function (field) {
          field.value = suggestionElement.innerText;
          field.focus();

          var formElm = field.closest(".js-suggest-form");
          var parm = formElm.querySelector(".js-type-ahead-parameter");

          if (
            elm.getAttribute("data-param") &&
            elm.getAttribute("data-paramvalue")
          ) {
            if (
              elm.getAttribute("data-param").includes("ProductId") ||
              elm.getAttribute("data-param").includes("ID")
            ) {
              var productDetailPage = formElm.getAttribute(
                "data-product-details-page"
              );
              productDetailPage =
                elm.getAttribute("data-selected-details-page") != null
                  ? elm.getAttribute("data-selected-details-page")
                  : productDetailPage;

              formElm.method = "post";
              formElm.setAttribute("action", productDetailPage);
            } else {
              parm.setAttribute("name", elm.getAttribute("data-param"));
              parm.setAttribute("value", elm.getAttribute("data-paramvalue"));

              var productListPage = formElm.getAttribute(
                "data-product-list-page"
              );
              formElm.setAttribute("action", productListPage);
            }
          } else {
            parm.removeAttribute("name");
            parm.removeAttribute("value");

            var allResultsPage = formElm.getAttribute("data-product-list-page");
            allResultsPage = elm.getAttribute("data-all-results-page")
              ? elm.getAttribute("data-all-results-page")
              : allResultsPage;

            formElm.setAttribute("action", allResultsPage);
          }
        });
    },

    setSuggestion: function (elm) {
      document.body.removeEventListener(
        "click",
        Typeahead.hideSearchResults,
        false
      );

      Typeahead.preSelectSuggestion(elm);

      var searchField = elm
        .closest(".js-type-ahead-dropdown")
        .querySelector(".js-type-ahead-field");

      if (searchField) {
        Typeahead.showSearchResults(searchField);
      }

      setTimeout(function () {
        document.body.addEventListener("click", Typeahead.hideSearchResults);
      }, 200);
    },

    selectSuggestion: function (elm) {
      Typeahead.preSelectSuggestion(elm);

      elm
        .closest(".js-type-ahead-dropdown")
        .querySelector('[name="redirect"]')
        .remove();
      elm
        .closest(".js-type-ahead-dropdown")
        .querySelector('[name="SearchLayout"]')
        .remove();

      elm
        .closest(".js-type-ahead-dropdown")
        .querySelector(".js-suggest-form")
        .submit();
    },

    showSearchResults: function (searchField) {
      var closestDropdown = searchField.closest(".js-type-ahead-dropdown");
      var menu = closestDropdown.querySelector(".js-type-ahead-menu");

      if (menu.innerHTML != "") {
        menu.classList.add("show");
      }

      closestDropdown.classList.add("show");

      setTimeout(function () {
        document.body.addEventListener("click", Typeahead.hideSearchResults);
      }, 200);
    },

    hideSearchResults: function () {
      document
        .querySelectorAll(".js-type-ahead-dropdown")
        .forEach(function (dropdown) {
          dropdown.classList.remove("show");
        });
      document
        .querySelectorAll(".js-type-ahead-menu")
        .forEach(function (dropdown) {
          dropdown.classList.remove("show");
        });
    },

    debounce: function (func, wait, immediate) {
      return function () {
        controller.abort();
        controller = new AbortController();

        var context = this,
          args = arguments;
        var later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },

    goToPage: function (aTag) {
      var pageTitle = aTag.getAttribute("title");
      Typeahead.navigateToPage(aTag.href);
      history.pushState(null, pageTitle, aTag.href);
      if (pageTitle != null) {
        document.title = pageTitle;
      }
      return false;
    },

    navigateToPage: async function (href) {
      console.log(href);
    },

    init: function () {
      document
        .querySelectorAll(".js-type-ahead-field")
        .forEach(function (field) {
          field.addEventListener("keyup", (e) => Typeahead.suggest(e, field));
          field.addEventListener("keydown", (e) => Typeahead.handleTab(e));
        });
    },
  };
})();

export { Typeahead };
