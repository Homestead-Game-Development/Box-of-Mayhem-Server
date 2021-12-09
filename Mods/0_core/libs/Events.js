/*
    Creator: rater193
    Creation Date: 20211111@GMT+1_0219
    Description:
        API Documentation:
        events.createEvent(eventName)
        events.register(eventName, function(eventData, ...args) {})
        events.unregister(eventName, targetFunction)
        events.fire(eventName, ...args)
*/

try {
    events = {};

    let evtStorage = {};

    events.storage = evtStorage;

    //Creates an event
    events.createEvent = function(eventName) {
        let evtData = {};
        let evt = {};
        let subs = [];
        evt.register = function(func) {
            subs[subs.length] = func;
        };
        evt.unregister = function(func) {
            let index = subs.indexOf(func);
            if(index>=0) {
                subs.splice(index, 1);
            }
        }
        evt.fire = function(...args) {
            subs.forEach((func) => {
                func(evtData, ...args);
            })
        }
        evt.data = evtData;

        evtStorage[eventName] = evt;
        //console.log(`evtStorage["${eventName}"] = ${evtStorage[eventName]}`);
    }

    //Triggers an event
    events.fire = function(eventName, ...args) {
        try {
            //console.log("evtStorage[eventName]: " + evtStorage[eventName]);
            evtStorage[eventName].fire(...args);
        }catch(e) {
            console.error("EVENT ERR: " + eventName);
            console.error(e);
        }
        return evtStorage[eventName].data
    }

    //Registers a function to an event
    events.register = function(eventName, func) {
        evtStorage[eventName].register(func);
    }

    //Unregisters a function to an event
    events.unregister = function(eventName, func) {
        evtStorage[eventName].unregister(func);
    }

    //Gets an event from the storage
    events.getEvent = function(eventName) {
        return evtStorage[eventName];
    }

    module.exports = events;
}catch(e) {
    console.error(e);
}