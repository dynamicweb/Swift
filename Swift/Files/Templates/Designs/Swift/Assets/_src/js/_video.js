const Video = function () {

	return {
		init() {
			document.querySelectorAll(".js-vimeo-video-thumbnail").forEach(function (thumbnailElement) {
				var videoId = thumbnailElement.getAttribute("data-video-id");
				swift.Video.setVimeoThumbnail(thumbnailElement, videoId);
			});
		},

		setVimeoThumbnail(element, videoId) {
			fetch('https://vimeo.com/api/v2/video/' + videoId + '.json')
			.then(function (response) {
				return response.text();
			})
			.then(function (data) {
				let { thumbnail_large } = JSON.parse(data)[0];
				let thumbnail = `${thumbnail_large}`;
				thumbnail = thumbnail.replace("_640", "_1920");
				element.src = thumbnail;
			})
			.catch(error => {
				console.log(error);
			});
		}
	}
}();

export { Video };
