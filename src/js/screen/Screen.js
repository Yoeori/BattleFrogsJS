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
var ScreenLockedDoor = ScreenText.extend({
	
	init : function(game) {
		this._super(game, game.world.state == State.WEAPON_PICKED_UP ? "This door is locked. Blow it up!" : "This door is locked. You need to find the key.");
	}
	
});

var ScreenWin = Screen.extend({
	
	TIME_TO_SHOW : 60000,
	text : "",
	
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
	}
});

var ScreenDeath = ScreenWin.extend({
	
	TIME_TO_SHOW : 5000,
	
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