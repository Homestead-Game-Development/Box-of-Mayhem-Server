
let mymod = {}


events.register("onServerStart", function() {

    //Concrete
    let id = 5000;
    blockdb.createBlockMacro (++id, "concrete_block", "concrete_block.png");
    blockdb.createBlockMacro (++id, "concrete_blocks", "concrete_blocks.png");
    blockdb.createBlockMacro (++id, "concrete_default", "concrete_default.png");
    blockdb.createBlockMacro (++id, "concrete_doubleslab-side", "concrete_doubleslab-side.png");
    blockdb.createBlockMacro (++id, "concrete_weathered", "concrete_weathered.png");
    blockdb.createBlockMacro (++id, "concrete_weathered-block", "concrete_weathered-block.png");
    blockdb.createBlockMacro (++id, "concrete_weathered-block-half-side", "concrete_weathered-block-half-side.png");
    blockdb.createBlockMacro (++id, "concrete_weathered-blocks", "concrete_weathered-blocks.png");
    blockdb.createBlockMacro (++id, "concrete_weathered-doubleslab-side", "concrete_weathered-doubleslab-side.png");
    blockdb.createBlockMacro (++id, "concrete_weathered-half-side", "concrete_weathered-half-side.png");

    //Factory
    id = 5100;
    blockdb.createBlockMacro (++id, "factory_circuit", "factory_circuit.png");
    blockdb.createBlockMacro (++id, "factory_column-top", "factory_column-top.png");
    blockdb.createBlockMacro (++id, "factory_dots", "factory_dots.png");
    blockdb.createBlockMacro (++id, "factory_frameblue", "factory_frameblue.png");
    blockdb.createBlockMacro (++id, "factory_goldplate", "factory_goldplate.png");
    blockdb.createBlockMacro (++id, "factory_goldplating", "factory_goldplating.png");
    blockdb.createBlockMacro (++id, "factory_grinder", "factory_grinder.png");
    blockdb.createBlockMacro (++id, "factory_hazard", "factory_hazard.png");
    blockdb.createBlockMacro (++id, "factory_hazardorange", "factory_hazardorange.png");
    blockdb.createBlockMacro (++id, "factory_iceiceice", "factory_iceiceice.png");
    blockdb.createBlockMacro (++id, "factory_metalbox-side", "factory_metalbox-side.png");
    blockdb.createBlockMacro (++id, "factory_metalbox-top", "factory_metalbox-top.png");
    blockdb.createBlockMacro (++id, "factory_platex", "factory_platex.png");
    blockdb.createBlockMacro (++id, "factory_rust", "factory_rust.png");
    blockdb.createBlockMacro (++id, "factory_rust2", "factory_rust2.png");
    blockdb.createBlockMacro (++id, "factory_rustplates", "factory_rustplates.png");
    blockdb.createBlockMacro (++id, "factory_tilemosaic", "factory_tilemosaic.png");
    blockdb.createBlockMacro (++id, "factory_vent-top", "factory_vent-top.png");
    blockdb.createBlockMacro (++id, "factory_wireframe", "factory_wireframe.png");
    blockdb.createBlockMacro (++id, "factory_wireframeblue", "factory_wireframeblue.png");
    blockdb.createBlockMacro (++id, "factory_wireframewhite", "factory_wireframewhite.png");

    //Lab
    id = 5200;
    blockdb.createBlockMacro (++id, "lab_checkertile", "lab_checkertile.png");
    blockdb.createBlockMacro (++id, "lab_clearscreen", "lab_clearscreen.png");
    blockdb.createBlockMacro (++id, "lab_directionleft-top", "lab_directionleft-top.png");
    blockdb.createBlockMacro (++id, "lab_directionright-top", "lab_directionright-top.png");
    blockdb.createBlockMacro (++id, "lab_dottedpanel-top", "lab_dottedpanel-top.png");
    blockdb.createBlockMacro (++id, "lab_floortile", "lab_floortile.png");
    blockdb.createBlockMacro (++id, "lab_fuzzscreen", "lab_fuzzscreen.png");
    blockdb.createBlockMacro (++id, "lab_infocon-top", "lab_infocon-top.png");
    blockdb.createBlockMacro (++id, "lab_largesteel-side", "lab_largesteel-side.png");
    blockdb.createBlockMacro (++id, "lab_largesteel-top", "lab_largesteel-top.png");
    blockdb.createBlockMacro (++id, "lab_largetile", "lab_largetile.png");
    blockdb.createBlockMacro (++id, "lab_largewall", "lab_largewall.png");
    blockdb.createBlockMacro (++id, "lab_roundel", "lab_roundel.png");
    blockdb.createBlockMacro (++id, "lab_smallsteel-side", "lab_smallsteel-side.png");
    blockdb.createBlockMacro (++id, "lab_smallsteel-top", "lab_smallsteel-top.png");
    blockdb.createBlockMacro (++id, "lab_smalltile", "lab_smalltile.png");
    blockdb.createBlockMacro (++id, "lab_wallpanel-top", "lab_wallpanel-top.png");
    blockdb.createBlockMacro (++id, "lab_wallvents-top", "lab_wallvents-top.png");

    //Iron
    id = 5300;
    blockdb.createBlockMacro (++id, "iron_terrain-iron-vents-top", "iron_terrain-iron-vents-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-vents-side", "iron_terrain-iron-vents-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-spaceblack", "iron_terrain-iron-spaceblack.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-space", "iron_terrain-iron-space.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-smallingot-top", "iron_terrain-iron-smallingot-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-smallingot-side", "iron_terrain-iron-smallingot-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-smallingot-bottom", "iron_terrain-iron-smallingot-bottom.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-simple-top", "iron_terrain-iron-simple-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-simple-side", "iron_terrain-iron-simple-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-simple-bottom", "iron_terrain-iron-simple-bottom.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-rivets-top", "iron_terrain-iron-rivets-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-rivets-side", "iron_terrain-iron-rivets-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-rivets-bottom", "iron_terrain-iron-rivets-bottom.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-plates-top", "iron_terrain-iron-plates-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-plates-side", "iron_terrain-iron-plates-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-plates-bottom", "iron_terrain-iron-plates-bottom.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-moon-top", "iron_terrain-iron-moon-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-moon-side", "iron_terrain-iron-moon-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-moon-bottom", "iron_terrain-iron-moon-bottom.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-largeingot-top", "iron_terrain-iron-largeingot-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-largeingot-side", "iron_terrain-iron-largeingot-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-largeingot-bottom", "iron_terrain-iron-largeingot-bottom.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-gears-top", "iron_terrain-iron-gears-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-gears-side", "iron_terrain-iron-gears-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-crate-light-top", "iron_terrain-iron-crate-light-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-crate-light-side", "iron_terrain-iron-crate-light-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-crate-light-bottom", "iron_terrain-iron-crate-light-bottom.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-crate-dark-top", "iron_terrain-iron-crate-dark-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-crate-dark-side", "iron_terrain-iron-crate-dark-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-crate-dark-bottom", "iron_terrain-iron-crate-dark-bottom.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-coin-tails-top", "iron_terrain-iron-coin-tails-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-coin-tails-side", "iron_terrain-iron-coin-tails-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-coin-tails-bottom", "iron_terrain-iron-coin-tails-bottom.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-coin-heads-top", "iron_terrain-iron-coin-heads-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-coin-heads-side", "iron_terrain-iron-coin-heads-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-coin-heads-bottom", "iron_terrain-iron-coin-heads-bottom.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-brick-top", "iron_terrain-iron-brick-top.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-brick-side", "iron_terrain-iron-brick-side.png");
    blockdb.createBlockMacro (++id, "iron_terrain-iron-brick-bottom", "iron_terrain-iron-brick-bottom.png");
    
});


module.export = mymod