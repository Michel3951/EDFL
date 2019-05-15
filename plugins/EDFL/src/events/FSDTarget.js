class FSDTarget {
    constructor(json) {
        this.name = json.Name;
        this.address = json.SystemAddress;
    }

    getTarget() {
        return this;
    }
}

module.exports = FSDTarget;