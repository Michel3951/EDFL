const DiscordRPC = require('discord-rpc');

class DiscordRichPresence {
    constructor() {
        this.id = '568521143212965898';
    }

    start() {
        DiscordRPC.register(this.id);
        this.startTimestamp = new Date();
        this.rpc = new DiscordRPC.Client({ transport: 'ipc' });
        this.state = {
            details: `Main menu`,
            startTimestamp: this.startTimestamp,
            largeImageKey: 'ed',
            largeImageText: 'Elite Dangerous',
            instance: false,
        };

        this.rpc.on('ready', () => {
            this.setActivity();

            setInterval(() => {
                this.setActivity();
            }, 15e3);
        });

        this.rpc.login({clientId: this.id}).catch(console.error);
    }

    async setActivity() {
        let details = this.state;
        if (details.details !== 'Main menu') {
            this.rpc.setActivity().catch(console.error);
            this.rpc.setActivity(this.state);
        } else {
            this.rpc.setActivity({
                details: details.title,
                state: details.state,
                startTimestamp: this.startTimestamp,
                largeImageKey: 'ed',
                largeImageText: 'Elite Dangerous',
                instance: false,
            }).catch(console.error);
        }
    }
}

module.exports = DiscordRichPresence;