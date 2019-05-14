class FSDJump {
    constructor(json) {
        this.system = json.StarSystem;
        this.address = json.SystemAddress;
        this.postion = json.StarPos;
        this.allegiance = json.SystemAllegiance;
        this.body = json.Body;
        this.bodyID = json.BodyID;
        this.bodyType = json.BodyType;
    }
}

module.exports = FSDJump;