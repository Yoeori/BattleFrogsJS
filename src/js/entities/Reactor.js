var EntityReactor = Entity.extend({
	CONSOLE_ACTIVATION_TIME: 1000,
	radiationImage: null,
	radiation: 1,
	radiationPulse: 0,
	enteredConsoleTime: 0,
	
	instance : "EntityReactor",
	
	init : function(world, startPoint) {
		this._super(world, sml["empty"], startPoint, 1, 1, Team.SYSTEM);
		this.radiationImage = sml["radiation"];
	},
	
	update : function(Delta) {
		var life = new Date().getTime() - this.lifeStart;
		this.radiationPulse = NextGaussian() * Math.sin(life) * 0.05;
		
		if(this.radiation > 0) {
			var colEntitys = world.getCollidingEntitiesShape(this.getRadiationHitbox());
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
		} else if(this.world.state == State.RADIATION_CLEARED) {
			var colEntitys = world.getCollidingEntitiesShape(this.getRadiationHitbox());
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
					if(this.world.hasPirates()) {
						this.world.setState(State.ENGINES_ON);
					} else {
						this.world.setState(State.WIN);
					}
				}
			}
		}
	},
	
	shrinkRadiation: function() {
		this.radiation -= 0.35;
		if (this.radiation <= 0) {
			this.radiation = 0;
			this.world.setState(State.RADIATION_CLEARED);
		}
	},
    
    getRadiationHitbox : function() {
		return [this.PosX,this.PosY,(this.radiationImage.width * this.radiation * 3 / 2)];
    },
	
	render : function(Delta) {
		var x = this.PosX;
		var y = this.PosY;
		ctx.save();
		ctx.translate(x,y);
		ctx.scale(this.radiation * 3 + this.radiationPulse, this.radiation * 3 + this.radiationPulse);
		ctx.drawImage(this.radiationImage,-(this.radiationImage.width/2),(-(this.radiationImage.height/2))-BackgX);
		ctx.restore();
	},
    
	ignoreCollision : function() {
		return true;
	}	
});