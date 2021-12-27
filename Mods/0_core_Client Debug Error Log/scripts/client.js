Events.register("onServerStart", function() {
    ClientCache.AddScript(__dirname+"/client/ErrorOverlay.js");
})