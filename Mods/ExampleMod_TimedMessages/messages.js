
let config = require("./config.json");

let broadcastInterval = config.interval;
let messages = config.messages;


let getRandomMessage = function() {
    return messages[Math.round((Math.random() * (messages.length-0.1))-0.5)];
}

events.register("onServerStart", function() {
    var messageLoop = function() {
        let messages = (getRandomMessage());
        let offset = 0;
        messages.forEach(msg => {
            setTimeout(function() {
                Game.BroadcastMessage(msg);
            }, offset*100);
            offset += 1;
        });
    };

    setInterval(messageLoop, broadcastInterval * 1000);
});