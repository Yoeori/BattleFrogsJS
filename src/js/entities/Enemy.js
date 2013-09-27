var EntityHumanoidEnemy = EntityHumanoid.extend({
	
	isAttacking : false,
	isReadyForAttack : false,
	hasAttackHappened : false,
	wasAttacking : false,
	attackStart : 0,
	
	init : function(world, image, point, width, height) {
		this._super(world, image, point, width, height, Team.THE_FROG_PIRATES);
	},
	
	update : function(delta) {
		this.wasAttacking = this.isAttacking;
		var cycledAttack = false;
		var attackDelta = Date.now() - this.attackStart;
		this.isReadyForAttack = false;
		
		if(this.isAttacking && attackDelta >= this.getAttackTime()) {
			this.isAttacking = false;
			cycledAttack = true;
		}
		
		if(!this.wasjumping && !this.jumping && !this.isAttacking && this.canAttack()) {
			this.attackStart = Date.now();
			this.isAttacking = true;
			this.hasAttackHappened = false;
			attackDelta = 0;
		}
		
		if(this.isAttacking && !this.hasAttackHappened && attackDelta >= this.getAttackOffsetTime()) {
			this.isReadyForAttack = true;
			this.hasAttackHappened = true;
		}
		
		if(this.wasAttacking && !this.isAttacking) {
			this.stopAttackAnimation();
		} else if(cycledAttack && this.isAttacking) {
			this.cycleAttackAnimation();
		}
		
		this._super(delta);
	},
	
	isReadyForAttack : function() {
		return this.isReadyForAttack;
	},
	
	cycleAttackAnimation : function() {},
	
	stopAttackAnimation : function() {},
	
	getAttackOffsetTime : function() {},
	
	canAttack : function() {
		for(var i = 0; i < this.behaviors.length; i++) {
			var action = this.behaviors[i].getAction();
			if(action instanceof Attack && action.shouldAnimateAttack() && action.isConditionMet(this))
				return true;
		}
		return false;
	},
	
	getAttackTime : function() {}
	
});