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
let eliteSpan = $('#elite-connection');
const elite = new EDFL.EliteDangerousProcess({webhook: true});

elite.on('ready', (boolean) => {
    eliteSpan.css('color', 'green');
    eliteSpan.text('Process found.');
});

elite.on('shutdown', () => {
    eliteSpan.css('color', 'red');
    eliteSpan.text('Process not found.');
});

elite.on('scan', (body) => {
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

elite.on('fsdjump', (jump) => {
    let text = '<hr><p>Event: FSD Jump<br>';
    let system = jump.getSystem();
    let jumpInfo = jump.getDetails();
    text += `Distance: ${(jumpInfo.distance).toFixed(2)}ly<br>`;
    text += `Fuel used: ${(jumpInfo.fuelUsed).toFixed(2)}<br>`;
    text += `System: ${system.name}<br>`;
    latest.prepend(text);
});

elite.on('fsdtarget', (jump) => {
    let text = '<hr><p>Event: FSD Target<br>';
    let system = jump.getTarget();
    console.log(system)
    text += `System: ${system.name}ly<br>`;
    latest.prepend(text);
});

elite.on('startjump', (event) => {
    let text = '<hr><p>Event: Start Jump<br>';
    if (event.isHyperspace()) {
        let system = event.getTarget();
        text += `Type: Hyperspace<br>`;
        text += `System: ${system.system}<br>`;
        text += `Star class: ${system.starClass}`;
    } else {
        text += 'Type: Supercruise'
    }
    latest.prepend(text);
});