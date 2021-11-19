

events.register("onPlayerLogin", function(evtData, playername, ws) {
    console.log("COREIN: " + playername);
    let pdata = player.logIn(playername, ws);
    evtData.player = pdata;
});

events.register("onPlayerLogout", function(evtData, playername, ws) {
    console.log("COREOUT: " + playername);
    player.logOut(playername, ws);
});