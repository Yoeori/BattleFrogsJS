var Screen = Class.extend({
	game : 0,
	
	instance : "Screen",
	
	init : function(game) {
		this.game = game;
	},
	
	render : function() {},
	update : function(deltaTime) {},
	onStart: function() {},
	onStop: function() {},
	
	save : function(saveObject) {
		return saveObject;
	}
});

var ScreenText = Screen.extend({
	text : "",
	textWidth: 0,
	textHeight: 0,
	TIME_TO_SHOW: 5000,
	
	instance : "ScreenText",
	
	onStart : function() {
		//Calc font width
		var fs = getTextSize(this.text);
		this.textWidth = fs[0];
		this.textHeight = fs[1];
	},
	
	init : function(game, rtext) {
		this.text = rtext;
		this._super(game);
	},
	
	update : function(deltaTime) {
		this.TIME_TO_SHOW -= 15;
		if(this.TIME_TO_SHOW <= 0) {
			this.game.setScreen(0);
		}
	},
	
	render : function() {
		ctx.font = '30px Verdana';
		ctx.fillStyle = 'white';
		ctx.fillText(this.text, (canvas.width/2)-(this.textWidth/2), 240-(this.textHeight/2));
	},
	
	save : function(saveObject) {
		saveObject["text"] = this.text;
		saveObject["textWidth"] = this.textWidth;
		saveObject["textHeight"] = this.textHeight;
		saveObject["TIME_TO_SHOW"] = this.TIME_TO_SHOW;
		return this._super(saveObject);
	}
});
var ScreenLockedDoor = ScreenText.extend({
	
	init : function(game) {
		this._super(game, game.world.state == State.WEAPON_PICKED_UP ? "This door is locked. Blow it up!" : "This door is locked. You need to find the key.");
	}
	
});

var ScreenWin = Screen.extend({
	
	TIME_TO_SHOW : 60000,
	text : "",
	
	instance : "ScreenWin",
	
	onStart : function() {
		var score = new Date().getTime() - this.game.startTime;
		this.text = "Time: " + score + "ms";
		this.game.setPlaying(false);
	},
	
	onStop : function() {
		if (!this.game.playing) {
			this.game.setPlaying(true);
		}
	},
	
	update : function(delta) {
		this.TIME_TO_SHOW -= delta;
		
		if (this.TIME_TO_SHOW < 0) {
			this.game.setScreen(0);
		}
	},
	
	render : function() {
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.font = '30px Verdana';
		ctx.drawImage(sml["win"],(canvas.width/2)-(1280/2),0);
		ctx.fillText(this.text, (canvas.width/2)-(1280/2)+20, 20+30);
	},
	
	save : function(saveObject) {
		saveObject["text"] = this.text;
		saveObject["TIME_TO_SHOW"] = this.TIME_TO_SHOW;
		return this._super(saveObject);
	}
});

var ScreenDeath = ScreenWin.extend({
	
	TIME_TO_SHOW : 5000,
	
	instance : "ScreenDeath",
	
	onStart : function() {
		sound.play("Space_Ambience_Boooom");
		this.game.setPlaying(false);
	},
	
	render : function() {
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.drawImage(sml["gameover"],(canvas.width/2)-(1280/2),0);
	}
});