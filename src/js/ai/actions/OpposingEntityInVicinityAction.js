var OpposingEntityInVicinityAction = Action.extend({

	range : 0,
	opposingTeam: 0,
	
	init : function(opposingTeam, range) {
		this.opposingTeam = opposingTeam;
		this.range = range;
	},
	
	isConditionMet : function(entity) {
		return this.isEnemyInRange(entity);
	},
	
	isEnemyInRange : function(entity) {
		var opposingEntity = this.getNearestEnemy(entity);
		if (opposingEntity == 0) return false;
		
		var intersecting = entity.isIntersecting(opposingEntity);
		var deltaY = entity.deltaYEnt(opposingEntity);
		var inRange = entity.deltaX(opposingEntity) <= this.range;
		var inLineOfSight = (deltaY == 0) && inRange;
		return intersecting || inLineOfSight;
	},
	
	getNearestEnemy : function(entity) {
		return entity.world.getNearestEntity([(entity.PosX+entity.width/2),(entity.PosY+entity.height/2)], this.opposingTeam);
	}
});