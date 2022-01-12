const AssetLoader = function () {

	return {

		Load: function (assetPath, assetType) {
			
			if (assetType == "js") { //if filename is a external JavaScript file
				var asset = document.createElement('script')
				asset.setAttribute("type", "text/javascript")
				asset.setAttribute("src", assetPath)
			}
			else if (assetType == "css") { //if filename is an external CSS file
				var asset = document.createElement("link")
				asset.setAttribute("rel", "stylesheet")
				asset.setAttribute("type", "text/css")
				asset.setAttribute("href", assetPath)
			}
			asset.addEventListener("load", function (e) {
				let event = new CustomEvent("load.swift.assetloader", {
					cancelable: true,
					detail: {
						parentEvent: e
					}
				});
				document.dispatchEvent(event);
			});

			
			if (typeof asset != "undefined") {
				this.AppendToHead(asset);
			}
		},

		AppendToHead: function (asset) {
			const head = document.head;
			var assetFound = false;

			if (asset.type == 'text/css') {
				head.querySelectorAll('link').forEach(element => {
					if (asset.href == element.href) {
						assetFound = true;
					}
				});
			}

			if (asset.type == 'text/javascript') {
				head.querySelectorAll('script').forEach(element => {
					if (asset.src == element.src) {
						assetFound = true;
					}
				});
			}

			if (!assetFound) {
				head.appendChild(asset)
			}
		}
	}
}();

export { AssetLoader };
