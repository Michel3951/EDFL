class FSSDiscoveryScan {
    constructor(json) {
        this.progress = json.Progress;
        this.count = json.BodyCount;
        this.nonBody =  json.NonBodyCount;
        this.name = json.SystemName;
        this.address = json.SystemAddress;
    }
}

module.exports = FSSDiscoveryScan;