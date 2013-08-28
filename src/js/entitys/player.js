var EntityPlayer = Entity.extend({
	
	//Anim
	ANIMATION_TYPE_RUN : 0,
    ANIMATION_TYPE_JUMP : 1,
    ANIMATION_TYPE_IDLE : 2,
    ANIMATION_TYPE_WALK : 3,
    ANIMATION_TYPE_ATTACK : 4,
	
	hasgun: false,
	lastAutoHeal: 0,
	
	//Attack
	ATTACK_MISSILE_TIME : 249,
	attackStart : 0,
	isAttacking : false,
	
	//Image sheet
	animate : new Array(5,2,2,7,6),
	currentanimation : 3,
	currentframe : 0,
	framecounter : 0,
	animationframerate : new Array(83,83,166,166,83),
	
	init: function(x,y) {
		this._super(sml["player"],new Array(x,y),152,195,Team.THE_FRENCH);
		this.horizontalSpeed = 8;
		this.fullHealth = 200;
        this.currentHealth = this.fullHealth;
	},
	
	render : function(Delta) {
		this.framecounter = this.framecounter+Delta;
		this.currentframe = Math.round(this.framecounter/this.animationframerate[this.currentanimation]);
		if(this.currentframe > this.animate[this.currentanimation]) {
			if(this.currentanimation != 1) {
				this.currentframe = 0;
				this.framecounter = 0;
			}
		}
		if(this.currentanimation == 1) {
			if(this.currentframe == 0)
				this.currentframe = 1;
			else if(this.currentframe >= 1 && this.velocityY > 0)
				this.currentframe = 0;
			else if(this.currentframe >= 1)
				this.currentframe = 2;
		}
		this._super();
	},
	
	update : function(Delta) {
		var wasAttacking = this.isAttacking;
		var attackDelta = new Date().getTime() - this.attackStart;
		var cycledAttack = false;
		
		if (this.isAttacking && attackDelta >= 581) {
            this.isAttacking = false;
			this.width = 152;
            cycledAttack = true;
        }
		
		if(keyboard.space && !this.isAttacking && this.hasgun && !this.wasjumping) {
			this.isAttacking = true;
			this.attackStart = new Date().getTime();
			var hasAttackHappened = false;
		}
		
		if(this.isAttacking && !hasAttackHappened && attackDelta >= 581) {
			this.PlayShootsound();
			this.width = 200;
			if(this.facing == this.FACING_LEFT && !cycledAttack) {
				this.PosX -= 48;
				isLeftShooting = true;
			}
			if(this.facing != this.FACING_LEFT) {
				EntityList.push(new PlayerBullit(this.PosX+this.width-20-48,this.PosY-(this.height/2)+6,"right"));
			} else {
				EntityList.push(new PlayerBullit(this.PosX+24,this.PosY-(this.height/2)+6,"left"));
			}
			hasAttackHappened = true;
			
		}
		
		if(wasAttacking && !this.isAttacking && this.facing == this.FACING_LEFT) {
			this.PosX += 48;
			isLeftShooting = false;
		}
		

		if((keyboard.d || keyboard.right) && !this.isAttacking) {
			this.velocityX += this.getWalkingspeed()*this.horizontalSpeed;
		}
			
		if((keyboard.a || keyboard.left) && !this.isAttacking) {
			this.velocityX -= this.getWalkingspeed()*this.horizontalSpeed;
		}
			
		if((keyboard.w || keyboard.up) && !this.jumping && !this.isAttacking) {
			this.velocityY = 0;
			this.velocityY -= this.jumpSpeed;
			this.jumping = true;
			sound.play("AnnaB_Jumping_Up");
		}
		
		if (Date.now() - this.lastAutoHeal > 10000) {
            this.increaseHealth(1);
            this.lastAutoHeal = Date.now();
        }
		
		this.move();
		
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
				if(!this.wasjumping) {
					currentframe = 0;
					this.framecounter = 0;
				}
			}
		}
		
		
	},
	
	updateAnimation: function() {
		/*
        if (this.wasjumping && !this.jumping) {
            animType = this.isMoving ? this.getWalkingAnimation() : this.ANIMATION_TYPE_IDLE;
            //animations[animType].restart();
        } else if (isJumping && velocity.y > 0) {
            animType = ANIMATION_TYPE_JUMP;
            animations[animType].setCurrentFrame(0);
            animations[animType].stop();
        } else if (isAttacking) {
            animType = ANIMATION_TYPE_ATTACK;
            if (!wasAttacking) animations[animType].restart();
        } else if (wasMoving && !isMoving) {
            animType = isJumping ? ANIMATION_TYPE_JUMP : ANIMATION_TYPE_IDLE;
            animations[animType].restart();
        } else if (!wasMoving && isMoving) {
            animType = getWalkingAnimation();
            animations[animType].restart();
        }*/
    },
	
	getWalkingAnimation: function() {
		return this.hasgun ? this.ANIMATION_TYPE_RUN : this.ANIMATION_TYPE_WALK;
	},
	
	onLanding : function() {
		sound.play("AnnaB_Landing");
	},
	
	lastMoveSound : 0,
	runningSoundInterval : 200,
	walkingSoundInterval : 750,
	playWalkingSound : function() {
		var now = new Date().getTime();
		if(this.hasgun) {
			var soundInterval = this.runningSoundInterval;
		} else {
			var soundInterval = this.walkingSoundInterval;
		}
		if(now - this.lastMoveSound > soundInterval) {
			sound.play("AnnaB_footstep");
			this.lastMoveSound = now;
		}
	},
	
	PlayShootsound : function() {
		sound.play("weapon_shot");
	},
	
	getWalkingspeed : function() {
		if(this.hasgun == true) {
			return 1.95;
		} else {
			return 1.35;
		}
	},
	
	die : function() {
		worldState.set(worldState.GAME_OVER);
		this._super();
	}
});