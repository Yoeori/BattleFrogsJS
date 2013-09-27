var MaleeAttack = Attack.extend({
	
	COOLDOWN_MS : 100,
	RANGE : 0,
	
	damage : 0,
	
	init : function(opposingTeam, damage) {
		this._super(opposingTeam, this.RANGE, this.COOLDOWN_MS);
		
		this.damage = damage;
	},
	
	performAttack : function(entity) {
		var target = this.getNearestEnemy(entity);
		
		if (target != 0) {
			target.decreaseHealth(this.damage);
		}
		
		this.setExecuting(false);
	},
	
	isConditionMet : function(entity) {
		return this.isEnemyInRange(entity);
	},
	
	shouldAnimateAttack : function() {
		return false;
	}
});