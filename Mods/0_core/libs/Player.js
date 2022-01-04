/*
    Creator: rater193
    Creation date: 20211111@GMT+1_0253
    Description:
        Player Global Class
            [Player]    player.getPlayer(<string>name)
            [Bool]      player.isLoggedIn(<string>name)

        Player Instance
            player.sendMessage(message);
*/


let player = {};

let storage = {};

player.getPlayer = function(name) {
    return storage[name]
}

player.isLoggedIn = function(name) {
    return (storage[name]!=null)
}

player.logIn = function(name, ws) {
    if(storage[name]) {
        return null
    }else{
        let pdata = {};

        pdata.ws = ws;
        pdata.username = name;

        pdata.reply = function(message) {
            //ws.send(JSON.stringify({id:id, md:JSON.stringify(data)}));
            Game.SendMessageToSocket(message, ws);
        }

        pdata.sendMessage = function(msg) {
            Game.SendMessageToSocket(message, ws);
        }

        //Any data that needs to be stored on the hard drive, such as position, store it here
        pdata.storage = {};

        storage[name] = pdata;

        return pdata;
    }
}

player.logOut = function(name, ws) {
    delete storage[name];
}

module.exports = player;