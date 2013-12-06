var EntityProjectileTadpole = EntityProjectile.extend({
	
	RANGE : TadpoleAttack.RANGE,
	DAMAGE : 25,
	SPEED : 20,
	
	init : function(origin, attack) {
		this._super(sml["tadpole"], origin, attack, 70, 49, this.RANGE, this.DAMAGE);
		this.horizontalSpeed = this.facing == this.FACING_RIGHT ? this.SPEED : -this.SPEED;

		var point = [this.facing == this.FACING_LEFT ? this.PosX : this.PosX+this.width,
					this.PosY+(this.height/2)];
		var explosion = new EntityExplosion(this.world, point, Explosion.TYPE_TADPOLE);
		this.world.addEntity(explosion);
	},
	
	die : function() {
		this.getAttack().executing = false;
		
		var point = [this.facing == this.FACING_LEFT ? this.PosX : this.PosX+this.width,
					this.PosY+(this.height/2)];
		var explosion = new EntityExplosion(this.world, point, Explosion.TYPE_TADPOLE_SPLATTER);
		explosion.facing = this.facing == this.FACING_LEFT ? this.FACING_RIGHT : this.FACING_LEFT;
		this.world.addEntity(explosion);
		
		this._super();
	},
	
	getProjectilePoint : function() {
		
	}
	
});