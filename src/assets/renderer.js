'use strict';

const EDFL = require('../plugins/EDFL/src/index');
const $ = require('jquery');
const {remote} = require('electron');

$('#hide').on('click', () => {
    let window = remote.getCurrentWindow();
    window.minimize();
});

$('#close').on('click', () => {
    let window = remote.getCurrentWindow();
    window.close();
});

let latest = $('#latest');

const client = new EDFL.EliteDangerousProcess();

client.on('scan', (body) => {
    let text = '<hr><p>Event: Scan';
    if (body.isStar()) {
        let star = body.getStarDetails();
        text += `<br>Type: Star (${star.type})<br>Name: ${star.name}<br>Mass: ${star.mass}<br>Luminosity: ${star.luminosity}`
    } else if (body.isPlanet()) {
        let planet = body.getPlanetDetails();
        text += `<br>Type: Planet / Moon<br>Name: ${planet.name}<br>Landable: ${planet.landable ? 'Yes' : 'No'}<br>Atmosphere: ${planet.atmosphere ? 'Yes' : 'No'}</p>`
    }
    latest.prepend(text);
});