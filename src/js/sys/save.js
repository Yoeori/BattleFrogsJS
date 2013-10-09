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
		
		//newSave["entities"] = [];
		
		//Get entity save
		for(var i = 0; i < SaveObject.world.entities.length; i++) {
			var ent = SaveObject.world.entities[i];
			var addSave = [ent.instance, ent.save([])];
			//newSave["entities"].push(addSave);
		}
		
		//Foreground

		//Get screen save
		//var screen = SaveObject.screen;
		//var addSave = [screen.instance, screen.save([])];
		//newSave["screen"] = addSave;
		
		//Get battleToads game save
		var NewSaveGame = [SaveObject.startTime];
		
		
		//Easter egg
		
		//Get world save
		var world = SaveObject.world;
		var NewSaveworld = [world.obstacles, world.lastEasterEggSpawn, world.numberOfBosses, world.state];
		var newSave = {game: NewSaveGame, world: NewSaveworld};
		console.log((newSave));
		//localStorage.setItem("BattleFrogs_Game", JSON.stringify(newSave));
	},
	
	saveRestore : function() {
		
	}
	
});
var save = new Save();