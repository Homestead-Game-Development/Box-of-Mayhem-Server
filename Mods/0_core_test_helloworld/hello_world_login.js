
events.register("onPlayerLogin", function(eventData) {
    eventData.player.sendMessage("Hello from the mod!");
});