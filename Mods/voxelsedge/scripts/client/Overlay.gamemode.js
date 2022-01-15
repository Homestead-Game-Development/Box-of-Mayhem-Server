let storage = {}
GameMode = {}

GameMode.register = function(gamemodename, updateFunction) {
    let _guigroup = new GUI.Group();
    storage[gamemodename] = _guigroup;
    _guigroup.SetActive(false); // This disables the group, at the start.
    return _guigroup;//We are returning the GUI group to assign children to
}

GameMode.change = function(gamemodename) {

}

events.Register("onClientUpdate", function() {

});