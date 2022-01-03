Net = {}

let messages = {}


//This triggeres the registered function
Net.Fire = function(msgID, bufferData, ws) {
    try {
        if(messages[msgID]!=null) {
            console.log("Firing message: " + msgID);
            messages[msgID].forEach(func => {
                func(bufferReader(bufferData), ws);
            });
            return true;
        }else{
            console.error("Net message not registered: " + msgID);
        }
        return false;
    }catch(e) {
        console.error("Net message errored:\nMessage ID: " + msgID + "\n" + e);
        return false;
    }
}

//This registers new messages
Net.Register = function(msgID, triggeredFunction) {
    //console.log("REGISTERING MESSAGE HANDLER: " + msgID + "\n" + triggeredFunction);
    let arr = [];
    if(messages[msgID]==null) {
        messages[msgID] = arr;
    }else{
        arr = messages[msgID];
    }
    arr.push(triggeredFunction);
}

//Broadcasts a message to all clients
Net.FireAllClients = function(msgID, data) {
    authenticatedUserSockets.forEach(_ws => {
        Net.FireToSocket(msgID, data, _ws);
    });
}

//Broadcasts to a player by name
Net.FireToPlayer = function(msgID, data, playername) {
    let usr = nametoplayer[playername];
    if(usr!=null) {
        Net.FireToSocket(msgID, data, usr.ws)
    }
}

//Broadcasts a message to a websocket
Net.FireToSocket = function(msgID, data, socket) {
    let msg = bufferWriter();
    msg.writeInt      (messageids.client.ScriptData);
    msg.writeInt      (msgID);
    //console.log("data.length: " + data.getData().length);
    msg.writeInt      (data.getData().length);
    msg.writeBytes    (data.getData());
    socket.send(msg.getData());
}