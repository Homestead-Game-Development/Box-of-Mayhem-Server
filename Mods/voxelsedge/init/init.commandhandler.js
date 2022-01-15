
Events.register("onServerStart", function() {
    ClientCache.AddScript(__dirname+"/../scripts/client_networkmessages.js");
})

require("../commands.js");
require("../commands/tp.js");
