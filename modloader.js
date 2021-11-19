const fs = require("fs");

let modloader = {}
modloader.mods = {};

console.log("Loading modloader");

//Syncronous scan dir function
let scandirSync = source =>
    fs.readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

//Here we are scanning the mods directory
let scanmoddirs = function() {

    //Here we are scanning the mods folder
    let dir = "./Mods";
    let dirs = scandirSync(dir);
    return dirs;
}

//Scanning mods
console.log("scanning for mods");
let moddirs = scanmoddirs();

//Constructing the mod load order
console.log("Mods found, gathering mod info");
let modstoload = [];
let mods = [];
moddirs.forEach((dirname) => {
    let moddir = "./Mods/" + dirname;
    let modinfo = `${moddir}/modinfo.js`;
    let indexjs = `${moddir}/index.js`;

    //Checking to make sure that it is a valid mod folder
    if(fs.existsSync(modinfo) && fs.existsSync(indexjs)) {
        //Loading the mod folder
        let modinfofile = require(modinfo);
        console.log(`Retreiving modinfo.js for ${dirname} / ${modinfofile.name}`);
        modstoload[modstoload.length] = modinfofile;
        mods[mods.length] = modinfofile;
        modinfofile.dir = moddir;
    }else{
        //Invalid mod folder
        console.log(`No ${(!fs.existsSync(modinfo) ? "modinfo.js" : "mod.js")} found for ${dirname}`);
    }
});

console.log("modinfo gathered, constructing load order");

let neworder = [];
let newmodsloaded = {};

//Here we are constructing the mods
let oldCount = modstoload.length;
let failedToLoad = false;
let loop = 0;
while(true) {
    loop = loop+1;
    //console.log("===============================================================================");
    //console.log("LOOP " + loop);
    if(modstoload.length>0) {
        for(let modinfoindex in modstoload) {
            try {
                let modinfo = (modstoload[modinfoindex]);
                let canAdd = true;
                if(modinfo["requirements"]) {
                    //console.log("Scanning requirements");
                    for(let index in modinfo.requirements) {
                        if(!newmodsloaded[modinfo.requirements[index]]) {
                            //console.log("Requirements not met, skipping " + modinfo.name);
                            canAdd = false;
                            break;
                        }
                    }
                }
                if(canAdd==true) {
                    neworder[neworder.length] = modinfo;//Updating the new mod load order, and adding the mod to it
                    newmodsloaded[modinfo.name] = modinfo;//Updating our newly constructed list
                    let index = modstoload.indexOf(modinfo);//Gathering the index
                    modstoload.splice(index, 1);//Removing the index
                    console.log("Adding " + modinfo.name + " - " + modinfo.dir);
                }else{
                    //console.log("Unable to add " + modinfo.name);
                }
            }
            catch(e) {
                console.error(e);
            }
        }
        //If our previous mods left, is the same as what we had previously, then we will break the loop
        if(oldCount==modstoload.length) {
            failedToLoad = true;
            break;
        }
        oldCount = modstoload.length;
    }else{
        break;
    }
}

console.log("cascade count: " + loop);
if(modstoload.length > 0) {
    console.error("Mod cascade limit! Unable to load all the mods. This is either from a cacading dependency loop, or a dependency that does not exsist.");
    console.error("Mods that failed:" + modstoload.length);
    for(let index in modstoload) {
        console.error(modstoload[index].name);
    }
}

//Here we are going to construct the mod load order
console.log("Mod load order constructed");
console.log("Initializing mods")
//Entry point for loading the mods
for(let index in neworder) {
    let modinfo = neworder[index];
    console.log("Loading mod: " + modinfo.name);
    try {
        if(!modloader.mods[modinfo.name]) {
            let moddata = require(modinfo.dir + "");
            moddata.modinfo = modinfo;
            modloader.mods[modinfo.name] = moddata;
        }else{
            console.error(`Duplicate mod names: ModName: [${modinfo.name}] - Path: ${modinfo.dir}`);
        }
    }catch(e) {
        console.error(e);
    }
}

module.exports = modloader;