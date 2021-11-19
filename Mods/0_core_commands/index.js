
let mymod = {}

events.register("onPlayerChat", function(eventData, username, chatmessage) {

    if(chatmessage[0]=="/") {
        eventData.sendMessage = false;
        eventData.player.sendMessage(`<color="red">Invalid command<color=#005500>`);
    }
});


module.exports = mymod;