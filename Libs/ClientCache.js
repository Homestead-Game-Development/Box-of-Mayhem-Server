let fs = require("fs");
var path = require("path");

ClientCache = {}

ClientCache.scriptCacheCount = 0;
ClientCache.scriptCache = bufferWriter()
ClientCache.writer = null;

let cachAddScriptLock = false;

//This adds a script to the queue
ClientCache.AddScript = function(filename) {
    if(cachAddScriptLock==false) {
        
        if(fs.existsSync(filename)) {
            let scriptData = ""+fs.readFileSync(filename);
            ClientCache.scriptCache.writeString(path.relative(process.cwd(),filename));
            ClientCache.scriptCache.writeString(scriptData);
            ClientCache.scriptCacheCount++;

            ClientCache.scriptCache[ClientCache.scriptCache.length] = scriptData;
            return scriptData;
        }else{
            console.error("Tried to load non exsistant file:\n"+filename);
        }
    }else{

    }
}

//Here we are going to log adding scripts after the server starts, and the other mods have registered their scripts accordingly
Events.register("onServerStartPost", function(eventData) {
    cachAddScriptLock = true;
    //Here we are processing the messages since the other mods have added what they want
    ClientCache.writer = bufferWriter()

    ClientCache.writer.writeInt(messageids.client.ReceiveClientScripts)
    ClientCache.writer.writeInt(ClientCache.scriptCacheCount);
    ClientCache.writer.writeBytes(ClientCache.scriptCache.getData())

    return false;
});