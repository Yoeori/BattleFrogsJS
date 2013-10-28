var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext('2d');
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
/* based on slick2d Geom Rectangle Intersect */
function intersects(shape1, shape2) {
	if(shape1.length == 4 && shape2.length == 4) {
		
		//Rect - Rect
		if ((shape1[0] > (shape2[0] + shape2[2])) || ((shape1[0] + shape1[2]) < shape2[0]))
			return false;
		if ((shape1[1] > (shape2[1] + shape2[3])) || ((shape1[1] + shape1[3]) < shape2[1]))
			return false;
		return true;
		
	} else if((shape1.length == 3 && shape2.length == 4) || (shape1.length == 4 && shape2.length == 3)) {
		
		//Circle - Rect
		if(shape1.length == 3){ var circle = shape1; var rect = shape2; }
		else { var circle = shape2; var rect = shape1; }
		
		if (circle[0]  < rect[0])
			var closestX = rect[0];
		else if(circle[0]  > rect[0] + rect[2])
			var closestX = rect[0] + rect[2];
		else
			var closestX = circle[0];
		
		if (circle[1] < rect[1])
			var closestY = rect[1];
		else if(circle[1] > rect[1] + rect[3])
			var closestY = rect[1] + rect[3];
		else
			var closestY = circle[1];
		
		var distance = distanceSquared([circle[0], circle[1]], [closestX, closestY]);
		if (distance < circle[2])
			return true;
		else
			return false;
		
	} else {
		console.log("Can't check collision");
		return false;
	}
}
function contains(Pos1, Pos2) {
		if (Pos2[0] <= Pos1[0]) {
			return false;
		}
		if (Pos2[1] <= Pos1[1]) {
			return false;
		}
		if (Pos2[0] >= Pos1[0]+Pos1[2]) {
			return false;
		}
		if (Pos2[1] >= Pos1[1]+Pos1[3]) {
			return false;
		}
		
		return true;
}
function distanceSquared(fromXY, toXY) {
	var a = fromXY[0] - toXY[0];
    var b = fromXY[1] - toXY[1];
	
	return Math.sqrt((a * a) + (b * b));
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
		if(window.innerHeight <= 765) {
			document.getElementById("footer").style.color = "#FFF";
			document.getElementById("b").style.border = "#FFF 1px solid";
			document.getElementById("b1").style.border = "#FFF 1px solid";
		} else {
			document.getElementById("footer").style.color = "#000";
			document.getElementById("b").style.border = "#000 1px solid";
			document.getElementById("b1").style.border = "#000 1px solid";
		}
		if(!game.paused)
			ReadFPS();
	},1000);
	GameTick = setInterval(function() {
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
window.onfocus = function() { if(game instanceof BattleToads) game.paused = false; };
window.onblur = function() { if(game instanceof BattleToads) game.paused = true; };
/*
		  ctx.beginPath();
		  ctx.arc(5000-this.camera.CameraX, 200, 120, 0, 2 * Math.PI, false);
		  ctx.fillStyle = 'black';
		  ctx.fill();
*/

