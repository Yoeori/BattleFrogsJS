var PlayerAttack = Attack.extend({
	
	init : function(opposingTeam, range, cooldownMs) {
		this._super(opposingTeam, range, cooldownMs);
	},
	
	performAttack : function() {}
});