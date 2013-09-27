var Patrol = Attack.extend({
	
	patrolLength : 0,
	patrolSpeed : 0,
	
	init : function(patrolSpeed, patrolLength) {
		this.patrolLength = patrolLength;
		this.patrolSpeed = patrolSpeed;
	},
	
	performAction : function(entity) {
		if(Math.abs(entity.horizontalSpeed) != this.patrolSpeed) {
			this.resumePatrol();
		} else {
			//TODO
		}
	},
	
	resumePatrol : function(entity) {
		entity.horizontalSpeed = this.patrolSpeed;
		if(entity.facing == entity.FACING_LEFT) {
			entity.invertHorizontalSpeed();
		}
	},
	
	hasReachedLeftEnd : function(entity) {
		//TODO
	},
	
	hasReachedRightEnd : function(entity) {
		//TODO
	},
	
	isConditionMet : function(entity) {
		return true;
	}
});