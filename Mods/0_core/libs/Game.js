let Game = {};
Game.BroadcastMessage = function(msg) {
   let _msg = "[Server] " + msg;
   console.log(_msg);
   authenticatedUserSockets.forEach(_ws => {
      try {
         reply(_ws, "Chat", {
            msg:_msg
         });
      }catch(e) {

      }
   });
}

module.exports = Game;