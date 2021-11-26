let mymod = {}
events.register("onServerStart", function() {
    console.log("Creating box's blocks");
    blockdb.createBlock             (22223, "Shroom Grinder", "grindersideblock.png","grindersideblock.png","grindersideblock.png","grindersideblock.png","grinderftopblock.png","grindersideblock.png");
    blockdb.createBlockMacro        (22224, "voxbox1", "commongalHull2.png");
    blockdb.createBlockMacro        (22225, "voxbox2", "commongalHull3.png");
    blockdb.createBlockMacro        (22226, "voxbox3", "commongalHull4.png");
    blockdb.createBlockMacro        (22227, "voxbox4", "commonHullt1.png");
    blockdb.createBlockMacro        (22228, "The Big D-Block", "dblock.png");
    blockdb.createBlock             (22229, "Conveyor Auto Crafter", "convarautocrafterfront.png", "convarautocraftersides.png", "convarautocraftersides.png", "convarautocraftersides.png", "convarautocraftersides.png", "convarautocraftersides.png")
    blockdb.createBlock             (22230, "Conveyor", "convarfront.png", "convarback.png", "convarleft.png", "convarright.png", "convarTop.png", "convarbottom.png");

    
    blockdb.createPlant             (23000, "voxshroom1", "blackmushroom.png");
    blockdb.createPlant             (23001, "voxshroom2", "bloodmushroom.png");
    blockdb.createPlant             (23002, "voxshroom3", "darkbluemushroom.png");
    blockdb.createPlant             (23003, "voxshroom4", "fireredmushroom.png");
    blockdb.createPlant             (23004, "voxshroom5", "fireyellowmushroom.png");
    blockdb.createPlant             (23005, "voxshroom6", "greenmushroom.png");
    blockdb.createPlant             (23006, "voxshroom7", "lightbluemushroom.png");
    blockdb.createPlant             (23007, "voxshroom8", "pinkmushroom.png");
    blockdb.createPlant             (23008, "voxshroom9", "purpullmushroom.png");
    blockdb.createPlant             (23009, "voxshroom10", "ranbowmushroom.png");
    blockdb.createPlant             (23010, "voxshroom11", "redmushroom.png");
    blockdb.createPlant             (23011, "voxshroom12", "slimemushroom.png");
    blockdb.createPlant             (23012, "voxshroom13", "templatemushroom.png");
    blockdb.createPlant             (23013, "voxshroom14", "whitemushroom.png");
    blockdb.createPlant             (23014, "voxshroom15", "yellowmushroom.png");
    
});
module.export = mymod