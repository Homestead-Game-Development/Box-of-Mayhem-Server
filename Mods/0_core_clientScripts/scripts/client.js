

console.log("Hello world!");

/*
let obj = new GUI.Group();
console.log("FINISHED CREATING GROUP");
obj.SetPosition(64, -64);
obj.SetSize(128,128);

let obj2 = new GUI.Group();
obj2.SetParent(obj);
obj2.SetSize(128,128);
obj2.SetPosition(64, -64);

let image = new GUI.Image();
image.SetParent(obj2);
image.SetSize(128,128);
image.SetPosition(64, -64);
image.SetImage("nether_wart_stage_2.png");
*/

let animPlace = 0;
let frames = [
    "wheatstage_0.png",
    "wheatstage_1.png",
    "wheatstage_2.png",
    "wheatstage_3.png",
    "wheatstage_4.png",
    "wheatstage_5.png",
    "wheatstage_6.png",
    "wheatstage_7.png",
    "wheatstage_8.png",
    "wheatstage_9.png",
    "wheatstage_10.png",
    "wheatstage_11.png",
]

let posX = 64;

events.Register("onClientStart", function() {
    image = new GUI.Image();
    image.SetSize(128,128);
    image.SetPosition(64, 64);
    image.SetImage("nether_wart_stage_2.png");

    console.log("Path: " + __filepath);



    imgButtonTest = new GUI.Button("wheatstage_3.png", "wheatstage_6.png", "wheatstage_1.png", function() {
        console.log("BUTTON CLICKED");
        try {
            console.log("PRE SEND");
            let data = BufferData.Create();
            data.WriteString("Hello World");
            Net.Send(100, data);

        }catch(e) {
            console.log(e);
        }
        console.log("POST SEND");
    });
    imgButtonTest.SetSize(128,128);
    imgButtonTest.SetPosition(64, 256);

    txtGroupTest = new GUI.Text("Initial Text");
    txtGroupTest.SetSize(128,128);
    txtGroupTest.SetPosition(64, 512);
    //txtGroupTest.SetText("What?");

    console.log("Registering net listener 101")
    Net.Register(101, function(data) {
        console.log("The server has talked to me!");
        console.log(data.ReadString());
    });
})


events.Register("onClientFixedUpdate", function() {
    posX = posX+1;
    posX = ((posX-64) % 64) + 64;

    image.SetImage(""+frames[Math.floor(animPlace % 11)]);
    
    animPlace = animPlace+0.1;
});

//ForcedError()