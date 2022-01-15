
//Hotbar variables
//Temporary variables used to handle the hotbar. I created them in the global scope to
//let them be accessed only by this file's function
let w = 32+((64+8)*10);
let offsetX = -(w/2);
let offsetY = -40;
hotbar = {};

let creativeMenu = GameMode.register("Creative", function() {
    console.log("Creative Update!");
});

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
            blockID:i+1
        }
        let block = LocalGame.GetBlockFromID(hotbar[i].blockID);

        if(block) {
            testImage.SetImage(LocalGame.GetTextureNameFromTextureID(block.blockTexture.front));
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

        if (Input.GetAxis("Mouse ScrollWheel") > 0 ) // forward
        {
            selectedHotbarIndex--;
        }
        else if (Input.GetAxis("Mouse ScrollWheel") < 0 ) // backwards
        {
            selectedHotbarIndex++;
        }

        selectedHotbarIndex = selectedHotbarIndex % 10;
        if(selectedHotbarIndex<0) {
            selectedHotbarIndex += 10;
        }
        
        for(let i = 0; i < 10; i++) {
            let testImage = hotbar[i].img;
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
            testImage.SetColor(col,col,col,255);
        }
    }catch(e) {
        console.error(e);
    }
}
events.Register("onClientStart", function() {
    createHotbar();
});

events.Register("onClientUpdate", function() {
    updateHotbar();
});