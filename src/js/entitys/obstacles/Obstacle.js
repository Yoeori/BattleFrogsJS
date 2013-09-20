EntityObstacle = Entity.extend({
	
	collisionBox : [],
	
	init : function(world, image, startingPoint, width, height, team, pcollisionBox) {
		this._super(world, image, startingPoint, width, height, team);
		this.collisionBox = [];
		this.collisionBox = pcollisionBox;
		this.world.collisions.push(this.collisionBox);
	},
	
	die : function() {
		var index = this.world.collisions.indexOf(this.collisionBox);
		this.world.collisions.splice(index, 1);
		this._super();
	},
	
	getCollisionHitbox : function() {
		return this.collisionBox;
	}
	
	
});