const EventEmitter = require('events').EventEmitter;
const Log = require('../structures/Log');
const Scan = require('../events/Scan');

class EventHandler extends EventEmitter {
    constructor() {
        super();
        this.watcher = new Log();
        this.watcher.startWatcher();

        this.watcher.on('update', (event) => {
            let name = event.event.toLowerCase();
            switch (name) {
                case 'scan':
                    this.emit(name, new Scan(event));
                    break;
            }
        });
    }

}

module.exports = EventHandler;