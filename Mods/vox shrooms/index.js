let mymod = {}
events.register("onServerStart", function() {
    console.log("Creating box's blocks");
    blockdb.createBlock         (22223, "mushroomgrinder", "grindersideblock.png","grindersideblock.png","grindersideblock.png","grindersideblock.png","grinderftopblock.png","grindersideblock.png");
    blockdb.createBlockMacro         (22224, "voxbox1", "commongalHull2.png");
    blockdb.createBlockMacro         (22225, "voxbox2", "commongalHull3.png");
    blockdb.createBlockMacro         (22226, "voxbox3", "commongalHull4.png");
    blockdb.createBlockMacro         (22227, "voxbox4", "commonHullt1.png");
    
});
module.export = mymod