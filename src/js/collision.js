//Ajax script
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
var collisions = new Array();
ajaxRequest("acties/collisions.txt","",function(reply) {
	var splited = reply.split(",");
	Collissionsaddlist = new Array();
	for(var i=0; i < splited.length; i++) {
		collisions[i] = new Array();
		var splitedar = splited[i].split("|")
		collisions[i][0] = splitedar[0];
		collisions[i][1] = splitedar[1];
		collisions[i][2] = splitedar[2];
		collisions[i][3] = splitedar[3];
	}
});
function rendercollision() {
	for(var i = 0; i < collisions.length; i++) {
		collision = collisions[i];
		DisplayCTX.strokeStyle="#000";
		DisplayCTX.strokeRect(collision[0] - BackgX,collision[1],collision[2] - collision[0] - 4,collision[3] - collision[1]);
	}
	for(var i=0; i < EntityList.length; i++) {
		if(EntityList[i] != null) {
			if(!EntityList[i].isDead) {
				DisplayCTX.strokeStyle="#FFF";
				DisplayCTX.strokeRect(EntityList[i].PosX - BackgX,EntityList[i].PosY - EntityList[i].height,EntityList[i].width,EntityList[i].height);
			}
		}
	}
	
}
function checkCollision(x, y, width, height,platform) {
	var player = new Array(x, y-height, x+width, y);
	if(Debug) {
		DisplayCTX.strokeStyle="#FFF";
		DisplayCTX.strokeRect(x - BackgX,y-height,width,height);
	}
	var isCollision = false;
	for(var i = 0; i < collisions.length; i++) {
		collision = collisions[i];
		if(collision[1] != collision[3]) {
			if(player[2] > collision[0] && player[0] < collision[2] && player[3] > collision[1] && player[1] < collision[3]) {
				return true;
			}
		}
		if(platform) {
			if(player[2] > collision[0] && player[0] < collision[2] && player[3] > collision[1] && player[1] < collision[3]) {
				return true;
			}
		}
	}
}

//Entity collision check
function getCollidingEntities(Point) {
	Entitycheck = new Array(Point[0], Point[1]-Point[3], Point[0]+Point[2], Point[1])
	Entitycolidedlist = new Array();
	for(var i = 0; i < EntityList.length; i++) {
		if(Entitycheck[2] > EntityList[i].PosX && Entitycheck[0] < (EntityList[i].width+EntityList[i].PosX) && Entitycheck[3] > (EntityList[i].PosY-EntityList[i].height) && Entitycheck[1] < EntityList[i].PosY) {
			Entitycolidedlist.push(EntityList[i]);
		}
	}
	return Entitycolidedlist;
}
function getNearestEntity(target,team) {
	var result = 0;
	var bestDist = 0;
	for(var i = 0; i < EntityList.length; i++) {
		if (EntityList[i].team != team) continue;
		if (EntityList[i] instanceof EntityHumanoid || EntityList[i] instanceof EntityPlayer) {
			var center = [(EntityList[i].PosX+EntityList[i].width/2),(EntityList[i].PosY-EntityList[i].height/2)];
			var dist = distanceSquared(center,target);
			if (result == 0 || dist < bestDist) {
				bestDist = dist;
				result = EntityList[i];
			}
		}
	}
	return result;
}
function distanceSquared(E1,E2) {
	var dx = E1[0]-E2[0];
	var dy = E1[1]-E2[1];
	return (dx*dx)+(dy*dy);
}