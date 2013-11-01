var TongueAttack = Attack.extend({
	COOLDOWN_MS : 1100,
	RANGE : 250,
	
	WIDTH : 40,
	HEIGHT : 40,
	
	init : function(opposingTeam) {
		this._super(opposingTeam, this.RANGE, this.RANGECOOLDOWN_MS);
	},
	
	performAttack : function(entity) {
		sound.play("Frog_Tongue_Whip");
		var tongue = new EntityProjectileTongue(entity, this, this.WIDTH, this.HEIGHT);
		entity.world.addEntity(tongue);
	}
});