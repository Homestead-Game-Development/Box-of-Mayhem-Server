commands.register("setspawn", function(senderusername, x, y, z) {
    if(x!=null&&y!=null&&z!=null) {
        
        //Sending the messages to the player
        Game.SendMessageToPlayer("<color=#ff9999>Invalid arguments</color> <b><color=#ffff99>/tp</color></b> <i><color=#9999ff><x> <y> <z></color></i>", senderusername);
        let _x = parseInt(x);
        let _y = parseInt(y)+0.81;
        let _z = parseInt(z);
        
        //Setting the server settings
        ServerSettings.Set("WorldSpawnX", _x);
        ServerSettings.Set("WorldSpawnY", _y);
        ServerSettings.Set("WorldSpawnZ", _z);
        ServerSettings.save();

    }else{
        let pdata = playerdata[senderusername];

        //Sending the messages to the player
        Game.SendMessageToPlayer(`World spawn set to your position. {${pdata.worldpos.x}, ${pdata.worldpos.y}, ${pdata.worldpos.z}}`, senderusername);
        Game.SendMessageToPlayer("If you want to set the world spawn to a specific position, use this syntax.", senderusername);
        Game.SendMessageToPlayer("<b><color=#ffff99>/setspawn</color></b> <i><color=#9999ff><x> <y> <z></color></i>", senderusername);

        //Setting the server settings
        ServerSettings.Set("WorldSpawnX", pdata.worldpos.x);
        ServerSettings.Set("WorldSpawnY", pdata.worldpos.y);
        ServerSettings.Set("WorldSpawnZ", pdata.worldpos.z);
        ServerSettings.save();

    }
});