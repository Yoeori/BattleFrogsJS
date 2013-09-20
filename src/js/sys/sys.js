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
function getTextSize(text) {
		var who = document.createElement('div');
		who.style.cssText='display:inline-block; padding:0; line-height:1; position:absolute; visibility:hidden; font-size:30px; font-family: verdana;';
		who.appendChild(document.createTextNode(text));
		document.body.appendChild(who);
		var fs = [who.offsetWidth, who.offsetHeight];
		document.body.removeChild(who);
		return fs;
}
function distanceSquared(E1,E2) {
	if(E1[0] > E2[0])
		var dx = E1[0]-E2[0];
	else
		var dx = E2[0]-E1[0];
	
	if(E1[1] > E2[1])
		var dy = E1[1]-E2[1];
	else
		var dy = E2[1]-E1[1];

	return (dx*dx)+(dy*dy);
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
