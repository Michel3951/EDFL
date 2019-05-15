class FSDJump{
    constructor(json) {
        this.system = json.StarSystem;
        this.address = json.SystemAddress;
        this.postion = json.StarPos;
        this.allegiance = json.SystemAllegiance;
        this.economy = json.SystemEconomy_Localised;
        this.government = json.SystemGovernment_Localised;
        this.security = json.SystemSecurity;
        this.fuelUsed = json.FuelUsed;
        this.jumpDistance = json.JumpDist;
        this.fuelLevel = json.FuelLevel;
    }

    getSystem() {
        return {
            name: this.system,
            address: this.address,
            position: this.postion,
            allegiance: this.allegiance,
            government: this.government,
            economy: this.economy,
        };
    }

    getDetails() {
        return {
            distance: this.jumpDistance,
            fuelUsed: this.fuelUsed,
            fuelLevel: this.fuelLevel
        };
    }
}

module.exports = FSDJump;