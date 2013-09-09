var KeySequenceReader = {
		
	sequences : [],
	currentSequence : "",
	
	appendChar : function(e) {
		this.currentSequence = this.currentSequence+String.fromCharCode(e).toLowerCase();
		var matchingSequence = this.getFullyMatchingSequence();
		if(matchingSequence != 0) {
			matchingSequence.effect();
			this.currentSequence = "";
			GUIList.push(new guiText("Cheat activated!"));
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
	EntityList[0].hasgun = true;
}));
KeySequenceReader.sequences.push(new KeySequenceReader.Sequence("babyolenka",function() {
	EntityList[0].increaseHealth(500);
}));
KeySequenceReader.sequences.push(new KeySequenceReader.Sequence("kungfufighting",function() {
	EntityList[0].damageModifier = 5;
}));
KeySequenceReader.sequences.push(new KeySequenceReader.Sequence("ohcamaro",function() {
	EntityList[0].invulnerable = true;
}));