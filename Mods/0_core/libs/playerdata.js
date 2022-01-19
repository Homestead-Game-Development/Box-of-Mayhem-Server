let fs = require("fs");


playerdata = {}

Events.register("onServerStart", function() {
    console.log("Initializing playerdata");

    ClientCache.AddScript(__dirname+"/playerdata.client.js");
});

Events.register("onPlayerPreLogin", function(eventData, username, websocket) {
    
    //Any values the player does not have, will be assigned and given the default value set here
    let defaultPlayerData = {
        worldpos : { x: ServerSettings.Get("WorldSpawnX"), y: ServerSettings.Get("WorldSpawnY"), z: ServerSettings.Get("WorldSpawnZ") },
        world : "Overworld",
        gamemode : "Survival",
        newValue: 123
    }
    //Object.assign({}, o1, o2, o3);

    //Here we are checking for the player data
    console.log("Checking playerdata for: " + username);
    let playerfolder = gameserver.path + "/Data/playerdata/"+(username.replace(/[^a-z0-9]/gi, '_').toLowerCase()) + "/";
    console.log("Playerdata path: " + playerfolder);
    mkdir(playerfolder);
    let newpdata = {};
    if(fs.existsSync(playerfolder+"/data.json")) {
        //If the file exists, load it
        newpdata = require(playerfolder+"/data.json");
    }
    //Here we are copying any values that have not been specified before, to migrate old players to the new format
    newpdata = Object.assign({}, defaultPlayerData, newpdata, {readyToWrite: false});
    playerdata[username] = newpdata;
});


Events.register("onPlayerPostLogin", function(eventData, username, websocket) {
    
    // Here we are telling the player their starting position, the next step is to wait for a response on message id 1250 saying they have received the position, and to unlock the player
    data = bufferWriter();

    // Here we are writing the initial position
    data.writeFloat(playerdata[username].worldpos.x);
    data.writeFloat(playerdata[username].worldpos.y);
    data.writeFloat(playerdata[username].worldpos.z);
    
    //Starting gamemode
    data.writeString(playerdata[username].gamemode);
    
    // Now to send it to the player
    Net.FireToPlayer(1300, data, username);
});

Events.register("onPlayerLogout", function(eventData, username, websocket) {
    //Here we are saving the player data
    let playerfolder = gameserver.path + "/Data/playerdata/"+(username.replace(/[^a-z0-9]/gi, '_').toLowerCase()) + "/";
    fs.writeFileSync(playerfolder+"/data.json", JSON.stringify(playerdata[username], null, '\t'));
});

Net.Register(1250, function(reader) {
    let username = sender;
    console.log(username + " has successfully finished ponged the message");
    playerdata[username].readyToWrite = true;
});