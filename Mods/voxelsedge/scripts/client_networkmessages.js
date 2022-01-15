
//TP Command handler
Net.Register(1002,function(reader) {
    //x, y, z
    let x = reader.ReadInt();
    let y = reader.ReadInt();
    let z = reader.ReadInt();
    LocalPlayer.SetPosition(x, y, z);
    LocalPlayer.SetSpeed(0,0,0);
});

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
