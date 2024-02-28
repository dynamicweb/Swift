const Video = function () {

	return {
		init() {
			document.querySelectorAll(".js-vimeo-video-thumbnail").forEach(function (thumbnailElement) {
				const assetValue = thumbnailElement.dataset.assetValue;
				swift.Video.setVimeoThumbnail(thumbnailElement, assetValue);
			});
			
			document.querySelectorAll(".js-youtube-video-thumbnail").forEach(function (thumbnailElement) {
				const assetValue = thumbnailElement.dataset.assetValue;
				const size = thumbnailElement.dataset.size;
				swift.Video.setYoutubeThumbnail(thumbnailElement, assetValue, size);
			});
		},

		setVimeoThumbnail(element, assetValue) {
			const videoId = assetValue.substring(assetValue.lastIndexOf('/') + 1);
	
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
		},
		setYoutubeThumbnail(element, assetValue, size) {
			const youtubeImageResolution = size ? size : 'hqdefault'; // maxresdefault, sddefault, hqdefault
			const regex = /(?:youtube\.com\/.*[\?&]v=|youtu\.be\/)([\w-]+)/;
			const match = assetValue.match(regex);
			const videoId = match ? match[1] : '';
			const youtubeThumbnail = `https://img.youtube.com/vi/${videoId}/${youtubeImageResolution}.jpg`;
			element.src = youtubeThumbnail;
			console.log("here", youtubeImageResolution, youtubeThumbnail)
		}
	}
}();

export { Video };
