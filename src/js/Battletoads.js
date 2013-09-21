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
	ALLOW_DEBUGGING : false,
	GameRenderer : 0,
    keyboard : 0,
	world : 0,
	rift : 0,
	
	init : function() {
        this.keyboard = new Input();
		this.camera = new Camera(this,[this.GAME_WIDTH, this.GAME_HEIGHT]);
		this.gui = new Gui(this);
		
		this.GAME_WIDTH = canvas.width;
		
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
		Tick++;
		if (this.playing && !this.paused)
			this.world.update(deltaTime);
		
		for(var i = 0; i < sound.BgMusic.length; i++) {
			sound.BgMusic[i].update();
		}
		
		if(this.screen != 0) 
			this.screen.update(deltaTime);
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
	
	keyPressed : function(e) {
		if(e == 115) {		  //F4
			sound.toggleBG();
		} else if(e == 118) { //F7
			this.ALLOW_DEBUGGING = !this.ALLOW_DEBUGGING;
		} else if(e == 119) { //F8
			sound.toggle();
		} else if(e == 120) { //F9
			this.setPlaying(false);
			this.setPlaying(true);
		} else {
			KeySequenceReader.appendChar(e);
		}
		this.keyboard.onKeyDown(e);
	},
	
	setScreen : function(nScreen) {
		if(this.screen != 0) this.screen.onStop();
		this.screen = nScreen;
		if(this.screen != 0) this.screen.onStart();
	},
	
	setPlaying : function(playing) {
		this.playing = playing;
		
		if(playing) {
			this.startTime = Math.round(new Date().getTime());
			this.world = new World(this, [14709, 720]);
			this.player = new EntityPlayer(this.world, 6470, 672);
			
			this.loadCollisions();
			
			var Door_1 = EntityObstacleDoor.extend({
				onDestroyed : function() {
					this.world.setState(State.CRYO_DOOR_BLOWN);
					this.world.addForegroundObject(new ForegroundObject(sml["IntoRift_door_Broken"], [6030, 0-720], 313, 720));
				}
			});
			this.world.addEntity(new Door_1(this.world, sml["IntoRift_door_Intact"], [6030, 720], 313, 720, [6130, 400, 6130+120, 400+320]));
			
			var intactBakeryDoorForeground = new ForegroundObject(sml["BakeryWall_door_Intact"], [11375, 0], 306, 720);
			
			var Door_2 = EntityObstacleDoor.extend({
				onDestroyed : function() {
					this.world.removeForegroundObject(intactBakeryDoorForeground);
					this.world.addForegroundObject(new ForegroundObject(sml["BakeryWall_door_Broken"], [6030, 0-720], 313, 720));
				}
			});
			//this.world.addEntity(new Door_2(this.world, sml["BakeryWall_door_Intact"], [11375, 720], 306, 720, [11375, 400, 11375+120, 400+320]));
			
			this.world.addEntity(this.player);
			this.world.addEntity(new EntityPickupCroissant(this.world, [10616, 449+49]));
			this.world.addEntity(new EntityPickupWeapon(this.world, [14000, 430+36]));
			
			this.world.addForegroundObject(new ForegroundObject(sml["LeaveCryo_Door_Broken"], [8040, 0], 211, 720));
			this.world.addForegroundObject(intactBakeryDoorForeground);
			
			this.setScreen(new ScreenText(this, "Use WASD/Arrow keys to move and jump. Yay"));
		}
	},
	
	onWorldStateChanged : function() {
		console.log("Game state was changed to: " + this.world.state);
		if(this.world.state == State.WEAPON_PICKED_UP) {
			this.setScreen(new ScreenText(this, "Guess you won't be needing that key after all. Use SPACE to shoot."));
		} else if(this.world.state == State.GAME_OVER) {
			this.setScreen(new ScreenDeath(this));
		} else if(this.world.state == State.CRYO_DOOR_BLOWN) {
			this.setScreen(new ScreenText(this, "There is a breach in the reactor room. Hurry!"));
		} else if(this.world.state == State.RADIATION_CLEARED) {
			this.setScreen(new ScreenText(this, "The radiation is gone. Get to the console and turn on the engines!"));
		} else if(this.world.state == State.ENGINES_ON) {
			this.setScreen(new ScreenText(this, "The engines have been enabled, clean up the remaining pirates!"));
			this.rift.close();
		} else if(this.world.state == State.WIN) {
			this.setScreen(new ScreenWin(this));
		}
	},
	
	scorePenalty : function(penalty) {
		this.startTime -= penalty;
	}
});