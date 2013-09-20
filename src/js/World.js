State = Object.freeze({
	INTRO: 0,
	WEAPON_PICKED_UP: 1,
	GAME_OVER: 2,
	CRYO_DOOR_BLOWN: 3,
	RADIATION_CLEARED: 4,
	ENGINES_ON: 5,
	WIN: 6
});
var World = Class.extend({
	FLOOR_LEVEL : 672,
	state : State.INTRO,
	lastEasterEggSpawn : 0,
	maxEasterEggInterval : 15000,
	entities : [],
	collisions : [],
	SPAWN_RATE_VARIANCE : 30*60*1000,
	foregroundObjects : [],
	numberOfBosses : 0,
	easterEgg : 0,
	size : [],
	game : 0,
	
	init : function(game,size) {
		this.game = game;
		this.size = size;
		this.state = State.INTRO;
		this.lastEasterEggSpawn = 0;
		this.entities = [];
		this.collisions = [];
		this.foregroundObjects = [];
		this.numberOfBosses = 0;
		this.easterEgg = 0;
		this.setNextEasterEggSpawn();
	},
	
	update : function(deltaTime) {
		for(var i = 0; i < this.entities.length; i++) {
			this.entities[i].update(deltaTime);
		}
	
		if (this.easterEgg != 0) {
			this.easterEgg.update(deltaTime);
		}
	},
	
	setNextEasterEggSpawn : function() {
	
	},
	
	render : function(camera) {
		if(!this.game.paused) {
			FPS++;
		}
		
		camera.getX();
		ctx.drawImage(sml["starbackground"], 0, 0);
		ctx.drawImage(sml["bg"], camera.getX(), 0, canvas.width, 720, 0, 0, canvas.width, 720);
		
		if (this.easterEgg != 0) {
			this.easterEgg.render(camera);
		}
		
		for(var i= 0; i < this.entities.length; i++) {
			if(this.entities[i] != null) {
				this.entities[i].render();
			}
		}
		
		this.rendercollision(camera);

	},
	
	rendercollision : function(camera) {
		for(var i = 0; i < this.collisions.length; i++) {
			collision = this.collisions[i];
			ctx.strokeStyle="#000";
			ctx.strokeRect(collision[0] - camera.CameraX, collision[1], collision[2] - collision[0] - 4, collision[3] - collision[1]);
		}
		for(var i=0; i < this.entities.length; i++) {
			if(this.entities[i] != null) {
				ctx.strokeStyle="#FFF";
				ctx.strokeRect(this.entities[i].PosX - camera.CameraX,this.entities[i].PosY - this.entities[i].height,this.entities[i].width,this.entities[i].height);
			}
		}
	},
	
	addCollision : function(collision) {
		this.collisions.push(collision);
	},
	
	setState : function(newState) {
		this.state = newState;
		
	},
	
	addCollision : function(col) {
		this.collisions.push(col);
	},
	
	addEntity : function(ent) {
		this.entities.push(ent);
	}
});