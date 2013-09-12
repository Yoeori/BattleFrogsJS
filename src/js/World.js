State = Object.freeze({
	INTRO: 0,
	WEAPON_PICKED_UP: 1,
	GAME_OVER: 2,
	CRYO_DOOR_BLOWN: 3,
	RADIATION_CLEARED: 4,
	ENGINES_ON: 5,
	WIN: 6
});
var World = {
	FLOOR_LEVEL: 672,
	state: State.INTRO,
	lastEasterEggSpawn : 0,
	maxEasterEggInterval: 15000,
	entities: [],
	collisions: [],
	SPAWN_RATE_VARIANCE: 30*60*1000,
	foregroundObjects: [],
	numberOfBosses: 0,
	easterEgg: 0,
	
	init : function() {
		this.setNextEasterEggSpawn();
	
	},
	
	update : function() {
		for(var i = 0; i < this.entities.length; i++) {
			this.entities[i].update();
		}
	
		if (this.easterEgg != 0) {
			this.easterEgg.update(deltaTime);
		}
	},
	
	setNextEasterEggSpawn : function() {
	
	},
	
	render : function() {
	
	},
	
	addCollision : function(collision) {
		this.collisions.push(collision);
	}

}