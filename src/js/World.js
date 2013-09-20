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
		if(this.game.ALLOW_DEBUGGING)
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
		this.game.onWorldStateChanged();
	},
	
	addCollision : function(col) {
		this.collisions.push(col);
	},
	
	addEntity : function(ent) {
		this.entities.push(ent);
	},
	
	getCollidingEntities : function(Point) {
		if(Point.length == 4) {
			Entitycheck = [Point[0], Point[1]-Point[3], Point[0]+Point[2], Point[1]];
			Entitycolidedlist = [];
			for(var i = 0; i < this.entities.length; i++) {
				if(Entitycheck[2] > this.entities[i].PosX && Entitycheck[0] < (this.entities[i].width+this.entities[i].PosX) && Entitycheck[3] > (this.entities[i].PosY-this.entities[i].height) && Entitycheck[1] < this.entities[i].PosY) {
					Entitycolidedlist.push(this.entities[i]);
				}
			}
			return Entitycolidedlist;
		} else if(Point.length == 3) {
			Entitycolidedlist = [];
			for(var i = 0; i < EntityList.length; i++) {
				//Check circle collision
				var dx = Point[0]-(this.entities[i].PosX+(this.entities[i].width/2));
				var dy = Point[1]-(this.entities[i].PosX-(this.entities[i].height/2))
				var distance = Math.sqrt((dx*dx)+(dy*dy));
				if(distance >= Point[2]) {
					Entitycolidedlist.push(this.entities[i]);
				}
			}
			return Entitycolidedlist;
		} else {
			Entitycolidedlist = [];
			return Entitycolidedlist;
		}
	},
	
	checkCollision : function(x, y, width, height,platform) {
		var player = new Array(x, y-height, x+width, y);
		if(this.game.ALLOW_DEBUGGING) {
			ctx.strokeStyle="#FFF";
			ctx.strokeRect(x - BackgX,y-height,width,height);
		}
		var isCollision = false;
		for(var i = 0; i < this.collisions.length; i++) {
			collision = this.collisions[i];
			if(collision[1] != collision[3]) {
				if(player[2] > collision[0] && player[0] < collision[2] && player[3] > collision[1] && player[1] < collision[3]) {
					return true;
				}
			}
			if(platform) {
				if(player[2] > collision[0] && player[0] < collision[2] && player[3] > collision[1] && player[1] < collision[3]) {
					return true;
				}
			}
		}
	},
	
	hasPirates : function() {
		for(var i = 0; i < this.entities.length; i++) {
			if(this.entities[i] instanceof Humanoid && this.entities[i].team == Team.THE_FROG_PIRATES) {
				return true;
			}
		}
		return false;
	},
	
	getNearestEntity : function(target,team) {
		var result = 0;
		var bestDist = 0;
		for(var i = 0; i < this.entities.length; i++) {
			if (this.entities[i].team != team) continue;
			if (this.entities[i] instanceof EntityHumanoid || this.entities[i] instanceof EntityPlayer) {
				var center = [(this.entities[i].PosX+this.entities[i].width/2),(this.entities[i].PosY-this.entities[i].height/2)];
				var dist = distanceSquared(center,target);
				if (result == 0 || dist < bestDist) {
					bestDist = dist;
					result = this.entities[i];
				}
			}
		}
		return result;
	}
});