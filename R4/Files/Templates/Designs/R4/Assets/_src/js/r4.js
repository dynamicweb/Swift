import { Collapse, Dropdown } from 'bootstrap';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Sliders } from './_sliders';
import { hcOffcanvasNav } from 'hc-offcanvas-nav';
import "regenerator-runtime/runtime";
import { Typeahead } from './_typeahead';

window.tns = tns;
window.Sliders = Sliders;
window.Typeahead = Typeahead;

document.addEventListener('DOMContentLoaded', function (event) {
    Sliders.Init();
});
