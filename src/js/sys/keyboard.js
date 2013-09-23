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
    
    this.onKeyDown = function(e) {
        switch (e){
            case 13:
                this.enter = true;
                break;
            case 27:
                this.escape = true;
                break;
            case 32:
                this.space = true;
                break;
            case 37:
                this.left = true;
                break;
            case 38:
                this.up = true;
                break;
            case 39:
                this.right = true;
                break;
            case 40:
                this.down = true;
                break;
            case 65:
                this.a = true;
                break;
            case 66:
                this.b = true;
                break;
            case 67:
                this.c = true;
                break;
            case 68:
                this.d = true;
                break;
            case 69:
                this.e = true;
                break;
            case 70:
                this.f = true;
                break;
            case 71:
                this.g = true;
                break;
            case 72:
                this.h = true;
                break;
            case 73:
                this.i = true;
                break;
            case 74:
                this.j = true;
                break;
            case 75:
                this.k = true;
                break;
            case 76:
                this.l = true;
                break;
            case 77:
                this.m = true;
                break;
            case 78:
                this.n = true;
                break;
            case 79:
                this.o = true;
                break;
            case 80:
                this.p = true;
                break;
            case 81:
                this.q = true;
                break;
            case 82:
                this.r = true;
                break;
            case 83:
                this.s = true;
                break;
            case 84:
                this.t = true;
                break;
            case 85:
                this.u = true;
                break;
            case 86:
                this.v = true;
                break;
            case 87:
                this.w = true;
                break;
            case 88:
                this.x = true;
                break;
            case 89:
                this.y = true;
                break;
            case 90:
                this.z = true;
                break;
            case 112:
                this.F1 = true;
                break;
            case 113:
                this.F2 = true;
                break;
            case 114:
                this.F3 = true;
                break;
            case 115:
                this.F4 = true;
                break;
            case 116:
                this.F5 = true;
                break;
            case 117:
                this.F6 = true;
                break;
            case 118:
                this.F7 = true;
                break;
            case 119:
                this.F8 = true;
                break;
            case 120:
                this.F9 = true;
                break;
            case 121:
                this.F10 = true;
                break;
            case 122:
                this.F11 = true;
                break;
            case 123:
                this.F12 = true;
                break;
        }
        
    }
    
    this.onKeyUp = function(e) {
        switch (e){
            case 13:
                this.enter = false;
                break;
            case 27:
                this.escape = false;
                break;
            case 32:
                this.space = false;
                break;
            case 37:
                this.left = false;
                break;
            case 38:
                this.up = false;
                break;
            case 39:
                this.right = false;
                break;
            case 40:
                this.down = false;
                break;
            case 65:
                this.a = false;
                break;
            case 66:
                this.b = false;
                break;
            case 67:
                this.c = false;
                break;
            case 68:
                this.d = false;
                break;
            case 69:
                this.e = false;
                break;
            case 70:
                this.f = false;
                break;
            case 71:
                this.g = false;
                break;
            case 72:
                this.h = false;
                break;
            case 73:
                this.i = false;
                break;
            case 74:
                this.j = false;
                break;
            case 75:
                this.k = false;
                break;
            case 76:
                this.l = false;
                break;
            case 77:
                this.m = false;
                break;
            case 78:
                this.n = false;
                break;
            case 79:
                this.o = false;
                break;
            case 80:
                this.p = false;
                break;
            case 81:
                this.q = false;
                break;
            case 82:
                this.r = false;
                break;
            case 83:
                this.s = false;
                break;
            case 84:
                this.t = false;
                break;
            case 85:
                this.u = false;
                break;
            case 86:
                this.v = false;
                break;
            case 87:
                this.w = false;
                break;
            case 88:
                this.x = false;
                break;
            case 89:
                this.y = false;
                break;
            case 90:
                this.z = false;
                break;
            case 112:
                this.F1 = false;
                break;
            case 113:
                this.F2 = false;
                break;
            case 114:
                this.F3 = false;
                break;
            case 115:
                this.F4 = false;
                break;
            case 116:
                this.F5 = false;
                break;
            case 117:
                this.F6 = false;
                break;
            case 118:
                this.F7 = false;
                break;
            case 119:
                this.F8 = false;
                break;
            case 120:
                this.F9 = false;
                break;
            case 121:
                this.F10 = false;
                break;
            case 122:
                this.F11 = false;
                break;
            case 123:
                this.F12 = false;
                break;
        }
        
    }
};

document.documentElement.onkeydown = function(e) {
    var keycode;
	if(window.event) {
		keycode = window.event.keyCode;
	} else if(e) {
		keycode = e.which;
	}
	if(imagesloaded == "done" && soundloaded == true && game instanceof BattleToads)
    	game.keyPressed(keycode);
}

document.documentElement.onkeyup = function(e) {
	var keycode;
	if(window.event) {
		keycode = window.event.keyCode;
	} else if(e){
		keycode = e.which;
	}
	if(imagesloaded == "done" && soundloaded == true && game instanceof BattleToads)
		game.keyboard.onKeyUp(keycode);
}