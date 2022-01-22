
//Hotbar variables
//Temporary variables used to handle the hotbar. I created them in the global scope to
//let them be accessed only by this file's function
let w = 32+((64+8)*10);
let offsetX = -(w/2);
let offsetY = -40;
hotbar = {};
let creativeModePlayerPosition = new Vector3(0,0,0);

let creativeMenu = GameMode.register("Creative", function() {
    creativeModePlayerPosition = "";
});

let creativeMenuActive = false;
let creativeMenuStorage = null;
let creativeMenuStorageGroup = null;

//======================================================================================
//                                       Hotbar                                       //
//======================================================================================
let createHotbar = function() {
    let txt = new GUI.Text("PLACEHOLDER");
    txt.SetSize(1024,32);
    txt.SetPosition(0,0);
    txt.SetText("Number of textures: " + (LocalGame.GetBlockIDs().length));


    testHotbar = new GUI.Group();
    testHotbar.SetSize(w, 80);
    testHotbar.SetPosition((Screen.width/2)-(w/2), Screen.height-80);


    let testHotbarBackground = new GUI.Image();
    testHotbarBackground.SetParent(testHotbar);
    testHotbarBackground.SetSize(w,80);
    testHotbarBackground.SetLocalPosition(offsetX, offsetY);
    testHotbarBackground.SetColor(0,0,0,125);

    selectedHotbarIndex = 0;
    hotbar = {};

    for(let i = 0; i < 10; i++) {
        let slotBG = new GUI.Image();
        slotBG.SetImage("little_background_frame.png");
        slotBG.SetSize(64,64);
        slotBG.SetParent(testHotbar);
        slotBG.SetLocalPosition(offsetX+16+(72*i),offsetY+8);

        let testImage = new GUI.Image();
        testImage.SetSize(64,64);
        testImage.SetParent(testHotbar);
        testImage.SetLocalPosition(offsetX+16+(72*i),offsetY+8);
        
        hotbar[i] = {
            img:testImage,
            slotbg:slotBG,
            blockID:i+1
        }
        let slot = hotbar[i];//LocalGame.GetBlockFromID(hotbar[i].blockID);

        if(slot) {
            //testImage.SetImage(LocalGame.GetTextureNameFromTextureID(block.blockTexture.front));
            testImage.RenderBlock(slot.blockID);
        }
        let col = (selectedHotbarIndex==i) ? 255 : 75;
        testImage.SetColor(col,col,col,255);
    }


    SlotSelector = GUI.Image();
    SlotSelector.SetImage("inventory_frame_little.png");
    SlotSelector.SetSize(64,64);
    SlotSelector.SetPosition(-1000,-1000);
    SlotSelector.SetParent(testHotbar);
    SlotSelector.SetColor(255,125,125,255);
    /*
    let testImage = new GUI.Image();
    testImage.SetSize(64,64);
    testImage.SetPosition(0,0);
    testImage.SetImage(LocalGame.GetTextureNameFromTextureID(1));

    let testImage2 = new GUI.Image();
    testImage2.SetSize(64,64);
    testImage2.SetPosition(64,0);
    testImage2.SetImage(LocalGame.GetTextureNameFromTextureID(2));*/

    let button = new GUI.Button("GUI_Overlay_InventoryButtonUp.png", "GUI_Overlay_InventoryButtonUp.png", "GUI_Overlay_InventoryButtonDown.png", function() {

    });
    button.SetSize(64, 64);
    button.SetPosition(Screen.width - 190, 24);

    /*
    let imgHotbar = new GUI.Image();
    imgHotbar.SetSize(512,128);
    imgHotbar.SetPosition((Screen.width / 2) - 256, 0);
    imgHotbar.SetImage("basic_bar.png");
    */
}

let updateHotbar = function() {
    try {
        
        testHotbar.SetSize(w, 80);
        testHotbar.SetPosition((Screen.width/2)-(w/2), Screen.height-80);

        if(!chatbox.active) {
            //Here we are handling scrolling the menu
            if(!creativeMenuActive) {
                if ( Input.GetAxis("Mouse ScrollWheel") > 0 ) // forward
                {
                    selectedHotbarIndex--;
                }
                else if ( Input.GetAxis("Mouse ScrollWheel") < 0 ) // backwards
                {
                    selectedHotbarIndex++;
                }
                
                if(Input.GetMouseButtonDown(2)) {//Middle click
                    hotbar[selectedHotbarIndex].blockID = BlockID;
                    hotbar[selectedHotbarIndex].img.RenderBlock(BlockID);
                }
            }
            
        
            //Here we are handling hotbar shortcuts
            if(Input.GetKeyDown(KeyCode.Alpha1)) {selectedHotbarIndex = 0;}
            if(Input.GetKeyDown(KeyCode.Alpha2)) {selectedHotbarIndex = 1;}
            if(Input.GetKeyDown(KeyCode.Alpha3)) {selectedHotbarIndex = 2;}
            if(Input.GetKeyDown(KeyCode.Alpha4)) {selectedHotbarIndex = 3;}
            if(Input.GetKeyDown(KeyCode.Alpha5)) {selectedHotbarIndex = 4;}
            if(Input.GetKeyDown(KeyCode.Alpha6)) {selectedHotbarIndex = 5;}
            if(Input.GetKeyDown(KeyCode.Alpha7)) {selectedHotbarIndex = 6;}
            if(Input.GetKeyDown(KeyCode.Alpha8)) {selectedHotbarIndex = 7;}
            if(Input.GetKeyDown(KeyCode.Alpha9)) {selectedHotbarIndex = 8;}
            if(Input.GetKeyDown(KeyCode.Alpha0)) {selectedHotbarIndex = 9;}
        }

        selectedHotbarIndex = selectedHotbarIndex % 10;
        if(selectedHotbarIndex<0) {
            selectedHotbarIndex += 10;
        }

        
        for(let i = 0; i < 10; i++) {
            let blockid = hotbar[i].blockID;
            if(blockid>=0) {
                let block = LocalGame.GetBlockFromID(blockid);

                if(block) {
                    //testImage.SetImage(LocalGame.GetTextureNameFromTextureID(block.blockTexture.front));
                }
            }else{

                //testImage.SetImage("blankSlot.png");
            }
            //hotbar[selectedHotbarIndex]
            let col = (selectedHotbarIndex==i) ? 255 : 75;
            if(i==selectedHotbarIndex) {
                SlotSelector.SetLocalPosition(offsetX+16+(72*i),offsetY+8);
            }
            hotbar[i].img.SetColor(col,col,col,255);
            hotbar[i].slotbg.SetColor(col,col,col,255);
        }
    }catch(e) {
        console.error(e);
    }
}

let createBlockMenu = function() {
    
    creativeMenuStorage = new GUI.Image();
    creativeMenuStorage.SetColor(0,0,0,125);
    creativeMenuStorage.SetSize(w, Screen.height-160);
    creativeMenuStorage.SetPosition((Screen.width/2)-(w/2), 40);
    creativeMenuStorage.AddMask();
    creativeMenuStorage.SetActive(creativeMenuActive);
    creativeMenuStorage.SetParent(creativeMenu);

    creativeMenuStorageGroup = new GUI.Group();
    creativeMenuStorage.AddToMask(creativeMenuStorageGroup);
    creativeMenuStorageGroup.SetLocalPosition(-50,-50);
    creativeMenuStorageGroup.SetSize(0,0);

    let blockIDs = LocalGame.GetBlockIDs();

    let blocksPerRow = Math.floor(creativeMenuStorage.GetWidth()/(64+8));
    let offsetX = (creativeMenuStorage.GetWidth()-((blocksPerRow*(64+8))-8))/2

    let _i = 0;
    blockIDs.forEach(block => {
        let __x = ((_i%blocksPerRow)*(64+8))-(creativeMenuStorage.GetWidth()/2)+offsetX;
        let __y = (Math.floor(_i/blocksPerRow)*(64+8))-(creativeMenuStorage.GetHeight()/2);

        //Here we are creating the background for the item slot
        
        let __slotBG = new GUI.Image();
        __slotBG.SetImage("little_background_frame.png");
        __slotBG.SetSize(64,64);
        __slotBG.SetParent(creativeMenuStorageGroup);
        __slotBG.SetLocalPosition(__x, __y);

        let __image = new GUI.Image();
        __image.SetSize(64,64);
        __image.SetParent(creativeMenuStorageGroup);
        __image.SetLocalPosition(__x, __y);

        __image.RegisterOnMouseClick(function() {
            hotbar[selectedHotbarIndex].blockID = block.id;
            if(block.isPlant) {
                hotbar[selectedHotbarIndex].img.SetImage(LocalGame.GetTextureNameFromTextureID(LocalGame.GetBlockTexture(block.id).front));
            }else{
                hotbar[selectedHotbarIndex].img.RenderBlock(block.id);
            }
        });
        
        if(block.isPlant) {
            __image.SetImage(LocalGame.GetTextureNameFromTextureID(LocalGame.GetBlockTexture(block.id).front));
        }else{
            __image.RenderBlock(block.id);
        }
        _i++;
    });
}

let updateBlockMenu = function() {
    let localPos = creativeMenuStorageGroup.GetLocalPosition()
    if (Input.GetAxis("Mouse ScrollWheel") > 0 ) // forward
    {
        //creativeMenuStorageGroup.SetLocalPosition(localPos.x, localPos.y+48);
        creativeMenuStorageGroup.SetLocalPosition(localPos.x, -localPos.y+00);
    }
    else if (Input.GetAxis("Mouse ScrollWheel") < 0 ) // backwards
    {
        //creativeMenuStorageGroup.SetLocalPosition(localPos.x, localPos.y-48);
        creativeMenuStorageGroup.SetLocalPosition(localPos.x, -localPos.y-100);
    }
    if(Input.GetKeyDown(KeyCode.E) && !chatbox.active) {
        creativeMenuActive = !creativeMenuActive;
        creativeMenuStorage.SetActive(creativeMenuActive);
    }
}

events.Register("onClientStart", function() {
    createHotbar();
    createBlockMenu();
});

events.Register("onClientUpdate", function() {
    updateHotbar();
    updateBlockMenu();
});
