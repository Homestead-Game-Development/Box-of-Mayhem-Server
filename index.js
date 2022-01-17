//Creating some essential functions that can be used in other files.
fs = require("fs");
mkdir = function (dir) { if (!fs.existsSync(dir)) { fs.mkdirSync(dir); } }

//Here we are constructing the initial folders we will be needing for the server
mkdir("./Data/");
mkdir("./Data/playerdata/");

//Requiring all the networking libraries
require("./Libs/networking/index.js");
blockdb = require("./blockdb.js");

//This is for handling streaming assets to the clients once they join
assetstreamer = require("./assetstreamer.js");


//Here we are handling loading new mods
modloader = require("./modloader.js");

require('./Libs/ClientCache.js');


//This handles delivering all the textures to the client
require("./content_server.js");


//require("./engine/init.js");
server = require("./server.js");



function WaitToLoad() {
    if(!assetstreamer.finished) {
        setTimeout(WaitToLoad, 100);
    }else{
        console.log("Server is starting");
        Events.fire("onServerStartPre");
        Events.fire("onServerStart");
        Events.fire("onServerStartPost");

        server();
    }
}



setTimeout(WaitToLoad, 100);
