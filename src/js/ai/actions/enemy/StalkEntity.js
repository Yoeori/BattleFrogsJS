var StalkEntity = OpposingEntityInVicinityAction.extend({
	
	RANGE : 300,
	stalkingSpeed : 0,
	
	init : function(opposingTeam, stalkingSpeed) {
		this._super(opposingTeam, this.RANGE);
		this.stalkingSpeed = stalkingSpeed;
	},
	
	performAction : function(entity) {
		if(Math.abs(entity.horizontalSpeed) != this.stalkingSpeed) {
			this.resumeStalking(entity);
		}
		
		var target = this.getNearestEnemy(entity);
		
		if (target != 0) {
			if(entity.PosX > target.PosX) {
				entity.moveLeft();
			} else if(entity.PosX < target.PosX) {
				entity.moveRight();
			}
		}
	},
	
	resumeStalking : function(entity) {
		entity.horizontalSpeed = this.stalkingSpeed;
		if(entity.facing == entity.FACING_LEFT) {
			entity.invertHorizontalSpeed();
		}
	}
	
});