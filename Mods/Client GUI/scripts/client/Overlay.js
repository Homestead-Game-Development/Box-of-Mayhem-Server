
events.Register("onClientStart", function() {
    //This adds to the general GUI
    /*
    let image = new GUI.Image();
    image.SetSize(256,256);
    image.SetPosition(Screen.width - 256, 0);
    image.SetImage("GUIGroup_Anchor_UpperRight.png");
    
    button = new GUI.Button("GUI_Overlay_InventoryButtonUp.png", "GUI_Overlay_InventoryButtonUp.png", "GUI_Overlay_InventoryButtonDown.png", function() {

    });
    button.SetSize(64, 64);
    button.SetPosition(Screen.width - 190, 24);

    imgHotbar = new GUI.Image();
    image.SetSize(512,128);
    image.SetPosition((Screen.width / 2) - 256, 0);
    image.SetImage("basic_bar.png");
    */
    let txt = new GUI.Text("PLACEHOLDER");
    txt.SetSize(1024,32);
    txt.SetPosition(0,0);
    txt.SetText("Number of textures: " + (LocalGame.GetBlockIDs().length));

    w = 32+((64+8)*10);

    testHotbar = new GUI.Group();
    testHotbar.SetSize(w, 80);
    testHotbar.SetPosition((Screen.width/2)-(w/2), Screen.height-80);

    let offsetX = -(w/2);
    let offsetY = -40;

    let testHotbarBackground = new GUI.Image();
    testHotbarBackground.SetParent(testHotbar);
    testHotbarBackground.SetSize(w,80);
    testHotbarBackground.SetLocalPosition(offsetX, offsetY);
    testHotbarBackground.SetColor(0,0,0,125);

    for(let i = 0; i < 10; i++) {
        let testImage = new GUI.Image();
        testImage.SetSize(64,64);
        testImage.SetParent(testHotbar);
        testImage.SetLocalPosition(offsetX+16+(72*i),offsetY+8);
        testImage.SetImage(LocalGame.GetTextureNameFromTextureID(i));
        testImage.SetColor(125,125,125,255);
    }
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
});

events.Register("onClientUpdate", function() {
    testHotbar.SetSize(w, 80);
    testHotbar.SetPosition((Screen.width/2)-(w/2), Screen.height-80);
});