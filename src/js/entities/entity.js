var Entity = Class.extend({
	
	velocityY: 0,
	velocityX: 0,
	PosX: 0,
	PosY: 0,
	startX: 0,
	startY: 0,
	startingPoint: [],
	
	wasjumping: false,
	jumping: false,
	isMoving: false,
	wasMoving: false,
	frame: 0,
	world: 0,
	
	lifestart: 0,
	horizontalSpeed: 0,
	flying: false,
	friction: 0.35,
	jumpSpeed: 22.5,
	gravity: 0.75,
	animationSheet: new Image(),
	frame: 0,
	team: 0,
	height : 0,
	width : 0,
	
	FACING_LEFT : 0,
    FACING_RIGHT : 1,
	facing: 0,
	
	//Health and stuff
	fullHealth: 100,
	currentHealth: 100,
	damageModifier: 1,
	invulnerable: false,
	
	inversegravity : false,
	RenderDiff : false,
	
	init : function(world, image, startingPoint, width, height, team) {
		this.animationSheet = image;
		this.team = team;
		this.world = world;
		this.lifestart = new Date().getTime();
		this.startX = startingPoint[0];
		this.startY = startingPoint[1];
		this.PosX = startingPoint[0];
		this.PosY = startingPoint[1];
		this.startingPoint = startingPoint;
		this.width = width;
		this.height = height;
	},
	
	render : function() {
		this.frame++;
		
		var curFrame = this.getFrame();
		
		if((this.facing == this.FACING_LEFT && !this.RenderDiff) || (this.facing == this.FACING_RIGHT && this.RenderDiff)) {
			ctx.drawImage(this.animationSheet,								// Image
								 this.width*curFrame[1],					// Start X on image
								 this.height*curFrame[0],					// Start Y on image
								 this.width, 								// Width in image to display
								 this.height,								// Height in image to display
								 this.PosX-this.world.game.camera.CameraX, 	// Position X
								 this.PosY,									// Position Y
								 this.width,								// Width to display
								 this.height);								// Height to display
		} else {
			ctx.save();
			ctx.translate(this.width, 0);
			ctx.scale(-1, 1);
			ctx.drawImage(this.animationSheet, 
								 this.width*curFrame[1], 
								 this.height*curFrame[0], 
								 this.width, 
								 this.height, 
								 -(this.PosX-this.world.game.camera.CameraX), 
								 this.PosY, 
								 this.width, 
								 this.height);
			ctx.restore();
		}
	},
	
	die : function() {
		var index = this.world.entities.indexOf(this);
		this.world.entities.splice(index, 1);
	},
	
	update : function(Delta) {
		
	},
	
	move : function() {
		
		this.velocityX *= this.friction;
		
		if(Math.abs(this.velocityX) < this.friction) { 
            this.velocityX = 0;
        }
		
		if(this.jumping) {
			this.velocityY += this.gravity;
		} else {
			this.velocityY = 0;
		}
		
		newY = this.velocityY + this.PosY;
		newX = this.velocityX + this.PosX;
		
		if (newY > (this.world.FLOOR_LEVEL - this.height)) {
            newY = this.world.FLOOR_LEVEL - this.height;
        }

		//Collision check
		var collidedHorizontally = false;
        var collidedVertically = false;
        var onFloor = false;
		
		if(!this.world.isCollision(this, this.getCollisionHitbox([newX, this.PosY, this.width, this.height]), false)) {
			this.PosX = newX;
		} else {
			this.velocityX = 0;
			collidedHorizontally = true;
		}
		if(this.velocityY < 0) {
			if(!this.world.isCollision(this, this.getCollisionHitbox([this.PosX, newY, this.width, this.height]), false)) {
				this.PosY = newY;
			} else {
				collidedVertically = true;
			}
		} else {
			if(!this.world.isCollision(this, this.getCollisionHitbox([this.PosX, this.PosY+this.height, this.width, Math.max(this.velocityY, this.gravity)]), true)) {
				this.PosY = newY;
			} else {
				collidedVertically = true;
				this.velocityY = 0;
				onFloor = true;
			}
		}
		
		this.wasjumping = this.jumping;
		this.jumping = !this.flying && this.PosY < this.world.FLOOR_LEVEL - this.height && !onFloor;
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
	
	getFrame : function() {
		return new Array(0,0);	
	},
		
	getCollisionHitbox : function(hitbox) {
		return hitbox;
	},
	
	isIntersecting : function(otherEntity) {
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
		return [this.PosX,this.PosY,this.width,this.height];
	},
	
	ignoreCollision : function() {
		return false;
	},
	
	radiate : function(reactor,radiation) {
		
	},
	
	onObstacleCollision : function(obstacle) {
    }
});