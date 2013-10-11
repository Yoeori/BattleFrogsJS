var Save = Class.extend({
	
	isEnabled : false,
	lastSave : [],
	
	checkSupport : function() { //Based on Modernizr
		var mod = 'bla';
		try {
			localStorage.setItem(mod, mod);
			localStorage.removeItem(mod);
			return true;
		} catch(e) {
			return false;
		}
	},
	
	init : function() {
		if(this.checkSupport()) {
			this.isEnabled = true;
			if(localStorage["BattleFrogs_Game"] != "undefined") {
				//this.lastSave = JSON.parse(localStorage["BattleFrogs_Game"]);
				this.lastSave = 0;
			} else {
				this.lastSave = 0;
			}
		}
	},
	
	save : function(SaveObject) {
		
		var newSave = {};
		
		//Get entity save
		newSave["entities"] = {}
		for(var i = 0; i < SaveObject.world.entities.length; i++) {
			var ent = SaveObject.world.entities[i];
			var addSave = {"object" : ent.instance, "entity" : ent.save({})};
			newSave["entities"][i] = addSave;
		}
		
		//Foreground

		//Get screen save
		if(SaveObject.screen != 0) {
			var screen = SaveObject.screen;
			var addSave = {"object": screen.instance, "screen": screen.save({})};
			newSave["screen"] = addSave;
		}
		//Get battleToads game save
		var NewSaveGame = {"startTime" : SaveObject.startTime};
		
		
		//Easter egg
		
		//Get world save
		var world = SaveObject.world;
		var NewSaveWorld = {"collisions" : world.collisions,
							"lastEasterEggSpawn" : world.lastEasterEggSpawn, 
							"numberOfBosses" : world.numberOfBosses, 
							"state" : world.state};
		newSave["game"] = NewSaveGame;
		newSave["world"] = NewSaveWorld;
		//console.log(JSON.stringify(newSave));
		localStorage.setItem("BattleFrogs_Game", JSON.stringify(newSave));
	},
	
	saveRestore : function() {
		
	}
	
});
var save = new Save();