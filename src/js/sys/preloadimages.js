loadimages = new Array(	new Array("bg","bg"),
						"starbackground",
					   	"empty",
					   	"radiation",
						
						//Doors
						"BakeryWall_door_Broken",
						"BakeryWall_door_Intact",
						"IntoRift_door_Broken",
						"IntoRift_door_Intact",
						"Reactor_door_Broken",
						"Reactor_door_Intact",
						"LeaveCryo_Door_Broken",
						
						//Player
						"player",
						
						//Health
						"health_bite",
						"health_empty",
						"health_full",
						
						//Player Missile
						"missile",
						"missile_flip",
					   	"explosion_fromage",
						
						//Pickups
						"weapon",
						"croissant",
					   
					    "win",
					    "gameover",
					    "explosion_tadpole",
					    "explosion_splatter",
					   
					   	// Enemys
					    "frog_normal"
					   );
var sml = new Array();
imagesloaded = 0;
function smlload(i) { //Preload all images
	loadimage = loadimages[i];
	
	if(loadimage instanceof Array) {
		returnString = loadimage[0];
		imageurl = loadimage[1];
	} else {
		returnString = loadimage;
		imageurl = loadimage;
	}
	
	sml[returnString] = new Image();
	sml[returnString].onload = function() {
		console.log("Loaded image "+returnString+", "+imageurl+".png");
		imagesloaded++;
		if (i <  loadimages.length-1)
			smlload(i+1);
		
		if(imagesloaded == loadimages.length) {
			imagesloaded = "done";
			console.log("Loaded all images");
		}
	};
	sml[returnString].src = 'sml/'+imageurl+'.png';
}
smlload(0);