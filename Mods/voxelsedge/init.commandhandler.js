
Events.register("onServerStart", function() {
    ClientCache.AddScript(__dirname+"/scripts/client_networkmessages.js");
})

require("./commands.js");
require("./commands/tp.js");

events.register("onServerStart", function() {
    //console.log("Creating core blocks");
    blockdb.createBlockMacro    (0, "missing", "0.block.png");//Default missing block

    //console.log("Creating core blocks");
    
});