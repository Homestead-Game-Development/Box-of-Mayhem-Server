

message = {};
message.ids = [];

message.createMessage = function(id, triggeredFunction) {
    message.ids[id] = triggeredFunction;
    message.names[name] = triggeredFunction;
}

message.triggerID = function(id, ...data) {
    if(message.ids[id]) {
        message.ids[id](...data);
    }else{
        console.error("Unhandled ID: " + id);
    }
}