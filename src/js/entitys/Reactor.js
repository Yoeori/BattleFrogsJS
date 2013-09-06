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
		
		if(this.radiation > 0) {
			var colEntitys = getCollidingEntities(this.getRadiationHitbox());
            var max = this.image.width * 3 / 2;
            var ourPos = [this.PosX+(this.image.width/2),this.PosY+(this.image.height/2)];
            for(var i = 0; i < colEntitys.length; i++) {
                var entityPos = [colEntitys[i].PosX+(EntityList[i].width/2),colEntitys[i].PosY+(colEntitys[i].height/2)];
                var dx = entityPos[0]-ourPos[0];
                var dy = entityPos[1]-ourPos[1];
                var amount = Math.sqrt((dx*dx)+(dy*dy));
                if(amount > max) amount = max;
                amount /= max;
                amount = 1 - amount;
                colEntitys.radiate(this, amount);
            }
		} else if(worldState.state == worldState.RADIATION_CLEARED) {
            
            
            
        }
	},
	
	shrinkRadiation: function() {
		this.radiation -= 0.35;
		if (this.radiation <= 0) {
			this.radiation = 0;
			worldState.set(worldState.RADIATION_CLEARED);
		}
	},
    
    getRadiationHitbox : function() {
        return [this.PosX+(this.image.width/2),this.PosY+(this.image.height/2),(this.image.width * this.radiation * 3 / 2)];
    },
	
	render : function(Delta) {
		this._super(Delta);
        
	},
    
    ignoreCollision : function() {
        return true;
    }
	
	
});