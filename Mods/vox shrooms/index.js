let mymod = {}
events.register("onServerStart", function() {
    console.log("Creating box's blocks");
    blockdb.createBlock         (22223, "mushroomgrinder", "grindersideblock.png","grindersideblock.png","grindersideblock.png","grindersideblock.png","grinderftopblock.png","grindersideblock.png");
    
});
module.export = mymod