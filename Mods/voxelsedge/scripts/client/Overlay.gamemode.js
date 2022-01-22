let storage = {}
let selectedGamemode = null;
let sleectedGamemodeName = "";
GameMode = {}

GameMode.register = function(gamemodename, startFunction) {
    let _guigroup = new GUI.Group();
    storage[gamemodename] = {"group":_guigroup,"start":startFunction};
    _guigroup.SetActive(false); // This disables the group, at the start.
    return _guigroup;//We are returning the GUI group to assign children to
}

GameMode.change = function(gamemodename) {
    if(storage[gamemodename]) {
        //Disabling the old gamemode
        if(selectedGamemode) {
            selectedGamemode.group.SetActive(false);
        }
        //Updating to the new gamemode
        selectedGamemode = storage[gamemodename];
        selectedGamemode.group.SetActive(true);
        console.log("Changing gamemode menu to " + gamemodename);
        sleectedGamemodeName = gamemodename;
        
        if(selectedGamemode["start"]) {
            selectedGamemode.start();
        }
    }else{
        console.error("Invalid gamemode menu: " + gamemodename);
    }
}

GameMode.GetGameMode = function() {
    return sleectedGamemodeName;
}
