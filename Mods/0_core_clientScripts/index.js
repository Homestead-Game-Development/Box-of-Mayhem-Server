
Events.register("onServerStart", function() {
    let data = ClientCache.AddScript(__dirname+"/scripts/client.js");
    console.log(data);
})