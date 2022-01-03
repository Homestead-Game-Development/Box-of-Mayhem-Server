let Game = {};
Game.BroadcastMessage = function(msg) {
   let _msg = "[Server] " + msg;
   _server.broadcastMessage(_msg);
   console.log(_msg);

   data = bufferWriter();
   data.writeString(_msg);
   Net.FireAllClients(2901, data);
}

module.exports = Game;