//Side: CLIENT
//======================================================================================
//                                       Config                                       //
//======================================================================================
let overlayConfig = {}


//======================================================================================
//                                  Setup variables                                   //
//======================================================================================

//Chatbox variables
chatbox = {}
chatbox.active = false;
//======================================================================================
//                                      Chatbox                                       //
//======================================================================================
let createChatbox = function() {
    //global chatbox group
    chatbox.group = new GUI.Group();
    chatbox.group.SetSize(0,0);
    chatbox.group.SetPosition(8, Screen.height-582-8);

    //text input bar
    chatbox.textbar = {}
    chatbox.textbar.background = new GUI.Image();
    chatbox.textbar.background.SetParent(chatbox.group);
    chatbox.textbar.background.SetImage("Chatbox_BG_Inactive.png");
    chatbox.textbar.background.SetSize(489,582);
    chatbox.textbar.background.SetLocalPosition(0,0);
    chatbox.textbar.background.AddMask();//This clipsthe children stored inside the chatbox

    chatbox.chat = {};
    chatbox.chat.lineText = []
    chatbox.chat.lines = [];
    chatbox.chat.group = new GUI.Group();
    chatbox.textbar.background.AddToMask(chatbox.chat.group);
    chatbox.chat.group.SetSize(0,0);
    chatbox.chat.group.SetLocalPosition(0,0);


    fuckyoufuckinglines = [];

    //Chat lines
    for(let line=0; line<28; line++) {
        let newline = new GUI.Text("");
        newline.SetSize(4890, 16);
        chatbox.chat.lineText = "";
        newline.SetText(chatbox.chat.lineText);
        newline.SetParent(chatbox.chat.group);
        newline.SetTextColor(255,255,255,255);
        newline.SetLocalPosition(-(489/2)+8,134-(line*16)+79);
        chatbox.chat.lines[line] = newline;
        fuckyoufuckinglines[line] = "";
    }


    //Input textbox
    chatbox.input = {}
    chatbox.input.inputfield = new GUI.InputField();
    chatbox.input.inputfield.SetParent(chatbox.group);
    chatbox.input.inputfield.SetTextColor(255,255,255,255);
    chatbox.input.inputfield.SetSize(489,32);
    chatbox.input.inputfield.SetLocalPosition(0,582-32-12);
}

let updateChatbox = function() {

    if(!chatbox.active) {
        //This handles the input box when it is not active, greying it out and setting it to readonly
        chatbox.input.inputfield.SetReadOnly(true);
        chatbox.input.inputfield.SetTextColor(125,125,125,255);
        chatbox.chat.group.SetLocalPosition(0,56);
        if(Input.GetKeyDown(KeyCode.T) || Input.GetKeyDown(KeyCode.Return) || Input.GetKeyDown(KeyCode.KeypadEnter) || Input.GetKeyDown(KeyCode.Slash)) {
            chatbox.input.inputfield.SetText((Input.GetKeyDown(KeyCode.Slash)) ? "/" : chatbox.input.inputfield.GetText());
            chatbox.input.inputfield.SetReadOnly(false);
            chatbox.input.inputfield.Select();
            chatbox.input.inputfield.Unselect();
            chatbox.input.inputfield.Select();
            chatbox.active = true;
        }
    }else{
        //This handles turning on the input field
        chatbox.input.inputfield.SetReadOnly(false);
        chatbox.input.inputfield.SetTextColor(255,255,255,255);
        chatbox.chat.group.SetLocalPosition(0,0);
        if(Input.GetKeyDown(KeyCode.Return) || Input.GetKeyDown(KeyCode.KeypadEnter) || Input.GetKeyDown(KeyCode.Escape)) {
            let data = new BufferData();
            data.WriteString(chatbox.input.inputfield.GetText());
            Net.Send(1901, data);


            chatbox.input.inputfield.SetText("");
            chatbox.input.inputfield.Unselect();
            chatbox.input.inputfield.SetReadOnly(true);
            chatbox.active = false;
        }
    }

    chatbox.textbar.background.SetImage((chatbox.active) ? "Chatbox_BG_Active.png" : "Chatbox_BG_Inactive.png");
}


//======================================================================================
//                                 Event Registration                                 //
//======================================================================================
events.Register("onClientStart", function() {
    createChatbox();
});

events.Register("onClientUpdate", function() {
    updateChatbox();
});

//======================================================================================
//                                  Network Messages                                  //
//======================================================================================
let lastmessage = "";
Net.Register(2901,function(reader) {
    let msg = reader.ReadString();
    //if(lastmessage!=msg) {
        lastmessage = msg;
        if(chatbox && chatbox.chat) {
            if(chatbox.chat.lines) {
                fuckyoufuckinglines[fuckyoufuckinglines.length] = msg;
                for(let i = 0; i < 28; i++) {
                    chatbox.chat.lines[i].SetText(fuckyoufuckinglines[fuckyoufuckinglines.length-1-i]);
                }
            }else{
                console.error("No testlines set, on loop! ?!?!?");
            }
        }
    //}
});