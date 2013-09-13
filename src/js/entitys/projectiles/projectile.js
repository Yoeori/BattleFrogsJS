var EntityProjectile = Entity.extend({
	
	range : 500,
	damage : 25,
	attack : 0,
	
	init: function(image, origin, width, height, RANGE, DAMAGE) {
		this._super(image, [origin.PosX+(origin.width/2),origin.PosY-(origin.height/2)], width, height, origin.team);
		this.damageModifier = origin.damageModifier;
		this.startingPoint = this.getProjectilePoint(origin);
		this.PosX = this.startingPoint[0];
		this.PosY = this.startingPoint[1];
		this.range = RANGE;
		this.damage = DAMAGE;
		this.width = width;
		this.height = height;
		
		this.facing = origin.facing;
		this.flying = true;
	},
	
	render : function() {
		DisplayCTX.drawImage(this.image,200,200);
	},

	update: function(Delta) {
		this.velocityX += this.horizontalSpeed;
		this.move();
		
		
		if(new date().getTime()-this.lifestart >= this.getMaxLifeTime()) {
			this.die();
		}
		
	},
	
	onCollision : function(collidedHorizontally,collidedVertically){
		this.die();
	},
	
	onObstacleCollision : function(obstacleC) {
		if(obstacleC.team != this.team) {
			this.dealDamage(obstacleC);
		}
	},
	
	dealDamage : function(hentity) {
		hentity.decreaseHealth(this.damage*this.damageModifier);
	},
	
	getProjectilePoint : function(getprojentity) {
		if(getprojentity.facing == getprojentity.FACING_RIGHT) {
			return [getprojentity.PosX+getprojentity.width, getprojentity.PosY-(getprojentity.height/2)];
		} else {
			return [getprojentity.PosX-this.width, getprojentity.PosY-(getprojentity.height/2)];
		}
	},
	
	getMaxLifeTime : function() {
		return 5000;
	},
	
	ignoreCollision : function() {
		return true;
	}
});