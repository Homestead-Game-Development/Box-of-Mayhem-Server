
Events.register("onServerStart", function() {
    let data = ClientCache.AddScript(__dirname+"/scripts/client.js");
    console.log(data);
    
    console.log("Registering net message 1");
    Net.Register(100, function(d, ws) {
        console.log("Server received message.");
        console.log(d.readString());
        let data = bufferWriter();
        data.writeString("Harro world from de zerver!");
        console.log("Echoing message back.");
        Net.FireToSocket(101, data, ws);
    });

})
