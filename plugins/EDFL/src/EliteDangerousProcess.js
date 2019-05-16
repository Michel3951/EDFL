const {root} = require('./util/Constants');
const EventHandler = require('./util/EventHandler');
const DiscorRichPresence = require('./structures/DiscordRichPresence'), fs = require('fs');

class EliteDangerousProcess extends EventHandler {
    constructor(options = {}) {
        super(options);

        let running = this.isRunning();
        this.rpc = new DiscorRichPresence();

        this.rpc.on('ready', () => {
            this.emit('discord-connection', true)
        });
    }

    isRunning() {
        const exec = require('child_process').exec;
        let query = 'EliteDangerous64.exe';
        let platform = process.platform;
        let cmd = '';
        switch (platform) {
            case 'win32' :
                cmd = `tasklist`;
                break;
            case 'darwin' :
                cmd = `ps -ax | grep ${query}`;
                break;
            case 'linux' :
                cmd = `ps -A`;
                break;
            default:
                break;
        }
        exec(cmd, (err, stdout, stderr) => {
            let running = !!(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
            if (running) {
                let location = this.watcher.getLastLocation() || null;
                let ship = this.game ? this.game.getShipInfo() : null;
                if (location && ship) {
                    this.rpc.setRPC({
                        title: ship.name ? `${ship.name} (${ship.vessel})` : ship.vessel,
                        state: location
                    });
                }
                this.rpc.start();
                this.emit('ready', true);
                return true;
            } else {
                setTimeout(() => {
                    this.isRunning();
                }, 5000);
                return false;
            }
        });
    }

    async enableWebHook(url) {
        return new Promise(resolve => {
            fs.writeFileSync('./webhook.json', `{"url": "${url}"}`);
            resolve(true);
        });
    }
}

module.exports = EliteDangerousProcess;