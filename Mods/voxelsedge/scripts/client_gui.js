Events.register("onServerStart", function() {
    //This loads up the script for the client to handle the gui
    ClientCache.AddScript(__dirname+"/client/Overlay.js");
    ClientCache.AddScript(__dirname+"/client/Overlay.gamemode.js");
    ClientCache.AddScript(__dirname+"/client/Overlay.gamemode.creative.js");
    ClientCache.AddScript(__dirname+"/client/Overlay.gamemode.survival.js");
    ClientCache.AddScript(__dirname+"/client/Overlay.gamemode.adventure.js");
    ClientCache.AddScript(__dirname+"/client/Overlay.debug.js");
})
