var Gui = Class.extend({
	
	game : 0,
	
	init : function(game) {
		this.game = game;
	},
	
	render : function() {
		var pct = game.player.currentHealth / 200;
		var BarX = sml['health_full'].width * (game.player.currentHealth / 200);
		ctx.drawImage(sml['health_empty'], 10, 10);
		ctx.drawImage(sml['health_full'], 0, 0, BarX , 33, 10, 10, BarX, 33);
		if(pct < 1 && pct > 0)
			ctx.drawImage(sml['health_bite'], BarX, 10 + 1);
	}
});