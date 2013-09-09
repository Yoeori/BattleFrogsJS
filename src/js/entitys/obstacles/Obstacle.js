EntityObstacle = Entity.extend({
	
	collisionBox : [],
	
	init : function(image, startingPoint, width, height, team, collisionBox) {
		this._super(image, startingPoint, width, height, team);
		this.collisionBox = [];
		this.collisionBox = collisionBox;
		collisions.push(this.collisionBox);
	},
	
	die : function() {
		var index = collisions.indexOf(this.collisionBox);
		collisions.splice(index, 1);
		this._super();
	},
	
	getCollisionHitbox : function() {
		return this.collisionBox;
	}
	
	
});