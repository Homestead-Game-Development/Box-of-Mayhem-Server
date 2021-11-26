commands = {};

commands.commands = {};

commands.register = function(cmdName, triggeredFunction) {
    console.log("Registering command: " + cmdName);
    commands.commands[cmdName] = triggeredFunction
};

commands.execute = function(cmdname, player, ...args) {
    if(commands.commands[cmdname]) {
        commands.commands[cmdname](player, ...args);
    }else{
        //player.sendMessage(`<color="red">Command not registered: ${cmdName}<color=#005500>`)
    }
}
