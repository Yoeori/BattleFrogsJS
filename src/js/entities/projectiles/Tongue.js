var EntityProjectileTongue = EntityProjectile.extend({
	
	RANGE : TongueAttack.RANGE + 100,
	DAMAGE : 15,
	SPEED : 12,
	
	init : function(origin, attack, width, height) {
		this._super(sml["empty.png"], origin, attack, width, height, this.RANGE, this.DAMAGE);
		this.horizontalSpeed = this.facing == this.FACING_RIGHT ? this.SPEED : -this.SPEED;
	},
	
	render : function() {},
	
	die : function() {
		this.attack.executing = false;
		this._super();
	}
});