var ReturnToGuardPoint = Action.extend({
	
	MAX_GUARDING_POINT_DISTANCE : 600,
	returningSpeed : 0,
	guardPoint : [],
	
	init : function(guardPoint, returningSpeed) {
		this.guardPoint = guardPoint;
		this.returningSpeed = returningSpeed;
	},
	
	performAction : function(entity) {
		entity.horizontalSpeed = this.returningSpeed;
		if(this.isRightOfStartingPoint(entity)) {
			entity.moveLeft();
		} else {
			entity.moveRight();
		}
	},
	
	isRightOfStartingPoint : function(entity) {
		return entity.PosX > this.guardPoint[0];
	},
	
	isConditionMet : function(entity) {
		return entity.deltaXPoint(this.guardPoint) > this.MAX_GUARDING_POINT_DISTANCE;
	}
	
});