var EntityReactor = Entity.extend({
	CONSOLE_ACTIVATION_TIME: 1000,
	radiationImage: null,
	radiation: 1,
	radiationPulse: 0,
	enteredConsoleTime: 0,
	
	init : function(world, startPoint) {
		this._super(world, sml["empty"], startPoint, 1, 1, Team.SYSTEM);
		this.radiationImage = sml["radiation"];
	},
	
	update : function(Delta) {
		var life = new Date().getTime() - this.lifeStart;
		this.radiationPulse = NextGaussian() * Math.sin(life) * 0.05;
		
		if(this.radiation > 0) {
			var colEntitys = world.getCollidingEntities(this.getRadiationHitbox());
            var max = this.radiationImage.width * 3 / 2;
            var ourPos = [this.PosX,this.PosY];
            for(var i = 0; i < colEntitys.length; i++) {
                if(colEntitys[i] == this) continue;
                var entityPos = [colEntitys[i].PosX+(EntityList[i].width/2),colEntitys[i].PosY+(colEntitys[i].height/2)];
                var dx = entityPos[0]-ourPos[0];
                var dy = entityPos[1]-ourPos[1];
                var amount = Math.sqrt((dx*dx)+(dy*dy));
                if(amount > max) amount = max;
                amount /= max;
                amount = 1 - amount;
                colEntitys[i].radiate(this, amount);
            }
		} else if(worldState.state == worldState.RADIATION_CLEARED) {
            var colEntitys = world.getCollidingEntities(this.getRadiationHitbox());
            var foundPlayer = false;
            for(var i = 0; i < colEntitys.length; i++) {
                if(colEntitys[i] instanceof EntityPlayer) {
                    foundPlayer = true;
                    break;   
                }
            }
            if (this.enteredConsoleTime > 0 && !foundPlayer) {
                this.enteredConsoleTime = 0;
            } else if (this.enteredConsoleTime >= 0 && foundPlayer) {
                this.enteredConsoleTime += Delta;
                if(this.enteredConsoleTime >= this.CONSOLE_ACTIVATION_TIME) {
                    this.enteredConsoleTime = 0;
                    if(hasPirates()) {
                        worldState.set(worldState.ENGINES_ON);
                    } else {
                        worldState.set(worldState.WIN);
                    }
                }
            }
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
        return [this.PosX,this.PosY,(this.radiationImage.width * this.radiation * 3 / 2)];
    },
	
	render : function(Delta) {
        var x = this.PosX;
        var y = this.PosY;
        DisplayCTX.save();
        DisplayCTX.translate(x,y);
        DisplayCTX.scale(this.radiation * 3 + this.radiationPulse, this.radiation * 3 + this.radiationPulse);
        DisplayCTX.drawImage(this.radiationImage,-(this.radiationImage.width/2),(-(this.radiationImage.height/2))-BackgX);
        DisplayCTX.restore();
        
        
	},
    
    ignoreCollision : function() {
        return true;
    }
	
	
});