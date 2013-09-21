EntityObstacleDoor = EntityObstacle.extend({
	
	MESSAGE_RANGE: 100,
	
	
	init : function(world, image, startingPoint, width, height, collisionBox) {
		this._super(world, image, startingPoint, width, height, Team.THE_FROG_PIRATES, collisionBox);
		this.setFullHealth(1);
	},
	
	update : function() {
		var player = this.world.getNearestEntity([this.PosX+(this.width/2),this.PosY-(this.height/2)], Team.THE_FRENCH);
		//console.log(player);
		var deltaX = player.DeltaX(this);
		var deltaY = player.DeltaX(this.getCollisionHitbox());
		
		//console.log(deltaX+" : "+deltaY);
		//console.log(this.getCollisionHitbox());
		
		if (deltaX <= this.MESSAGE_RANGE && deltaY == 0) {
            this.world.game.setScreen(new ScreenLockedDoor(this.world.game));
        }
	},
	
	die : function() {
		this.onDestroyed();
		sound.play("Door_Explosion");
		this._super();
	},
	
	onDestroyed : function() {}

});