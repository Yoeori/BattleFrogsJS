var EntityPickup = Entity.extend({
	
	update : function(Delta) {
		this.move();
		
		//check entity collision
		ColidEnt = getCollidingEntities(this.getPickupHitbox());
		for(var i = 0; i < ColidEnt.length; i++) {
			if(ColidEnt[i] != this && this.isEligible(ColidEnt[i])) {
				this.applyEffect(ColidEnt[i]);
				this.die();
				break;
			}
		}
	},
	
	isEligible : function(entityEligible) {
		return entityEligible.team == this.team;
	},
	
	getPickupHitbox : function() {
		return new Array(this.PosX,this.PosY,this.width,this.height);
	},
	
	decreaseHealth : function(amount) {
		// NOOO DON'T DECREASE MY HEALTH
	},
	
	applyEffect : function(Effentity) {

	}
});