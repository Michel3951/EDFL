'use strict';

const EDFL = require('../plugins/EDFL/src/index');
const $ = require('jquery');
const remote = require('electron').remote;

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
let discordSpan = $('#discord-connection');

const elite = new EDFL.EliteDangerousProcess();

elite.on('ready', (boolean) => {
    eliteSpan.css('color', 'limegreen');
    eliteSpan.text('Process found.');
});

elite.on('fatal', (error) => {
   $('main .col-sm-9:first').prepend(`<div class="alert alert-danger">${error.message}</div>`)
});

elite.on('discord-connection', () => {
    discordSpan.css('color', 'limegreen');
    discordSpan.text('Connected.');
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

let webhook = $('#webhook');

elite.on('webhook-enabled', hook => {
    $('#webhook-url').val(hook.url);
});

webhook.change(function () {
    if (webhook.val() == 1) {
        show('#webhook-modal')
    } else {
        webhook.val(0)
    }
});

function setValue(element, value) {
    $(element).val(value);
}

function hide(element) {
    $(element).css('display', 'none');
}

function show(element) {
    $(element).css('display', 'block')
}

function restart() {
    remote.getCurrentWindow().reload();
}

async function enableHook() {
    let value = $('#webhook-url').val().replace(/\s+/, '');
    if (!value) {
        $('#error-modal .content').text('Please specify a webhook URL.');
        hide('#webhook-modal');
        setValue('#webhook', '0');
        show('#error-modal');
        return;
    }
    if (!value.match(/https:\/\/discordapp\.com\/api\/webhooks\/[0-9]+\/[a-zA-Z0-9_]+/)) {
        $('#error-modal .content').text('Webhook URL does not look like a discord webhook (https://discordapp.com/api/webhooks/[0-9]/[a-zA-Z0-9_]).');
        hide('#webhook-modal');
        setValue('#webhook', '0');
        show('#error-modal');
        return;
    }
    await elite.enableWebHook(value);
    restart();
}