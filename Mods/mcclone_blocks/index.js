
let mymod = {}


events.register("onServerStart", function() {

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





    

    //Concrete
    let id = 5000;
    blockdb.createBlockMacro (++id, "concrete_block", "concrete_block.block.png");
    blockdb.createBlockMacro (++id, "concrete_blocks", "concrete_blocks.block.png");
    blockdb.createBlockMacro (++id, "concrete_default", "concrete_default.block.png");
    blockdb.createBlockMacro (++id, "concrete_doubleslab-side", "concrete_doubleslab-side.block.png");
    blockdb.createBlockMacro (++id, "concrete_weathered", "concrete_weathered.block.png");
    blockdb.createBlockMacro (++id, "concrete_weathered-block", "concrete_weathered-block.block.png");
    blockdb.createBlockMacro (++id, "concrete_weathered-block-half-side", "concrete_weathered-block-half-side.block.png");
    blockdb.createBlockMacro (++id, "concrete_weathered-blocks", "concrete_weathered-blocks.block.png");
    blockdb.createBlockMacro (++id, "concrete_weathered-doubleslab-side", "concrete_weathered-doubleslab-side.block.png");
    blockdb.createBlockMacro (++id, "concrete_weathered-half-side", "concrete_weathered-half-side.block.png");

    //Factory
    id = 5100;
    blockdb.createBlockMacro (++id, "factory_circuit", "factory_circuit.block.png");
    blockdb.createBlockMacro (++id, "factory_column-top", "factory_column-top.block.png");
    blockdb.createBlockMacro (++id, "factory_dots", "factory_dots.block.png");
    blockdb.createBlockMacro (++id, "factory_frameblue", "factory_frameblue.block.png");
    blockdb.createBlockMacro (++id, "factory_goldplate", "factory_goldplate.block.png");
    blockdb.createBlockMacro (++id, "factory_goldplating", "factory_goldplating.block.png");
    blockdb.createBlockMacro (++id, "factory_grinder", "factory_grinder.block.png");
    blockdb.createBlockMacro (++id, "factory_hazard", "factory_hazard.block.png");
    blockdb.createBlockMacro (++id, "factory_hazardorange", "factory_hazardorange.block.png");
    blockdb.createBlockMacro (++id, "factory_iceiceice", "factory_iceiceice.block.png");
    blockdb.createBlockMacro (++id, "factory_metalbox-side", "factory_metalbox-side.block.png");
    blockdb.createBlockMacro (++id, "factory_metalbox-top", "factory_metalbox-top.block.png");
    blockdb.createBlockMacro (++id, "factory_platex", "factory_platex.block.png");
    blockdb.createBlockMacro (++id, "factory_rust", "factory_rust.block.png");
    blockdb.createBlockMacro (++id, "factory_rust2", "factory_rust2.block.png");
    blockdb.createBlockMacro (++id, "factory_rustplates", "factory_rustplates.block.png");
    blockdb.createBlockMacro (++id, "factory_tilemosaic", "factory_tilemosaic.block.png");
    blockdb.createBlockMacro (++id, "factory_vent-top", "factory_vent-top.block.png");
    blockdb.createBlockMacro (++id, "factory_wireframe", "factory_wireframe.block.png");
    blockdb.createBlockMacro (++id, "factory_wireframeblue", "factory_wireframeblue.block.png");
    blockdb.createBlockMacro (++id, "factory_wireframewhite", "factory_wireframewhite.block.png");

    //Lab
    id = 5200;
    blockdb.createBlockMacro (++id, "lab_checkertile", "lab_checkertile.block.png");
    blockdb.createBlockMacro (++id, "lab_clearscreen", "lab_clearscreen.block.png");
    blockdb.createBlockMacro (++id, "lab_directionleft-top", "lab_directionleft-top.block.png");
    blockdb.createBlockMacro (++id, "lab_directionright-top", "lab_directionright-top.block.png");
    blockdb.createBlockMacro (++id, "lab_dottedpanel-top", "lab_dottedpanel-top.block.png");
    blockdb.createBlockMacro (++id, "lab_floortile", "lab_floortile.block.png");
    blockdb.createBlockMacro (++id, "lab_fuzzscreen", "lab_fuzzscreen.block.png");
    blockdb.createBlockMacro (++id, "lab_infocon-top", "lab_infocon-top.block.png");
    blockdb.createBlockMacro (++id, "lab_largesteel-side", "lab_largesteel-side.block.png");
    blockdb.createBlockMacro (++id, "lab_largesteel-top", "lab_largesteel-top.block.png");
    blockdb.createBlockMacro (++id, "lab_largetile", "lab_largetile.block.png");
    blockdb.createBlockMacro (++id, "lab_largewall", "lab_largewall.block.png");
    blockdb.createBlockMacro (++id, "lab_roundel", "lab_roundel.block.png");
    blockdb.createBlockMacro (++id, "lab_smallsteel-side", "lab_smallsteel-side.block.png");
    blockdb.createBlockMacro (++id, "lab_smallsteel-top", "lab_smallsteel-top.block.png");
    blockdb.createBlockMacro (++id, "lab_smalltile", "lab_smalltile.block.png");
    blockdb.createBlockMacro (++id, "lab_wallpanel-top", "lab_wallpanel-top.block.png");
    blockdb.createBlockMacro (++id, "lab_wallvents-top", "lab_wallvents-top.block.png");

    //Iron
    id = 5300;
    blockdb.createBlockMacro (++id, "iron_terrain-iron-vents-top", "iron_terrain-iron-vents-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-vents-side", "iron_terrain-iron-vents-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-spaceblack", "iron_terrain-iron-spaceblack.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-space", "iron_terrain-iron-space.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-smallingot-top", "iron_terrain-iron-smallingot-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-smallingot-side", "iron_terrain-iron-smallingot-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-smallingot-bottom", "iron_terrain-iron-smallingot-bottom.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-simple-top", "iron_terrain-iron-simple-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-simple-side", "iron_terrain-iron-simple-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-simple-bottom", "iron_terrain-iron-simple-bottom.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-rivets-top", "iron_terrain-iron-rivets-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-rivets-side", "iron_terrain-iron-rivets-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-rivets-bottom", "iron_terrain-iron-rivets-bottom.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-plates-top", "iron_terrain-iron-plates-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-plates-side", "iron_terrain-iron-plates-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-plates-bottom", "iron_terrain-iron-plates-bottom.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-moon-top", "iron_terrain-iron-moon-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-moon-side", "iron_terrain-iron-moon-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-moon-bottom", "iron_terrain-iron-moon-bottom.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-largeingot-top", "iron_terrain-iron-largeingot-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-largeingot-side", "iron_terrain-iron-largeingot-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-largeingot-bottom", "iron_terrain-iron-largeingot-bottom.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-gears-top", "iron_terrain-iron-gears-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-gears-side", "iron_terrain-iron-gears-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-crate-light-top", "iron_terrain-iron-crate-light-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-crate-light-side", "iron_terrain-iron-crate-light-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-crate-light-bottom", "iron_terrain-iron-crate-light-bottom.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-crate-dark-top", "iron_terrain-iron-crate-dark-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-crate-dark-side", "iron_terrain-iron-crate-dark-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-crate-dark-bottom", "iron_terrain-iron-crate-dark-bottom.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-coin-tails-top", "iron_terrain-iron-coin-tails-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-coin-tails-side", "iron_terrain-iron-coin-tails-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-coin-tails-bottom", "iron_terrain-iron-coin-tails-bottom.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-coin-heads-top", "iron_terrain-iron-coin-heads-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-coin-heads-side", "iron_terrain-iron-coin-heads-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-coin-heads-bottom", "iron_terrain-iron-coin-heads-bottom.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-brick-top", "iron_terrain-iron-brick-top.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-brick-side", "iron_terrain-iron-brick-side.block.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-brick-bottom", "iron_terrain-iron-brick-bottom.block.png");
    
});


module.export = mymod