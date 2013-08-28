var frogPirate = function(x,y) {
	this.PosX = x;
	this.PosY = y;
	this.velocity = new Array();
	this.velocityY = 0;
	this.velocityX = 0;
	this.facing = "left";
	this.jumping = false;
	this.isDead = false;
	this.health = 100;
	
	//Attack
	this.ATTACK_MISSILE_TIME = 249;
	this.attackStart = 0;
	this.isAttacking = false;
	
	//Image sheet
	this.height = 191;
	this.width = 388;
	this.animate = new Array(7,10,1);
	this.currentanimation = 2;
	this.framecounter = 0;
	this.animationframerate = new Array(83,83,83);
		
	this.deletefunct = function() {
		delete this;
	}
	
	this.render = function() {
		this.framecounter = this.framecounter+(1000/savedFPS);
		currentframe = Math.round(this.framecounter/this.animationframerate[this.currentanimation]);
		if(currentframe > this.animate[this.currentanimation]) {
			if(this.currentanimation != 1) {
				currentframe = 0;
				this.framecounter = 0;
			}
		}
		if(this.currentanimation == 1) {
			if(currentframe == 0)
				currentframe = 1;
			else if(currentframe >= 1 && this.velocityY > 0)
				currentframe = 0;
			else if(currentframe >= 1)
				currentframe = 2;
		}
		if(this.facing == "right") {
			DisplayCTX.drawImage(sml["player_flip"], 1584-this.width*(currentframe+1), this.height*this.currentanimation, this.width, this.height, this.PosX-BackgX, this.PosY-this.height, this.width, this.height);
		} else {
			DisplayCTX.drawImage(sml["player"], this.width*currentframe, this.height*this.currentanimation+1, this.width, this.height, this.PosX-BackgX, this.PosY-this.height, this.width, this.height);
		}
	}
	
	this.update = function() {
		var wasjumping = this.jumping;
		var wasAttacking = this.isAttacking;
		var attackDelta = new Date().getTime() - this.attackStart;
		var cycledAttack = false;
		
		if (this.isAttacking && attackDelta >= 581) {
            this.isAttacking = false;
			this.width = 152;
            cycledAttack = true;
        }
		
		if(keyboard.space && !this.isAttacking && this.hasgun && !wasjumping) {
			this.isAttacking = true;
			this.attackStart = new Date().getTime();
			var hasAttackHappened = false;
		}
		
		if(this.isAttacking && !hasAttackHappened && attackDelta >= 581) {
			this.PlayShootsound();
			this.width = 200;
			if(this.facing == "left" && !cycledAttack) {
				this.PosX -= 48;
				isLeftShooting = true;
			}
			if(this.facing != "left") {
				EntityList.push(new PlayerBullit(this.PosX+this.width-20-48,this.PosY-(this.height/2)+6,"right"));
			} else {
				EntityList.push(new PlayerBullit(this.PosX+24,this.PosY-(this.height/2)+6,"left"));
			}
			hasAttackHappened = true;
			
		}
		
		if(wasAttacking && !this.isAttacking && this.facing == "left") {
			this.PosX += 48;
			isLeftShooting = false;
		}
		

		if((keyboard.d || keyboard.right) && !this.isAttacking) {
			this.velocityX += this.getWalkingspeed()*8;
			this.facing = "right";
		}
			
		if((keyboard.a || keyboard.left) && !this.isAttacking) {
			this.velocityX -= this.getWalkingspeed()*8;
			this.facing = "left";
		}
			
		if((keyboard.w || keyboard.up) && !this.jumping && !this.isAttacking) {
			this.velocityY = 0;
			this.velocityY -= 30 * 0.75;
			this.jumping = true;
			sound.play(5);
		}
		
		if(this.jumping) {
			this.velocityY += 0.75;
		} else {
			this.velocityY = 0;
		}
		this.velocityX *= 0.35;
		if(Math.abs(this.velocityX) < 0.35) { 
            this.velocityX = 0;
        }
	
		//Collision check
		var collidedHorizontally = false;
        var collidedVertically = false;
        var onFloor = false;
		
		newY = this.velocityY + this.PosY;
		newX = this.velocityX + this.PosX;

		
		if(newY > 672) {
			newY = 672;
			this.jumping = false;
			this.velocityY = 0;
		}
		
		if(!checkCollision(newX, this.PosY, this.width, this.height, false)) {
			this.PosX = newX;
		} else {
			this.velocityX = 0;
			collidedHorizontally = true;
		}
		if(this.velocityY < 0) {
			if(!checkCollision(this.PosX, newY, this.width, this.height, false)) {
				this.PosY = newY;
			} else {
				collidedVertically = true;
				this.velocityY = 0;
				this.jumping = true;
			}
		} else {
			if(!checkCollision(this.PosX, newY, this.width, this.velocityY, true)) {
				this.PosY = newY;
				if(checkCollision(this.PosX, newY+1, this.width, this.velocityY+10, true)) {
					onFloor = true;
				}
			} else {
				this.jumping = false;
				onFloor = true;
				this.velocityY = 0;
			}
		}
		
		this.jumping = this.PosY < 672 && !onFloor;

		if(hasAttackHappened) {
			this.currentanimation = 4;
			currentframe = 0;
			this.framecounter = 0;
		} else if(!this.isAttacking) {
			if(Math.abs(this.velocityX) > 0) {
				if(!this.jumping) {
					this.playWalkingSound();
				}
				if(this.hasgun)
					this.currentanimation = 0;
				else
					this.currentanimation = 3;
			} else {
				this.currentanimation = 2;
			}
			if(this.jumping) {
				this.currentanimation = 1;
				if(!wasjumping) {
					currentframe = 0;
					this.framecounter = 0;
				}
			}
		}
		
		if(wasjumping && !this.jumping) {
			sound.play(4);
		}
	}
	
	this.lastMoveSound = 0;
	this.runningSoundInterval = 200;
	this.walkingSoundInterval = 750;
	this.playWalkingSound = function() {
		var now = new Date().getTime();
		if(this.hasgun) {
			var soundInterval = this.runningSoundInterval;
		} else {
			var soundInterval = this.walkingSoundInterval;
		}
		if(now - this.lastMoveSound > soundInterval) {
			sound.play(1);
			this.lastMoveSound = now;
		}
	}
	
	this.PlayShootsound = function() {
		sound.play(6);
	}
	
	this.getWalkingspeed = function() {
		if(this.hasgun == true) {
			return 1.95;
		} else {
			return 1.35;
		}
	}
}