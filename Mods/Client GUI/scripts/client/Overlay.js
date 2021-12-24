
events.Register("onClientStart", function() {
    //This adds to the general GUI
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
});
