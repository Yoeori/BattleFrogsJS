function NextGaussian() {
	return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
}
function ajaxRequest(url,vars,callbackFunction) {
	if(window.XMLHttpRequest){
		var request = new XMLHttpRequest();
	} else {
		var request = new ActiveXObject('MSXML2.XMLHTTP.3.0');
	}
	request.open('GET',url,true);
	request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
 
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			if(request.responseText){
				callbackFunction(request.responseText);
			}
		}
	}
	request.send(vars);
}
var game, gameStarter;
var LoadColl = 0;
var FPS = 60;
function init() {
	var gameStarter = setInterval(function() {
		if(imagesloaded == "done" && soundloaded == true) {
			game = new BattleToads();
			Ticker();
			clearInterval(gameStarter);
		}
	},1000/60);
}
function Ticker() {
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
var Tick = 0;
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
