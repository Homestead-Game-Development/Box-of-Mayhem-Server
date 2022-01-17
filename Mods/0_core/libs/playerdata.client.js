
Net.Register(1300,function(reader) {
    let x = reader.ReadInt();
    let y = reader.ReadInt();
    let z = reader.ReadInt();
    console.log("Moving player to " + x+0.5 + ", " + y + ", " + z+0.5);

    //Here we are replying to the server, saying we have infact received the new starting position
    let data = new BufferData();
    Net.Send(1250, data);
});
