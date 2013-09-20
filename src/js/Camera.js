Camera = Class.extend({
	game : 0,
	size : [],
	CameraX : 0,
	
	init : function(game,size) {
		this.game = game;
		this.size = size;
	},
	
	getX : function() {
		var x = (this.game.player.PosX+(this.game.player.width/2)) - (1280/2);
		var bounds = this.game.world.size;
		
		if (x < 0)
			x = 0;
		
		if (x > (bounds[0] - 1280))
			x = (bounds[0] - 1280);
		
		this.CameraX = x;
		return x;
		
		
	}
});