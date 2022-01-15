
events.register("onServerStart", function() {
    //console.log("Creating core blocks");

    //console.log("Creating core blocks");
    
});
events.register("onServerStart", function() {
    blockdb.createBlockMacro    (0, "missing", "0.block.png");//Default missing block

    //Creating blocks
    console.log("Creating core blocks");
    blockdb.createBlock                 (1,  "grass", "grass_side.block.png","grass_side.block.png","grass_side.block.png","grass_side.block.png","grass_top.block.png","dirt.block.png");
    blockdb.createBlockMacro            (2,  "dirt", "dirt.block.png");
    blockdb.createBlockMacro            (3,  "stone", "stone.block.png");
    blockdb.createBlockMacro            (4,  "cobblestone", "cobblestone.block.png");
    blockdb.createBlockMacro            (5,  "mossy cobblestone", "cobblestone_mossy.block.png");
    blockdb.createBlockMacro            (6,  "stone bricks", "stonebrick.block.png");
    blockdb.createBlockMacro            (7,  "carved stone bricks", "stonebrick_carved.block.png");
    blockdb.createBlockMacro            (8,  "cracked stone bricks", "stonebrick_cracked.block.png");
    blockdb.createBlockMacro            (9,  "bricks", "brick.block.png");
    blockdb.createBlockMacro            (10, "water", "water_still.block.png");
    blockdb.createBlockMacro            (11, "sand", "sand.block.png");
    blockdb.createBlockMacro            (12, "bedrock", "bedrock.block.png");
    blockdb.createBlockMacro            (13, "obsidian", "obsidian.block.png");
    blockdb.createBlockMacro            (14, "gravel", "gravel.block.png");
    blockdb.createBlockMacro            (15, "Iron Ore", "iron_ore.block.png");
    blockdb.createBlockMacro            (16, "Gold Ore", "gold_ore.block.png");
    blockdb.createBlockMacro            (17, "Diamond Ore", "diamond_ore.block.png");
    blockdb.createBlockMacro            (18, "Redstone Ore", "redstone_ore.block.png");
    blockdb.createBlockMacro            (19, "Lapis Ore", "lapis_ore.block.png");
    blockdb.createBlockMacro            (20, "Emerald Ore", "emerald_ore.block.png");
    blockdb.createBlock                 (21, "oak log", "log_oak.block.png","log_oak.block.png","log_oak.block.png","log_oak.block.png","log_oak_top.block.png","log_oak_top.block.png");
    blockdb.createBlockMacro            (22, "oak leaves", "leaves_oak.block.png");
    blockdb.createBlockMacro            (23, "oak planks", "oak_planks.block.png");
    blockdb.createBlock                 (24, "farmland", "dirt.block.png","dirt.block.png","dirt.block.png","dirt.block.png","farmland_dry.block.png","dirt.block.png");
    blockdb.createBlock                 (25, "farmland_wet", "dirt.block.png","dirt.block.png","dirt.block.png","dirt.block.png","farmland_wet.block.png","dirt.block.png");
    blockdb.createBlockMacro            (26, "iron block", "iron_block.block.png");
    blockdb.createBlockMacro            (27, "coal block", "coal_block.block.png");
    blockdb.createBlockMacro            (28, "gold block", "gold_block.block.png");
    blockdb.createBlockMacro            (29, "redstone block", "redstone_block.block.png");
    blockdb.createBlockMacro            (30, "diamond block", "diamond_block.block.png");
    blockdb.createBlockMacro            (31, "emerald block", "emerald_block.block.png");
    blockdb.createBlockMacro            (32, "glowstone block", "glowstone.block.png");
    blockdb.createBlock                 (33, "furnace", "furnace_front_off.block.png","furnace_side.block.png","furnace_side.block.png","furnace_side.block.png","furnace_top.block.png","furnace_top.block.png");
    blockdb.createBlockMacro            (34, "soul sand", "soul_sand.block.png");
    blockdb.createBlockMacro            (35, "wool", "wool_colored_white.block.png");
    blockdb.createBlockMacro            (36, "clay block", "clay.block.png");
    blockdb.createTransparentBlockMacro (37, "glass", "glass.block.png");
    blockdb.createBlockMacro            (38, "lapis block", "lapis_block.block.png");
    blockdb.createBlock                 (39, "bookshelf", "bookshelf.block.png","bookshelf.block.png","bookshelf.block.png","bookshelf.block.png","oak_planks.block.png","oak_planks.block.png");
    
    //Creating plants
    blockdb.createPlant                 (2500, "tall_grass", "tall_grass.block.png");
    blockdb.createPlant                 (2501, "allium", "flower_allium.block.png");
    blockdb.createPlant                 (2502, "blue orchid", "flower_blue_orchid.block.png");
    blockdb.createPlant                 (2503, "dandelion", "flower_dandelion.block.png");
    blockdb.createPlant                 (2504, "houstonia", "flower_houstonia.block.png");
    blockdb.createPlant                 (2505, "oxeye daisy", "flower_oxeye_daisy.block.png");
    blockdb.createPlant                 (2506, "paeonia", "flower_paeonia.block.png");
    blockdb.createPlant                 (2507, "rose", "flower_rose.block.png");
    blockdb.createPlant                 (2508, "orange tulip", "flower_tulip_orange.block.png");
    blockdb.createPlant                 (2509, "pink tulip", "flower_tulip_pink.block.png");
    blockdb.createPlant                 (2510, "red tulip", "flower_tulip_red.block.png");
    blockdb.createPlant                 (2511, "white tulip", "flower_tulip_white.block.png");
    blockdb.createPlant                 (2512, "oak sapling", "sapling_oak.block.png");
    blockdb.createPlant                 (2513, "sugarcane", "sugarcane.block.png");
    blockdb.createPlant                 (2514, "netherwart", "nether_wart_stage_0.block.png");
    blockdb.createPlant                 (2515, "netherwart", "nether_wart_stage_1.block.png");
    blockdb.createPlant                 (2516, "netherwart", "nether_wart_stage_2.block.png");
    
});
