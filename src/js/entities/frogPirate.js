var EntityHumanoidEnemyFrogPirate = EntityHumanoidEnemy.extend({
	
	ANIMATION_TYPE_RUN : 0,
	ANIMATION_TYPE_ATTACK : 1,
	ANIMATION_TYPE_IDLE : 2,
	ANIMATION_COUNT : 3,
	
	ANIMATION_FRAME_COUNT : [7, 10 ,1],
	ANIMATION_FRAME_RATE : [83, 83, 83],
	
	STALKING_SPEED : 6,
	MELEE_DAMAGE : 5,
	
	guardPoint : [],
	animType : 0,
	animations : [],
	
	RenderDiff : true,
	
	instance : "EntityHumanoidEnemyFrogPirate",
	
	init : function(world, point, guardPoint, opposingTeam) {
		this._super(world, sml["frog_normal"], point, 388, 191);
		
		for (var i = 0; i < this.ANIMATION_COUNT; i++) {
            var anim = new Animation(0, this.ANIMATION_FRAME_COUNT[i] - 1, i,  this.ANIMATION_FRAME_RATE[i]);
            this.animations[i] = anim;
        }
		this.addBehavior(new Behavior(1, new MeleeAttack(opposingTeam, this.MELEE_DAMAGE)));
		//this.addBehavior(new Behavior(2, new TongueAttack(opposingTeam)));
		this.addBehavior(new Behavior(5, new StalkEntity(opposingTeam, this.STALKING_SPEED)));
		this.guardPoint = guardPoint;
		this.addBehavior(new Behavior(25, new ReturnToGuardPoint(this.guardPoint, 12)));
		//this.addBehavior(new Behavior(50, new Patrol(4, 400)));
		
	},
	
	update : function(delta) {
		this.animations[this.animType].update(delta);
		this._super();
	},
	
	cycleAttackAnimation : function() {
		this.animations[this.animType].restart();
	},
	
	stopAttackAnimation : function() {
		this.animType = this.ANIMATION_TYPE_IDLE;
		this.animations[this.animType].restart();
	},
	
	getAttackOffsetTime : function() {
		return 0;
	},
	
	getAttackTime : function() {	
		return this.ANIMATION_FRAME_RATE[this.ANIMATION_TYPE_ATTACK] * this.ANIMATION_FRAME_COUNT[this.ANIMATION_TYPE_ATTACK];
	},
	
	updateAnimation : function() {
		if(this.isAttacking) {
			this.animType = this.ANIMATION_TYPE_ATTACK;
			if(!this.wasAttacking) this.animations[this.animType].restart();
		} else if(this.wasMoving && !this.isMoving) {
			this.animType = this.ANIMATION_TYPE_IDLE;
			this.animations[this.animType].restart();
		} else if(!this.wasMoving && this.isMoving) {
			this.animType = this.ANIMATION_TYPE_RUN;
			this.animations[this.animType].restart();
		}
	},
	
	render : function() {
		this._super();
	},
	
	getCollisionHitbox : function(position) {
		result = [position[0], position[1], position[2], position[3]];
		var cut = 50;
		
		if(this.facing == this.FACING_RIGHT) {
			result[0] = result[0]+cut;
		}
		
		result[2] = result[2] - cut;
		
		return result;
	},
	
	getFrame : function() {
		return this.animations[this.animType].getCurrentFrame();
	},
	
	onLanding : function() {
		sound.play("Frog_Landing");
	},
	
	radiate : function(reactor, radiation) {
		if(this.world.getNumberOfBosses() == 0) {
			reactor.shrinkRadiation();
			//this.world.setNumberOfBosses(1);
			
			this.die();
			
			//this.world.addEntity(); //TODO
		}
	},
	
	die : function() {
		this._super();
		
		console.log("state: " + this.world.state + " - pirates? " + this.world.hasPirates());
		if(this.world.state == State.ENGINES_ON && !this.world.hasPirates()) {
			this.world.setState(State.WIN);
		}
	}
});