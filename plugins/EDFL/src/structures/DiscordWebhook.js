const {Webhook, MessageBuilder} = require('webhook-discord');

class DiscordWebhook {
    constructor(url) {
        this.webhook = new Webhook(url);
    }

    send(msg) {
        let message = new MessageBuilder();
        message.setName('Elite Dangerous');
        message.setText(msg);
        this.webhook.send(message);
    }
}

module.exports = DiscordWebhook;