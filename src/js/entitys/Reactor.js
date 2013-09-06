var EntityReactor = Entity.extend({
	CONSOLE_ACTIVATION_TIME: 1000,
	radiationImage: null,
	radiation: 1,
	radiationPulse: 0,
	enteredConsoleTime: 0,
	
	init : function(startPoint) {
		this._super(sml["empty"], startPoint, 1, 1, Team.SYSTEM);
		this.radiationImage = sml["radiation"];
	},
	
	update : function(Delta) {
		if (this.frame % 5 == 0) {
			var life = gameContainer.getTime() - lifeStart;
			this.radiationPulse = NextGaussian() * Math.sin(life) * 0.05;
		}
		
		if(this.radiation > 0 ) {
			
		}
	},
	
	shrinkRadiation: function() {
		this.radiation -= 0.35;
		if (this.radiation <= 0) {
			this.radiation = 0;
			worldState.set(worldState.RADIATION_CLEARED);
		}
	},
	
	render : function(Delta) {
		this._super(Delta);
		
		
	}
	
	
});