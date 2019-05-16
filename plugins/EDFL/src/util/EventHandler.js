const EventEmitter = require('events').EventEmitter;
const Watcher = require('../structures/Watcher'), Commander = require('../structures/Commander'),
    DiscordWebhook = require('../structures/DiscordWebhook'), fs = require('fs');
const Scan = require('../events/Scan'), FSDJump = require('../events/FSDJump'),
    FSDTarget = require('../events/FSDTarget'), StartJump = require('../events/StartJump'),
    Shutdown = require('../events/Shutdown');


class EventHandler extends EventEmitter {
    constructor(options = {}) {
        super();
        this.watcher = new Watcher();

        this.watcher.on('fatal', (error) => {
            setImmediate(() => {
                this.emit('fatal', error);
            });
        });

        if (fs.existsSync('./webhook.json')) {
            setImmediate(() => {
                this.emit('webhook-enabled', JSON.parse(fs.readFileSync('./webhook.json', 'utf-8')));
            });
        }

        this.game = this.watcher.getGameInfo();

        if (this.game && this.game.ship) {
            this.launch();
        } else {
            this.attempt();
        }
    }

    attempt() {
        this.game = this.watcher.getGameInfo();

        if (this.game) {
            this.launch();
        } else {
            setTimeout(() => {
                this.attempt()
            }, 5e3);
        }
    }

    launch() {
        this.watcher.startWatcher();

        this.game = new Commander(this.game);
        this.watcher.on('update', (event) => {
            let name = event.event.toLowerCase();
            switch (name) {
                case 'scan':
                    this.emit(name, new Scan(event));
                    break;
                case 'fsdjump':
                    let FSD_JUMP = new FSDJump(event);
                    this.emit(name, FSD_JUMP);
                    this.hook(`CMDR ${this.game.commander} jumped to ${FSD_JUMP.system}`);
                    if (this.game) {
                        let ship = this.game.getShipInfo();
                        this.rpc.setRPC({
                            title: ship.name ? `${ship.name} (${ship.vessel})` : ship.vessel,
                            state: FSD_JUMP.system
                        });
                    } else {
                        this.rpc.setRPC({
                            title: FSD_JUMP.system
                        });
                    }
                    break;
                case 'fsdtarget':
                    let FSD_TARGET = new FSDTarget(event);
                    this.emit(name, FSD_TARGET);
                    break;
                case 'startjump':
                    let START_JUMP = new StartJump(event);
                    this.emit(name, START_JUMP);
                    if (START_JUMP.isHyperspace()) {
                        this.rpc.setRPC({
                            title: `Hyperspace jump`,
                            state: START_JUMP.system
                        });
                    }
                    break;
                case 'shutdown':
                    this.emit(name, new Shutdown(event));
                    break;
            }
        });
    }

    hook(message) {
        if (!fs.existsSync('./webhook.json')) return;
        let hook = JSON.parse(fs.readFileSync('./webhook.json', 'utf-8'));
        try {
            let webhook= new DiscordWebhook(hook.url);
            webhook.send(message)
        } catch (e) {

        }
    }
}

module.exports = EventHandler;