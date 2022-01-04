let Game = {};
Game.BroadcastMessage = function(msg) {
   let _msg = "" + msg;
   //_server.broadcastMessage(_msg);
   console.log("[ Broadcast message ] " + _msg);

   data = bufferWriter();
   data.writeString(_msg);
   Net.FireAllClients(2901, data);
}
Game.SendMessageToPlayer = function(msg, playername) {
   let _msg = "" + msg;
   //_server.broadcastMessage(_msg);
   console.log("[ Broadcast message ] " + _msg);

   data = bufferWriter();
   data.writeString(_msg);
   Net.FireToPlayer(2901, data, playername);
}
Game.SendMessageToSocket = function(msg, socket) {
   let _msg = "" + msg;
   //_server.broadcastMessage(_msg);
   console.log("[ Broadcast message ] " + _msg);

   data = bufferWriter();
   data.writeString(_msg);
   Net.Net.FireToSocket(2901, data, socket);
}

module.exports = Game;