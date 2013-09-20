var KeySequenceReader = {
		
	sequences : [],
	currentSequence : "",
	
	appendChar : function(e) {
		this.currentSequence = this.currentSequence+String.fromCharCode(e).toLowerCase();
		var matchingSequence = this.getFullyMatchingSequence();
		if(matchingSequence != 0) {
			matchingSequence.effect();
			this.currentSequence = "";
			game.setScreen(new ScreenText(game, "Cheat activated!"));
			game.scorePenalty(1000 * 60);
		} else if(!this.hasPartialMatchingSequence()) {
			this.currentSequence = "";
		}
		
	},
	
	
	getFullyMatchingSequence : function() {
		for (var i = 0; i < this.sequences.length; i++) {
            if(this.currentSequence == this.sequences[i].text) {
				return this.sequences[i];
			}
        }
        return 0;
	},
	
	hasPartialMatchingSequence : function() {
		for (var i = 0; i < this.sequences.length; i++) {
			if(this.sequences[i].text.indexOf(this.currentSequence) === 0) {
				return true;
			}
		}
		return false;
	},
	
	Sequence : Class.extend({
		
		text : 0,
		effect : 0,
		
		init : function(sequencet,effect) {
			
			this.text = sequencet;
            this.effect = effect;
		}
		
	})
	
	
	
	
}
KeySequenceReader.sequences.push(new KeySequenceReader.Sequence("krislovesjulia",function() {
	game.player.hasgun = true;
}));
KeySequenceReader.sequences.push(new KeySequenceReader.Sequence("babyolenka",function() {
	game.player.increaseHealth(500);
}));
KeySequenceReader.sequences.push(new KeySequenceReader.Sequence("kungfufighting",function() {
	game.player.damageModifier = 5;
}));
KeySequenceReader.sequences.push(new KeySequenceReader.Sequence("ohcamaro",function() {
	game.player.invulnerable = true;
}));