class FSDTarget {
    constructor(json) {
        this.name = json.Name;
        this.address = json.SystemAddress;
    }
}

module.exports = FSDTarget;