
Net.Register(1300,function(reader) {
    let action = reader.ReadInt();
    let x = reader.ReadInt();
    let y = reader.ReadInt();
    let z = reader.ReadInt();
    let blockID = -1;
    switch(action) {
        case 0://Place
            blockID = reader.ReadInt();
            LocalPlayerWorld.SetBlock(x, y, z, blockID);
        break;

        case 1://Break
            LocalPlayerWorld.SetBlock(x, y, z, -1);
        break;

        default:
            console.log("<color=yellow>Unhandled block place action: " + action + "</color>");
        break;
    }
});
