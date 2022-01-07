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
        Game.SendMessageToPlayer("<color=#ff9999>Invalid arguments</color> <b><color=#ffff99>/tp</color></b> <i><color=#9999ff><x> <y> <z></color></i>", senderusername);
    }
});