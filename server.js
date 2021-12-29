
try {

   var WebSocket = require('ws');
   var http = require("http");
   var port = 20002;
   var wss;

   authenticatedUserSockets = [];
   let playerdatabase = {};
   let nametoplayer = {};
   let lastid = 0;
   let _server = {};

   //Broadcasts a chat message
   _server.broadcastMessage = function(msg) {
      console.log("Creating buffer message");
      let writer = bufferWriter();
      writer.writeInt      (messageids.client.Chat);
      writer.writeString   (msg);

      authenticatedUserSockets.forEach(_ws => {
         try {
            console.log("Sending to ws: " + _ws);
            _ws.send(writer.getData());
         }catch(e) {

         }
      });
   }

   //Sends packets to everyone, except its sender
   _server.broadcastBufferFromSender = function(wsSender, data) {
      authenticatedUserSockets.forEach(_ws => {
         if(_ws!=wsSender) {
            _ws.send(data);
            //reply( _ws, packetname, data );
         }
      });
   }

   //Sends packets to everyone
   _server.broadcastBufferPacket = function(data) {
      authenticatedUserSockets.forEach(_ws => {
         try {
            _ws.send(data);
         }catch(e) {
            console.error(e);
         }
         //reply( _ws, packetname, data );
      });
   }

   //Exporting a function to start the server
   module.exports = function() {
      //Shutting down the old websocket server
      if(wss) {
         console.log("Shutting down previous websocket server");
         wss.shutDown();
      }

      //Creating a new websocket server
      wss = new WebSocket.Server({ port: port },()=>{
         console.log('server started')
      });

      //Handling new connections
      wss.on('connection', function connection(ws) {
         let userdata = {};
         userdata.username = "N/A";
         userdata.authenticated = false;
         userdata.saveddata = {};
         userdata.id = ++lastid;
         userdata.ws = ws
         let hasSentInitialHash = false;
         let hasReceivedBlockData = false;
         playerdatabase[userdata.id] = userdata;

         ws.on('message', (data) => {
            switch(ws.binaryType) {
               case "nodebuffer":
                  /*try { 
                     let d = (JSON.parse(data));
                     switch(d.state) {
      
                        
                        default:
                           console.log(`Unhandled state: ${d.state}`);
                        break;
                     //}
                  //}catch(e) {*/
                     try {
                        let x=0
                        let y=0;
                        let z=0;
                        let id=0;
                        let binary = [];
                        for(let index=0; index<data.length; index++) {
                           binary[index] = data[index];
                        }
                        

                        let p = bufferReader(binary);
                        let msgid = p.readUShort();
                        //console.log("Handling message: " + msgid);
                        let writer = bufferWriter();

                        switch(msgid) {
                           case messageids.server.creds:
                              let key = p.readString();
                              console.log("Handling key: " + key);
                              let encodedData = encodeURIComponent("{\"action\":\"get\",\"key\":\""+key+"\"}");
                              console.log(encodedData);
                              http.get(`http://community.homesteadgamedevelopment.com:20001/`+encodeURIComponent(`{"action":"get","key":"${key}"}`), (response) => {
                                 console.log("one?");
                                 let chunks_of_data = [];
      
                                 response.on('data', (fragments) => {
                                    chunks_of_data.push(fragments);
                                 });
                                 
                                 response.on('end', () => {
                                    let response_body = Buffer.concat(chunks_of_data);
                                    console.log("Authentication message response body: " + response_body);
                                    // response body
                                    let response_message = response_body.toString();
                                    console.log("Authentication message response message: " + response_message);
         
                                    try {
                                       let jsonMsg = JSON.parse(response_message);
                                       if(jsonMsg.success) {
                                          //It has passed!
                                          userdata.authenticated = true;
                                          userdata.username = jsonMsg.username;
                                          console.log("Authenticated user")
                                          console.log("Username: " + jsonMsg.username);
                                          nametoplayer[jsonMsg.username] = userdata;
                                          authenticatedUserSockets.push(ws);

                                          writer.writeInt(messageids.client.AcceptedSessionKey);
                                          writer.writeString(userdata.username);
                                          ws.send(writer.getData());

                                       }else{
                                          //It has failed
                                          writer.writeInt(messageids.client.FailedSessionKey);
                                          ws.send(writer.getData());
                                       }
                                    }catch(e) {
                                       console.error(e);
                                    }
                                 });
         
                                 response.on('error', (error) => {
                                    console.log("AUTHENTICATION HTTP ERROR?: " + error);
                                 });
                              });
                           break;
                        
                           case messageids.server.RequestInitialTextureHash:
                              console.log("Retreiving initial hash message?");
                              if(hasSentInitialHash==false) {
                                 console.log("Sending initial texture hash to " + userdata.username);
                                 //assetstreamer.hash
                                 //assetstreamer.fileCount
                                 /*reply(
                                    ws, "ReceiveInitialHash", assetstreamer.initial_message
                                 );*/
                                 let writer = bufferWriter();
                                 writer.writeInt(messageids.client.ReceiveInitialHash);
                                 writer.writeString(assetstreamer.hash);
                                 writer.writeInt(assetstreamer.fileCount);

                                 ws.send(writer.getData());
                                 hasSentInitialHash = true;
                              }
                           break;

                           case messageids.server.RequestHashList:
                              console.log("Player RequestHashList");
                              
                              writer.writeInt(messageids.client.ReceiveHashList);

                              //Writing the amount of hashes
                              writer.writeInt(assetstreamer.network_hashes.length);
                              //Writing the hashes
                              for(let i = 0; i < assetstreamer.network_hashes.length; i++) {
                                 writer.writeString(assetstreamer.network_hashes[i].name);
                                 writer.writeString(assetstreamer.network_hashes[i].hash);
                              }

                              ws.send(writer.getData());
                              

                              /*
                              console.log("Sending hash list to " + userdata.username + " / " + JSON.stringify(assetstreamer.network_hashes).length);
                              reply(
                                 ws, "ReceiveHashList", {"hash_list":(assetstreamer.network_hashes)}
                              );
                              */
                           break;

                           case messageids.server.RequestCacheFile:
                              let imgIndex = p.readInt();
                              let hashedImageFromIndex = assetstreamer.network_hashes[imgIndex];
                              let imgname = hashedImageFromIndex.name;
                              let img = assetstreamer.network_images[imgname];
                              /*
                              img.network_image.width = img.width;
                              img.network_image.height = img.height;
                              img.network_image.hash = img.hash;
                              img.network_image.name = img.name;
                              img.network_image.data = img.data;
                              */
                              console.log("Sending " + imgname + " to " + userdata.username);
                              
                              //let writer = bufferWriter();
                              writer.writeInt(messageids.client.ReceiveCacheImage);
                              writer.writeInt   (img.width);
                              writer.writeInt   (img.height);
                              writer.writeString(img.hash);
                              writer.writeString(img.name);

                              //Writing the actual image
                              writer.writeString(img.data);

                              ws.send(writer.getData());
         
                              //reply(ws, "ReceiveCacheImage", {img:img});
                           break;

                           case messageids.server.RequestBlockData:
                              if(hasReceivedBlockData==false) {//Quick debounce
                                 hasReceivedBlockData = true;
                                 //console.log(blockdb.data);
                                 //console.log(JSON.toString(blockdb.data));

                                 writer.writeInt(messageids.client.ReceiveBlockData);
                                 writer.writeInt(blockdb.data.blocks.length);
                                 for(let i = 0; i < blockdb.data.blocks.length; i++) {
                                    blockdb.data.blocks[i].writeToStream(writer);
                                 }
                                 ws.send(writer.getData());

                                 //reply(ws, "ReceiveBlockData", blockdb.data);
                              }
                           break;

                           //CONVERT
                           case messageids.server.LogInWorld:
                              _server.broadcastMessage(userdata.username + " has logged in.");
         
                              let pos = {
                                 x: 0,
                                 y: 25,
                                 z: 0
                              }
                              userdata.x = pos.x;
                              userdata.y = pos.y;
                              userdata.z = pos.z;
                              
                              let loggedInWorldWriter = bufferWriter();
                              loggedInWorldWriter.writeInt(messageids.client.LogInWorld);
                              loggedInWorldWriter.writeInt(pos.x);
                              loggedInWorldWriter.writeInt(pos.y);
                              loggedInWorldWriter.writeInt(pos.z);
                              ws.send(loggedInWorldWriter.getData());
                              
                              //Sending the player the
                              for(const[key, value] of Object.entries(playerdatabase)) {
                                 if(value.id != userdata.id) {//Ignore ourself
                                    
                                    let otherPlayerWriter = bufferWriter();
                                    otherPlayerWriter.writeInt(messageids.client.OtherPlayerLogedIn);
                                    otherPlayerWriter.writeString(value.username);
                                    otherPlayerWriter.writeFloat(value.x);
                                    otherPlayerWriter.writeFloat(value.y);
                                    otherPlayerWriter.writeFloat(value.z);
                                    otherPlayerWriter.writeInt(value.id);
                                    ws.send(otherPlayerWriter.getData());

                                 }
                              }

                              //Here we are telling everyone else that we have logged in
                              //This is our data
                              let otherPlayerWriter = bufferWriter();
                              otherPlayerWriter.writeInt(messageids.client.OtherPlayerLogedIn);
                              otherPlayerWriter.writeString(userdata.username);
                              otherPlayerWriter.writeFloat(pos.x);
                              otherPlayerWriter.writeFloat(pos.y);
                              otherPlayerWriter.writeFloat(pos.z);
                              otherPlayerWriter.writeInt(userdata.id);
                              authenticatedUserSockets.forEach(_ws => {
                                 if(_ws!=ws) {
                                    _ws.send(otherPlayerWriter.getData());
                                 }
                              });
                              
                              
                              Events.fire("onPlayerLogin", userdata.username, ws);
                           break;
                           
                           case messageids.server.RequestChunk:
                              try {
                                 let ch = worldengine.GetChunk(p.readInt(), p.readInt(), p.readInt())//chunk.blocks
                                 let netdata = ch.network;
                                 
                                 writer.writeInt(messageids.client.RequestChunk);

                                 writer.writeInt(netdata.x);
                                 writer.writeInt(netdata.y);
                                 writer.writeInt(netdata.z);
                                 
                                 writer.writeInt(16*16*16);
                                 for(let ____i = 0; ____i < 16*16*16; ____i++) {
                                    let block = netdata.blocks[____i];
                                    writer.writeInt(block);
                                 }
                              }catch(e) {
                                 console.error(e);
                              }
                              /*
                              network: {
                                 [int]   x
                                 [int]   y
                                 [int]   z
                                 [int[]] blocks
                              }
                              */

                              ws.send(writer.getData());

                           case messageids.server.UpdatePlayerPosition:

                              //Updating our local user position values
                              userdata.x = p.readFloat();
                              userdata.y = p.readFloat();
                              userdata.z = p.readFloat();

                              //Writing Broadcasting our position values to everyone else
                              let updatePosWriter = bufferWriter();
                              updatePosWriter.writeInt(messageids.client.OtherPlayerMove);
                              
                              updatePosWriter.writeInt(userdata.id);
                              updatePosWriter.writeFloat(userdata.x);
                              updatePosWriter.writeFloat(userdata.y);
                              updatePosWriter.writeFloat(userdata.z);
                              //ws.send(updatePosWriter.getData());

                              _server.broadcastBufferFromSender(ws, updatePosWriter.getData());
                           break;

                           case messageids.server.Chat:
                              if(userdata.authenticated) {

                                 let txtmsg = p.readString();
                                 console.log()
                                 
                                 Events.fire("onPlayerChat", userdata.username, txtmsg);

                                 if(Events.storage["onPlayerChat"].data["sendMessage"]) {
                                    console.log("Broadcasting to player");
                                    _server.broadcastMessage(Events.storage["onPlayerChat"].data["message"]);
                                 }
                              }
                           break;
                           
                           case messageids.server.PlayerPlaceBlock:
                              //_server.broadcastPacket("PlayerPlaceBlock", {x:d.x, y:d.y, z:d.z, id:d.id});
                              
                              x = p.readFloat();
                              y = p.readFloat();
                              z = p.readFloat();
                              id = p.readInt();
                              
                              worldengine.worlds.overworld.SetBlock(Math.floor(x), Math.floor(z), Math.floor(y),id);
                              worldengine.worlds.overworld.UpdateChunk(Math.floor(x/16),Math.floor(z/16),Math.floor(y/16))
                              worldengine.worlds.overworld.SaveChunk(Math.floor(x/16),Math.floor(z/16),Math.floor(y/16))
                              
                              let placeBlockWriter = bufferWriter();
                              placeBlockWriter.writeInt(messageids.client.PlayerPlaceBlock);
                              placeBlockWriter.writeFloat(x);
                              placeBlockWriter.writeFloat(y);
                              placeBlockWriter.writeFloat(z);
                              placeBlockWriter.writeInt(id);
                              _server.broadcastBufferPacket(placeBlockWriter.getData());
                              //_server.broadcastPacket("PlayerPlaceBlock", {x:d.x, y:d.y, z:d.z, id:d.id});
                              /*_server.broadcastPacket("RequestChunk", {
                                 chunk:worldengine.GetChunk(Math.floor(d.x/16),Math.floor(d.z/16),Math.floor(d.y/16)).network
                              });*/
                           break;

                           
                           case messageids.server.PlayerBreakBlock:
                              x = p.readFloat();
                              y = p.readFloat();
                              z = p.readFloat();
         
                              worldengine.worlds.overworld.SetBlock(Math.floor(x), Math.floor(z), Math.floor(y),-1);
                              worldengine.worlds.overworld.UpdateChunk(Math.floor(x/16),Math.floor(z/16),Math.floor(y/16));
                              worldengine.worlds.overworld.SaveChunk(Math.floor(x/16),Math.floor(z/16),Math.floor(y/16));


                              let breakBlockWriter = bufferWriter();
                              breakBlockWriter.writeInt(messageids.client.PlayerBreakBlock);
                              breakBlockWriter.writeFloat(x);
                              breakBlockWriter.writeFloat(y);
                              breakBlockWriter.writeFloat(z);
                              _server.broadcastBufferPacket(breakBlockWriter.getData());
                           break;

                           
                           case messageids.server.RequestScriptData:
                              
                              _server.broadcastBufferPacket(ClientCache.writer.getData());
                           break;

                           
                           case messageids.server.ScriptData:
                              let messageID = p.readInt();
                              let messageSize = p.readInt();
                              let messageData = p.readBytesRaw(messageSize);

                              Net.Fire(messageID, messageData, ws);
                           break;

                           default:
                              console.log("UNHANDLED MESSAGE ID: " + msgid);
                        }
                     }catch(e2) {
                        console.error(e2);
                     }
                  //}
               break;

               case "arraybuffer":
                  console.log("This is binary");
               break;

               default:
                  console.log("Unhandled binary type: " + ws.binaryType);
               break;
            }
            
         });

         ws.onerror = () => {
            console.log(userdata.username + " has logged out");
            Events.fire("onPlayerLogout", userdata.username, ws);
            _server.broadcastMessage(userdata.username + " has logged out");

            let index = authenticatedUserSockets.indexOf(ws);
            authenticatedUserSockets.splice(index,1);
            
            let otherPlayerWriter = bufferWriter();
            otherPlayerWriter.writeInt(messageids.client.OtherPlayerLogout);
            otherPlayerWriter.writeString(userdata.id);
            _server.broadcastBufferPacket(otherPlayerWriter.getData());


            playerdatabase[userdata.id] = null;
            delete nametoplayer[userdata.username];
            delete playerdatabase[userdata.id];
         }

         ws.onclose = () => {
            console.log(userdata.username + " has logged out");
            Events.fire("onPlayerLogout", userdata.username, ws);
            _server.broadcastMessage(userdata.username + " has logged out");
            
            let index = authenticatedUserSockets.indexOf(ws);
            authenticatedUserSockets.splice(index,1);
            
            
            let otherPlayerWriter = bufferWriter();
            otherPlayerWriter.writeInt(messageids.client.OtherPlayerLogout);
            otherPlayerWriter.writeString(userdata.id);
            _server.broadcastBufferPacket(otherPlayerWriter.getData());

            playerdatabase[userdata.id] = null;
            delete nametoplayer[userdata.username];
            delete playerdatabase[userdata.id];
         }
         
         //Sending data to the client that joins
         setTimeout(function() {
            let writer = bufferWriter();

            //Sending the initial message, to let the client know we are ready to start initializing.
            writer.writeInt(messageids.client.Init);

            ws.send(writer.getData());
         }, 300);
      });

      //Checking for when we start listening
      wss.on('listening',()=>{
         console.log(`listening on ${port}`)
      })
   }

   Events.register("onServerStart", function() {
      console.log("Registering the server update loop");
      setInterval(function() {
         //console.log("Server update loop")
         Events.fire("onServerUpdate");
      }, 1/20);
   })

}catch(e) {
   console.error(e);
}
