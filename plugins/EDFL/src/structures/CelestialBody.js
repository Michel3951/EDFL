class CelestialBody {
    constructor(json) {
        this.raw = json;
    }

    isPlanet() {
        return !!(!this.raw.StarClass && this.raw.PlanetClass);
    }

    getPlanetDetails() {
        if (!this.isPlanet()) return new Error('Calling getPlanetDetails() on non-planet.');
        return {
            name: this.raw.BodyName,
            id: this.raw.BodyID,
        };
    }

    isMapped() {
        return !!(this.raw.WasMapped);
    }
}

module.exports = CelestialBody;