let camX = 0;
let camY = 0;
let speed = {
    walk:500,
    run:800
}
let jumpPower = 5;
let tabLockMouse = false;

let txtPosition = null;
events.Register("onClientStart", function() {
    txtPosition = new GUI.Text("Test");
    txtPosition.SetSize(512,24);
    txtPosition.SetPosition(8, 256);
});

let handleCamera = function() {
    camX += Mouse.GetHSpeed() * 3.8;
    camY += Mouse.GetVSpeed() * 3.8;
    camX = camX % 360;
    camY = (camY > 89) ? 89 : (camY < -89) ? -89 : camY;
    LocalPlayer.SetCameraRotation(camX, camY);
};

let handlePlayerControls = function() {
    //Here we are handling player movement
    //So, unity kept erroring trying to convert values from a vector to a number value, which
    //forced me to create a lot of ugly code to make it work. Here is how you can add vectors
    //and set the players speed to it
    let oldSpeed = LocalPlayer.GetSpeedVector();
    let transform = LocalPlayer.GetTransform();
	let velocity = Vector3.zero;

    velocity = new Vector3(
        (transform.forward.x * Input.GetAxis("Vertical") * speed.walk / 60),
        0,
        (transform.forward.z * Input.GetAxis("Vertical") * speed.walk / 60)
    );

	velocity = new Vector3(
        velocity.x + (transform.right.x * Input.GetAxis("Horizontal") * speed.walk / 60),
        0,
        velocity.z + (transform.right.z * Input.GetAxis("Horizontal") * speed.walk / 60)
    );
    
    //One of the bugs was that it wasnt detecting a proper double, so i just added "0.0" to it
    //to convert it, and make it work with the javascript parser..... yay development, yay bugs!!
    let spdx = 0.0+(velocity.x);
    let spdy = 0.0+(oldSpeed.y);
    let spdz = 0.0+(velocity.z);
    //Finally, after all the shanangans of pinpointing the problems, we can finally set the speed
    //this is dumb....
    //Yay for JInt....
    
    if (Input.GetKeyDown(KeyCode.Space))
    {
        spdy = jumpPower;
    }
    LocalPlayer.SetSpeed(spdx, spdy, spdz);
}


events.Register("onClientUpdate", function() {
    if(Input.GetKeyDown(KeyCode.Tab))
	{
        tabLockMouse = !tabLockMouse;
	}

    let pos = LocalPlayer.GetPosition();
    LocalPlayer.SetCameraPosition(pos.x, pos.y+0.5, pos.z);
    
    if(Mouse.GetLocked()) {

        handleCamera();
        handlePlayerControls();

    }
    
    if(txtPosition) {
        //let playerpos = LocalPlayer.GetPosition();
        //txtPosition.SetText(`Pos: ${Math.floor(0)}, ${Math.floor(0)}, ${Math.floor(0)}`);
        let playerpos = LocalPlayer.GetPosition();
        txtPosition.SetText("Pos: " + Math.floor(playerpos.x) + ", " + Math.floor(playerpos.y) + ", " + Math.floor(playerpos.z));
    }
});

events.Register("onClientLateUpdate", function() {
    
    if(Mouse.GetLocked()) {
        //Here we are handling left/rightclicking blocks
        if(Input.GetMouseButtonDown(0)) {//Left click
            let data = new BufferData();
            data.WriteInt(0);//write that you are left clicking
            data.WriteInt(Math.floor(BlockPosition.x));
            data.WriteInt(Math.floor(BlockPosition.y));
            data.WriteInt(Math.floor(BlockPosition.z));
            Net.Send(200, data);
            console.log("Left: " + BlockPosition.ToString());
            LocalPlayerWorld.SetBlock(Math.floor(BlockPosition.x), Math.floor(BlockPosition.y), Math.floor(BlockPosition.z), -1);
        }
        if(Input.GetMouseButtonDown(1)) {//Right click
            let data = new BufferData();
            data.WriteInt(1);//write that you are right clicking
            data.WriteInt(Math.floor(BlockPlacePosition.x));
            data.WriteInt(Math.floor(BlockPlacePosition.y));
            data.WriteInt(Math.floor(BlockPlacePosition.z));
            data.WriteInt(hotbar[selectedHotbarIndex].blockID);
            Net.Send(200, data);
            console.log("Right: " + BlockPlacePosition.ToString());
            
            LocalPlayerWorld.SetBlock(Math.floor(BlockPlacePosition.x), Math.floor(BlockPlacePosition.y), Math.floor(BlockPlacePosition.z), hotbar[selectedHotbarIndex].blockID);
            
        }
        if(Input.GetMouseButtonDown(2)) {//Middle click
            let data = new BufferData();
            data.WriteInt(2);//write that you are middle clicking
            data.WriteInt(Math.floor(BlockPosition.x));
            data.WriteInt(Math.floor(BlockPosition.y));
            data.WriteInt(Math.floor(BlockPosition.z));
            Net.Send(200, data);
            console.log("Middle: " + BlockPosition.ToString());
        }
    }
    //Logic for handling locking the mouse
    Mouse.SetLocked(!(chatbox.active||chatbox.active||tabLockMouse));
});

Net.Register(201,function(reader) {
    let action = reader.ReadInt();
    let x = reader.ReadInt();
    let y = reader.ReadInt();
    let z = reader.ReadInt();
    let blockID = -1;
    switch(action) {
        case 0://Place
            blockID = reader.ReadInt();
            LocalPlayerWorld.SetBlock(x, y, z, blockID);
        break;

        case 1://Break
            LocalPlayerWorld.SetBlock(x, y, z, -1);
        break;

        default:
            console.log("<color=yellow>Unhandled block place action: " + action + "</color>");
        break;
    }
});
