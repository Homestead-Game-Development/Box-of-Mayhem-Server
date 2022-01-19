//Here we are creating all the gamemode shorthands
let gamemodes = {
    "CREATIVE":"Creative",
    "Creative":"Creative",
    "creative":"Creative",
    "c":"Creative",
    "C":"Creative",

    "SURVIVAL":"Survival",
    "Survival":"Survival",
    "survival":"Survival",
    "S":"Survival",
    "s":"Survival",

    "ADVENTURE":"Adventure",
    "Adventure":"Adventure",
    "adventure":"Adventure",
    "A":"Adventure",
    "a":"Adventure"
}

commands.register("gamemode", function(senderusername, gm) {
    if(gm!=null) {
        if(gamemodes[gm]) {
            data = bufferWriter();
            data.writeString(gamemodes[gm]);
            Net.FireToPlayer(1400, data, senderusername);
        }else{
            Game.SendMessageToPlayer("<color=#ff9999>Invalid gamemode</color> <b><color=#ffff99>/gamemode</color></b> <i><color=#9999ff><creative|survival|adventure></color></i>", senderusername);
        }
    }else{
        Game.SendMessageToPlayer("<color=#ff9999>Invalid arguments</color> <b><color=#ffff99>/gamemode</color></b> <i><color=#9999ff><creative|survival|adventure></color></i>", senderusername);
    }
});

events.register("onPlayerLogin", function(eventData, username, websocket) {
    data = bufferWriter();
    data.writeString(playerdata[username].gamemode);
    Net.FireToPlayer(1400, data, username);
});