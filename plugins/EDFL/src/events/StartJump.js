class StartJump {
    constructor(json) {
        this.type = json.JumpType;
        this.system = json.StarSystem;
        this.address = json.SystemAddress;
        this.class = json.StarClass;
    }

    getType() {
        return this.type;
    }

    isHyperspace() {
        return !!(this.type && this.type === 'Hyperspace');
    }

    isSupercruise() {
        return !!(this.type && this.type === 'Supercruise')
    }

    getTarget() {
        if (!this.isHyperspace()) return new Error('Calling getTarget() on non-starSystem');
        return {
            system: this.system,
            address: this.address,
            starClass: this.class,
        }
    }
}

module.exports = StartJump;