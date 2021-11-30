try {

   var WebSocket = require('ws');
   var http = require("http");
   var port = 20002;
   var wss;

   var reply = function(ws, id, data) {
      ws.send(JSON.stringify({id:id, md:JSON.stringify(data)}));
   }




   authenticatedUserSockets = [];
   let playerdatabase = {};
   let lastid = 0;
   let _server = {};

   //Broadcasts a chat message
   _server.broadcastMessage = function(msg) {
      authenticatedUserSockets.forEach(_ws => {
         try {
            reply(_ws, "Chat", {
               msg:msg
            });
         }catch(e) {

         }
      });
   }

   //Sends packets to everyone, except its sender
   _server.broadcastPacketFromSender = function(wsSender, packetname, data) {
      authenticatedUserSockets.forEach(_ws => {
         if(_ws!=wsSender) {
            reply( _ws, packetname, data );
         }
      });
   }

   //Sends packets to everyone
   _server.broadcastPacket = function(packetname, data) {
      authenticatedUserSockets.forEach(_ws => {
         reply( _ws, packetname, data );
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
         let hasSentInitialHash = false;
         let hasReceivedBlockData = false;
         playerdatabase[userdata.id] = userdata;

         ws.on('message', (data) => {
            switch(ws.binaryType) {
               case "nodebuffer":
                  /*try { 
                     let d = (JSON.parse(data));
                     switch(d.state) {
                        case messageids.creds:
                           let key = d.skey;
                           console.log("Authenticating key: " + key);
                           //TODO: Authenticate the session key, and get the username associated with it
      
                           // will be executed asynchronously
                           http.get(`http://community.homesteadgamedevelopment.com:20001/`+encodeURIComponent(`{"action":"get","key":"${key}"}`), (response) => {
                              let chunks_of_data = [];
      
                              response.on('data', (fragments) => {
                                 chunks_of_data.push(fragments);
                              });
                              
                              response.on('end', () => {
                                 let response_body = Buffer.concat(chunks_of_data);
                                 // response body
                                 let response_message = response_body.toString();
      
                                 try {
                                    let response = JSON.parse(response_message);
                                    if(response.success) {
                                       //It has passed!
                                       userdata.authenticated = true;
                                       userdata.username = response.username;
                                       console.log("Authenticated user")
                                       console.log("Username: " + response.username);
                                       authenticatedUserSockets.push(ws);
                                       reply(ws, "AcceptedSessionKey", {playerInventory:"",playerStats:"",playerName:""});
                                    }else{
                                       //It has failed
                                       reply(ws, "FailedSessionKey", {});
                                    }
                                 }catch(e) {
                                    console.error(e);
                                 }
                              });
      
                              response.on('error', (error) => {
                                 console.log(error);
                              });
                           });
                        break;
      
                        case messageids.chat:
                           if(userdata.authenticated) {
                              
                              Events.fire("onPlayerChat", userdata.username, d.msg);
                              if(Events.storage["onPlayerChat"].data["sendMessage"]) {
                                 _server.broadcastMessage(Events.storage["onPlayerChat"].data["message"]);
                              }
                           }
                        break;
      
                        case messageids.RequestChunk:
                           let ch = worldengine.GetChunk(d.x, d.y, d.z)//chunk.blocks
      
                           reply(ws, "RequestChunk", {
                              chunk:ch.network
                           });
      
                        case messageids.RequestInitialTextureHash:
                           if(hasSentInitialHash==false) {
                              console.log("Sending initial texture hash to " + userdata.username);
                              reply(
                                 ws, "ReceiveInitialHash", assetstreamer.initial_message
                              );
                              hasSentInitialHash = true;
                           }
                        break;
      
                        case messageids.RequestHashList:
                           console.log("Sending hash list to " + userdata.username + " / " + JSON.stringify(assetstreamer.network_hashes).length);
                           reply(
                              ws, "ReceiveHashList", {"hash_list":(assetstreamer.network_hashes)}
                           );
                        break;
      
                        case messageids.RequestCacheFile:
                           
                           let hashedImageFromIndex = assetstreamer.network_hashes[d.i];
                           let imgname = hashedImageFromIndex.name;
                           let img = assetstreamer.network_images[imgname];
                           console.log("Sending " + imgname + " to " + userdata.username);
      
                           reply(ws, "ReceiveCacheImage", {img:img});
                        break;
      
                        case messageids.RequestBlockData:
                           if(hasReceivedBlockData==false) {//Quick debounce
                              hasReceivedBlockData = true;
                              //console.log(blockdb.data);
                              //console.log(JSON.toString(blockdb.data));
                              reply(ws, "ReceiveBlockData", blockdb.data);
                           }
                        break;
      
                        case messageids.PlayerPlaceBlock:
                           //_server.broadcastPacket("PlayerPlaceBlock", {x:d.x, y:d.y, z:d.z, id:d.id});
                           
                           
                           worldengine.worlds.overworld.SetBlock(Math.floor(d.x), Math.floor(d.z), Math.floor(d.y),d.id);
                           worldengine.worlds.overworld.UpdateChunk(Math.floor(d.x/16),Math.floor(d.z/16),Math.floor(d.y/16))
                           worldengine.worlds.overworld.SaveChunk(Math.floor(d.x/16),Math.floor(d.z/16),Math.floor(d.y/16))
                           _server.broadcastPacket("PlayerPlaceBlock", {x:d.x, y:d.y, z:d.z, id:d.id});
                           /*_server.broadcastPacket("RequestChunk", {
                              chunk:worldengine.GetChunk(Math.floor(d.x/16),Math.floor(d.z/16),Math.floor(d.y/16)).network
                           });*//*
                        break;
      
                        case messageids.PlayerBreakBlock:
      
                           worldengine.worlds.overworld.SetBlock(Math.floor(d.x), Math.floor(d.z), Math.floor(d.y),-1);
                           worldengine.worlds.overworld.UpdateChunk(Math.floor(d.x/16),Math.floor(d.z/16),Math.floor(d.y/16))
                           worldengine.worlds.overworld.SaveChunk(Math.floor(d.x/16),Math.floor(d.z/16),Math.floor(d.y/16))
                           _server.broadcastPacket("PlayerBreakBlock", {x:d.x, y:d.y, z:d.z});
                           /*
                           worldengine.worlds.overworld.SetBlock(Math.floor(d.x), Math.floor(d.z), Math.floor(d.y),-1);
                           worldengine.worlds.overworld.UpdateChunk(Math.floor(d.x/16),Math.floor(d.z/16),Math.floor(d.y/16))
                           .then(function() {
                              console.log("Sending chunk update");
                              reply(ws, "RequestChunk", {
                                 chunk:worldengine.GetChunk(Math.floor(d.x/16),Math.floor(d.z/16),Math.floor(d.y/16)).network
                              });
                           })*//*
                        break;
      
                        case messageids.LogInWorld:
                           _server.broadcastMessage(userdata.username + " has logged in.");
      
                           let pos = {
                              x: 0,
                              y: 200,
                              z: 0
                           }
                           userdata.x = pos.x;
                           userdata.y = pos.y;
                           userdata.z = pos.z;
      
                           reply(
                              ws, "LogInWorld", {
                                 world:"overworld",
                                 x:pos.x,
                                 y:pos.y,
                                 z:pos.z,
                                 chunks:[
                                    //simulateChunk(-1, -1, 0),
                                 ]
                              }
                           );
                           
                           //Sending the player the
                           for(const[key, value] of Object.entries(playerdatabase)) {
                              if(value.id != userdata.id) {//Ignore ourself
                                 reply(
                                    ws, "OtherPlayerLogedIn",
                                    {
                                       name: value.username,
                                       x: value.x,
                                       y: value.y,
                                       z: value.z,
                                       id: value.id
                                    }
                                 );
                              }
                           }
      
                           _server.broadcastPacketFromSender(ws, "OtherPlayerLogedIn", {
                              name: userdata.username,
                              x: pos.x,
                              y: pos.y,
                              z: pos.z,
                              id: userdata.id
                           });
                           
                           Events.fire("onPlayerLogin", userdata.username, ws);
                        break;
      
                        case messageids.UpdatePlayerPosition:
                           _server.broadcastPacketFromSender(ws, "OtherPlayerMove", {
                              x: d.x,
                              y: d.y,
                              z: d.z,
                              id: userdata.id
                           });
                           userdata.x = d.x;
                           userdata.y = d.y;
                           userdata.z = d.z;
                        break;
      
                        default:
                           console.log(`Unhandled state: ${d.state}`);
                        break;
                     //}
                  //}catch(e) {*/
                     try {
                        console.log(e);
                        console.log("Data type not buffer, treating as array?");

                        let binary = [];
                        for(let index=0; index<data.length; index++) {
                           binary[index] = data[index];
                        }

                        let p = bufferReader(binary);
                        switch(p.readUShort()) {
                           case messageids.server.creds:

                           break;
                        }
                     }catch(e2) {
                        console.error(e);
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
            _server.broadcastPacket("OtherPlayerLogout", {
               id: userdata.id
            });

            playerdatabase[userdata.id] = null;
            delete playerdatabase[userdata.id];
         }

         ws.onclose = () => {
            console.log(userdata.username + " has logged out");
            Events.fire("onPlayerLogout", userdata.username, ws);
            _server.broadcastMessage(userdata.username + " has logged out");
            _server.broadcastPacket("OtherPlayerLogout", {
               id: userdata.id
            });

            playerdatabase[userdata.id] = null;
            delete playerdatabase[userdata.id];
         }
         
         //Sending data to the client that joins
         setTimeout(function() {
            //reply(ws, "Init", {test:"123"});
            let writer = bufferWriter();
            writer.writeInt(100);
            writer.writeInt(25);

            ws.send(writer.getData());
         }, 300);
      });

      //Checking for when we start listening
      wss.on('listening',()=>{
         console.log(`listening on ${port}`)
      })
   }
}catch(e) {
   console.error(e);
}

bufferWriter();