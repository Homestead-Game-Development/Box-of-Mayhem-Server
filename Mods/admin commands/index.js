
let mymod = {}

commands.register("test", function(player, ...args) {
  player.sendMessage(args[0]);
});

module.exports = mymod;