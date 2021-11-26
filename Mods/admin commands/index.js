
let mymod = {}

commands.register("test", function(player, ...args) {
  player.sendMessage(args[0]);
});

commands.register("gamemode", function(player, ...args) {
  if(args.length<1) {
    player.sendMessage(`/gamemode survival|creative|adventure`)
  }
});

module.exports = mymod;