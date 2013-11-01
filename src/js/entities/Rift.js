var EntityRift = Entity.extend({
	
	SPAWN_RATE_VARIANCE : 2000,
	SPAWN_RATE : 15000,
	
	spawnRate : 0,
	minGuardingX : 0,
	maxGuardingX : 0,
	nextSpawn : 15000,
	closed : true,
	
	init : function(world, startingPoint, minGuardingX, maxGuardingX) {
		this._super(world, sml["empty"], startingPoint, 1, 1, Team.THE_FROG_PIRATES);
		this.spawnRate = this.SPAWN_RATE;
		this.minGuardingX = minGuardingX;
		this.maxGuardingX = maxGuardingX;
	},
	
	update : function(deltaTime) {
		this.nextSpawn -= deltaTime;
		if(!this.closed && this.nextSpawn < 0) {
			this.world.addFrogPirate(this.startingPoint, this.getRandomGuardingPoint());
			var variance = (NextGaussian() * this.SPAWN_RATE_VARIANCE * 2) - this.SPAWN_RATE_VARIANCE;
			this.nextSpawn = this.spawnRate + variance;
		}
	},
	
	render : function() {},
	
	getRandomGuardingPoint : function() {
		if(this.world.getNumberOfBosses() == 0) {
			return [0, World.FLOOR_LEVEL];
		} else {
			var randomX = this.minGuardingX+(Math.random()*(this.maxGuardingX-this.minGuardingX));
			return [randomX, World.FLOOR_LEVEL];
		}
	},
	
	decreaseHealth : function() {},
	
	close : function() {
		this.closed = true;
	},
	
	open : function() {
		this.closed = false;
	}

});