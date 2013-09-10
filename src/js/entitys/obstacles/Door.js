EntityObstacleDoor = EntityObstacle.extend({
	
	MESSAGE_RANGE: 100,
	
	
	init : function(image, startingPoint, width, height, collisionBox) {
		this._super(image, startingPoint, width, height, Team.THE_FROG_PIRATES, collisionBox);
		this.setFullHealth(1);
	},
	
	update : function() {
		//TODO
	},
	
	die : function() {
		//TODO
		
		this._super();
	},
	
	onDestroyed : function() {}

});