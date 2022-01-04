Events.register("onServerStart", function() {
    ClientCache.AddScript(__dirname+"/client/Overlay.js");
    ClientCache.AddScript(__dirname+"/client/PlayerControls.js");
})


Net.Register(1901, function(reader) {
    let message = reader.readString();

    
    Events.fire("onPlayerChat", sender, message);

    if(Events.storage["onPlayerChat"].data["sendMessage"]) {
       console.log("Broadcasting to player");
       //_server.broadcastMessage(Events.storage["onPlayerChat"].data["message"]);
       console.log(sender + ": " + message);
       Game.BroadcastMessage(sender + ": " + message);
    }
});

Net.Register(200,function(reader) {
    //This handles the player placing a block, TODO: replace this with handling the player rightclicking an item
    let mousebtn = reader.readInt();
    let x = reader.readInt();
    let y = reader.readInt();
    let z = reader.readInt();
    let data = null;
    let blockid = null;

    switch(mousebtn) {
        case 0://left
            console.log(`Leftclick: ${x}, ${y}, ${z}`);
            worldengine.worlds.overworld.SetBlock(Math.floor(x), Math.floor(z), Math.floor(y),-1);
            worldengine.worlds.overworld.UpdateChunk(Math.floor(x/16),Math.floor(z/16),Math.floor(y/16));
            worldengine.worlds.overworld.SaveChunk(Math.floor(x/16),Math.floor(z/16),Math.floor(y/16));
            //Here we are telling all other clients we broke the block
            data = bufferWriter();
            data.writeInt(1);
            data.writeInt(x);
            data.writeInt(y);
            data.writeInt(z);
            Net.FireAllClients(201, data);
        break;

        case 1://right
            console.log(`Rightclick: ${x}, ${y}, ${z}`);
            blockid = reader.readInt();
            worldengine.worlds.overworld.SetBlock(Math.floor(x), Math.floor(z), Math.floor(y),blockid);
            worldengine.worlds.overworld.UpdateChunk(Math.floor(x/16),Math.floor(z/16),Math.floor(y/16));
            worldengine.worlds.overworld.SaveChunk(Math.floor(x/16),Math.floor(z/16),Math.floor(y/16));
            //Here we are telling all other clients we placed the block
            data = bufferWriter();
            data.writeInt(0);
            data.writeInt(x);
            data.writeInt(y);
            data.writeInt(z);
            data.writeInt(blockid);//blockID
            Net.FireAllClients(201, data);
        break;

        case 2://middle
            console.log(`Middleclick: ${x}, ${y}, ${z}`);
        break;
    }
});