class CelestialBody {
    constructor(json) {
        this.raw = json;
    }

    isPlanet() {
        return !!(!this.raw.StarType && this.raw.PlanetClass);
    }

    isStar() {
        return !!(this.raw.StarType);
    }

    getPlanetDetails() {
        if (!this.isPlanet()) return new Error('Calling getPlanetDetails() on non-planet.');
        return {
            name: this.raw.BodyName,
            id: this.raw.BodyID,
            parents: this.raw.Parents,
            distanceFromStar: this.raw.DistanceFromArrivalLS,
            tidalLock: this.raw.TidalLock,
            terraformState: this.raw.TerraformState,
            class: this.raw.PlanetClass,
            atmosphere: this.raw.Atmosphere || null,
            atmosphereType: this.raw.AtmosphereType || null,
            atmosphereComposition: this.raw.AtmosphereComposition || null,
            volcanism: this.raw.Volcanism || null,
            surfaceGravity: this.raw.SurfaceGravity,
            SurfaceTemperature: this.raw.SurfaceTemperature || null,
            surfacePressure: this.raw.SurfacePressure || null,
            landable: this.raw.Landable,
            materials: this.raw.Materials || [],
            composition: this.raw.Composition || null,
            rings: {
                rings: this.raw.Rings || [],
                reserveLevel: this.raw.ReserveLevel || [],
            },
            rotationPeriod: this.raw.RotationPeroid || null,
        };
    }

    getStarDetails() {
        if (!this.isStar()) return new Error('Calling getStarDetails() on non-star.');
        return {
            name: this.raw.BodyName,
            id: this.raw.BodyID,
            distanceFromStar: this.raw.DistanceFromArrivalLS,
            type: this.raw.StarType,
            mass: this.raw.StellarMass,
            radius: this.raw.Radius,
            magnitude: this.raw.AbsoluteMagnitude,
            rotationPeriod: this.raw.rotationPeriod,
            surfaceTemperature: this.raw.SurfaceTemperature,
            luminosity: this.raw.Luminosity,
            age: this.raw.age,
            rings: this.raw.rings || [],
        }
    }

    isMapped() {
        return !!(this.raw.WasMapped);
    }
}

module.exports = CelestialBody;