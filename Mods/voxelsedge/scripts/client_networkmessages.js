
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
Net.Register(1400, function(reader) {
    let gamemode = reader.ReadString();
    console.log("New gamemode: " + gamemode);
});
