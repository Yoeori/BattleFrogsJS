var EntityProjectileMissile = EntityProjectile.extend({
	
	RenderDiff : true,
	SPEED : 20,
	
	instance : "EntityProjectileMissile",
	
	init : function(world, origin) {
		this._super(world, sml["missile"], origin, 60, 29, 500, 25);
		this.horizontalSpeed = this.facing == this.FACING_RIGHT ? this.SPEED : -this.SPEED;
	},
	
	die : function() {
		//Create explosion and shizzle (not yet implemented)
		var point = [this.facing == this.FACING_LEFT ? this.PosX : this.PosX+this.width, this.PosY+this.height/2];
		this.world.addEntity(new EntityExplosion(this.world, point, 0));
		this._super();
	},
	
	getProjectilePoint : function(entity) {
		if(entity.facing == 1) {
			return [entity.PosX+entity.width-48, entity.PosY + (entity.height/2) - 23];
		} else {
			return [entity.PosX-48/4, entity.PosY + (entity.height/2) - 23];
		}
	}
	
	
});