var EntityExplosion = Entity.extend({
	
	TYPE_FROMAGE : 0,
	TYPE_TADPOLE : 1,
	TYPE_TADPOLE_SPLATTER : 2,
	
	ANIMATION_FRAME_RATE : [83, 83, 83],
	ANIMATION_FRAME_COUNT : [8, 8, 7],
	FRAME_WIDTH : [100, 125, 100],
	FRAME_HEIGHT : [100, 117, 100],
	FILENAME : ["explosion_fromage", "explosion_tadpole", "explosion_splatter"],
	
	animation : 0,
	type : 0,
	maxLifetime : 0,
	
	init : function(world, startingPoint, type) {
		this._super(world, sml[this.FILENAME[type]], [startingPoint[0] - this.FRAME_WIDTH[type]/2, startingPoint[1] + this.FRAME_HEIGHT[type]/2], this.FRAME_WIDTH[type], this.FRAME_HEIGHT[type], Team.SYSTEM);
		
		var variation = 5;
		this.PosX = this.PosX + Math.random() * variation * 2 - variation;
		this.PosY = this.PosY + Math.random() * variation * 2 - variation;
		this.type = type;
		
		this.animation = new Animation(0, this.ANIMATION_FRAME_COUNT[type], 0, this.ANIMATION_FRAME_RATE[type]);
		this.animation.loop = false;
		this.maxLifetime = this.ANIMATION_FRAME_RATE[type] * this.ANIMATION_FRAME_COUNT[type];
		this.facing = Math.random() <= 0.5 ? this.FACING_LEFT : this.FACING_RIGHT;
		
	},
	
	update : function(delta) {
		this.animation.update(delta);
		
		this.maxLifetime -= delta;
		if (this.maxLifetime <= 0) {
			this.die();
		}
	},
	
	getFrame : function() {
		return this.animation.getCurrentFrame();
	},
	
	ignoreCollision : function() {
		return true;
	}
});