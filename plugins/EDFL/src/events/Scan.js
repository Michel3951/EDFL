const CelestialBody = require('../structures/CelestialBody');

class Scan extends CelestialBody {
    constructor(json) {
        super(json);
        this.type = json.ScanType;
        this.name = json.BodyName;
        this.id = json.BodyID;
        this.parents = json.Parents;
        this.distanceFromStart = json.DistanceFromArrivalLS;
        this.starClass = json.StarType;
    }

}

module.exports = Scan;