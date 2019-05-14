class FSDJump {
    constructor(json) {
        this.type = json.JumpType;
        this.system = json.StarSystem;
        this.address = json.SystemAddress;
        this.class = json.StarClass;
    }
}