var ForegroundObject = Class.extend({
	image : 0,
	position : [],
	width : 0,
	height : 0,
	
	init : function(image, position, width, height) {
		this.image = image;
		this.position = position;
		this.width = width;
		this.height = height;
	},
	
	render : function(camera) {
		ctx.drawImage(this.image, this.position[0]-camera.CameraX, this.position[1]);
	}
});