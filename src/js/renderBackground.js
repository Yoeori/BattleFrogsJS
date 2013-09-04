var BackgX = 4500;
function renderBackground() {
	var newBackgX = EntityList[0].PosX + 76 - (canvas.width/2);
	if(EntityList[0].isLeftShooting)
		newBackgX += 48;
	if(newBackgX < 0)
		newBackgX = 0;
	if(newBackgX > 14709-canvas.width)
		newBackgX = 14709-canvas.width;
	BackgX = newBackgX;
	if(canvas.width >= sml["starbackground"].width) {
		rwidth = sml["starbackground"].width;
	} else {
		rwidth = canvas.width;
	}
	DisplayCTX.drawImage(sml["starbackground"],0+(BackgX/14709)*521, 0, rwidth, 540, 0, 0, canvas.width, 540);
	DisplayCTX.drawImage(sml["bg"], BackgX, 0, canvas.width, 720, 0, 0, canvas.width, 720);
}
var doorBroken = new Array();
doorBroken[0] = true; //Reactor door
doorBroken[1] = true; // Cryo chamber
doorBroken[2] = true; // Bakery
function renderForeground() {
	if(Backrender(2135,502)) {
		if(doorBroken[0] == true)  {
			DisplayCTX.drawImage(sml["Reactor_door_Broken"], 0, 0, 502, 720, 2135-BackgX, 0, 502, 720);
		} else {
			DisplayCTX.drawImage(sml["Reactor_door_Intact"], 0, 0, 502, 720, 2135-BackgX, 0, 502, 720); 
		}
	}
	
	if(Backrender(6030,313)) {
		if(doorBroken[1] == true)  {
			DisplayCTX.drawImage(sml["IntoRift_door_Broken"], 0, 0, 313, 720, 6030-BackgX, 0, 313, 720);
		} else {
			DisplayCTX.drawImage(sml["IntoRift_door_Intact"], 0, 0, 313, 720, 6030-BackgX, 0, 313, 720); 
		}
	}
	if(Backrender(8040,211)) {
		DisplayCTX.drawImage(sml["LeaveCryo_Door_Broken"], 0, 0, 211, 720, 8040-BackgX, 0, 211, 720);
	}
	
	if(Backrender(11375,306)) {
		if(doorBroken[2] == true)  {
			DisplayCTX.drawImage(sml["BakeryWall_door_Broken"], 0, 0, 306, 720, 11375-BackgX, 0, 306, 720);
		} else {
			DisplayCTX.drawImage(sml["BakeryWall_door_Intact"], 0, 0, 306, 720, 11375-BackgX, 0, 306, 720); 
		}
	}
	
	
	
	
	//Render Health
	health = EntityList[0].currentHealth/200;
	BarX = health*249;
	DisplayCTX.drawImage(sml["health_empty"],10,10);
	DisplayCTX.drawImage(sml["health_full"],0,0, BarX ,33, 10, 10, BarX, 33);
	if(health < 1 && health > 0) {
		DisplayCTX.drawImage(sml["health_bite"],BarX,10 + 1);
	}
	
}
function Backrender(x,width) {
	if(x-1280 < BackgX && x+width > BackgX) {
		return true;
	} else {
		return false;
	}
}