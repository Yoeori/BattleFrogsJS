var gui = Class.extend({
	render : function() {},
	update : function() {},
	onStart: function() {},
	onStop: function() {},
	
	init : function() {
		this.onStart();
	},
	
	die : function() {
		this.onStop();
		var index = GUIList.indexOf(this);
		GUIList.splice(index, 1);
	}
});

var guiText = gui.extend({
	text : "",
	textWidth: 0,
	textHeight: 0,
	spawntime: 0,
	TIME_TO_SHOW: 5000,
	
	onStart : function() {
		//Calc font width
		fs = this.getTextSize(this.text);
		this.textWidth = fs[0];
		this.textHeight = fs[1];
		this.spawntime = new Date().getTime();
	},
	
	init : function(rtext) {
		this.text = rtext;
		this._super();
	},
	
	update : function() {
		if(new Date().getTime()-this.spawntime >= this.TIME_TO_SHOW) {
			this.die();
		}
	},
	
	render : function() {
		DisplayCTX.font = '30px Verdana';
		DisplayCTX.fillStyle = 'white';
		DisplayCTX.fillText(this.text, (canvas.width/2)-(this.textWidth/2), 240-(this.textHeight/2));
	},
	
	getTextSize : function(text) {
		var who = document.createElement('div');
		who.style.cssText='display:inline-block; padding:0; line-height:1; position:absolute; visibility:hidden; font-size:30px; font-family: verdana;';
		who.appendChild(document.createTextNode(text));
		document.body.appendChild(who);
		var fs = [who.offsetWidth, who.offsetHeight];
		document.body.removeChild(who);
		return fs;
	}
});
// TextScreen(this, "The engines have been enabled, clean up the remaining pirates!")
// super(game, "Guess you won't be needing that key after all. Use SPACE to shoot.")
// super(game, "The radiation is gone. Get to the console and turn on the engines!")
// super(game, game.getWorld().getState() == World.State.WEAPON_PICKED_UP ? "This door is locked. Blow it up!" : "This door is locked. You need to find the key.")
// super(game, "Use WASD/Arrow keys to move and jump. Yay")
// super(game, "There is a breach in the reactor room. Hurry!")
// super(game, "Cheat activated!")