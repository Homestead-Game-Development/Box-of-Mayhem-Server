
let mymod = {}

console.log("Loading Core");
Thread = require("./libs/Thread.js");
worldengine = require("./libs/WorldEngine.js");
Events = require("./libs/Events.js");
player = require("./libs/Player.js");
Game = require("./libs/Game.js");
require("./libs/Entity/Entity.js");
require("./events/creation.js");
require("./events/registry.js");
require("./libs/ServerSettings.js");

//Here we are initializing the playerdata api
require("./libs/playerdata.js");


// console.log(`onPlayerLogin? ${events.storage["onPlayerLogin"]}`);


module.export = mymod
