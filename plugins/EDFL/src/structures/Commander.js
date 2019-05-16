class Commander {
    constructor(json) {
        this.commander = json.Commander;
        this.horizons = json.Horizons
        this.ship = json.Ship;
        this.shipName = json.ShipName;
        this.shipIdentifier = json.ShipIdent;
        this.fuel = json.FuelLevel;
        this.fuelCapacity = json.FuelCapacity;
        this.gamemode = json.GameMode;
        this.credits = json.Credits;
        this.loan = json.Loan;
    }

    getCommanderInfo() {
        return {
            name: this.commander,
            horizons: this.horizons,
            credits: this.credits,
            loan: this.loan,
        };
    }

    getShipInfo() {
        return this.ship ? {
            vessel: this.ship,
            name: this.shipName,
            identifier: this.shipIdentifier,
            fuel: this.fuel,
            fuelCapacity: this.fuelCapacity,
        } : null;
    }
}

module.exports = Commander;