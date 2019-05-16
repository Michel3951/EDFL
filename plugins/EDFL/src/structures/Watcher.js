const _ = require('underscore'), fs = require('fs'), path = require('path'),
    EventEmitter = require('events').EventEmitter, md5 = require('md5'), watch = require('node-watch');

class Watcher extends EventEmitter {
    constructor() {
        super();
        this.root = require('../util/Constants').root;
        this.previous = null;
    }

    getLatest(pathOnly = false) {
        let files = fs.readdirSync(this.root).filter(file => file.endsWith('.log'));
        if (!files[0]) return null;
        let allFiles = [];
        _.max(files, (file) => {
            allFiles.push({file: file, date: fs.statSync(path.join(this.root, file)).ctime})
        });
        let latest = allFiles.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        })[0];

        return pathOnly ? path.join(this.root, latest.file) : this.getContent(path.join(this.root, latest.file));
    }

    getGameInfo() {
        let content = this.getLatest();
        if (!content) return null;
        let events = content.split('\n').filter(x => x).filter(x => JSON.parse(x).event === 'LoadGame');
        return events[0] ? JSON.parse(events[0]) : null;
    }

    filterEvents(events = [], reverse = false) {
        let content = this.getLatest();
        if (!content) return null;
        let results = content.split('\n').filter(x => x).filter(x => events.includes(JSON.parse(x).event)).reverse();
        return reverse ? results.reverse() : results;
    }

    getLatestLine(type = null) {
        let content = this.getLatest(type);
        if (!content) return null;
        return JSON.parse(content.split('\n').filter(lines => lines).reverse()[0]);
    }

    getContent(filePath) {
        return fs.readFileSync(filePath, 'utf-8');
    }

    getLastLocation() {
        let content = this.getLatest();
        if (!content) return null;
        let events = ['Location', 'FSDJump'];
        let results = content.split('\n').filter(x => x).filter(x => events.includes(JSON.parse(x).event)).reverse();
        return results[0] ? JSON.parse(results[0]).StarSystem : null;
    }

    startWatcher() {
        let file = this.getLatest(true);
        if (!file) {
            this.emit('fatal', new Error(`Cannot find any log files in ${this.root}`));
            return;
        };
        setInterval(() => {
            let events = this.filterEvents(['FSDJump', 'StartJump', 'Shutdown', 'FSDTarget', 'Scan'], false);
            if (this.previous === md5(events[0])) return;
            let event = JSON.parse(events[0]);
            this.previous = md5(events[0]);
            this.emit('update', event);
        }, 5e3);
        // watch(file, {recursive: true}, (evt, name) => {
        //     console.log('event');
        //     let emitted = this.getLatestLine();
        //     this.emit('update', emitted);
        // });
    }
}

module.exports = Watcher;