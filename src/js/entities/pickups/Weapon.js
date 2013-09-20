var EntityPickupWeapon = EntityPickup.extend({
	
	init : function(world, startingPoint) {
		this._super(world, sml["weapon"], startingPoint, 80, 36, Team.THE_FRENCH);
	},
	
	render : function() {
		ctx.save();
		ctx.translate(0, (Math.sin(Date.now() / 400) * 10) - 25);
		this._super();
		ctx.restore();
	},
	
	isEligible : function(entityEligible) {
		return this._super(entityEligible) && entityEligible instanceof EntityPlayer;
	},
	
	applyEffect : function(Effentity) {
		Effentity.hasgun = true;
		this.world.setState(State.WEAPON_PICKED_UP);
		sound.play("weapon_pickup_v2");
	},
	
	getPickupHitbox : function() {
		padding = 50;
		return new Array(this.PosX - padding,this.PosY,this.width + padding,this.height);
	}
	
});