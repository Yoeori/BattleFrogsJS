var EntityPickupCroissant = EntityPickup.extend({
	
	instance : "EntityPickupCroissant",
	
	init : function(world, startingPoint) {
		this._super(world, sml["croissant"], startingPoint, 52, 48, Team.THE_FRENCH);
	},
	
	isEligible : function(entityEligible) {
		return this._super(entityEligible) && entityEligible.currentHealth <= entityEligible.fullHealth-25;
	},
	
	applyEffect : function(Effentity) {
		Effentity.increaseHealth(25);
		sound.play("AnnaB_Health_Pickup_v2");
	}
});