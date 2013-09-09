var EntityPlayer = Entity.extend({
	
	//Anim
	ANIMATION_TYPE_RUN : 0,
	ANIMATION_TYPE_JUMP : 1,
	ANIMATION_TYPE_IDLE : 2,
	ANIMATION_TYPE_WALK : 3,
	ANIMATION_TYPE_ATTACK : 4,
	ANIMATION_COUNT : 5,
	animations : [],
	animType : 2,
	animate : [5, 2, 2, 7, 6],
	animationframerate : [83, 83, 166, 166, 83],
	
	hasgun: false,
	lastAutoHeal: 0,
	isLeftShooting: false,
	
	//Attack
	ATTACK_MISSILE_TIME : 249,
	attackStart : 0,
	isAttacking : false,
	wasAttacking : false,
	hasAttackHappened : false,
	
	
	init: function(x, y) {
		this._super(sml["player"], [x, y], 152, 195, Team.THE_FRENCH);
		this.horizontalSpeed = 8;
		this.fullHealth = 200;
		this.currentHealth = this.fullHealth;
		
		for(i = 0; i < this.ANIMATION_COUNT; i++) {
			var animationNew = new Animation(0,this.animate[i],i,this.animationframerate[i]);
			this.animations[i] = animationNew;
		}
		this.animations[this.ANIMATION_TYPE_ATTACK].loop = false;
		this.animations[this.ANIMATION_TYPE_JUMP].pingPong = true;
		
	},
	
	update : function(Delta) {
		this.wasAttacking = this.isAttacking;
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
			this.hasAttackHappened = false;
		}
		
		if(this.isAttacking && !this.hasAttackHappened && attackDelta >= 581) {
			this.PlayShootsound();
			this.width = 200;
			if(this.facing == this.FACING_LEFT && !cycledAttack) {
				this.PosX -= 48;
				this.isLeftShooting = true;
			}
			if(this.facing != this.FACING_LEFT) {
				EntityList.push(new PlayerBullit(this.PosX+this.width-20-48,this.PosY-(this.height/2)+6,"right"));
			} else {
				EntityList.push(new PlayerBullit(this.PosX+24,this.PosY-(this.height/2)+6,"left"));
			}
			this.hasAttackHappened = true;
			
		}
		
		if(this.wasAttacking && !this.isAttacking && this.facing == this.FACING_LEFT) {
			this.PosX += 48;
			this.isLeftShooting = false;
		}
		
		if (this.wasAttacking && !this.isAttacking) {
			this.animType = this.ANIMATION_TYPE_IDLE;
			this.animations[this.animType].restart();
		} else if (cycledAttack && this.isAttacking) {
			this.animations[this.animType].restart();
		}
		
		this.animations[this.animType].update(Delta);

		if((keyboard.d || keyboard.right) && !this.isAttacking) {
			this.velocityX += this.getWalkingspeed()*this.horizontalSpeed;
		}
			
		if((keyboard.a || keyboard.left) && !this.isAttacking) {
			this.velocityX -= this.getWalkingspeed()*this.horizontalSpeed;
		}
			
		if((keyboard.w || keyboard.up) && !this.jumping && !this.wasjumping &&!this.isAttacking) {
			if(this.velocityY == 0)
				sound.play("AnnaB_Jumping_Up");
			this.velocityY -= this.jumpSpeed;
			this.jumping = true;
			this.animType = this.ANIMATION_TYPE_JUMP;
			this.animations[this.animType].start();
			this.animations[this.animType].setCurrentFrame(0);
			this.animations[this.animType].stopAt = this.animate[this.animType];
		}
		
		if (Date.now() - this.lastAutoHeal > 10000) {
			this.increaseHealth(1);
			this.lastAutoHeal = Date.now();
		}
		
		this.playWalkingSound();
		
		this.move();
	},
	
	updateAnimation: function() {
		if (this.wasjumping && !this.jumping) {
			this.animType = this.isMoving ? this.getWalkingAnimation() : this.ANIMATION_TYPE_IDLE;
			this.animations[this.animType].restart();
		} else if (this.jumping && this.velocityY > 0) {
			this.animType = this.ANIMATION_TYPE_JUMP;
			this.animations[this.animType].setCurrentFrame(0);
			this.animations[this.animType].stop();
		} else if (this.isAttacking) {
			this.animType = this.ANIMATION_TYPE_ATTACK;
			if (!this.wasAttacking) 
				this.animations[this.animType].restart();
		} else if (this.wasMoving && !this.isMoving) {
			this.animType = this.jumping ? this.ANIMATION_TYPE_JUMP : this.ANIMATION_TYPE_IDLE;
			this.animations[this.animType].restart();
		} else if (!this.wasMoving && this.isMoving && !this.jumping) {
			this.animType = this.getWalkingAnimation();
			this.animations[this.animType].restart();
        }
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
		if(this.isMoving && !this.jumping && now - this.lastMoveSound > soundInterval) {
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
	
	radiate : function(reactor,radiation) {
		if (Math.random() < radiation * 0.5) {
            this.decreaseHealth(1);
        }
	},
	
	getFrame : function() {
		return this.animations[this.animType].getCurrentFrame();
	},
	
	die : function() {
		worldState.set(worldState.GAME_OVER);
		this._super();
	}
});