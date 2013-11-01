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
	
	intactBakeryDoorForeground : 0,
	
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
				collisionsplit_1 = reply.split("\n");
				for(var i = 0; i < collisionsplit_1.length; i++) {
					if(collisionsplit_1[i].indexOf("#") === 0 || collisionsplit_1[i] == "") {
					} else {
						pushObject = collisionsplit_1[i].split("\ ");
						if(pushObject.length == 4){
							finalObj = [];
							for(var b = 0; b < 4; b++) {
								finalObj.push(parseInt(pushObject[b]));
							}
							Object.world.addCollision(finalObj);
						}
					}
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
		
		if(this.screen != 0 && this.paused != true) 
			this.screen.update(deltaTime);
		
		if(this.paused)
			this.startTime += deltaTime;
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
			this.player = new EntityPlayer(this.world, sml["player"], 152, 195);
			
			this.loadCollisions();
			
			this.world.addEntity(new Door_1(this.world, sml["IntoRift_door_Intact"], [6030, 0], 313, 720, [6130, 400, 120, 320]));
			
			this.intactBakeryDoorForeground = new ForegroundObject(sml["BakeryWall_door_Intact"], [11375, 0], 306, 720);
			
			this.world.addEntity(new Door_2(this.world, sml["BakeryWall_door_Intact"], [11375, 0], 306, 720, [11375, 400, 120, 320]));
			
			this.world.addEntity(new Door_3(this.world, sml["Reactor_door_Intact"], [2135, 0], 502, 720, [2135, 400, 120, 320]));
			
			this.world.addEntity(this.player);
			this.rift = new EntityRift(this.world, [2805, 76], 2260, 4350);
			this.world.addEntity(this.rift);
			
			this.world.addEntity(new EntityPickupCroissant(this.world, [10616, 449]));
			var reactor = new EntityReactor(this.world, [456, 307]);
			this.world.addEntity(reactor);
			this.world.addEntity(new EntityPickupWeapon(this.world, [14000, 430]));
			
			this.world.addFrogPirate([9800, 652]);
			this.world.addFrogPirate([11031, 630]);
			this.world.addFrogPirate([12022, 648]);
			
			this.world.addForegroundObject(new ForegroundObject(sml["LeaveCryo_Door_Broken"], [8040, 0], 211, 720));
			this.world.addForegroundObject(this.intactBakeryDoorForeground);
			
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
			this.rift.open();
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