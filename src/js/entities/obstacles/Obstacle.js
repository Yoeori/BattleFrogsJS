EntityObstacle = Entity.extend({
	
	collisionBox : [],
	
	instance : "EntityObstacle",
	
	init : function(world, image, startingPoint, width, height, team, pcollisionBox) {
		this._super(world, image, startingPoint, width, height, team);
		this.collisionBox = [];
		this.collisionBox = pcollisionBox;
		this.world.obstacles.push(this);
	},
	
	die : function() {
		var index = this.world.obstacles.indexOf(this);
		this.world.obstacles.splice(index, 1);
		this._super();
	},
	
	getCollisionHitbox : function() {
		return this.collisionBox;
	}
	
	
});