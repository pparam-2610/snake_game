
var canvas1=document.getElementById("canvas1");
var ctx=canvas1.getContext("2d");
var bodyParts=function(x,y,speed,s2){
	this.x=x,
	this.y=y,
	this.speed=speed,
	this.s2=s2


};
var turnPoints=function(x,y,speedX,speedY){
	this.x=x,
	this.y=y,
	this.speedX=speedX,
	this.speedY=speedY,
	this.passedParts=0

}
var food=function(x,y){
	this.x=x,
	this.y=y
};

var snake_turn=[];
var snake_food=[];
bodyParts.prototype.draw=function(){
	var canvas1=document.getElementById("canvas1");
	var ctx=canvas1.getContext("2d");
	ctx.fillStyle="green";
	ctx.lineWidth=20;
	//ctx.fillRect(this.x,this.y,20,20);
	ctx.beginPath();
	ctx.arc(this.x,this.y,5,0,2*Math.PI)
	ctx.stroke();
	//ctx.fillRect(this.x,this.height+150,122.5,500-(this.height+150));
}
bodyParts.prototype.update_snake=function(){
	this.x+=this.speed;
	this.y+=this.s2;
}
food.prototype.draw=function(){
	var canvas1=document.getElementById("canvas1");
	var ctx=canvas1.getContext("2d");
	ctx.fillStyle="green";
	ctx.fillRect(this.x,this.y,10,10);
};
food.prototype.check_eaten=function(){
	if(snake_food[0].y<=(snake_body[0].y+10)&&snake_food[0].y>=(snake_body[0].y-10)&&snake_body[0].x>=(snake_food[0].x-10)&&snake_body[0].x<=(snake_food[0].x+10)){
		return true;
	}
	else{
		return false;
	}
};
var snake_body=[];
for(var i =0;i<5;i++){
	snake_body.push(new bodyParts(100-25*i,200,0,0))
}
for(var i=0;i<snake_body.length;i++){
	snake_body[i].s2=0;
	snake_body[i].speed=1;
}	
snake_food.push(new food(Math.floor(Math.random()*500+10),Math.floor(Math.random()*300+10)))
	var make_snake_body= function(){
	if(snake_body[snake_body.length-1].speed==0 &&snake_body[snake_body.length-1].s2>0){
		snake_body.push(new bodyParts(snake_body[snake_body.length-1].x,snake_body[snake_body.length-1].y-25,snake_body[snake_body.length-1].speed,snake_body[snake_body.length-1].s2))
	}
	else if(snake_body[snake_body.length-1].speed==0 &&snake_body[snake_body.length-1].s2<0){
		snake_body.push(new bodyParts(snake_body[snake_body.length-1].x,snake_body[snake_body.length-1].y+25,snake_body[snake_body.length-1].speed,snake_body[snake_body.length-1].s2))
	}
	else if(snake_body[snake_body.length-1].speed>0 &&snake_body[snake_body.length-1].s2==0){
		snake_body.push(new bodyParts(snake_body[snake_body.length-1].x-25,snake_body[snake_body.length-1].y,snake_body[snake_body.length-1].speed,snake_body[snake_body.length-1].s2))
	}
	else if(snake_body[snake_body.length-1].speed<0 &&snake_body[snake_body.length-1].s2==0){
		snake_body.push(new bodyParts(snake_body[snake_body.length-1].x+25,snake_body[snake_body.length-1].y,snake_body[snake_body.length-1].speed,snake_body[snake_body.length-1].s2))
	}
}
var check_hit=function(){
	for(var i=1;i<snake_body.length;i++){
		if((snake_body[i].x-10)<=snake_body[0].x&&snake_body[0].x<=(snake_body[i].x+10)&&(snake_body[i].y-10)<=snake_body[0].y&&snake_body[0].y<=(snake_body[i].y+10))
			return true;
	}
	return false;
}
var movement=function(){
	var canvas1=document.getElementById("canvas1");
	var ctx=canvas1.getContext("2d");
	ctx.clearRect(0,0,600,400);
	for(var i=0;i<snake_body.length;i++){
		snake_body[i].draw();
		for(var j=0;j<snake_turn.length;j++){
			if(snake_body[i].x==snake_turn[j].x&&snake_body[i].y==snake_turn[j].y){
				snake_body[i].speed=snake_turn[j].speedX;
				snake_body[i].s2=snake_turn[j].speedY;
				snake_turn[j].passedParts++;
			}
		}
		snake_body[i].update_snake();
	}
	snake_turn=snake_turn.filter(function(turn){
		if(turn.passedParts<snake_body.length){
			return turn;
		}
	});
	snake_food[0].draw();
	if(snake_food[0].check_eaten()){
		snake_food.pop();
		make_snake_body();
		snake_food.push(new food(Math.floor(Math.random()*500+10),Math.floor(Math.random()*300+10)));
	}
	onkeydown=function(e){
		if(e.keyCode==39 && snake_body[0].speed==0){
			snake_turn.push(new turnPoints(snake_body[0].x,snake_body[0].y,1,0));
		
		
		}
		if(e.keyCode==40 && snake_body[0].s2==0){
				snake_turn.push(new turnPoints(snake_body[0].x,snake_body[0].y,0,1));
			//for(var i=0;i<snake_body.length;i++){
			

			//}
		}
		if(e.keyCode==38 && snake_body[0].s2==0){
			snake_turn.push(new turnPoints(snake_body[0].x,snake_body[0].y,0,-1));
		
		}
		if(e.keyCode==37 && snake_body[0].speed==0){
			snake_turn.push(new turnPoints(snake_body[0].x,snake_body[0].y,-1,0));
	
		}
	}
	if(check_hit()){
		return;
	}
	window.requestAnimationFrame(movement);
}
//move