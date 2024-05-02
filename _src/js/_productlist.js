import { Modal } from "bootstrap";
import { Scroll } from "./_scroll.js";

const ProductList = (function () {
  return {
    init: function () {
      //Auto initialize
      document
        .querySelectorAll(".js-product-list")
        .forEach((el) => ProductList.Update(el));
    },

    Update: async function (e) {
      var clickedButton = e.currentTarget != undefined ? e.currentTarget : e;
      var form = clickedButton.closest("form");
      var responseTargetElement = !form
        .getAttribute("data-response-target-element")
        .includes(".")
        ? document.querySelector(
          "#" + form.getAttribute("data-response-target-element")
        )
        : clickedButton.closest(
          form.getAttribute("data-response-target-element")
        );
      var preloader = form.getAttribute("data-preloader");
      var swap = form.getAttribute("data-swap")
        ? form.getAttribute("data-swap")
        : "innerHTML";

      let formData = new FormData(form);

      if (e.currentTarget != undefined) {
        e.preventDefault();
      }

      //Fire the 'update' event
      let event = new CustomEvent("update.swift.productlist", {
        cancelable: true,
        detail: {
          formData: formData,
          parentEvent: e,
        },
      });
      var globalDispatcher = document.dispatchEvent(event);
      var localDispatcher = clickedButton.dispatchEvent(event);

      if (globalDispatcher != false && localDispatcher != false) {
        if (preloader != "inline") {
          var addPreloaderTimer = setTimeout(function () {
            var overlayElement = document.createElement("div");
            overlayElement.className = "preloader-overlay";
            overlayElement.setAttribute("id", "overlay");
            var overlayElementIcon = document.createElement("div");
            overlayElementIcon.className = "spinner-border";
            overlayElementIcon.style.top = window.pageYOffset + "px";
            overlayElement.appendChild(overlayElementIcon);

            if (form) {
              form.parentNode.insertBefore(overlayElement, form);
            }
          }, 200); //Small delay to secure that the preloader is not loaded all the time
        } else {
          if (responseTargetElement != null) {
            responseTargetElement.innerHTML = "";
          }

          setTimeout(function () {
            var preloaderElement = document.createElement("div");
            preloaderElement.className = "d-flex p-4";
            var preloaderSpinner = document.createElement("div");
            preloaderSpinner.className = "spinner-border m-auto";
            preloaderElement.appendChild(preloaderSpinner);
            var helper = document.createElement("span");
            helper.className = "visually-hidden";
            helper.innerHTML = "Loading...";
            preloaderElement.appendChild(helper);

            if (responseTargetElement != null) {
              responseTargetElement.appendChild(preloaderElement);
            }
          }, 200); //Small delay to secure that the preloader is not loaded all the time
        }

        const newParams = new URLSearchParams(formData); //Get parameters from the form
        var url = new URL(form.action); //Get the url from the form
        var pageId = url.searchParams.get("ID");
        var pageSize = newParams.get("PageSize")
          ? newParams.get("PageSize")
          : 12;

        if (pageId) {
          newParams.set("ID", pageId);
        }

        newParams.set("LayoutTemplate", "Swift-v2_PageClean.cshtml"); //Set template to not include header and footer

        if (swap == "afterend") {
          newParams.delete("PageSize");
        }

        if (newParams.get("GroupId")) {
          newParams.delete("GroupId");
        }

        var newUrl = url.origin + url.pathname + "?" + newParams.toString(); //Create url with the new parameters

        //Handle ios devices (Scroll not working on async loaded content)
        if (
          (navigator.platform === "MacIntel" &&
            navigator.maxTouchPoints > 1 &&
            swap != "afterend") ||
          navigator.userAgent.indexOf("CriOS") >= 0
        ) {
          newParams.set("LayoutTemplate", "");
          window.location =
            url.origin + url.pathname + "?" + newParams.toString();
        } else {
          let response = await fetch(newUrl);

          if (response.ok) {
            //Update URL
            let updateUrl = "true";
            if (form.getAttribute("data-update-url") != undefined) {
              updateUrl = form.getAttribute("data-update-url");
            }

            if (updateUrl != "false") {
              newParams.delete("LayoutTemplate");

              if (swap == "afterend") {
                newParams.set("PageSize", pageSize);
                newParams.delete("PageNum");
              }

              var updatedUrl =
                window.location.origin + url.pathname + "?" + newParams;

              window.history.replaceState({}, "", decodeURI(updatedUrl));
            }

            ProductList.Success(
              response,
              responseTargetElement,
              addPreloaderTimer,
              formData,
              swap
            );
          } else {
            ProductList.Error(
              response,
              responseTargetElement,
              addPreloaderTimer
            );
          }
        }
      }
    },

    Success: async function (
      response,
      responseTargetElement,
      addPreloaderTimer,
      formData,
      swap = "innerHTML"
    ) {
      clearTimeout(addPreloaderTimer);

      //Replace content
      let html = await response.text().then(function (text) {
        return text;
      });

      //Fire the 'updated' event
      let event = new CustomEvent("updated.swift.pageupdater", {
        cancelable: true,
        detail: {
          cancelable: true,
          detail: {
            formData: formData,
            html: html,
          },
        },
      });
      var globalDispatcher = document.dispatchEvent(event);

      if (globalDispatcher != false) {
        var scripts;

        //Remove preloader
        if (document.querySelector("#overlay")) {
          document
            .querySelector("#overlay")
            .parentNode.removeChild(document.querySelector("#overlay"));
        }

        //Replace the markup
        if (swap == "innerHTML" || swap == "") {
          responseTargetElement.innerHTML = html;
        } else if (swap == "afterend") {
          var tempDiv = document.createElement("div");
          tempDiv.innerHTML = html;
          var outerDiv = tempDiv.getElementsByTagName("div")[0];
          outerDiv.outerHTML = outerDiv.innerHTML;

          responseTargetElement.parentNode.insertBefore(
            outerDiv,
            responseTargetElement.nextSibling
          );

          var loadMoreArea = document.querySelector("#ProductListLoadMore");
          if (loadMoreArea) {
            loadMoreArea.remove();
          }

          scripts = responseTargetElement.querySelectorAll("script");
          scripts.forEach((script) => {
            script.remove();
          });
        }

        Scroll.hideHeadersOnScroll();
        Scroll.handleAlternativeTheme();

        //Run scripts from the loaded html
        scripts = responseTargetElement.querySelectorAll("script");
        scripts.forEach((script) => {
          if (script.src != "") {
            var tag = document.createElement("script");
            tag.src = script.src;

            document.getElementsByTagName("head")[0].appendChild(tag);
          } else {
            eval(script.innerHTML);
          }
        });

        //Modal
        var requestType = formData.get("RequestType");

        if (
          screen.width < 992 &&
          document.querySelector("#FacetsModal") &&
          requestType != "UpdateList"
        ) {
          var facetsModal = new Modal(document.querySelector("#FacetsModal"), {
            backdrop: false,
          });
          facetsModal.show();

          var backdrop = document.querySelector(".modal-backdrop");
          if (backdrop) {
            backdrop.parentElement.removeChild(backdrop);
          }
        }

        //Fire the 'afterSwap' event
        let replacedEvent = new CustomEvent("afterSwap.swift.productlist", {
          cancelable: true,
          detail: {
            cancelable: true,
            detail: {
              formData: formData,
              html: html,
            },
          },
        });

        document.dispatchEvent(replacedEvent);
      }
    },

    Error: function (e, responseTargetElement, addPreloaderTimer) {
      clearTimeout(addPreloaderTimer);

      if (document.querySelector("#overlay")) {
        document
          .querySelector("#overlay")
          .parentNode.removeChild(document.querySelector("#overlay"));
      }
    },

    ResetFacets: async function (e) {
      var clickedButton = e.currentTarget;
      var form = clickedButton.closest("form");
      let formData = new FormData(form);

      //Fire the 'resetfacets' event
      let event = new CustomEvent("resetfacets.swift.productlist", {
        cancelable: true,
        detail: {
          formData: formData,
          parentEvent: e,
        },
      });
      const globalDispatcher = document.dispatchEvent(event);
      const localDispatcher = clickedButton.dispatchEvent(event);

      if (globalDispatcher != false && localDispatcher != false) {
        form
          .querySelectorAll("input[type='checkbox']")
          .forEach((el) => (el.checked = false));

        ProductList.Update(e);
      }
    },
  };
})();

export { ProductList };
