var EntityProjectile = Entity.extend({
	
	range : 500,
	damage : 25,
	image: 0,
	
	init: function(IMAGE, origin, width, height, RANGE, DAMAGE) {
		this._super(IMAGE);
		this.range = RANGE;
		this.damage = DAMAGE;
		this.width = width;
		this.height = height;
	},
	
	render : function() {
		DisplayCTX.drawImage(this.image,200,200);
	},

	update: function(Delta) {
		this.velocityX += horizontalSpeed;
		this.move();
		
		
		if(Date().getTime()-this.lifestart >= this.getMaxLifeTime()) {
			this.die();
		}
		
	},
	
	onCollision : function(collidedHorizontally,collidedVertically){
		this.die();
	},
	
	getMaxLifeTime : function() {
		return 5000;
	},
	
	getProjectilePoint : function(getprojentity) {
		if(getprojentity.facing == getprojentity.FACING_RIGHT) {
			ProjectEntityX = getprojentity.PosX+getprojentity.width;
			ProjectEntityY = 0;
		} else {
			ProjectEntityX = getprojentity.PosX;
			ProjectEntityY = 0;
		}
	}
});