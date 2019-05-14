const path = require('path');

exports.events = {
    FSD_JUMP: 'FSDJump',
    FSD_TARGET: 'FSDTarget',
    FSS_ALL_BODIES_FOUND: 'FSSAllBodiesFound',
    FSS_DISCOVERY_SCAN: 'FSSDiscoveryScan',
    SCAN: 'Scan',
    START_JUMP: 'StartJump'
};

exports.root = path.join(process.env.USERPROFILE, '\\Saved Games\\Frontier Developments\\Elite Dangerous');