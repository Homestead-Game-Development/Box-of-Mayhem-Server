/*
    Creator: rater193
    Creation date: 20211111GMT+1_1800
    Description:
        This handles streaming textures and other client sided needed files to the clients
        
        handleHash(hash, relitivedir)
        Description:
            This function calculates the hash for the mods folder. This receives the
            table from the hash function that contains all the files and folders

        img data structure
        object {
            [int]       width,
            [ing]       height,
            [string]    hash,
            [string]    name,
            [string]    image_path,
            //size is the amount of bytes it takes to send to the client
            [int]       size,
            [string[]]  data,
            // network_image is the actual image data sent to the client
            [object[]]  network_image
                [int]       width,
                [ing]       height,
                [string]    hash,
                [string]    name,
                [string]    data
            // network_hash sends the hash values to the client, This is used to detect
            // if their hashes have changed on the client
            [object[]]  network_hash
                [string]    hash,
                [string]    name

        }

        network_images structure
        object[] {
            [string<ImageName>] Object {
                [int]       width,
                [ing]       height,
                [string]    hash,
                [string]    name,
                [string[]]  data
            }
        }

        network_hashes structure
        object[] {
            [int] Object {
                [string]    hash,
                [string]    name
            }
        }

        initial_message is the message constructed for the asset streamer to send to the client so they know what to do
        object {
            [string]    hash,
            [int]       fileCount
        }
*/

let assetstreamer = {}
//This is the global hash, for a quick reference
assetstreamer.hash = "";
//These are our files
assetstreamer.files = {};
assetstreamer.network_images = {};
assetstreamer.network_images_size = 0;
assetstreamer.network_hashes = [];
assetstreamer.initial_message = {};
assetstreamer.textureids = {};
assetstreamer.textureinames = [];
assetstreamer.finished = false; // If we finished loading

//Our hashing engine
const { hashElement } = require('folder-hash');
//Our image engine
const { getSync } = require('@andreekeberg/imagedata')

//The configuration for the hash, to send to the client
const options = {
    folders: { exclude: ['.*'] },
    files: { include: ['*.png'] },
};
// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    let bitmap = fs.readFileSync(file);
    let buff = Buffer.from(bitmap);
    return buff.toString('base64');
}

function image_binary_encode(file) {
    // read binary data
    let bitmap = fs.readFileSync(file);
    let buff = Buffer.from(bitmap);
    var binaryData= Uint8Array.from(buff);
    let ret = [];
    for(let i = 0; i < binaryData.length; i++) {
        ret[ret.length] = binaryData[i];
    }
    return ret;
}

/*
*/
handleTable = function(hash, relitivedir) {
    //console.log
    if(hash["children"]) {
        //console.log(relitivedir);
        for(index in hash.children) {
            handleTable(hash.children[index], relitivedir + hash.name + "/");
        }
    }else{
        let imgData = getSync(relitivedir+"/"+hash.name);
        //Here we are converting to our own format
        let imgfiledata = base64_encode(relitivedir+"/"+hash.name);

        //Server sided information
        let img = {};
        img.width = imgData.width;
        img.height = imgData.height;
        img.data = imgfiledata;
        img.hash = hash.hash;
        img.name = hash.name;
        img.image_path = relitivedir+hash.name;

        if(assetstreamer.files[img.name]) {
            console.warn("TEXTURE NAME CONFLICT: " + img.name + "\n[New]\n" + img.image_path + "\nConflicting with:\n[Old]\n" + assetstreamer.files[img.name].image_path + "\nOverwriting with the new version");
            assetstreamer.network_images_size -= assetstreamer.files[img.name].size
        }else{
            //console.log("Loading image: " + img.name);
            //console.log(imginarydata);
        }

        assetstreamer.files[img.name] = img;

        
        //console.log(JSON.stringify(img.data));
        //Image data sent to the client
        img.network_image = {};
        img.network_image.width = img.width;
        img.network_image.height = img.height;
        img.network_image.hash = img.hash;
        img.network_image.name = img.name;
        img.network_image.data = img.data;

        assetstreamer.network_images[img.name] = img.network_image;
        img.size = JSON.stringify(img.network_image).length;

        assetstreamer.network_images_size += img.size;

        //Image hash sent to the client
        img.network_hash = {};
        img.network_hash.name = img.name;
        img.network_hash.hash = img.hash;

        assetstreamer.textureids[img.name] = assetstreamer.network_hashes.length; // This adds the texture id to it
        assetstreamer.textureinames[assetstreamer.textureinames.length] = img.name; // Setting the asset streamer name
        assetstreamer.network_hashes[assetstreamer.network_hashes.length] = img.network_hash;;
        //console.log("Image data size: " + JSON.stringify(img.network_image).length);

        //console.log(JSON.stringify(img));
        //console.log("Adding " + hash.name + " : " + relitivedir+"/"+hash.name + /*` : ${imgData.width}x${imgData.height}` + */" : " + hash.hash);
    }
}

console.log("Checking hash");

hashElement('./Mods', options)
    .then(hash => {
        try {
            assetstreamer.hash = hash.hash;
            handleTable(hash, "./");
            let bandwithMB = (Math.floor(((assetstreamer.network_images_size)/1024/1024)*100)/100);
            let bandwithMb = bandwithMB*8;
            console.log("Global hash: " + assetstreamer.hash + " network_image_size: ( [Bandwidth] " + (bandwithMb) + " Mb / [Physical storage/ram] " + bandwithMB + " MB ) for " + (Object.keys(assetstreamer.network_images).length)  + " images");
            
            //Constructing the initial message
            assetstreamer.hash = assetstreamer.hash;
            assetstreamer.fileCount = Object.keys(assetstreamer.network_images).length
            assetstreamer.finished = true;
        }catch(e) {
            console.error("ERROR handling hash:");
            console.error(e)
        }
    })
    .catch(error => {
        return console.error('hashing failed:', error);
    });


module.exports = assetstreamer;