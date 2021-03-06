Camera = Class.extend({
	game : 0,
	size : [],
	CameraX : 0,
	
	init : function(game,size) {
		this.game = game;
		this.size = size;
	},
	
	getX : function() {
		var x = (this.game.player.PosX+(this.game.player.width/2)) - (this.game.GAME_WIDTH/2);
		var bounds = this.game.world.size;
		
		if (x < 0)
			x = 0;
		
		if (x > (bounds[0] - this.game.GAME_WIDTH))
			x = (bounds[0] - this.game.GAME_WIDTH);
		
		if(this.game.player.isLeftShooting && x != 0) {
			x += 48/2;
		} else if(this.game.player.isAttacking && x != 0) {
			x -= 48/2;
		}
		
		this.CameraX = x;
		return x;
	}
});