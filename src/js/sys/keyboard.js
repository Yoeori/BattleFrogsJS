Input = function() {
	this.a = false;
	this.b = false;
	this.c = false;
	this.d = false;
	this.e = false;
	this.f = false;
	this.g = false;
	this.h = false;
	this.i = false;
	this.j = false;
	this.k = false;
	this.l = false;
	this.m = false;
	this.n = false;
	this.o = false;
	this.p = false;
	this.q = false;
	this.r = false;
	this.s = false;
	this.t = false;
	this.u = false;
	this.v = false;
	this.w = false;
	this.x = false;
	this.y = false;
	this.z = false;
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	this.enter = false;
	this.space = false;
	this.escape = false;
	this.F1 = false;
	this.F2 = false;
	this.F3 = false;
	this.F4 = false;
	this.F5 = false;
	this.F6 = false;
	this.F7 = false;
	this.F8 = false;
	this.F9 = false;
	this.F10 = false;
	this.F11 = false;
	this.F12 = false;
};
var keyboard = new Input();

document.documentElement.onkeydown = function(e) {
	var keycode;
	if(window.event) {
		keycode = window.event.keyCode;
	} else if(e){
		keycode = e.which;
	}
	
	switch (keycode){
		case 13:
			keyboard.enter = true;
			break;
		case 27:
			keyboard.escape = true;
			console.log("You pressed escape :D");
			GamePause(1);
			break;
		case 32:
			keyboard.space = true;
			break;
		case 37:
			keyboard.left = true;
			break;
		case 38:
			keyboard.up = true;
			break;
		case 39:
			keyboard.right = true;
			break;
		case 40:
			keyboard.down = true;
			break;
		case 65:
			keyboard.a = true;
			break;
		case 66:
			keyboard.b = true;
			break;
		case 67:
			keyboard.c = true;
			break;
		case 68:
			keyboard.d = true;
			break;
		case 69:
			keyboard.e = true;
			break;
		case 70:
			keyboard.f = true;
			break;
		case 71:
			keyboard.g = true;
			break;
		case 72:
			keyboard.h = true;
			break;
		case 73:
			keyboard.i = true;
			break;
		case 74:
			keyboard.j = true;
			break;
		case 75:
			keyboard.k = true;
			break;
		case 76:
			keyboard.l = true;
			break;
		case 77:
			keyboard.m = true;
			break;
		case 78:
			keyboard.n = true;
			break;
		case 79:
			keyboard.o = true;
			break;
		case 80:
			keyboard.p = true;
			break;
		case 81:
			keyboard.q = true;
			break;
		case 82:
			keyboard.r = true;
			break;
		case 83:
			keyboard.s = true;
			break;
		case 84:
			keyboard.t = true;
			break;
		case 85:
			keyboard.u = true;
			break;
		case 86:
			keyboard.v = true;
			break;
		case 87:
			keyboard.w = true;
			break;
		case 88:
			keyboard.x = true;
			break;
		case 89:
			keyboard.y = true;
			break;
		case 90:
			keyboard.z = true;
			break;
		case 112:
			keyboard.F1 = true;
			break;
		case 113:
			keyboard.F2 = true;
			break;
		case 114:
			keyboard.F3 = true;
			break;
		case 115:
			keyboard.F4 = true;
			sound.toggleBG();
			break;
		case 116:
			keyboard.F5 = true;
			break;
		case 117:
			keyboard.F6 = true;
			break;
		case 118:
			keyboard.F7 = true;
			ToggleDebug();
			break;
		case 119:
			keyboard.F8 = true;
			sound.toggle();
			break;
		case 120:
			keyboard.F9 = true;
			restartGame();
			break;
		case 121:
			keyboard.F10 = true;
			break;
		case 122:
			keyboard.F11 = true;
			break;
		case 123:
			keyboard.F12 = true;
			break;
	}
};

document.documentElement.onkeyup = function(e) {
	var keycode;
	if(window.event) {
		keycode = window.event.keyCode;
	} else if(e){
		keycode = e.which;
	}
	
	switch (keycode){
		case 13:
			keyboard.enter = false;
			break;
		case 32:
			keyboard.space = false;
			break;
		case 27:
			keyboard.escape = false;
			break;
		case 37:
			keyboard.left = false;
			break;
		case 38:
			keyboard.up = false;
			break;
		case 39:
			keyboard.right = false;
			break;
		case 40:
			keyboard.down = false;
			break;
		case 65:
			keyboard.a = false;
			break;
		case 66:
			keyboard.b = false;
			break;
		case 67:
			keyboard.c = false;
			break;
		case 68:
			keyboard.d = false;
			break;
		case 69:
			keyboard.e = false;
			break;
		case 70:
			keyboard.f = false;
			break;
		case 71:
			keyboard.g = false;
			break;
		case 72:
			keyboard.h = false;
			break;
		case 73:
			keyboard.i = false;
			break;
		case 74:
			keyboard.j = false;
			break;
		case 75:
			keyboard.k = false;
			break;
		case 76:
			keyboard.l = false;
			break;
		case 77:
			keyboard.m = false;
			break;
		case 78:
			keyboard.n = false;
			break;
		case 79:
			keyboard.o = false;
			break;
		case 80:
			keyboard.p = false;
			break;
		case 81:
			keyboard.q = false;
			break;
		case 82:
			keyboard.r = false;
			break;
		case 83:
			keyboard.s = false;
			break;
		case 84:
			keyboard.t = false;
			break;
		case 85:
			keyboard.u = false;
			break;
		case 86:
			keyboard.v = false;
			break;
		case 87:
			keyboard.w = false;
			break;
		case 88:
			keyboard.x = false;
			break;
		case 89:
			keyboard.y = false;
			break;
		case 90:
			keyboard.z = false;
			break;
		case 112:
			keyboard.F1 = false;
			break;
		case 113:
			keyboard.F2 = false;
			break;
		case 114:
			keyboard.F3 = false;
			break;
		case 115:
			keyboard.F4 = false;
			break;
		case 116:
			keyboard.F5 = false;
			break;
		case 117:
			keyboard.F6 = false;
			break;
		case 118:
			keyboard.F7 = false;
			break;
		case 119:
			keyboard.F8 = false;
			break;
		case 120:
			keyboard.F9 = false;
			break;
		case 121:
			keyboard.F10 = false;
			break;
		case 122:
			keyboard.F11 = false;
			break;
		case 123:
			keyboard.F12 = false;
			break;
	}
}