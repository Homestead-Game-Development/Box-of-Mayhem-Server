
//Player chat messages
Net.Register(1901, function(reader) {
    let message = reader.readString();
    
    Events.fire("onPlayerChat", sender, message);

    if(Events.storage["onPlayerChat"].data["sendMessage"]) {
       console.log("Broadcasting to player");
       console.log(sender + ": " + message);
       Game.BroadcastMessage(sender + ": " + message);
    }
});