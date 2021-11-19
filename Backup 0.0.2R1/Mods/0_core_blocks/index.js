
let mymod = {}


events.register("onServerStart", function() {
    blockdb.createBlockMacro    (0, "bedrock", "bedrock.block.png");
    blockdb.createBlock         (1, "grass", "grass_side.block.png","grass_side.block.png","grass_side.block.png","grass_side.block.png","grass_top.block.png","dirt.block.png");
    blockdb.createBlockMacro    (2, "dirt", "dirt.block.png");
    blockdb.createBlockMacro    (3, "stone", "stone.block.png");
    blockdb.createBlockMacro    (4, "cobblestone", "cobblestone.block.png");
    blockdb.createBlockMacro    (5, "oak plank", "oak_planks.block.png");
    blockdb.createBlockMacro    (6, "stone bricks", "stonebrick.block.png");
    blockdb.createBlockMacro    (7, "carved stone bricks", "stonebrick_carved.png");
    blockdb.createBlockMacro    (8, "cracked stone bricks", "stonebrick_cracked.png");
    blockdb.createBlockMacro    (9, "bricks", "brick.png");
    

    let plantbaseid = 2500;
    blockdb.createPlant         (2500, "tall_grass", "tall_grass.block.png");
    blockdb.createPlant         (2501, "red_flower", "LargeRedBobPlant.png");
    blockdb.createPlant         (2502, "mushroom", "mushroom_basic.block.png");
    
});


module.export = mymod