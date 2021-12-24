Events.register("onServerStart", function() {
    ClientCache.AddScript(__dirname+"/client/Overlay.js");
    ClientCache.AddScript(__dirname+"/client/PlayerControls.js");
})