var canvas = document.getElementById('GameCanvas');
var DisplayCTX = canvas.getContext('2d');
var FPS = 60;
var Tick = 0;
var savedFPS = 60;
var paused = false;
var Debug = false;
var DeltaTime = Date.now();
var lastDelta = Date.now();

var GameRenderer;
var GameUpdater;
var GameFPStick;
var GameTick;

var EntityList = [];
var GUIList = [];

window.onfocus = function() { paused = false; };
window.onblur = function() { paused = true; };

function init() {
	function start() {
		GameRenderer = requestAnimationFrame(render);
		GameUpdater = setInterval(function() {
			if(!paused) {
				update();
				Tick++;
			}
		},15);
		ReadFPS();
		GameFPStick = setInterval(function() {
			if(!paused)
				ReadFPS();
		},1000);
		GameTick = setInterval(function() {
			if(!paused)
				ReadTick();
		},1500);
	}
	var gameStarter = setInterval(function() {
		if(imagesloaded == "done" && soundloaded == true) {
			EntityList[0] = new EntityPlayer(6470,672);
			EntityList[1] = new EntityPickupCroissant(new Array(10616, 449+48));
			EntityList[2] = new EntityPickupWeapon(new Array(14000, 430+36));
            //EntityList[3] = new EntityReactor([456, 307+sml["radiation"].height]);
			GUIList.push(new guiText("Use WASD/Arrow keys to move and jump. Yay"));
			start();
			clearInterval(gameStarter);
		}
	},1000/60);
}
function render() {
	if(!paused) {
		FPS++;
	}
	renderBackground();
	for(var i= EntityList.length; i >= 0; i--) {
		if(EntityList[i] != null) {
			EntityList[i].render(DeltaTime-lastDelta);
		}
	}
	renderForeground();
	if(Debug) {
		rendercollision();
	}
	for(var i=0; i < GUIList.length; i++) {
		GUIList[i].render();
	}
	lastDelta = DeltaTime;
	
	GameRenderer = requestAnimationFrame(render);
}
function update() {
	DeltaTime += 15;
	for(var i=0; i < EntityList.length; i++) {
		if(EntityList[i] != null) {
			EntityList[i].update(15);
		}
	}
	
	for(var i=0; i < GUIList.length; i++) {
		GUIList[i].update();
	}
	
	for(var i = 0; i < sound.BgMusic.length; i++) {
		//sound.BgMusic[i].update();
	}
	
}
function ReadFPS() {
	document.getElementById("fps").innerHTML = FPS;
	savedFPS = FPS;
	FPS = 0;
}
function ReadTick() {
	//Game Ticks
	document.getElementById("Tick").innerHTML = Tick+"%";
	Tick = 0;
}
function ToggleDebug() {
	Debug = !Debug;
}
function restartGame() {
	cancelAnimationFrame(GameRenderer);
	clearInterval(GameUpdater);
	clearInterval(GameFPStick);
	EntityList.length = 0;
	GUIList.length = 0;
	init();
}
worldState = {
	INTRO: 0,
	WEAPON_PICKED_UP: 1,
	GAME_OVER: 2,
	CRYO_DOOR_BLOWN: 3,
	RADIATION_CLEARED: 4,
	ENGINES_ON: 5,
	WIN: 6,
	state: this.INTRO,
	
	set: function(newworldstate) {	
		console.log("Game state was changed to: " + newworldstate);
		this.state = newworldstate;
		this.onWorldStateChanged();
	},
	
	onWorldStateChanged: function() {
		if (this.state == this.WEAPON_PICKED_UP) {
			GUIList.push(new guiText("Guess you won't be needing that key after all. Use SPACE to shoot."));
		} else if (this.state == this.GAME_OVER) {
			GUIList.push();
		} else if (this.state == this.CRYO_DOOR_BLOWN) {
			GUIList.push(new guiText("There is a breach in the reactor room. Hurry!"));
		} else if (this.state == this.RADIATION_CLEARED) {
			setScreen(new RadiationClearedScreen(this));
		} else if (this.state == this.ENGINES_ON) {
			GUIList.push(new guiText("The engines have been enabled, clean up the remaining pirates!"));
			rift.close();
		} else if (this.state == this.WIN) {
			setScreen(new WinScreen(this));
			GUIList.push();
		}
	}
	
}
Team = Object.freeze({
	THE_FRENCH: 0,
	THE_FROG_PIRATES: 1,
	SYSTEM: 2,
});	
function NextGaussian() {
	return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
}