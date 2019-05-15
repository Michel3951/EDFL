const EventEmitter = require('events').EventEmitter;
const Watcher = require('../structures/Watcher');
const Scan = require('../events/Scan'), FSDJump = require('../events/FSDJump'), FSDTarget = require('../events/FSDTarget'), StartJump = require('../events/StartJump'), Shutdown = require('../events/Shutdown');

class EventHandler extends EventEmitter {
    constructor() {
        super();
        this.watcher = new Watcher();
        this.watcher.startWatcher();

        this.watcher.on('update', (event) => {
            let name = event.event.toLowerCase();
            switch (name) {
                case 'scan':
                    this.emit(name, new Scan(event));
                    break;
                case 'fsdjump':
                    this.emit(name, new FSDJump(event));
                    break;
                case 'fsdtarget':
                    this.emit(name, new FSDTarget(event));
                    break;
                case 'startjump':
                    this.emit(name, new StartJump(event));
                    break;
                case 'shutdown':
                    this.emit(name, new Shutdown(event));
                    break;
            }
        });
    }

}

module.exports = EventHandler;