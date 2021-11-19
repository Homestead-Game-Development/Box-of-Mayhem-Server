

events.register("onPlayerLogin", function(evtData, playername, ws) {
    console.log("Player login: " + playername);
    let pdata = player.logIn(playername, ws);
    evtData.player = pdata;
});

events.register("onPlayerLogout", function(evtData, playername, ws) {
    console.log("Player logout: " + playername);
    player.logOut(playername, ws);
});

events.register("onPlayerChat", function(evtData, playername, message) {
    evtData.player = player.getPlayer(playername);
    evtData.message = playername+": "+message;
    evtData.sendMessage = true;//This determines weather or not we will be sending a message to the other clients to see. Tis is used in the command handler.
});