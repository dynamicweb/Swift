import { Collapse, Dropdown } from 'bootstrap';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Sliders } from './_sliders';
import { Typeahead } from './_typeahead';
import { hcOffcanvasNav } from 'hc-offcanvas-nav';
import "regenerator-runtime/runtime";

window.tns = tns;
window.Sliders = Sliders;
window.Typeahead = Typeahead;

document.addEventListener('DOMContentLoaded', function (event) {
    Sliders.init();
	Typeahead.init();
});

window.onpopstate = function (event) {
	Typeahead.navigateToPage(document.location.href);
};
