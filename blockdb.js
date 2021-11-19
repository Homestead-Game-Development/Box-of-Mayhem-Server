let blockdb = {};

//The data sent to the client
blockdb.data = {};
blockdb.data.blocks = [];

let createdBlocks = {};

blockdb.createBlock = function(id, name, texFront, texBack, texLeft, texRight, texTop, texBottom) {
    if(!createdBlocks[id]) {
        console.info(`Creating block ${id} / ${name}`);
        let block = {};
        block.id = id;
        block.name = name;
        block.front = assetstreamer.textureids[texFront];
        block.back = assetstreamer.textureids[texBack];
        block.left = assetstreamer.textureids[texLeft];
        block.right = assetstreamer.textureids[texRight];
        block.top = assetstreamer.textureids[texTop];
        block.bottom = assetstreamer.textureids[texBottom];
        block.isplant = false;
        block.istransparent = false;

        blockdb.data.blocks[blockdb.data.blocks.length] = block;

        return block;
    }
    return null;
}

blockdb.createBlockMacro = function(id, name, texture) {
    if(!createdBlocks[id]) {
        console.info(`Creating block ${id} / ${name}`);
        let block = {};
        block.id = id;
        block.name = name;
        block.front = assetstreamer.textureids[texture];
        block.back = assetstreamer.textureids[texture];
        block.left = assetstreamer.textureids[texture];
        block.right = assetstreamer.textureids[texture];
        block.top = assetstreamer.textureids[texture];
        block.bottom = assetstreamer.textureids[texture];
        block.isplant = false;
        block.istransparent = false;

        blockdb.data.blocks[blockdb.data.blocks.length] = block;

        return block;
    }
    return null;
}

blockdb.createTransparentBlock = function(id, name, texFront, texBack, texLeft, texRight, texTop, texBottom) {
    if(!createdBlocks[id]) {
        console.info(`Creating block ${id} / ${name}`);
        let block = {};
        block.id = id;
        block.name = name;
        block.front = assetstreamer.textureids[texFront];
        block.back = assetstreamer.textureids[texBack];
        block.left = assetstreamer.textureids[texLeft];
        block.right = assetstreamer.textureids[texRight];
        block.top = assetstreamer.textureids[texTop];
        block.bottom = assetstreamer.textureids[texBottom];
        block.isplant = false;
        block.istransparent = true;

        blockdb.data.blocks[blockdb.data.blocks.length] = block;

        return block;
    }
    return null;
}

blockdb.createTransparentBlockMacro = function(id, name, texture) {
    if(!createdBlocks[id]) {
        console.info(`Creating block ${id} / ${name}`);
        let block = {};
        block.id = id;
        block.name = name;
        block.front = assetstreamer.textureids[texture];
        block.back = assetstreamer.textureids[texture];
        block.left = assetstreamer.textureids[texture];
        block.right = assetstreamer.textureids[texture];
        block.top = assetstreamer.textureids[texture];
        block.bottom = assetstreamer.textureids[texture];
        block.isplant = false;
        block.istransparent = true;

        blockdb.data.blocks[blockdb.data.blocks.length] = block;

        return block;
    }
    return null;
}

blockdb.createPlant = function(id, name, texture) {
    if(!createdBlocks[id]) {
        console.info(`Creating block ${id} / ${name}`);
        let block = {};
        block.id = id;
        block.name = name;
        block.front = assetstreamer.textureids[texture];
        block.back = assetstreamer.textureids[texture];
        block.left = assetstreamer.textureids[texture];
        block.right = assetstreamer.textureids[texture];
        block.top = assetstreamer.textureids[texture];
        block.bottom = assetstreamer.textureids[texture];
        block.isplant = true;
        block.istransparent = true;

        blockdb.data.blocks[blockdb.data.blocks.length] = block;

        return block;
    }
    return null;
}

module.exports = blockdb;