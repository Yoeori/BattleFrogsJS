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
	obstacles : [],
	
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
		this.setNextEasterEggSpawn(Date.now());
	},
	
	update : function(deltaTime) {
		for(var i = 0; i < this.entities.length; i++) {
			this.entities[i].update(deltaTime);
		}
		
		var now = Date.now();
		if((now - this.maxEasterEggInterval) > this.lastEasterEggSpawn) {
			var r = Math.random();
			if(r > 0.5) {
				this.easterEgg = new SpaceKitten(this);
			} else {
				this.easterEgg = new SpacePizza(this);
			}
			this.setNextEasterEggSpawn(Date.now());
		}		
	
		if (this.easterEgg != 0) {
			this.easterEgg.update(deltaTime);
		}
	},
	
	setNextEasterEggSpawn : function(now) {
		var variance = (NextGaussian() * this.SPAWN_RATE_VARIANCE * 2) - this.SPAWN_RATE_VARIANCE;
		this.lastEasterEggSpawn = now + variance;
	},
	
	render : function(camera) {
		if(!this.game.paused) {
			FPS++;
		}
		
		camera.getX();
		ctx.drawImage(sml["starbackground"], 0, 0);
		ctx.drawImage(sml["bg"], camera.CameraX, 0, canvas.width, 720, 0, 0, canvas.width, 720);
		
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
		
		for (var i = 0; i < this.foregroundObjects.length; i++) {
            this.foregroundObjects[i].render(camera);
		}
	},
	
	rendercollision : function(camera) {
		for(var i = 0; i < this.collisions.length; i++) {
			collision = this.collisions[i];
			ctx.strokeStyle="#000";
			ctx.strokeRect(collision[0] - camera.CameraX, 
						   collision[1], 
						   collision[2], 
						   collision[3]);
		}
		for(var i = 0; i < this.obstacles.length; i++) {
			obstacle = this.obstacles[i];
			ctx.strokeStyle="#000";
			ctx.strokeRect(obstacle[0] - camera.CameraX, 
						   obstacle[1], 
						   obstacle[2], 
						   obstacle[3]);
		}
		for(var i=0; i < this.entities.length; i++) {
			ctx.strokeStyle="#FFF";
			ctx.strokeRect(this.entities[i].PosX  - camera.CameraX, 
						   this.entities[i].PosY,
						   this.entities[i].width,
						   this.entities[i].height);
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
	
	addForegroundObject : function(foregroundObject) {
        this.foregroundObjects.push(foregroundObject);
    },
	
	removeForegroundObject : function(foregroundObject) {
		var index = this.foregroundObjects.indexOf(foregroundObject);
		this.foregroundObjects.splice(index, 1);
	},
	
	getCollidingEntities : function(entity) {
		var collisions = [];
		for(var i = 0; i < this.entities.length; i++) {
			var otherEntity = this.entities[i];
			if (otherEntity != entity && !otherEntity.ignoreCollision()) {
				if (intersects(entity.getPosition(), otherEntity.getPosition())) {
                    collisions.push(otherEntity);
                }
			}
		}
		return collisions;
	},
	
	getCollidingEntitiesShape : function(shape) {
		var collisions = [];
		for(var i = 0; i < this.entities.length; i++) {
			var otherEntity = this.entities[i];
			if (!otherEntity.ignoreCollision()) {
				if (intersects(shape, otherEntity.getPosition())) {
                    collisions.push(otherEntity);
                }
			}
		}
		return collisions;
	},
	
	isCollision : function(entity, entityCollisionBox, forGravity) {
		for(var i = 0; i < this.collisions.length; i++) {
			collidable = this.collisions[i];
			if (collidable[3] == 0 && !forGravity) continue;
			
			if(intersects(entityCollisionBox, collidable)) {
				return true;
			}
		}
		
		for(var i = 0; i < this.obstacles.length; i++) {
			obstacle = this.obstacles[i].getCollisionHitbox();
			if(intersects(entityCollisionBox, obstacle)) {
				entity.onObstacleCollision(this.obstacles[i]);
				return true;
			}
		}
		return false;
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
	},
	
	addFrogPirate : function(startingPoint) {
		var frogPirate = new EntityHumanoidEnemyFrogPirate(this, startingPoint, startingPoint, Team.THE_FRENCH);
		this.addEntity(frogPirate);
	},
	
	addFrogPirateG : function(startingPoint, guardingPoint) {
		var frogPirate = new EntityHumanoidEnemyFrogPirate(this, startingPoint, guardingPoint, Team.THE_FRENCH);
		this.addEntity(frogPirate);
	},
	
	getNumberOfBosses : function() {
		return this.numberOfBosses;
	},
	
	setNumberOfBosses : function(numberOfBosses) {
		this.numberOfBosses = numberOfBosses;
	},
	
	removeEasterEgg : function() {
        this.easterEgg = 0;
    }
});