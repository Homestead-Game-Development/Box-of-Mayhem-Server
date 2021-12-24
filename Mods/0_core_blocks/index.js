
let mymod = {}


events.register("onServerStart", function() {
    //console.log("Creating core blocks");
    blockdb.createBlockMacro    (0, "missing", "0.block.png");//Default missing block

    //console.log("Creating core blocks");
    
});


module.export = mymod