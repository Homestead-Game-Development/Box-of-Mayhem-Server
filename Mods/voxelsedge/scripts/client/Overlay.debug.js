
let img = null;

events.Register("onClientStart", function() {
    let txt = new GUI.Text("PLACEHOLDER");
    txt.SetSize(1024,32);
    txt.SetPosition(0,16);

    let ids = LocalGame.GetBlockIDs();
    //ids.length
    

    /*for(let i = 0; i < 20; i++) {
        //img = new GUI.Image();
        //img.RenderBlock(i+1, new Vector3(0, 0, 0), new Vector3(1, 1, 1), new Vector3(0, 0, 0));
        //img.SetSize(64,64);
        //img.SetPosition(256+(64*i),256);
    }*/
    //txt.SetText("Number of textures: " + (LocalGame.GetBlockIDs().length));
});

events.Register("onClientUpdate", function() {
    /*if(img) {
        img.RenderBlock(1, new Vector3(0, 0, 0), new Vector3(1, 1, 1), new Vector3(0, 0, 0));
        console.log("Rendering block");
    }*/
});
