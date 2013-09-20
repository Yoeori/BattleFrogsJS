var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext('2d');
var paused = false;
var DeltaTime = Date.now();
var Debug = false;

window.onfocus = function() { paused = false; };
window.onblur = function() { paused = true; };

Team = Object.freeze({
	THE_FRENCH: 0,
	THE_FROG_PIRATES: 1,
	SYSTEM: 2,
});
var BattleToads = Class.extend({
	GAME_WIDTH : 1280,
	GAME_HEIGHT : 720,
	
	screen : 0,
	startTime : 0,
	playing : false,
	paused : false,
	player : 0,
	gui : 0,
	ALLOW_DEBUGGING: false,
	GameRenderer: 0,
	
	init : function() {
		this.camera = new Camera(this,[this.GAME_WIDTH, this.GAME_HEIGHT]);
		this.gui = new Gui(this);
		
		ObjectT = this;
		this.GameRenderer = requestAnimationFrame(function() {ObjectT.render();});
		setInterval(function() {ObjectT.update(15);},15);
		
		this.setPlaying(true);
	},
	
	loadCollisions : function() {
		if(LoadColl == 0 && LoadColl instanceof Array) {
			this.world.collisions = LoadColl;
		} else {
			Object = this;
			ajaxRequest("acties/collisions.txt","",function(reply) {
				var splited = reply.split(",");
				for(var i=0; i < splited.length; i++) {
					var splitedar = splited[i].split("|")
					Object.world.addCollision(splitedar);
					
				}
			});
		}
	},
	
	update : function(deltaTime) {
		if (this.playing && !this.paused)
			this.world.update(deltaTime);
		
		for(var i = 0; i < sound.BgMusic.length; i++) {
			//sound.BgMusic[i].update();
		}
		
		if(this.screen != 0) this.screen.update(deltaTime);
	},
	
	render : function() {
		
		if (this.playing) {
			this.world.render(this.camera);
			if(this.gui != 0) this.gui.render();
		}
		
		if(this.screen != 0) 
			this.screen.render();
		
		ObjectT = this;
		this.GameRenderer = requestAnimationFrame(function() {ObjectT.render();});
	},
	
	mouseClicked : function() {
		//Do Nothing
	},
	
	keyPressed : function() {
	
	},
	
	setScreen : function(nScreen) {
		if(this.screen != 0) this.screen.onStop();
		this.screen = nScreen;
		if(this.screen != 0) this.screen.onStart();
	},
	
	setPlaying : function(playing) {
		this.playing = playing;
		
		if(playing) {
			this.startTime = Math.round(new Date().getTime() / 1000);
			this.world = new World(this, [14709, 720]);
			this.player = new EntityPlayer(this, 6470, 672);
			this.loadCollisions();
			
			this.world.addEntity(this.player);
			
			
		}
	},
	
	onWorldStateChanged : function() {
		if(world.state == State.WEAPON_PICKED_UP) {
			this.setScreen(new guiText("Guess you won't be needing that key after all. Use SPACE to shoot."));
		} else if(world.state == State.GAME_OVER) {
			this.setScreen();
		} else if(world.state == State.CRYO_DOOR_BLOWN) {
			this.setScreen(new guiText("There is a breach in the reactor room. Hurry!"));
		} else if(world.state == State.RADIATION_CLEARED) {
			this.setScreen(new RadiationClearedScreen(this));
		} else if(world.state == State.ENGINES_ON) {
			this.setScreen(new guiText("The engines have been enabled, clean up the remaining pirates!"));
			rift.close();
		} else if(world.state == State.WIN) {
			this.setScreen(new WinScreen());
		}
	},
	
	scorePenalty : function(penalty) {
		this.startTime -= penalty;
	}
});