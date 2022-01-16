let storage = {}
let selectedGamemode = null;
GameMode = {}

GameMode.register = function(gamemodename, updateFunction) {
    let _guigroup = new GUI.Group();
    storage[gamemodename] = {"group":_guigroup,"update":updateFunction};
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
        console.log("Changing gamemode menu to " + gamemodename)
    }else{
        console.error("Invalid gamemode menu: " + gamemodename);
    }
}


events.Register("onClientUpdate", function() {
    if(selectedGamemode) {
        if(selectedGamemode["update"]) {
            selectedGamemode.update();
        }
    }
});