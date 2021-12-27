let errorLogGroup = null;
let guiBG = null;

let msgs = [];


let console = {};
console.log = function(msg) {
    let txt = new GUI.Text("<color=white>" + msg.toString() + "</color>");
    txt.SetParent(errorLogGroup);
    txt.SetSize(Screen.width,24);
    txt.SetLocalPosition(16, 8);
    msgs.forEach(function(inst) {
        let position = inst.GetLocalPosition()
        inst.SetLocalPosition(position.x, position.z + 24);
    });
    msgs[msgs.length] = txt;

    updateLayout();
}

console.error = function(msg) {
    let txt = new GUI.Text("<color=red>" + msg.toString() + "</color>");
    txt.SetParent(errorLogGroup);
    txt.SetSize(Screen.width,24);
    txt.SetLocalPosition(16, 8);
    msgs.forEach(function(inst) {
        let position = inst.GetLocalPosition()
        inst.SetLocalPosition(position.x, position.z + 24);
    });
    msgs[msgs.length] = txt;

    updateLayout();
}

let updateLayout = function() {
    let y = 0;
    msgs.forEach(function(inst) {
        let position = inst.GetLocalPosition();
        inst.SetSize(Screen.width,24);
        inst.SetLocalPosition(16, (position.z-(((Screen.height-128)/2))) + y + 16);
        y += 16;
    });
}

events.Register("onClientStart", function() {
    //This adds to the general GUI
    errorLogGroup = new GUI.Group();
    errorLogGroup.SetSize(Screen.width,Screen.height-128);
    errorLogGroup.SetPosition(0, 128);
    errorLogGroup.SetActive(false);

    guiBG = new GUI.Image();
    guiBG.SetImage("logbg.png");
    guiBG.SetParent(errorLogGroup);
    guiBG.SetLocalPosition(0,0);
    guiBG.SetSize(Screen.width,Screen.height-128);

    console.log("Initializing error log console");
});



events.Register("onClientUpdate", function() {

    if(Input.GetKeyDown(KeyCode.BackQuote))
	{
        //Toggles the group
        errorLogGroup.SetActive(!errorLogGroup.GetActive());
	}

    if(errorLogGroup.GetActive()) {
        errorLogGroup.SetSize(Screen.width,Screen.height-128);
        let y = 0;
        msgs.forEach(function(inst) {
            let position = inst.GetLocalPosition()
            inst.SetLocalPosition(16, (position.z-(((Screen.height-128)/2))) + y + 16);
            y += 16;
        });
    }
    
});


events.Register("onJSError", function() {

    console.error(JSError);

    if(Input.GetKeyDown(KeyCode.BackQuote))
	{
        //Toggles the group
        errorLogGroup.SetActive(!errorLogGroup.GetActive());
	}

    if(errorLogGroup.GetActive()) {
        errorLogGroup.SetSize(Screen.width,Screen.height-128);
    }
    
});
