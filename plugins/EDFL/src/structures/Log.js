const _ = require('underscore'), fs = require('fs'), path = require('path'),
    EventEmitter = require('events').EventEmitter, md5 = require('md5'), watch = require('node-watch');

class Log extends EventEmitter {
    constructor() {
        super();
        this.root = require('../util/Constants').root;
    }

    getLatest(pathOnly = false) {
        let files = fs.readdirSync(this.root).filter(file => file.endsWith('.log'));
        let allFiles = [];
        _.max(files, (file) => {
            allFiles.push({file: file, date: fs.statSync(path.join(this.root, file)).ctime})
        });
        let latest = allFiles.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        })[0];

        return pathOnly ? path.join(this.root, latest.file) : this.getContent(path.join(this.root, latest.file));
    }

    getLatestLine(type = null) {
        let content = this.getLatest(type);
        return JSON.parse(content.split('\n').filter(lines => lines).reverse()[0]);
    }

    getContent(filePath) {
        return fs.readFileSync(filePath, 'utf-8');
    }

    startWatcher() {
        let file = this.getLatest(true);
        watch(file, { recursive: true }, (evt, name) => {
            let emitted = this.getLatestLine();
            this.emit('update', emitted);
        });
    }
}

module.exports = Log;