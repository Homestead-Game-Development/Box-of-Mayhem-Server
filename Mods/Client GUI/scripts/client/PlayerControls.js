let camX = 0;
let camY = 0;


events.Register("onClientUpdate", function() {
    if(Input.GetKeyDown(KeyCode.Tab))
	{
        Mouse.Lock(!Mouse.GetLocked());
	}
    
    if(Mouse.GetLocked()) {
        camX += Mouse.GetHSpeed() * 3.8;
        camY += Mouse.GetVSpeed() * 3.8;
        camX = camX % 360;
        camY = (camY > 89) ? 89 : (camY < -89) ? -89 : camY;
        LocalPlayer.SetCameraRotation(camX, camY);
    }
});
