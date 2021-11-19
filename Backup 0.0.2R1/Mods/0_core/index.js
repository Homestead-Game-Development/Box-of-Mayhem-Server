
let mymod = {}

console.log("Loading Core");
Thread = require("./libs/Thread.js");
worldengine = require("./libs/WorldEngine.js");
Events = require("./libs/Events.js");
player = require("./libs/Player.js");

require("./events/creation.js");
require("./events/registry.js");//test


console.log(`onPlayerLogin? ${events.storage["onPlayerLogin"]}`);


module.export = mymod