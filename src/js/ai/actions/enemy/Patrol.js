var Patrol = Attack.extend({
	
	patrolLength : 0,
	patrolSpeed : 0,
	
	init : function(patrolSpeed, patrolLength) {
		this.patrolLength = patrolLength;
		this.patrolSpeed = patrolSpeed;
	},
	
	performAction : function(entity) {
		if(Math.abs(entity.horizontalSpeed) != this.patrolSpeed) {
			this.resumePatrol(entity);
		} else {
			if(this.hasReachedRightEnd(entity) && this.hasReachedLeftEnd(entity)) {
				entity.invertHorizontalSpeed();
			}
		}
	},
	
	resumePatrol : function(entity) {
		entity.horizontalSpeed = this.patrolSpeed;
		if(entity.facing == entity.FACING_LEFT) {
			entity.invertHorizontalSpeed();
		}
	},
	
	hasReachedLeftEnd : function(entity) {
		if(entity.facing == entity.FACING_LEFT) {
			var leftPatrolEndPoint = entity.startX - this.patrolLength;
			var hasVenturedOutsidePatrolArea = entity.PosX + (entity.width/2) < this.leftPatrolEndPoint;
			return entity.isMovingLeft() && (!entity.canContinueMoving() || hasVenturedOutsidePatrolArea);
		}
		return false;
	},
	
	hasReachedRightEnd : function(entity) {
		if(entity.facing == entity.FACING_RIGHT) {
			var rightPatrolEndPoint = entity.startX + this.patrolLength;
			var hasVenturedOutsidePatrolArea = entity.PosX + (entity.width/2) > this.rightPatrolEndPoint;
			return entity.isMovingRight() && (!entity.canContinueMoving() || hasVenturedOutsidePatrolArea);
		}
		return false;
	},
	
	isConditionMet : function(entity) {
		return true;
	}
});