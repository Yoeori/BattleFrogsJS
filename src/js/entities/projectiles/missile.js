var EntityProjectileMissile = EntityProjectile.extend({

	init : function(world, origin) {
		this._super(world, sml["missile"],origin,60,29,500,25);
		this.horizontalSpeed = this.facing == this.FACING_RIGHT ? 20 : -20;
	},
	
	die : function() {
		//Create explosion and shizzle (not yet implemented)
		
		this._super();
	}
	
	
});