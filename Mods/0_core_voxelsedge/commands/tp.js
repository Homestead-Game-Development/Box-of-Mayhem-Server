commands.register("tp", function(senderusername, x, y, z) {
    if(x!=null&&y!=null&&z!=null) {
        let _x = parseInt(x);
        let _y = parseInt(y);
        let _z = parseInt(z);

        data = bufferWriter();
        data.writeInt(_x);
        data.writeInt(_y);
        data.writeInt(_z);
        Net.FireToPlayer(1002, data, senderusername);
    }else{
        Game.SendMessageToPlayer("Invalid arguments, /tp <x> <y> <z>", senderusername);
    }
});