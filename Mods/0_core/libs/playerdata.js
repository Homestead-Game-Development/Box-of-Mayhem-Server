let fs = require("fs");

playerdata = {}

Events.register("onServerStart", function() {
    console.log("Initializing playerdata");

    ClientCache.AddScript(__dirname+"/playerdata.client.js");
});

Events.register("onPlayerPreLogin", function(eventData, username, websocket) {
    //Here we are checking for the player data
    console.log("Checking playerdata for: " + username);
    let playerfolder = gameserver.path + "/Data/playerdata/"+(username.replace(/[^a-z0-9]/gi, '_').toLowerCase()) + "/";
    console.log("Playerdata path: " + playerfolder);
    mkdir(playerfolder);
    let newpdata = {};
    if(fs.existsSync(playerfolder+"/data.json")) {
        //If the file exists, load it
        newpdata = require(playerfolder+"/data.json");
    }else{
        //Otherwise, speecify defaults
        newpdata.worldpos = { x: 0, y: 20, z: 0 };
        newpdata.world = "Overworld"
    }
    playerdata[username] = newpdata;
});


Events.register("onPlayerPostLogin", function(eventData, username, websocket) {
    
    // Here we are telling the player their starting position, the next step is to wait for a response on message id 1250 saying they have received the position, and to unlock the player
    data = bufferWriter();

    // Here we are writing the initial position
    data.writeInt(Math.floor(playerdata[username].worldpos.x));
    data.writeInt(Math.floor(playerdata[username].worldpos.y));
    data.writeInt(Math.floor(playerdata[username].worldpos.z));
    
    // Now to send it to the player
    Net.FireToPlayer(1300, data, username);
});

Events.register("onPlayerLogout", function(eventData, username, websocket) {
    //Here we are saving the player data
    let playerfolder = gameserver.path + "/Data/playerdata/"+(username.replace(/[^a-z0-9]/gi, '_').toLowerCase()) + "/";
    fs.writeFileSync(playerfolder+"/data.json", JSON.stringify(playerdata[username]));
});