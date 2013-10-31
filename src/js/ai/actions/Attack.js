var Attack = OpposingEntityInVicinityAction.extend({
	
	cooldown : 0,
	executing : false,
	lastAttack : 0,
	
	init : function(opposingTeam,range,cooldownMs) {
		this._super(opposingTeam,range);
		this.executing = false;
        this.cooldown = cooldownMs;
	},
	
	performAction : function(entity) {
		if (!this.shouldAnimateAttack() && this.isOnCooldown()) return;
		
		if (!this.executing && (!this.shouldAnimateAttack() || entity.isReadyForAttack)) {
			this.executing = true;
			this.lastAttack = new Date().getTime();
			entity.horizontalSpeed = 0;
			var target = this.getNearestEnemy(entity);
			
			if (target != 0) {
				if (target.PosX < entity.PosX) {
                    entity.facing = Entity.FACING_LEFT;
                } else {
                    entity.facing = Entity.FACING_RIGHT;
                }
			}
			
			this.performAttack(entity);
		}
	},
	
	performAttack : function(entity) {},
	
	isConditionMet : function(entity) {
        return !this.isOnCooldown() && this._super(entity);
    },
	
	isOnCooldown : function() {
        return (new Date().getTime() - this.lastAttack) < this.cooldown;
    },
	
	shouldAnimateAttack : function() {
        return true;
    }
	
});