const DiscordRPC = require('discord-rpc'), EventEmitter = require('events').EventEmitter;
const Watcher = require('./Watcher');

class DiscordRichPresence extends EventEmitter {
    constructor() {
        super();
        this.id = '568521143212965898';
        this.state = {
            title: `Main menu`,
        };
    }

    start() {
        DiscordRPC.register(this.id);
        this.startTimestamp = new Date();
        this.rpc = new DiscordRPC.Client({transport: 'ipc'});

        this.rpc.on('ready', () => {
            this.setActivity();

            this.emit('ready', true);

            setInterval(() => {
                this.setActivity();
            }, 15e3);
        });

        this.rpc.login({clientId: this.id}).catch(console.error);
    }

    setRPC(presence) {
        this.state = presence;
    }

    async setActivity() {
        if (this.state.state) {
            this.rpc.setActivity({
                details: this.state.title,
                state: this.state.state,
                startTimestamp: this.startTimestamp,
                largeImageKey: 'ed',
                largeImageText: 'Elite Dangerous',
                instance: false,
            }).catch(console.error);
        } else {
            this.rpc.setActivity({
                details: this.state.title,
                startTimestamp: this.startTimestamp,
                largeImageKey: 'ed',
                largeImageText: 'Elite Dangerous',
                instance: false,
            }).catch(console.error);
        }
    }
}

module.exports = DiscordRichPresence;