var Entity = Class.extend({
	
	velocityY: 0,
	velocityX: 0,
	PosX: 0,
	PosY: 0,
	startX: 0,
	startY: 0,
	
	wasjumping: false,
	jumping: false,
	isMoving: false,
	wasMoving: false,
	frame: 0,
	
	lifestart: 0,
	horizontalSpeed: 0,
	flying: false,
	friction: 0.35,
	jumpSpeed: 22.5,
	gravity: 0.75,
	team: "",
	image: new Image(),
	frame: 0,
	team: 0,
	height : 0,
	width : 0,
	currentanimation : 0,
	currentframe : 0,
	
	FACING_LEFT : 0,
    FACING_RIGHT : 1,
	facing: 0,
	
	//Health and stuff
	fullHealth: 100,
	currentHealth: 100,
	damageModifier: 1,
	invulnerable: false,
	
	inversegravity : false,
	
	init : function(image,startingPoint,width,height,team) {
		this.image = image;
		this.team = team;
		this.lifestart = new Date().getTime();
		this.startX = startingPoint[0];
		this.startY = startingPoint[1];
		this.PosX = startingPoint[0];
		this.PosY = startingPoint[1];
		this.width = width;
		this.height = height;
	},
	
	render : function(Delta) {
		this.frame++;
		if(this.facing == this.FACING_LEFT) {
			DisplayCTX.drawImage(this.image,								// Image
								 this.width*this.currentframe,				// Start X on image
								 this.height*this.currentanimation,			// Start Y on image
								 this.width, 								// Width in image to display
								 this.height,								// Height in image to display
								 this.PosX-BackgX, 							// Position X
								 this.PosY-this.height,						// Position Y
								 this.width,								// Width to display
								 this.height);								// Height to display
		} else {
			DisplayCTX.save();
			DisplayCTX.translate(this.width, 0);
			DisplayCTX.scale(-1, 1);
			DisplayCTX.drawImage(this.image, 
								 this.width*this.currentframe, 
								 this.height*this.currentanimation, 
								 this.width, 
								 this.height, 
								 -(this.PosX-BackgX), 
								 this.PosY-this.height, 
								 this.width, 
								 this.height);
			DisplayCTX.restore();
		}
	},
	
	die : function() {
		var index = EntityList.indexOf(this);
		EntityList.splice(index, 1);
	},
	
	update : function(Delta) {
		
	},
	
	move : function() {
		
		this.velocityX *= this.friction;
		
		if(Math.abs(this.velocityX) < this.friction) { 
            this.velocityX = 0;
        }
		
		if(this.jumping) {
			if(this.inversegravity) {
				this.velocityY -= this.gravity;
			} else {
				this.velocityY += this.gravity;
			}
		} else {
			this.velocityY = 0;
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
			}
		} else {
			if(!checkCollision(this.PosX, newY, this.width, Math.max(this.velocityY, 0.75), true)) {
				this.PosY = newY;
				if(checkCollision(this.PosX, newY+1, this.width, this.velocityY+10, true)) {
					onFloor = true;
					//collidedVertically = true;
				}
			} else {
				onFloor = true;
				collidedVertically = true;
				this.velocityY = 0;
			}
		}
		
		this.wasjumping = this.jumping;
		if(this.inversegravity) {
			this.jumping = !this.flying && !onFloor;
		} else {
			this.jumping = !this.flying && this.PosY < 672 && !onFloor;
		}
		this.wasMoving = this.isMoving;
		this.isMoving = Math.abs(this.velocityX) > 0;
		
		if(this.wasjumping && !this.jumping)
			this.onLanding();
		
		this.updateAnimation();
		
		if (this.velocityX > 0) {
            this.facing = this.FACING_RIGHT;
        } else if (this.velocityX < 0) {
            this.facing = this.FACING_LEFT;
        }
			
		if(collidedVertically || collidedHorizontally)
			this.onCollision(collidedHorizontally,collidedVertically);
	},
	
	onLanding : function(){},
	updateAnimation : function(){},
	onCollision : function(collidedHorizontally,collidedVertically){},
		
	getCollisionHitbox : function(hitbox) {
		return hitbox;
	},
	
	isIntersecting : function(Entity otherEntity) {
        return this.width > otherEntity.PosX && this.PosX < (otherEntity.width+otherEntity.PosX) && this.height > (otherEntity.PosY-otherEntity.height) && this.PosY < otherEntity.PosY;
    },
	
	DeltaX : function(otherEntity) {
		
		var rightAfterLeft = (this.PosX+this.width) >= otherEntity.PosX;
        var rightBeforeRight = (this.PosX+this.width) <= (otherEntity.PosX+otherEntity.width);
        var rightIntersects = rightAfterLeft && rightBeforeRight;

        var leftBeforeRight = this.PosX <= (otherEntity.PosX+otherEntity.width);
        var leftBeforeLeft = this.PosX >= otherEntity.PosX;
        var leftIntersects = leftBeforeRight && leftBeforeLeft;

        var contained = leftBeforeLeft && rightBeforeRight;
        if (rightIntersects || leftIntersects || contained) {
            return 0;
        }

        if ((this.PosX+this.width) < otherEntity.PosX) {
            return Math.abs(otherEntity.PosX - (this.PosX+this.width));
        }

        return Math.abs(this.PosX - (otherEntity.PosX+otherEntity.width));
	},
	
	DeltaYEnt : function(DeltaYEntentity) {
		this.DeltaY(DeltaYEntentity.getPosition());
	},
	
	DeltaY : function(DeltaYRect) {
		var topBelowTop = (this.PosY-this.height) >= (DeltaYRect[1]-DeltaYRect[3]);
        var topAboveBottom = (this.PosY-this.height) <= DeltaYRect[1];
        var topIntersects = topBelowTop && topAboveBottom;
		
		var bottomBelowTop = this.PosY >= (DeltaYRect[1]-DeltaYRect[3]);
        var bottomAboveBottom = this.PosY <= DeltaYRect[1];
        var bottomIntersects = bottomBelowTop && bottomAboveBottom;
		
		var contained = topBelowTop && bottomAboveBottom;
		if (topIntersects || bottomIntersects || contained) {
            return 0;
        }
		
		if ((this.PosY-this.height) < DeltaYRect[1]) {
            return Math.abs(DeltaYRect[1] - (this.PosY-this.height));
        }

        return Math.abs(this.PosY - (DeltaYRect[1]-DeltaYRect[3]));
		
	},
	
	canContinueMoving : function() {
		newX = this.PosX + this.velocityX;
		return !checkCollision(newX, this.PosX, this.width, this.height, false);
	},
	
	invertHorizontalSpeed : function() {
		this.horizontalSpeed *= -1;
	},
	
	isMovingRight : function() {
        return this.horizontalSpeed > 1;
    },
	
	isMovingLeft : function() {
        return this.horizontalSpeed < 1;
    },
	
	moveLeft : function() {
		this.horizontalSpeed = -Math.abs(this.horizontalSpeed);
	},
	
	moveRight : function() {
		this.horizontalSpeed = Math.abs(this.horizontalSpeed);
	},
	
	increaseHealth : function(amount) {
		console.log("Increased health: "+amount);
		this.currentHealth += amount;

        if (this.currentHealth > this.fullHealth) {
            this.currentHealth = this.fullHealth;
        }
	},
	
	decreaseHealth : function(amount) {
		if(!this.invulnerable) {
			this.currentHealth -= amount;
			if (this.currentHealth <= 0) {
            	this.currentHealth = 0;
            	this.die();
        	}
		}
	},
	
	setFullHealth : function(amount) {
		this.fullHealth = amount;
		if (this.currentHealth > this.fullHealth) {
            this.currentHealth = this.fullHealth;
        }
	},
	
	getPosition : function() {
		return new Array(this.PosX,this.PosY,this.width,this.height);
	},
	
	ignoreCollision : function() {
		return false;
	},
	
	radiate : function(reactor,radiation) {
		
	},
	
	onObstacleCollision : function(obstacle) {
    },
	
	ignoreCollision : false
});