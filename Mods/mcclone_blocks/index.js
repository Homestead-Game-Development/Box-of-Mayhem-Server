
let mymod = {}


events.register("onServerStart", function() {
    //Creating blocks
    console.log("Creating core blocks");
    blockdb.createBlock                 (1,  "grass", "grass_side.block.png","grass_side.block.png","grass_side.block.png","grass_side.block.png","grass_top.block.png","dirt.block.png");
    blockdb.createBlockMacro            (2,  "dirt", "dirt.block.png");
    blockdb.createBlockMacro            (3,  "stone", "stone.png");
    blockdb.createBlockMacro            (4,  "cobblestone", "cobblestone.block.png");
    blockdb.createBlockMacro            (5,  "mossy cobblestone", "cobblestone_mossy.png");
    blockdb.createBlockMacro            (6,  "stone bricks", "stonebrick.block.png");
    blockdb.createBlockMacro            (7,  "carved stone bricks", "stonebrick_carved.png");
    blockdb.createBlockMacro            (8,  "cracked stone bricks", "stonebrick_cracked.png");
    blockdb.createBlockMacro            (9,  "bricks", "brick.png");
    blockdb.createBlockMacro            (10, "water", "water_still.block.png");
    blockdb.createBlockMacro            (11, "sand", "sand.block.png");
    blockdb.createBlockMacro            (12, "bedrock", "bedrock.block.png");
    blockdb.createBlockMacro            (13, "obsidian", "obsidian.png");
    blockdb.createBlockMacro            (14, "gravel", "gravel.png");
    blockdb.createBlockMacro            (15, "Iron Ore", "iron_ore.png");
    blockdb.createBlockMacro            (16, "Gold Ore", "gold_ore.png");
    blockdb.createBlockMacro            (17, "Diamond Ore", "diamond_ore.png");
    blockdb.createBlockMacro            (18, "Redstone Ore", "redstone_ore.png");
    blockdb.createBlockMacro            (19, "Lapis Ore", "lapis_ore.png");
    blockdb.createBlockMacro            (20, "Emerald Ore", "emerald_ore.png");
    blockdb.createBlock                 (21, "oak log", "log_oak.png","log_oak.png","log_oak.png","log_oak.png","log_oak_top.png","log_oak_top.png");
    blockdb.createBlockMacro            (22, "oak leaves", "leaves_oak.png");
    blockdb.createBlockMacro            (23, "oak planks", "oak_planks.png");
    blockdb.createBlock                 (24, "farmland", "dirt.block.png","dirt.block.png","dirt.block.png","dirt.block.png","farmland_dry.png","dirt.block.png");
    blockdb.createBlock                 (25, "farmland_wet", "dirt.block.png","dirt.block.png","dirt.block.png","dirt.block.png","farmland_wet.png","dirt.block.png");
    blockdb.createBlockMacro            (26, "iron block", "iron_block.png");
    blockdb.createBlockMacro            (27, "coal block", "coal_block.png");
    blockdb.createBlockMacro            (28, "gold block", "gold_block.png");
    blockdb.createBlockMacro            (29, "redstone block", "redstone_block.png");
    blockdb.createBlockMacro            (30, "diamond block", "diamond_block.png");
    blockdb.createBlockMacro            (31, "emerald block", "emerald_block.png");
    blockdb.createBlockMacro            (32, "glowstone block", "glowstone.png");
    blockdb.createBlock                 (33, "furnace", "furnace_front_off.png","furnace_side.png","furnace_side.png","furnace_side.png","furnace_top.png","furnace_top.png");
    blockdb.createBlockMacro            (34, "soul sand", "soul_sand.png");
    blockdb.createBlockMacro            (35, "wool", "wool_colored_white.png");
    blockdb.createBlockMacro            (36, "clay block", "clay.png");
    blockdb.createTransparentBlockMacro (37, "glass", "glass.png");
    blockdb.createBlockMacro            (38, "lapis block", "lapis_block.png");
    blockdb.createBlock                 (39, "bookshelf", "bookshelf.png","bookshelf.png","bookshelf.png","bookshelf.png","oak_planks.png","oak_planks.png");
    
    //Creating plants
    blockdb.createPlant                 (2500, "tall_grass", "tall_grass.block.png");
    blockdb.createPlant                 (2501, "allium", "flower_allium.png");
    blockdb.createPlant                 (2502, "blue orchid", "flower_blue_orchid.png");
    blockdb.createPlant                 (2503, "dandelion", "flower_dandelion.png");
    blockdb.createPlant                 (2504, "houstonia", "flower_houstonia.png");
    blockdb.createPlant                 (2505, "oxeye daisy", "flower_oxeye_daisy.png");
    blockdb.createPlant                 (2506, "paeonia", "flower_paeonia.png");
    blockdb.createPlant                 (2507, "rose", "flower_rose.png");
    blockdb.createPlant                 (2508, "orange tulip", "flower_tulip_orange.png");
    blockdb.createPlant                 (2509, "pink tulip", "flower_tulip_pink.png");
    blockdb.createPlant                 (2510, "red tulip", "flower_tulip_red.png");
    blockdb.createPlant                 (2511, "white tulip", "flower_tulip_white.png");
    blockdb.createPlant                 (2512, "oak sapling", "sapling_oak.png");
    blockdb.createPlant                 (2513, "sugarcane", "sugarcane.png");
    blockdb.createPlant                 (2514, "netherwart", "nether_wart_stage_0.png");
    blockdb.createPlant                 (2515, "netherwart", "nether_wart_stage_1.png");
    blockdb.createPlant                 (2516, "netherwart", "nether_wart_stage_2.png");
    
});


module.export = mymod