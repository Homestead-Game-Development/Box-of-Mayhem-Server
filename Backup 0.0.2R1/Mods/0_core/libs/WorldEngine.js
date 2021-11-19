/*
    Data structure

    World:
    worldengine.worlds.overworld
    {
        [VARIABLE]data
        [function]  [string]    chunkkey
        [function]  [Chunk]     GenerateChunk
        [function]  [Chunk]     GetChunk
        [function]  [int]       GetBlock
        [function]  [void]      SetBlock
    }

    Chunk:
    {
        //This is the cleaned up API for getting block data from a chunk
        [int[x[y[z]]]]chunk

        //This is what we send over the network
        network: {
            [int]   x
            [int]   y
            [int]   z
            [int[]] blocks
        }
    }
*/


const { SimplexNoise } = require('simplex-noise');
const { Console } = require('console');
const { server } = require('websocket');
const simplex = new SimplexNoise("PutTheSeedHere");
const simplex2 = new SimplexNoise();


let worldengine = {}

worldengine.CreateWorld = function (worldname) {

    let dirs = {};
    dirs.data = `./Data/worlds/${worldname}/data/`;
    dirs.chunks = `./Data/worlds/${worldname}/data/chunks/`;
    dirs.players = `./Data/worlds/${worldname}/players/`;

    mkdir(`./Data/`);
    mkdir(`./Data/worlds/`);
    mkdir(`./Data/worlds/${worldname}/`);
    mkdir(dirs.data);
    mkdir(dirs.chunks);
    mkdir(dirs.players);

    let world = {}

    world.data = {};

    world.chunkkey = function (x, y, z) {
        return Math.floor(x) + "_" + Math.floor(y) + "_" + Math.floor(z);
    }


    world.GenerateChunk = function (worldx, worldy, worldz) {
        
        let netdata = [];
        let chunkdata = {};

        let blockcount = 0;
        for (let x = 0; x < 16; x++) {//width
            chunkdata[x] = {};
            for (let y = 0; y < 16; y++) {//height
                let _height = ((simplex.noise2D(
                    ((x) + (worldx * 16)) / 200,
                    ((y) + (worldy * 16)) / 200
                ) / 2)) * 30;

                let _heightGrass = ((simplex2.noise2D(
                    ((x) + (worldx * 16)) / 10,
                    ((y) + (worldy * 16)) / 10
                ) / 2));

                chunkdata[x][y] = {};
                for (let z = 0; z < 16; z++) {//depth
                    let _h = Math.round(_height) - (worldz * 16)
                    let block = -1;
                    let _z = z + (worldz * 16);
                    if (_z <=6 && _z > 0) {
                        /*if(_z<=5) {
                            block = 1;
                        }*/
                        
                        if (_z == 5) {
                            block = 1;//grass
                        } else if (_z == 6) {
                            if(Math.random()*100 >= 95) {
                                block = 2502;//Mushroom
                            }else{
                                if (_heightGrass >= 0.15) {
                                    block = 2500;//Tall grass
                                }
                            }
                        } else {
                            block = 2;//dirt
                        }
                    }

                    if(block>=0) {
                        blockcount++;
                    }

                    chunkdata[x][y][z] = block;
                    netdata[netdata.length] = block;
                }
            }
        }

        
        //console.log("Generating chunk");
        //console.log("block: " + chunkdata[0][0][0])

        //The actual chunk object construction
        let chunk = {
            chunk: chunkdata,
            blocks: blockcount,
            network: {
                blocks: netdata,
                x: worldx,
                y: worldy,
                z: worldz
            }
        }

        return chunk;
    }

    /*
    world.GenerateChunk = function (worldx, worldy, worldz) {
        
        let netdata = [];
        let chunkdata = {};

        let blockcount = 0;
        for (let x = 0; x < 16; x++) {//width
            chunkdata[x] = {};
            for (let y = 0; y < 16; y++) {//height
                let _height = ((simplex.noise2D(
                    ((x) + (worldx * 16)) / 200,
                    ((y) + (worldy * 16)) / 200
                ) / 2)) * 30;

                let _heightGrass = ((simplex2.noise2D(
                    ((x) + (worldx * 16)) / 10,
                    ((y) + (worldy * 16)) / 10
                ) / 2));

                chunkdata[x][y] = {};
                for (let z = 0; z < 16; z++) {//depth
                    let _h = Math.round(_height) - (worldz * 16)
                    let block = -1;
                    let _z = z + (worldz * 16);
                    if (_h > 6) {
                        if (_z == _h) {
                            block = 0;//grass
                        } else if (_z == _h + 1) {
                            if(Math.random()*100 >= 95) {
                                block = 11;//Mushroom
                            }else{
                                if (_heightGrass >= 0.15) {
                                    block = 7;//Tall grass
                                }
                            }
                        } else if (_z >= _h - 3 && _z < _h) {
                            block = 2//dirt
                        } else if (_z < _h - 3) {
                            block = 1//stone
                        }
                    } else {
                        if (_z <= _h) {
                            block = 3;
                        } else if (_z <= 4) {
                            block = 8;//water
                        }
                    }

                    if(block>=0) {
                        blockcount++;
                    }

                    chunkdata[x][y][z] = block;
                    netdata[netdata.length] = block;
                }
            }
        }


        //console.log("Generating chunk");
        //console.log("block: " + chunkdata[0][0][0])

        //The actual chunk object construction
        let chunk = {
            chunk: chunkdata,
            blocks: blockcount,
            network: {
                blocks: netdata,
                x: worldx,
                y: worldy,
                z: worldz
            }
        }

        return chunk;
    }
    
    worldengine.simulateChunk = function (worldx, worldy, worldz) {
        let netdata = [];
        for (let x = 0; x < 16; x++) {//width
            for (let y = 0; y < 16; y++) {//height
                let _height = ((simplex.noise2D(
                    ((x) + (worldx * 16)) / 200,
                    ((y) + (worldy * 16)) / 200
                ) / 2)) * 30;

                let _heightGrass = ((simplex2.noise2D(
                    ((x) + (worldx * 16)) / 10,
                    ((y) + (worldy * 16)) / 10
                ) / 2));
                for (let z = 0; z < 16; z++) {//depth
                    let _h = Math.round(_height) - (worldz * 16)
                    let block = -1;
                    if (_h > 6) {
                        if (z + (worldz * 16) == _h) {
                            block = 0;//grass
                        } else if (z + (worldz * 16) == _h + 1) {
                            if (_heightGrass >= 0.15) {
                                block = 7;//leaves?
                            }
                        } else if (z + (worldz * 16) >= _h - 3 && z < _h) {
                            block = 2//dirt
                        } else if (z + (worldz * 16) < _h - 3) {
                            block = 1//stone
                        }
                    } else {
                        if (z + (worldz * 16) <= _h) {
                            block = 3
                        } else if (z + (worldz * 16) <= 4) {
                            block = 8;
                        }
                    }

                    netdata[netdata.length] = block;
                }
            }
        }

        let chunk = {
            blocks: data,
            x: worldx,
            y: worldy,
            z: worldz
        }
        return chunk;
    }*/

    world.GetChunk = function (worldx, worldy, worldz) {
        let key = world.chunkkey(worldx, worldy, worldz);
        if (!world.data[key]) {
            if(fs.existsSync(`${dirs.chunks}/${key}.chunk`)) {
                world.data[key] = JSON.parse(fs.readFileSync(`${dirs.chunks}/${key}.chunk`));
            }else{
                world.data[key] = world.GenerateChunk(worldx, worldy, worldz);
            }
            if (worldz == -1) {
                //console.log(`Generating new chunk,${worldx}, ${worldy}, ${worldz} ` + world.data[key].blocks[15] + " / " + world.data[key].blocks[4095]);

                let id = 0;

                while (id < world.data[key].network.blocks.length) {
                    if (world.data[key].network.blocks[id] != -1) {
                        //console.log(`id found? + ${id}, ${world.data[key].blocks[id]}`);
                        break;
                    }
                    id += 1;
                }

                //console.log(`World size: ${world.data[key].blocks.length} ID: ${id} value: ${world.data[key].blocks[id]}`);
                let chunk = world.data[key];
                //console.log(`chunkdata: #${chunk.length} 0:${chunk.blocks[0]} 16:${chunk.blocks[16]}`);

            }
            return world.data[key];
        } else {
            //console.log("Returning exsisting chunk");
            return world.data[key];
        }
    }

    world.UpdateChunk = function(worldx, worldy, worldz) {
        let key = world.chunkkey(worldx, worldy, worldz);

        
        let ret = [];
        let data = world.data[key];
        for (let x = 0; x < 16; x++) {//width
            for (let y = 0; y < 16; y++) {//height
                for (let z = 0; z < 16; z++) {//depth
                    ret[ret.length] = data.chunk[x][y][z];
                }
            }
        }
        world.data[key].network.blocks = ret;
    }

    world.SaveChunk = function(worldx, worldy, worldz) {
        
        let key = world.chunkkey(worldx, worldy, worldz);
        //console.log(`Writing to ${dirs.chunks}/${key}.chunk`);
        fs.writeFileSync(`${dirs.chunks}/${key}.chunk`, JSON.stringify(world.data[key]));
    }

    world.GetBlock = function (x, y, z) {
        let chunkpos = {
            x: Math.floor(x / 16),
            y: Math.floor(y / 16),
            z: Math.floor(z / 16)
        }

        let chunkblockoffset = {
            x: Math.floor(((x - (chunkpos.x*16)) % 16) + 16) % 16,
            y: Math.floor(((y - (chunkpos.y*16)) % 16) + 16) % 16,
            z: Math.floor(((z - (chunkpos.z*16)) % 16) + 16) % 16
        }

        let chunk = world.GetChunk(chunkpos.x, chunkpos.y, chunkpos.z);
        //console.log("[ " + chunkblockoffset.x + ", " + chunkblockoffset.y + ", " + chunkblockoffset.z + " ] " +chunk.blocks.length + " / chunkblockid: " + chunkblockid);
        return chunk.chunk[chunkblockoffset.x][chunkblockoffset.y][chunkblockoffset.z]
    }

    world.SetBlock = function (x, y, z, id) {
        let chunkpos = {
            x: Math.floor(x / 16),
            y: Math.floor(y / 16),
            z: Math.floor(z / 16)
        }

        //console.log(chunkpos.x + ", " + chunkpos.y + ", " + chunkpos.z);
        let chunkblockoffset = {
            x: Math.floor(((x - (chunkpos.x*16)) % 16) + 16) % 16,
            y: Math.floor(((y - (chunkpos.y*16)) % 16) + 16) % 16,
            z: Math.floor(((z - (chunkpos.z*16)) % 16) + 16) % 16
        }


        let chunk = world.GetChunk(chunkpos.x, chunkpos.y, chunkpos.z);

        //console.log(chunk.network.x + ", " + chunk.network.y + ", " + chunk.network.z + " - " + chunkblockoffset.x + ", " + chunkblockoffset.y + ", " + chunkblockoffset.z);

        if(chunk.chunk[chunkblockoffset.x][chunkblockoffset.y][chunkblockoffset.z]<0) {
            chunk.blocks++
        }
        chunk.chunk[chunkblockoffset.x][chunkblockoffset.y][chunkblockoffset.z] = id;
        if(chunk.chunk[chunkblockoffset.x][chunkblockoffset.y][chunkblockoffset.z]<0) {
            chunk.blocks--
        }

        
    }

    world.RemoveBlock = function (x, y, z) {
        world.SetBlock(x, y, z, -1);
    }

    return world;
}


worldengine.worlds = {}
worldengine.worlds.overworld = worldengine.CreateWorld("overworld");
worldengine.worlds.overworld.GetChunk(0, 0, -1);



worldengine.GetChunk = function (worldx, worldy, worldz) {
    return worldengine.worlds.overworld.GetChunk(worldx, worldy, worldz);
}


module.exports = worldengine;