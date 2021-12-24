let fs = require("fs");

EntityStorage = {}
let lastEntityIndex = 0;

console.log("Creating entity library")

Entity = class {
    constructor() {
        //Constructing default data to use for the entity
        this.data = {};

        //Assigning values to the entity data
        this.data.entityID = lastEntityIndex;
        this.data.networkData = {}

        //Increment the last id to prevent data conflict
        lastEntityIndex = lastEntityIndex+1;

        console.log("Creating entity");
    }

    get id() {
        return this.data.entityID;
    }
}


// This executes all the files inside the instances folder
let files = fs.readdirSync(__dirname+"/instances");
files.forEach(filename => {
    console.log("./instances/"+filename);
    try {
        require("./instances/"+filename);
    }catch(e) {
        console.error("Entity script errored: " + filename + "\n" + __dirname+"/instances"+filename+"\n"+e)
    }
});


let ent = new Entity();
console.log("Entity id: " + ent.id);
ent = new Entity();
console.log("Entity id: " + ent.id);
ent = new EntityTile();
console.log("Entity id: " + ent.id);