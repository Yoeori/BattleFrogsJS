var Behavior = Class.extend({
	
	priority : 0,
	action : 0,
	
	init : function(priority, action) {
		this.priority = priority;
		this.action = action;
	},
	
	compareTo : function(behavior) {
		if(this.priority == behavior.priority) {
			return 0;
		} else if(this.priority < behavior.priority) {
			return -1;
		}
		return 1;
	}
	
});