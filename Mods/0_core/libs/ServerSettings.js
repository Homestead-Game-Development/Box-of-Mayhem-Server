/*
    Documentation
        ServerSettings.save()
            This saves the server config

        ServerSettings.load()
            This loads the config from file
        
        ServerSettings.GetOrDefault(configname, defaultValue)
            This returns the current value if it exists, otherwise it will create the default value and return it instead

        ServerSettings.Set(configname, value)
            This sets the config value
            
        ServerSettings.Get(configname, value)
            This sets the config value

        ServerSettings.Exists(configname, value)
            Returns true or false if the config value exists

*/

events.register("onServerStartPre", function() {
    let fs = require("fs");
    let configfilepath = gameserver.path + "/serversettings.json";
    ServerSettings = {}
    ServerSettings.data = {}
    ServerSettings.save = function() {
        fs.writeFileSync(configfilepath, JSON.stringify(ServerSettings.data, null, '\t'));
    }

    ServerSettings.GetOrDefault = function(configname, defaultValue) {
        if(ServerSettings.data[configname]) {
            return ServerSettings.data[configname]
        } else {
            ServerSettings.data[configname] = defaultValue;
            return defaultValue;
        }
    }

    ServerSettings.Set = function(configname, val) {
        ServerSettings.data[configname] = val
    }

    ServerSettings.Exists = function(configname) {
        return (ServerSettings.data[configname]!=null) ? true : false;
    }

    ServerSettings.Get = function(configname) {
        return ServerSettings.data[configname];
    }

    ServerSettings.load = function() {
        if(fs.existsSync(configfilepath)) {
            ServerSettings.data = require(configfilepath);
        }
    }
    //Here we are saving the config data after we load
    //Here we are loading the default values before we try to set the default values
    ServerSettings.load();

    //Here we are setting the default values
    ServerSettings.GetOrDefault("WorldSpawnX", 0);
    ServerSettings.GetOrDefault("WorldSpawnY", 20);
    ServerSettings.GetOrDefault("WorldSpawnZ", 0);
});

events.register("onServerStartPost", function() {
    console.log("Saving adjusted json file")
    ServerSettings.save();
});
