Events.register("onServerStart", function() {
    //This loads up the script for the client to handle the gui
    ClientCache.AddScript(__dirname+"/client/Overlay.js");
})
