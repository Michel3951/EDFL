const EventEmitter = require('events').EventEmitter;
const Watcher = require('../structures/Watcher');
const Scan = require('../events/Scan'), FSDJump = require('../events/FSDJump'), FSDTarget = require('../events/FSDTarget'), StartJump = require('../events/StartJump'), Shutdown = require('../events/Shutdown');
const DiscordWebhook = require('../structures/DiscordWebhook');


class EventHandler extends EventEmitter {
    constructor(options = {}) {
        super();
        this.watcher = new Watcher();
        this.watcher.startWatcher();

        this.system = null;
        this.target = null;

        this.watcher.on('update', (event) => {
            let webhook = new DiscordWebhook;
            let name = event.event.toLowerCase();
            switch (name) {
                case 'scan':
                    this.emit(name, new Scan(event));
                    break;
                case 'fsdjump':
                    let FSD_JUMP = new FSDJump(event);
                    this.emit(name, FSD_JUMP);
                    this.system = FSD_JUMP.system;
                    if (options.webhook) {
                        webhook.send(`Jumped to ${FSD_JUMP.getSystem().name}`)
                    }
                    break;
                case 'fsdtarget':
                    let FSD_TARGET = new FSDTarget(event);
                    this.emit(name, FSD_TARGET);
                    this.target = FSD_TARGET.name;
                    break;
                case 'startjump':
                    let START_JUMP = new StartJump(event);
                    this.emit(name, START_JUMP);
                    if (START_JUMP.isHyperspace()) {
                        this.rpc.state = {
                            title: `Hyperspace jump to ${START_JUMP.system}`,
                            state: this.system ? `From ${this.system}` : null,
                        };
                    }
                    break;
                case 'shutdown':
                    this.emit(name, new Shutdown(event));
                    break;
            }
        });
    }

}

module.exports = EventHandler;