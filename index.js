//Creating some essential functions that can be used in other files.
fs = require("fs");
mkdir = function (dir) { if (!fs.existsSync(dir)) { fs.mkdirSync(dir); } }

//Here we are constructing the initial folders we will be needing for the server
mkdir("./Data/");
mkdir("./Data/client/");

//Requiring all the networking libraries
require("./Data/networking/index.js");


let val = 10;
let writer = bufferWriter();
(writer.writeInt(val));
console.log(writer.getData())
console.log("Done")



blockdb = require("./blockdb.js");

//This is for handling streaming assets to the clients once they join
assetstreamer = require("./assetstreamer.js");


//Here we are handling loading new mods
modloader = require("./modloader.js");


//require("./engine/init.js");
server = require("./server.js");



function WaitToLoad() {
    if(!assetstreamer.finished) {
        setTimeout(WaitToLoad, 1000);
    }else{
        console.log("Server is starting");
        Events.fire("onServerStart");

        server();
    }
}

setTimeout(WaitToLoad, 1000);

