var EasterEgg = Class.extend({
	
	animation : 0,
	image : 0,
	position : [],
	width : 0,
	height : 0,
	world : 0,
	framecount : 0,
	
	init : function(world, y, framecount) {
		this.world = world;
		this.framecount = framecount;
	
		this.width = 108;
		this.height = 108;
		
		this.image = sml["splodinkittensheet"];
		this.animation = new Animation(0, this.framecount, y, 166);
		this.position = [568, 280];
		
		this.animation.start();
		this.animation.setCurrentFrame(0);
		this.animation.stopAt = this.framecount;
	},
	
	update : function(delta) {
		if(this.animation.currentFrame == this.framecount-1) {
			this.world.removeEasterEgg();
		}
		
		this.animation.update(delta);
	},
	
	render : function() {
		curFrame = this.animation.getCurrentFrame();
		ctx.drawImage(this.image,
					  this.width*curFrame[1],
					  this.height*curFrame[0],
					  this.width,
					  this.height,
					  this.position[0],
					  this.position[1],
					  this.width,
					  this.height);
	}
});