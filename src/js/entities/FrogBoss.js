var EntityHumanoidEnemyFrogBoss = EntityHumanoidEnemy.extend({
	
	ANIMATION_TYPE_IDLE : 0,
	ANIMATION_TYPE_ATTACK_START : 1,
	ANIMATION_TYPE_ATTACK_FINISH : 2,
	ANIMATION_COUNT : 3,
	
	ANIMATION_FRAME_COUNT : [6, 6, 2],
	
	ANIMATION_FRAME_RATE : [166, 83, 83],
	
	PROJECTILE_COORDINATES : [[442, 191]
							 [477, 243]
							 [449, 299]
							 [410, 252]],
	
	ATTACK_MISSILE_WAIT : 150,
	ATTACK_CONTINUE_TIME : 750,
	
	STALKING_SPEED : 6,
	MELEE_DAMAGE : 5,
	
	animType : 0,
	animations : [],
	missileIndex : 0,
	
	RenderDiff : true,
	
	init : function(world, point, opposingTeam) {
		this._super(world, sml["frog_boss"], point, 700, 500);
		this.fullHealth = 300;
		this.currentHealth = this.fullHealth;
		
		for(var i = 0; i < this.ANIMATION_COUNT; i++) {
			var anim = new Animation(0, this.ANIMATION_FRAME_COUNT[i] - 1, i, this.ANIMATION_FRAME_RATE[i]);
			this.animations[i] = anim;
		}
		
		this.animations[this.ANIMATION_TYPE_IDLE].pingPong = true;
		this.animations[this.ANIMATION_TYPE_ATTACK_START].loop = false;
		this.animations[this.ANIMATION_TYPE_ATTACK_FINISH].loop = false;
		
		if (this.isAttacking && !this.wasAttacking) {
			this.missileIndex = 0;
		}
		
		this.addBehavior(new Behavior(1, new MeleeAttack(opposingTeam, this.MELEE_DAMAGE)));
		this.addBehavior(new Behavior(2, new TadpoleAttack(opposingTeam)));
	},
	
	update : function(deltaTime) {
		this.animations[this.animType].update(deltaTime);
		this._super();
		
		if(this.isAttacking) {
			var delta  = Date.now() - this.attackStart - this.getAttackOffsetTime();
			if(delta >= this.ATTACK_MISSILE_WAIT * this.missileIndex && this.missileIndex < this.PROJECTILE_COORDINATES.length) {
				var tadpole = new EntityProjectileTadpole(this, this.getTadpoleAttack());
				this.world.addEntity(tadpole);
				this.missileIndex++;
			}
		}
	},
	
	getTadpoleAttack : function() {
		for(var i = 0; i < this.behaviors.length; i++) {
			var behavior = this.behaviors[i];
			if (behavior.action instanceof TadpoleAttack) return this.behavior.action;
		}
	},
	
	cycleAttackAnimation : function() {
		this.animations[this.animType].restart();
		this.missileIndex = 0;
	},
	
	stopAttackAnimation : function() {
		this.animType = this.ANIMATION_TYPE_IDLE;
		this.animations[this.animType].restart();
		this.missileIndex = 0;
	},
	
	getAttackOffsetTime : function() {
		return this.ANIMATION_FRAME_RATE[this.ANIMATION_TYPE_ATTACK_START] * this.ANIMATION_FRAME_COUNT[this.ANIMATION_TYPE_ATTACK_START];
	},
	
	getAttackTime : function() {
		return (this.ANIMATION_FRAME_RATE[this.ANIMATION_TYPE_ATTACK_START] * 
				this.ANIMATION_FRAME_COUNT[this.ANIMATION_TYPE_ATTACK_START]) + 
				this.ATTACK_CONTINUE_TIME + 
				(this.ANIMATION_FRAME_RATE[this.ANIMATION_TYPE_ATTACK_FINISH] * this.ANIMATION_FRAME_COUNT[this.ANIMATION_TYPE_ATTACK_FINISH]);
	},
	
	updateAnimation : function() {
		if(this.isAttacking) {
			var delta = Date.now() - this.attackStart;
			var oldAnim = this.animType;
			
			if(!this.hasAttackHappened) {
				this.animType = this.ANIMATION_TYPE_ATTACK_START;
			} else if(delta >= this.getAttackOffsetTime() + this.ATTACK_CONTINUE_TIME) {
				this.animType = this.ANIMATION_TYPE_ATTACK_FINISH;
			}
			
			if(oldAnim != this.animType) this.animations[this.animType].restart();
		} else if(!this.wasAttacking) {
			this.animType = this.ANIMATION_TYPE_IDLE;
			this.animations[this.animType].restart();
		}
	},
	
	render : function() {
		ctx.save();
		ctx.translate(0, 40);
		this._super(true);
		ctx.restore();
	},
	
	getFrame : function() {
		return this.animations[this.animType].getCurrentFrame();
	},
	
	die : function() {
		this.world.setNumberOfBosses(this.world.getNumberOfBosses() - 1);
		sound.play("Frog_Boss_Exploding");
		
		if (this.world.state == State.ENGINES_ON && !this.world.hasPirates()) {
			this.world.setState(State.WIN);
		}
		this._super();
	}
	
});