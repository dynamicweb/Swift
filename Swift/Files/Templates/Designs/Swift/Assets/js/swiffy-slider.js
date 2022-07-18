/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Swift/Files/Templates/Designs/Swift/Assets/_src/js/modules/swiffy-slider.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Swift/Files/Templates/Designs/Swift/Assets/_src/js/modules/swiffy-slider.js":
/*!*************************************************************************************!*\
  !*** ./Swift/Files/Templates/Designs/Swift/Assets/_src/js/modules/swiffy-slider.js ***!
  \*************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_swiffy_slider_dist_js_swiffy_slider_ESM_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! /node_modules/swiffy-slider/dist/js/swiffy-slider.ESM.min.js */ \"./node_modules/swiffy-slider/dist/js/swiffy-slider.ESM.min.js\");\n\nwindow.swiffyslider = _node_modules_swiffy_slider_dist_js_swiffy_slider_ESM_min_js__WEBPACK_IMPORTED_MODULE_0__[\"swiffyslider\"];\n\n//# sourceURL=webpack:///./Swift/Files/Templates/Designs/Swift/Assets/_src/js/modules/swiffy-slider.js?");

/***/ }),

/***/ "./node_modules/swiffy-slider/dist/js/swiffy-slider.ESM.min.js":
/*!*********************************************************************!*\
  !*** ./node_modules/swiffy-slider/dist/js/swiffy-slider.ESM.min.js ***!
  \*********************************************************************/
/*! exports provided: swiffyslider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"swiffyslider\", function() { return swiffyslider; });\nconst swiffyslider = {\n  version: \"1.5.3\",\n\n  init(e = document.body) {\n    for (let t of e.querySelectorAll(\".swiffy-slider\")) this.initSlider(t);\n  },\n\n  initSlider(e) {\n    for (let t of e.querySelectorAll(\".slider-nav\")) {\n      let s = t.classList.contains(\"slider-nav-next\");\n      t.addEventListener(\"click\", () => this.slide(e, s), {\n        passive: !0\n      });\n    }\n\n    for (let t of e.querySelectorAll(\".slider-indicators\")) t.addEventListener(\"click\", () => this.slideToByIndicator()), this.onSlideEnd(e, () => this.handleIndicators(e), 60);\n\n    if (e.classList.contains(\"slider-nav-autoplay\")) {\n      const t = e.getAttribute(\"data-slider-nav-autoplay-interval\") ? e.getAttribute(\"data-slider-nav-autoplay-interval\") : 2500;\n      this.autoPlay(e, t, e.classList.contains(\"slider-nav-autopause\"));\n    }\n\n    if ([\"slider-nav-autohide\", \"slider-nav-animation\"].some(t => e.classList.contains(t))) {\n      const t = e.getAttribute(\"data-slider-nav-animation-threshold\") ? e.getAttribute(\"data-slider-nav-animation-threshold\") : .3;\n      this.setVisibleSlides(e, t);\n    }\n  },\n\n  setVisibleSlides(e, t = .3) {\n    let s = new IntersectionObserver(t => {\n      t.forEach(e => {\n        e.isIntersecting ? e.target.classList.add(\"slide-visible\") : e.target.classList.remove(\"slide-visible\");\n      }), e.querySelector(\".slider-container>*:first-child\").classList.contains(\"slide-visible\") ? e.classList.add(\"slider-item-first-visible\") : e.classList.remove(\"slider-item-first-visible\"), e.querySelector(\".slider-container>*:last-child\").classList.contains(\"slide-visible\") ? e.classList.add(\"slider-item-last-visible\") : e.classList.remove(\"slider-item-last-visible\");\n    }, {\n      root: e.querySelector(\".slider-container\"),\n      threshold: t\n    });\n\n    for (let t of e.querySelectorAll(\".slider-container>*\")) s.observe(t);\n  },\n\n  slide(e, t = !0) {\n    const s = e.querySelector(\".slider-container\"),\n          i = e.classList.contains(\"slider-nav-page\"),\n          l = e.classList.contains(\"slider-nav-noloop\"),\n          o = e.classList.contains(\"slider-nav-nodelay\"),\n          r = s.children,\n          n = parseInt(window.getComputedStyle(s).columnGap),\n          a = r[0].offsetWidth + n;\n    let d = t ? s.scrollLeft + a : s.scrollLeft - a;\n    i && (d = t ? s.scrollLeft + s.offsetWidth : s.scrollLeft - s.offsetWidth), s.scrollLeft < 1 && !t && !l && (d = s.scrollWidth - s.offsetWidth), s.scrollLeft >= s.scrollWidth - s.offsetWidth && t && !l && (d = 0), s.scroll({\n      left: d,\n      behavior: o ? \"auto\" : \"smooth\"\n    });\n  },\n\n  slideToByIndicator() {\n    const e = window.event.target,\n          t = Array.from(e.parentElement.children).indexOf(e),\n          s = e.parentElement.children.length,\n          i = e.closest(\".swiffy-slider\"),\n          l = i.querySelector(\".slider-container\").children.length / s * t;\n    this.slideTo(i, l);\n  },\n\n  slideTo(e, t) {\n    const s = e.querySelector(\".slider-container\"),\n          i = parseInt(window.getComputedStyle(s).columnGap),\n          l = s.children[0].offsetWidth + i,\n          o = e.classList.contains(\"slider-nav-nodelay\");\n    s.scroll({\n      left: l * t,\n      behavior: o ? \"auto\" : \"smooth\"\n    });\n  },\n\n  onSlideEnd(e, t, s = 125) {\n    let i;\n    e.querySelector(\".slider-container\").addEventListener(\"scroll\", function () {\n      window.clearTimeout(i), i = setTimeout(t, s);\n    }, {\n      capture: !1,\n      passive: !0\n    });\n  },\n\n  autoPlay(e, t, s) {\n    t = t < 750 ? 750 : t;\n    let i = setInterval(() => this.slide(e), t);\n\n    const l = () => this.autoPlay(e, t, s);\n\n    return s && ([\"mouseover\", \"touchstart\"].forEach(function (t) {\n      e.addEventListener(t, function () {\n        window.clearTimeout(i);\n      }, {\n        once: !0,\n        passive: !0\n      });\n    }), [\"mouseout\", \"touchend\"].forEach(function (t) {\n      e.addEventListener(t, function () {\n        l();\n      }, {\n        once: !0,\n        passive: !0\n      });\n    })), i;\n  },\n\n  handleIndicators(e) {\n    const t = e.querySelector(\".slider-container\"),\n          s = t.scrollWidth - t.offsetWidth,\n          i = t.scrollLeft / s;\n\n    for (let t of e.querySelectorAll(\".slider-indicators\")) {\n      let e = t.children,\n          s = Math.abs(Math.round((e.length - 1) * i));\n\n      for (let t of e) t.classList.remove(\"active\");\n\n      e[s].classList.add(\"active\");\n    }\n  }\n\n};\n\n//# sourceURL=webpack:///./node_modules/swiffy-slider/dist/js/swiffy-slider.ESM.min.js?");

/***/ })

/******/ });