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
		newSave["entities"] = [];
		for(var i = 0; i < SaveObject.world.entities.length; i++) {
			var ent = SaveObject.world.entities[i];
			var addSave = {"object" : ent.instance, "entity" : ent.save({}),  "initialize" : ent.initializeKey};
			newSave["entities"][i] = addSave;
		}
		
		//Foreground
		
		//Obstacles

		//Get screen save
		if(SaveObject.screen != 0) {
			var screen = SaveObject.screen;
			var addSave = {"object": screen.instance, "screen": screen.save({}),};
			newSave["screen"] = addSave;
		}
		
		//Get battleToads game save
		var NewSaveGame = {"startTime" : SaveObject.startTime};
		newSave["game"] = NewSaveGame;
		
		//Easter egg
		
		//Get world save
		var world = SaveObject.world;
		var NewSaveWorld = {"collisions" : world.collisions,
							"lastEasterEggSpawn" : world.lastEasterEggSpawn, 
							"numberOfBosses" : world.numberOfBosses, 
							"state" : world.state};
		newSave["world"] = NewSaveWorld;

		localStorage.setItem("BattleFrogs_Game", JSON.stringify(newSave));
		console.log("Saved battlefrogs");
	},
	
	restore : function(newgame) {
		
		var RestoreSave = JSON.parse(localStorage["BattleFrogs_Game"]);
		console.log(RestoreSave["entities"]);
		
		newgame.world = new World(newgame, [14709, 720]);
		
		//entities
		var entities = RestoreSave["entities"];
		for(var i = 0; i < entities.length; i++) {
			var entity = RestoreSave["entities"][i];
			var initia = this.getInit(entity["initialize"]);
			var Newentity = window[entity["object"]].apply(null, initia);
			//Newentity.restore(entity["entity"]);
			newgame.world.addEntity(Newentity);
		}
		
		
		
		console.log("Restored battlefrogs");
	},
	
	getInit : function(initobject) {
		returnV = [game.world];
		for(var i = 0; i < initobject.length; i++) { //Check vars and parse
			val = initobject[i];
			if(val.replace("sml(", "", val) != val) {
				val = val.replace("sml(", "", val);
				val2 = val.replace(")", "", val);
				val = new Image();
				val.src = val2;
			}
			returnV.push(val);
		}
		
		return returnV;
	}
	
});
var save = new Save();