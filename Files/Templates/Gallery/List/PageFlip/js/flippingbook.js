function FlippingBook() {
	this.pages = [];
	this.zoomPages = [];
	this.printPages = [];
	this.contents = [];

	this.stageWidth = "100%";
	this.stageHeight = "100%";

	this.settings = {
		bookWidth: 640,
		bookHeight: 480,
		pagesSet: this.pages,
		zoomPagesSet: this.zoomPages,
		printPagesSet: this.printPages,
		scaleContent: true,
		preserveProportions: false,
		centerContent: true,
		hardcover: false,
		hardcoverThickness: 3,
		hardcoverEdgeColor: 0xFFFFFF,
		highlightHardcover: true,
		frameWidth: 0,
		frameColor: 0xFFFFFF,
		frameAlpha: 100,
		firstPageNumber: 1,
		autoFlipSize: 50,
		navigationFlipOffset: 30,
		flipOnClick: true,
		handOverCorner: true,
		handOverPage: true,
		alwaysOpened: false,
		staticShadowsType: "Asymmetric", // Asymmetric, Symmetric, Default
		staticShadowsDepth: 1,
		staticShadowsLightColor: 0xFFFFFF, // works for "Symmetric" shadows only
		staticShadowsDarkColor: 0x000000,
		dynamicShadowsDepth: 1,
		dynamicShadowsLightColor: 0xFFFFFF, // works for "dark" pages only
		dynamicShadowsDarkColor: 0x000000,
		moveSpeed: 2,
		closeSpeed: 3,
		gotoSpeed: 3,
		rigidPageSpeed: 5,
		flipSound: "",
		hardcoverSound: "",
		preloaderType: "Gear Wheel", // "Progress Bar", "Round", "Thin", "Dots", "Gradient Wheel", "Gear Wheel", "Line", "Animated Book", "None"
		pageBackgroundColor: 0x99CCFF,
		loadOnDemand: true,
		allowPagesUnload: true,
		showUnderlyingPages: false,
		playOnDemand: true,
		freezeOnFlip: false,
		darkPages: false,
		smoothPages: false,
		rigidPages: false,
		flipCornerStyle: "manually", // "first page only", "each page", "manually"
		flipCornerPosition: "bottom-right", // "bottom-right","top-right","bottom-left","top-left"
		flipCornerAmount: 50,
		flipCornerAngle: 20,
		flipCornerRelease: true,
		flipCornerVibrate: true,
		flipCornerPlaySound: false,
		zoomEnabled: true,
		zoomPath: "pages/large/",
		zoomImageWidth: 900,
		zoomImageHeight: 1165,
		zoomOnClick: true,
		zoomUIColor: 0xf1f1f1,
		zoomHint: "Double click for zooming.",
		zoomHintEnabled: false,
		centerBook: true,
		useCustomCursors: true,
		dropShadowEnabled: true,
		dropShadowHideWhenFlipping: true,
		backgroundColor: 0xFFFFFF,
		backgroundImage: "/Files/Templates/Gallery/List/PageFlip/img/bookBackground.jpg",
		backgroundImagePlacement: "fit", //  "top left", "center", "fit"
		printEnabled: true,
		printTitle: "Print Pages",
		downloadURL: "",
		downloadTitle: "Download PDF",
		downloadSize: "Size: 4.7 Mb",
		downloadComplete: "Complete",
		extXML: ""
	};

	this.containerId = "fbContainer";
	this.forwardButtonId = "fbForwardButton";
	this.backButtonId = "fbBackButton";
	this.zoomButtonId = "fbZoomButton";
	this.printButtonId = "fbPrintButton";
	this.downloadButtonId = "fbDownloadButton";
	this.currentPagesId = "fbCurrentPages";
	this.totalPagesId = "fbTotalPages";
	this.contentsMenuId = "fbContentsMenu";
};

FlippingBook.prototype.create = function() {
	this.settings.pagesSet = this.pages;
	this.settings.zoomPagesSet = this.zoomPages;
	this.settings.printPagesSet = this.printPages;

	if (location.hash.substr(1) != "")
		this.settings.firstPageNumber = location.hash.substr(1);

	this.addLoadEvent(this.onWindowLoad);
	swfobject.embedSWF("/Files/Templates/Gallery/List/PageFlip/FlippingBook.swf", this.containerId, this.stageWidth, this.stageHeight, "8.0.0", "/Files/Templates/Gallery/List/PageFlip/js/expressInstall.swf", this.settings, { allowScriptAccess: "always", bgcolor: "#" + this.settings.backgroundColor.toString(16) });
}

FlippingBook.prototype.getFlippingBookReference = function() {
	return this.getObjectReference(this.containerId);
}

FlippingBook.prototype.getObjectReference = function(id) {
	return document.getElementById(id);
}

FlippingBook.prototype.flipForward = function() {
	flippingBook.getFlippingBookReference().flipForward();
}

FlippingBook.prototype.flipBack = function() {
	flippingBook.getFlippingBookReference().flipBack();
}

FlippingBook.prototype.zoomButtonClick = function() {
	if (flippingBook.getFlippingBookReference().isZoomedIn())
		flippingBook.zoomOut();
	else
		flippingBook.zoomIn();
}

FlippingBook.prototype.zoomIn = function() {
	this.getFlippingBookReference().zoomIn();
}

FlippingBook.prototype.zoomOut = function() {
	this.getFlippingBookReference().zoomOut();
}

FlippingBook.prototype.print = function() {
	flippingBook.getFlippingBookReference().print();
}

FlippingBook.prototype.downloadFile = function() {
	if (flippingBook.settings.downloadURL)
		flippingBook.getFlippingBookReference().downloadFile();
}

FlippingBook.prototype.onWindowLoad = function() {
	var forwardButton = flippingBook.getObjectReference(flippingBook.forwardButtonId);
	if (forwardButton) {
		forwardButton.style.cursor = "pointer";
		forwardButton.onclick = flippingBook.flipForward;
	}

	var backButton = flippingBook.getObjectReference(flippingBook.backButtonId);
	if (backButton) {
		backButton.style.cursor = "pointer";
		backButton.onclick = flippingBook.flipBack;
	}

	var zoomButton = flippingBook.getObjectReference(flippingBook.zoomButtonId);
	if (zoomButton) {
		zoomButton.style.cursor = "pointer";
		zoomButton.onclick = flippingBook.zoomButtonClick;
	}

	var printButton = flippingBook.getObjectReference(flippingBook.printButtonId);
	if (printButton) {
		printButton.style.cursor = "pointer";
		printButton.onclick = flippingBook.print;
	}

	var downloadButton = flippingBook.getObjectReference(flippingBook.downloadButtonId);
	if (downloadButton) {
		downloadButton.style.cursor = "pointer";
		downloadButton.onclick = flippingBook.downloadFile;
	}

	flippingBook.buildContentsMenu();
}

FlippingBook.prototype.onPutPage = function(leftPageNumber, rightPageNumber) {
	this.updatePagination(leftPageNumber, rightPageNumber);
	this.updateContentsMenu(leftPageNumber, rightPageNumber);
}

FlippingBook.prototype.updatePagination = function(leftPageNumber, rightPageNumber) {
	var leftPageExists = (leftPageNumber != undefined);
	var rightPageExists = (rightPageNumber != undefined);

	var pageNumberString = leftPageNumber + "-" + rightPageNumber;
	if (!leftPageExists)
		pageNumberString = rightPageNumber;
	if (!rightPageExists)
		pageNumberString = leftPageNumber;

	this.getObjectReference(this.currentPagesId).innerHTML = pageNumberString;
	this.getObjectReference(this.totalPagesId).innerHTML = " / " + this.getFlippingBookReference().totalPages();
}

FlippingBook.prototype.buildContentsMenu = function() {
	var contentsSelect = this.getObjectReference(this.contentsMenuId);

	if (contentsSelect) {
		for (var i = 0; i < this.contents.length; i++)
			contentsSelect.options[i] = new Option(this.contents[i][0], this.contents[i][1]);

		contentsSelect.onchange = this.onContentsChange;
	}
}

FlippingBook.prototype.onContentsChange = function() {
	var contentsSelect = flippingBook.getObjectReference(flippingBook.contentsMenuId);
	var pageNumber = contentsSelect.options[contentsSelect.selectedIndex].value;

	if (pageNumber)
		flippingBook.getFlippingBookReference().flipGotoPage(pageNumber);
}

FlippingBook.prototype.updateContentsMenu = function(leftPageNumber, rightPageNumber) {
	var contentsSelect = flippingBook.getObjectReference(flippingBook.contentsMenuId);

	if (contentsSelect) {
		for (var i = 0; i < this.contents.length - 1; i++) {
			var minPage = contentsSelect.options[i].value;
			var maxPage = contentsSelect.options[i + 1].value;
			var leftOK = false;
			var rightOK = false;

			if (leftPageNumber)
				leftOK = (Number(leftPageNumber) >= minPage && Number(leftPageNumber) <= maxPage);
			else
				leftOK = true;

			if (rightPageNumber)
				rightOK = (Number(rightPageNumber) >= minPage && Number(rightPageNumber) <= maxPage);
			else
				rightOK = true;

			if (leftOK && rightOK)
				break;
		}
		contentsSelect.selectedIndex = i;
	}
}

FlippingBook.prototype.getWindowHeight = function() {
	var windowHeight = 0;

	if (typeof (window.innerHeight) == 'number') {
		windowHeight = window.innerHeight;
	}
	else {
		if (document.documentElement && document.documentElement.clientHeight) {
			windowHeight = document.documentElement.clientHeight;
		}
		else {
			if (document.body && document.body.clientHeight) {
				windowHeight = document.body.clientHeight;
			}
		}
	}

	return windowHeight;
}

FlippingBook.prototype.addLoadEvent = function(fn) {
	if (typeof window.addEventListener != "undefined") {
		window.addEventListener("load", fn, false);
	}
	else if (typeof document.addEventListener != "undefined") {
		document.addEventListener("load", fn, false);
	}
	else if (typeof window.attachEvent != "undefined") {
		window.attachEvent("onload", fn);
	}
	else if (typeof window.onload == "function") {
		var fnOld = window.onload;
		window.onload = function() {
			fnOld();
			fn();
		};
	}
	else {
		window.onload = fn;
	}
}

FlippingBook.prototype.handleWheel = function(delta) {
	try {
		if(this.getFlippingBookReference().style.display != 'none'){
			this.getFlippingBookReference().onWheelScroll(delta);
		}
	} catch (e) {
	}

}

flippingBook = new FlippingBook();

function wheel(event) {
	var delta = 0;
	if (!event) event = window.event;
	if (event.wheelDelta) {
		delta = event.wheelDelta / 120;
		if (window.opera) delta = -delta;
	} else if (event.detail) {
		delta = -event.detail / 3;
	}
	if (delta)
		flippingBook.handleWheel(delta);
	if (event.preventDefault)
		event.preventDefault();
	event.returnValue = false;
}

if (window.addEventListener)
	window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;