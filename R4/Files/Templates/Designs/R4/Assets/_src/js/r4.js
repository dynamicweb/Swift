import { Collapse, Dropdown } from 'bootstrap';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Sliders } from './_sliders';
import { hcOffcanvasNav } from 'hc-offcanvas-nav';
import "regenerator-runtime/runtime";

window.tns = tns;
window.Sliders = Sliders;

document.addEventListener('DOMContentLoaded', function (event) {
    Sliders.Init();
});
