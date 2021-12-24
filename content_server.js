var http = require('http'); // Import Node.js core module


let parse_url = function(url) {
    url = url.substring(1);
    let data = {};
    data.dir = "";
    data.data = "";
    data.type = "";
    let state = "getDir";
    for(let place = 0; place < url.length; place++) {
        switch(state) {
            case "getDir":
                if(url[place]!=`/`) {
                    data.dir = data.dir+url[place];
                }else {
                    state = "buildType";
                }
            break;

            case "buildType":
                if(url[place]!=`/`) {
                    data.type = data.type+url[place];
                }else {
                    state = "buildData";
                }
            break;

            default:
                data.data = data.data+url[place]
            break;
        }
    }
    return data;
}

var server = http.createServer(function (req, res) {   //create web server

    let action = parse_url(req.url);

    switch(action.dir) {
        case "textures.blocks":
            if(action.data=="") {
                if(action.type=="") {
                    res.writeHead(200, { 'Content-Type': 'text' }); 
                    res.write(JSON.stringify(assetstreamer.textureinames));
                    res.end();
                }else if(action.type=="hash") {
                    res.writeHead(200, { 'Content-Type': 'text' }); 
                    res.write(JSON.stringify(assetstreamer.network_hashes));
                    res.end();
                }
            }else{
                if(action.type=="hash") {
                    try {
                        res.writeHead(200, { 'Content-Type': 'text' }); 
                        res.write(JSON.stringify(assetstreamer.network_hashes[Number.parseInt(action.data)]));
                        res.end();
                    }catch(e) {
                        res.writeHead(404, { 'Content-Type': 'text' }); 
                        res.write("Not found");
                        res.end();
                        console.error(e);
                    }
                }else if(action.type=="texture") {
                    try {
                        let imgdata = assetstreamer.files[assetstreamer.textureinames[Number.parseInt(action.data)]];
                        res.writeHead(200,{'Content-type':'image/png'});
                        res.end(fs.readFileSync(imgdata.image_path));
                    }catch(e) {
                        res.writeHead(404, { 'Content-Type': 'text' }); 
                        res.write("Not found");
                        res.end();
                        console.error(e);
                    }
                }
                /*
                res.writeHead(200,{'Content-type':'image/png'});
                res.end(fs.readFileSync("./Mods/0_core_textures/Textures/Blocks/Blocks/bedrock.block.png"));
                */
            }


            
            /*
            res.writeHead(200, { 'Content-Type': 'text' }); 
            res.write(`<html><body><p> Error 404: Unhandled type! </p></body></html>`);
            res.end();
            */
        break;

        case "textures.items":

        break;

        case "":
            let data = {};
            data.textureHash = assetstreamer.hash;
            data.modelHash = "";
            data.scriptHash = "";

            res.writeHead(200, { 'Content-Type': 'text' }); 
            res.write(JSON.stringify(data));
            res.end();
        break;

        case "test":
            function makeid(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                  result += characters.charAt(Math.floor(Math.random() * 
             charactersLength));
               }
               return result;
            }
            
            let pagedata = makeid(819200);


            res.writeHead(200, { 'Content-Type': 'text' });
            res.write(pagedata);
            res.end();
        break;

        default:
            res.writeHead(404, { 'Content-Type': 'text' }); 
            res.write(`<html><body><p> Error 404: Unhandled type! </p></body></html>`);
            res.end();
        break;
    }

});

server.listen(15000); //6 - listen for any incoming requests

console.log('Node.js web server at port 15000 is running..')