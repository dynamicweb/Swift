!function(e){var t={};function i(s){if(t[s])return t[s].exports;var l=t[s]={i:s,l:!1,exports:{}};return e[s].call(l.exports,l,l.exports,i),l.l=!0,l.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)i.d(s,l,function(t){return e[t]}.bind(null,l));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=10)}({10:function(e,t,i){"use strict";i.r(t);const s={version:"1.6.0",init(e=document.body){for(let t of e.querySelectorAll(".swiffy-slider"))this.initSlider(t)},initSlider(e){for(let t of e.querySelectorAll(".slider-nav")){let i=t.classList.contains("slider-nav-next");t.addEventListener("click",(()=>this.slide(e,i)),{passive:!0})}for(let t of e.querySelectorAll(".slider-indicators"))t.addEventListener("click",(()=>this.slideToByIndicator())),this.onSlideEnd(e,(()=>this.handleIndicators(e)),60);if(e.classList.contains("slider-nav-autoplay")){const t=e.getAttribute("data-slider-nav-autoplay-interval")?e.getAttribute("data-slider-nav-autoplay-interval"):2500;this.autoPlay(e,t,e.classList.contains("slider-nav-autopause"))}if(["slider-nav-autohide","slider-nav-animation"].some((t=>e.classList.contains(t)))){const t=e.getAttribute("data-slider-nav-animation-threshold")?e.getAttribute("data-slider-nav-animation-threshold"):.3;this.setVisibleSlides(e,t)}},setVisibleSlides(e,t=.3){let i=new IntersectionObserver((t=>{t.forEach((e=>{e.isIntersecting?e.target.classList.add("slide-visible"):e.target.classList.remove("slide-visible")})),e.querySelector(".slider-container>*:first-child").classList.contains("slide-visible")?e.classList.add("slider-item-first-visible"):e.classList.remove("slider-item-first-visible"),e.querySelector(".slider-container>*:last-child").classList.contains("slide-visible")?e.classList.add("slider-item-last-visible"):e.classList.remove("slider-item-last-visible")}),{root:e.querySelector(".slider-container"),threshold:t});for(let t of e.querySelectorAll(".slider-container>*"))i.observe(t)},slide(e,t=!0){const i=e.querySelector(".slider-container"),s=e.classList.contains("slider-nav-page"),l=e.classList.contains("slider-nav-noloop"),r=e.classList.contains("slider-nav-nodelay"),n=i.children,o=parseInt(window.getComputedStyle(i).columnGap),a=n[0].offsetWidth+o;let c=t?i.scrollLeft+a:i.scrollLeft-a;s&&(c=t?i.scrollLeft+i.offsetWidth:i.scrollLeft-i.offsetWidth),i.scrollLeft<1&&!t&&!l&&(c=i.scrollWidth-i.offsetWidth),i.scrollLeft>=i.scrollWidth-i.offsetWidth&&t&&!l&&(c=0),i.scroll({left:c,behavior:r?"auto":"smooth"})},slideToByIndicator(){const e=window.event.target,t=Array.from(e.parentElement.children).indexOf(e),i=e.parentElement.children.length,s=e.closest(".swiffy-slider"),l=s.querySelector(".slider-container").children.length/i*t;this.slideTo(s,l)},slideTo(e,t){const i=e.querySelector(".slider-container"),s=parseInt(window.getComputedStyle(i).columnGap),l=i.children[0].offsetWidth+s,r=e.classList.contains("slider-nav-nodelay");i.scroll({left:l*t,behavior:r?"auto":"smooth"})},onSlideEnd(e,t,i=125){let s;e.querySelector(".slider-container").addEventListener("scroll",(function(){window.clearTimeout(s),s=setTimeout(t,i)}),{capture:!1,passive:!0})},autoPlay(e,t,i){t=t<750?750:t;let s=setInterval((()=>this.slide(e)),t);const l=()=>this.autoPlay(e,t,i);return i&&(["mouseover","touchstart"].forEach((function(t){e.addEventListener(t,(function(){window.clearTimeout(s)}),{once:!0,passive:!0})})),["mouseout","touchend"].forEach((function(t){e.addEventListener(t,(function(){l()}),{once:!0,passive:!0})}))),s},handleIndicators(e){if(!e)return;const t=e.querySelector(".slider-container"),i=t.scrollWidth-t.offsetWidth,s=t.scrollLeft/i;for(let t of e.querySelectorAll(".slider-indicators")){let e=t.children,i=Math.abs(Math.round((e.length-1)*s));for(let t of e)t.classList.remove("active");e[i].classList.add("active")}}};window.swiffyslider=s}});