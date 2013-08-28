 var PlayerBullit = function(x,y,facing) {
	this.PosX = x;
	this.PosY = y;
	this.velocityX = 0;
	this.facing = facing;
	this.isDead = false;
	this.spawntime = new Date().getTime();
	var object = this;
	this.isAlmostDead = false;
	this.framecounter = 0;
	this.frametime = 0;
	
	if(facing == "right") {
		this.Speed = 20;
	} else {
		this.Speed = -20;
	}
	
	//Image sheet
	this.height = 29;
	this.width = 60;
	
	this.kill = function() {
		this.isAlmostDead = true;
		setTimeout(function() { object.deleteEntity(); }, 664);
	}
	
	this.deleteEntity = function() {
		this.isDead = true;
	}
	
	this.render = function(delta) {
		if(this.facing == "right") {
			DisplayCTX.drawImage(sml["missile"], this.PosX-BackgX, this.PosY-this.height);
		} else {
			DisplayCTX.save();
			DisplayCTX.translate(sml["missile"].width, 0);
			DisplayCTX.scale(-1, 1);
			DisplayCTX.drawImage(sml["missile"], -this.PosX+BackgX, this.PosY-this.height);
			DisplayCTX.restore();
		}
	}
	
	this.update = function() {
		if((new Date().getTime())-this.spawntime >= 5000) {
			this.kill();
		}
		this.velocityX += this.Speed;
		this.velocityX *= 0.35;
		
		newX = this.velocityX + this.PosX;

		if(checkCollision(newX, this.PosY, this.width, this.height)) {
			this.kill();
		}
		
		this.PosX = newX;
	}
}