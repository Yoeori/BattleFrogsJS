var Screen = Class.extend({
	game : 0,
	
	init : function(game) {
		this.game = game;
	},
	
	render : function() {},
	update : function(deltaTime) {},
	onStart: function() {},
	onStop: function() {}
});

var ScreenText = Screen.extend({
	text : "",
	textWidth: 0,
	textHeight: 0,
	spawntime: 0,
	TIME_TO_SHOW: 5000,
	
	onStart : function() {
		//Calc font width
		var fs = getTextSize(this.text);
		this.textWidth = fs[0];
		this.textHeight = fs[1];
		this.spawntime = new Date().getTime();
	},
	
	init : function(game, rtext) {
		this.text = rtext;
		this._super(game);
	},
	
	update : function(deltaTime) {
		
		if(new Date().getTime()-this.spawntime >= this.TIME_TO_SHOW) {
			this.game.setScreen(0);
		}
	},
	
	render : function() {
		ctx.font = '30px Verdana';
		ctx.fillStyle = 'white';
		ctx.fillText(this.text, (canvas.width/2)-(this.textWidth/2), 240-(this.textHeight/2));
	}
});
// TextScreen(this, "The engines have been enabled, clean up the remaining pirates!")
// super(game, "Guess you won't be needing that key after all. Use SPACE to shoot.")
// super(game, "The radiation is gone. Get to the console and turn on the engines!")
// super(game, game.getWorld().getState() == World.State.WEAPON_PICKED_UP ? "This door is locked. Blow it up!" : "This door is locked. You need to find the key.")
// super(game, "Use WASD/Arrow keys to move and jump. Yay")
// super(game, "There is a breach in the reactor room. Hurry!")
// super(game, "Cheat activated!")