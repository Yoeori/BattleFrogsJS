var EntityHumanoid = Entity.extend({
	
	behaviors : [],
	
	init : function(world, image, startingPoint, width, height, team) {
		this._super(world, image, startingPoint, width, height, team);
	},
	
	addBehavior : function(behavior) {
		this.behaviors.push(behavior);
	},
	
	applyCurrentBehavior : function() {
		for(var i = 0; i < this.behaviors.length; i++) {
			var action = this.behaviors[i].action;
			if(action.isConditionMet(this)) {
				action.performAction(this);
				break;
			}
		}
	},
	
	update : function(delta) {
		this.applyCurrentBehavior();
		
		this.velocityX += this.horizontalSpeed * 0.85;
		this.move();
	},
	
	getStartingPoint : function() {
		return this.startingPoint;
	},
	
	isReadyForAttack : function() {
		return false;
	}
	
});