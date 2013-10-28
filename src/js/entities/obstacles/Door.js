var EntityObstacleDoor = EntityObstacle.extend({
	
	MESSAGE_RANGE: 100,
	
	instance : "EntityObstacleDoor",
	
	init : function(world, image, startingPoint, width, height, collisionBox) {
		this._super(world, image, startingPoint, width, height, Team.THE_FROG_PIRATES, collisionBox);
		this.setFullHealth(1);
	},
	
	update : function() {
		var player = this.world.getNearestEntity([this.PosX+(this.width/2),this.PosY-(this.height/2)], Team.THE_FRENCH);

		var deltaX = player.deltaX(this);
		var deltaY = player.deltaY(this.getCollisionHitbox());
		
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
var Door_1 = EntityObstacleDoor.extend({
	
	instance : "Door_1",
	
	onDestroyed : function() {
		this.world.setState(State.CRYO_DOOR_BLOWN);
		this.world.addForegroundObject(new ForegroundObject(sml["IntoRift_door_Broken"], [6030, 0], 313, 720));
	}
});
var Door_2 = EntityObstacleDoor.extend({
	
	instance : "Door_2",
	
	onDestroyed : function() {
		this.world.removeForegroundObject(game.intactBakeryDoorForeground);
		this.world.addForegroundObject(new ForegroundObject(sml["BakeryWall_door_Broken"], [11375, 0], 306, 720));
	}
});
var Door_3 = EntityObstacleDoor.extend({
	
	instance : "Door_3",
	
	onDestroyed : function() {
		this.world.addForegroundObject(new ForegroundObject(sml["Reactor_door_Broken"], [2135, 0], 502, 720));
	}
});