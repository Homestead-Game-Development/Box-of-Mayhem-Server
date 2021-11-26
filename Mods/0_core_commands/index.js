
let mymod = {}

require("./commands.js");

function processMessage(text) {
    const re = /^"[^"]*"$/; // Check if argument is surrounded with double-quotes
    const re2 = /^([^"]|[^"].*?[^"])$/; // Check if argument is NOT surrounded with double-quotes
  
    let arr = [];
    let argPart = null;
  
    text && text.split(" ").forEach(function(arg) {
      if ((re.test(arg) || re2.test(arg)) && !argPart) {
        arr.push(arg);
      } else {
        argPart = argPart ? argPart + " " + arg : arg;
        // If part is complete (ends with a double quote), we can add it to the array
        if (/"$/.test(argPart)) {
          arr.push(argPart);
          argPart = null;
        }
      }
    });

    for(let index = 0; index < arr.length; index++) {
        if(arr[index][0]=='"') {
            arr[index] = arr[index].substring(1,arr[index].length-1);
        }
    }
  
    return arr;
  }

events.register("onPlayerChat", function(eventData, username, chatmessage) {

    if(chatmessage[0]=="/") {
        eventData.sendMessage = false;

        //This processes the message and splits it into arguments
        let args = processMessage(chatmessage.substring(1));

        //Here we are handling the arguments
        let cmd = args.shift();
        commands.execute(cmd, eventData.player, ...args);
    }
});


module.exports = mymod;