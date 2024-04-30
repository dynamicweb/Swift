import { PageUpdater } from "pageupdater";

const ExpressBuy = (function () {
  return {
    OpenReplacementModal: function (productCounter) {
      const modalBody = document.querySelector(".js-replacement-modal-body");
      const productArticle = document.querySelector(
        ".js-replacement-product[data-product-counter='" + productCounter + "']"
      );
      const productReplacementFeed = productArticle.getAttribute(
        "data-replacement-feed"
      );

      PageUpdater.UpdateFromUrl(modalBody, productReplacementFeed).then(
        function () {
          const productNameElement =
            productArticle.querySelector(".js-product-name");
          const modalTitleProductName = document.querySelector(
            ".js-modal-title-product-name"
          );

          modalTitleProductName.innerHTML = productNameElement.innerHTML;
          sessionStorage.setItem("js-product-counter", productCounter);
        }
      );
    },

    AcceptReplacementProduct: function () {
      const productCounter = sessionStorage.getItem("js-product-counter");
      const replacementArticle = document.querySelector(
        ".js-replacement-modal-body .js-replacement-product"
      );
      const productArticle = document.querySelector(
        ".js-replacement-product[data-product-counter='" + productCounter + "']"
      );

      productArticle.replaceWith(replacementArticle);
      this.UpdateReplacementElements(productCounter, true);
    },

    RefuseReplacementProduct: function () {
      this.UpdateReplacementElements(
        sessionStorage.getItem("js-product-counter"),
        false
      );
    },

    UpdateReplacementElements: function (productCounter, replaced) {
      document
        .querySelectorAll(
          ".js-product-replacements-message[data-product-counter='" +
            productCounter +
            "']"
        )
        .forEach(function (messageElement) {
          messageElement.innerHTML = replaced
            ? messageElement.getAttribute("data-replaced-by-message")
            : messageElement.getAttribute("data-replace-refused-message");
        });
      document
        .querySelector(
          ".js-product-replacements-button[data-product-counter='" +
            productCounter +
            "']"
        )
        .remove();
      sessionStorage.removeItem("js-product-counter");
    },
  };
})();

export { ExpressBuy };
