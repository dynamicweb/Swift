const Image = (function () {
  return {
    swapImage: function (e) {
      const currentElement = e.currentTarget;
      const currentImage = currentElement.classList.contains("stretched-link")
        ? currentElement
            .closest(".js-product")
            .querySelector("[data-alternative-image]")
        : currentElement;

      if (currentImage) {
        const currentDefaultImage = currentImage.getAttribute("srcset");
        const currentAlternativeImage = currentImage.getAttribute(
          "data-alternative-image"
        );

        if (currentAlternativeImage) {
          currentImage.setAttribute("srcset", currentAlternativeImage);
          currentImage.setAttribute(
            "data-alternative-image",
            currentDefaultImage
          );
        }
      }
    },
  };
})();

export { Image };
