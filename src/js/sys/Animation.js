/*
Based on Animation framework in Slick2d.
*/
var AnimationFrame = Class.extend({
	duration: 0,
	x: -1,
	y: -1,
	init : function(dur,xb,yb) {
		this.duration = dur;
		this.x = xb;
		this.y = yb;
	}
});
var Animation = Class.extend({
	currentFrame: -1,
	nextChange: 0,
	stopped: false,
	timeLeft: 0,
	stopAt: -2,
	lastUpdate: 0,
	direction: 1,
	pingPong: false,
	loop: true,
	
	init : function(x0,x1,yt,duration) {
		this.frames = new Array();
		for(var x = x0; x <= x1; x++) {
			this.addFrame(duration,x,yt);
		}
	},
	
	start : function() {
		if(!this.stopped)
			return;
		if(this.frames.length == 0)
			return;
		this.stopped = false;
		this.nextChange = this.timeLeft;
	},
	
	stop : function() {
		if(this.frames.length == 0)
			return;
		this.timeLeft = this.nextChange;
		this.stopped = true;
	},
	
	restart : function() {
		if(this.frames.length == 0)
			return;
		
		this.stopped = false;
		this.currentFrame = 0;
		this.nextChange = this.frames[0].duration;
		this.lastUpdate = 0;
	},
	
	nextFrame : function(Delta) {
		if(this.stopped)
			return;
		if(this.frames.length == 0)
			return;
		
		this.nextChange -= Delta;
		
		while(this.nextChange < 0 && (!this.stopped)) {
			if (this.currentFrame == this.stopAt) {
				this.stopped = true;
				break;
			}
			
			if ((this.currentFrame == this.frames.length - 1) && (!this.loop) && (!this.pingPong)) {
	            this.stopped = true; 
				break;
			}
			
			this.currentFrame = this.currentFrame + this.direction;
			if(this.currentFrame >= this.frames.length) {
				this.currentFrame = 0;
			}
			
			if (this.pingPong) {
				if (this.currentFrame <= 0) {
					this.currentFrame = 0;
					this.direction = 1;   
					if (!this.loop) {            
                        this.stopped = true;            
                        break;     
                    }       
				}
				else if (this.currentFrame >= this.frames.length-1) {
					this.currentFrame = this.frames.length-1;
					this.direction = -1;
				}
			}
			
			this.nextChange = this.nextChange + this.frames[this.currentFrame].duration;
		}
	},
	
	update : function(Delta) {
		this.nextFrame(Delta);
	},
	
	setCurrentFrame : function(frameset) {
		this.currentFrame = frameset;
	},
	
	getCurrentFrame : function() {
		if(this.currentFrame >= 0)
			return [this.frames[this.currentFrame].y,this.frames[this.currentFrame].x];
		else
			return [0, 0];
		
	},
	
	addFrame : function(duration,x,y) {
		if (duration == 0) {
			console.log("Invalid duration for Animation");
			return;
		}
	 
		if (this.frames.length == 0) {
			this.nextChange = duration;
		}
		this.currentFrame = 0;
		this.frames.push(new AnimationFrame(duration, x, y));
		
		
	}
});