const {root} = require('./util/Constants');
const EventHandler = require('./util/EventHandler');

class EliteDangerousProcess extends EventHandler {
    constructor(options = {}) {
        super();
        this.isRunning();
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
                this.emit ('ready', true);
            } else {
                setTimeout(() => {
                    this.isRunning();
                }, 5000);
            }
        });
    }
}

module.exports = EliteDangerousProcess;