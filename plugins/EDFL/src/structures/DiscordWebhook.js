const {Webhook, MessageBuilder} = require('webhook-discord');

class DiscordWebhook {
    constructor() {
        this.url = '';
        this.webhook = new Webhook('https://discordapp.com/api/webhooks/577547671141744641/qC0Ipnfamx8uvOGx_1_AqB7yFwltp05EnVl_1V6Ry0CJBDYlx6DXpWrW8FyFdptJ7O_S');
    }

    send(msg) {
        let message = new MessageBuilder();
        message.setName('Elite Dangerous');
        message.setText(msg);
        this.webhook.send(message);
    }
}

module.exports = DiscordWebhook;