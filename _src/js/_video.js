const Video = (function () {
  return {
    init() {
      document
        .querySelectorAll(".js-vimeo-video-thumbnail")
        .forEach((thumbnailElement) => {
          const assetValue = thumbnailElement.dataset.assetValue;
          this.setVimeoThumbnail(thumbnailElement, assetValue);
        });
    },

    setVimeoThumbnail(element, assetValue) {
      const videoId = assetValue.substring(assetValue.lastIndexOf("/") + 1);

      fetch("https://vimeo.com/api/v2/video/" + videoId + ".json")
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          let { thumbnail_large } = JSON.parse(data)[0];
          let thumbnail = `${thumbnail_large}`;
          thumbnail = thumbnail.replace("_640", "_1920");
          element.src = thumbnail;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  };
})();

export { Video };
