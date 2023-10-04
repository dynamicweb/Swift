const Video = function () {

	return {
		init() {
			document.querySelectorAll(".js-vimeo-video-thumbnail").forEach(function (thumbnailElement) {
				var videoId = thumbnailElement.getAttribute("data-video-id");
				swift.Video.setVimeoThumbnail(thumbnailElement, videoId);
			});
			document.querySelectorAll(".js-selfhosted-video-thumbnail").forEach(function (thumbnailElement) {
				var videoUrl = thumbnailElement.getAttribute("data-src");
				thumbnailElement.src = videoUrl;
				swift.Video.getSelfHostedVideoPoster(thumbnailElement);
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
		},
		 getSelfHostedVideoPoster(video) {
            
			video.addEventListener('loadedmetadata', function () {
				video.currentTime = 0.5;
			});

			video.addEventListener('seeked', function () {
				var canvas = document.createElement('canvas');
				canvas.width = 1920;
				canvas.height = 1080;
				var ctx = canvas.getContext('2d');
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
				const dataUrl = canvas.toDataURL();

				fetch(dataUrl).then(res => res.blob()).then(blob =>
					video.poster = URL.createObjectURL(blob)
				);
			});
		}
	}
}();

export { Video };
