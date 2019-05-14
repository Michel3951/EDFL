class FSSAllBodiesFound {
    constructor(json) {
        this.name = json.StartSystem;
        this.address = json.SystemAddress;
        this.postion = json.StarPos;
        this.allegiance = json.SystemAllegiance;
        this.economy = json.SystemEconomy;
        this.government = json.SystemGovernment;
    }
}

module.exports = FSSAllBodiesFound;