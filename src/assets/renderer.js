'use strict';

let fs = require('fs');
const $ = require('jquery');
const path = require('path');
const {remote} = require('electron');

$('#hide').on('click', () => {
    let window = remote.getCurrentWindow();
    window.minimize();
});

$('#close').on('click', () => {
    let window = remote.getCurrentWindow();
    window.close();
});

updateDetails();

setInterval(() => {
    updateDetails()
}, 10e3);

function updateDetails() {
    let root = `${path.dirname(require.main.filename)}/..`;
    if (fs.existsSync(`${root}/latest.json`)) {
        let latest = JSON.parse(fs.readFileSync(`${root}/latest.json`, 'utf-8'));
        let window = remote.getCurrentWindow();
        $('#system').text(latest.system || 'Unknown');
        $('#cmdr').text(latest.cmdr || 'Unknown');
        $('#ship').text(latest.ship || 'Unknown');
        $('#docked').text(latest.docked || 'No');
        $('#target').text(latest.jumpTarget || 'Not set');
    }
}