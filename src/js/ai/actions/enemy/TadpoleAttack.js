var TadpoleAttack = Attack.extend({
	
	COOLDOWN_MS : 1200,
	RANGE : 500,
	
	init : function() {
		this._super(opposingTeam, this.RANGE, this.COOLDOWN_MS);
	},
	
	performAttack : function() {}
	
});