//Items can do one of four things:
//1 - increase bot's health
//2 - increase bot's points
//3 - decrease enemy health
//4 - decrease enemy points 
//The constructor accepts a number between 1 to 4 to indicate which of the above features the item has
function Item(feature){
	if(feature==1){
		this.inH = true;
	}else if(feature==2){
		this.inP = true;
	}else if(feature==3){
		this.deH = true;
	}else{
		this.deP = true;
	}
}




//A Bot has health and points
//Bots start with 100 health and 0 points;
function Bot(){
	this.health=100;
	this.point=0;
}

//outputs a 2d array into the console
//consumes grid, grid dimention, and coordinates of player 1
function generateGrid(grid, side, x1, y1){
	var output="Current Grid:\n";
	for (var i = 0; i < side; i++) {
		for (var j = 0; j<side; j++) {
		    if(grid[i][j] instanceof Bot){
		    	if(x1==i && y1 == j){
		    		output+= " X ";
		    	}else{
		    		output+= " Y ";
		    	}
		    }else if (grid[i][j] instanceof Item){
		    	output+= " I ";
		    }else{
		    	output+= " - ";
		    }

		    
		}
		output+="\n";
	}
	console.log(output);
}

$(document).ready(function(){
	//lots of things commented out for the sake of testing
//	alert("Hi! This is the bot fight program for Kristy Gao. \nEverything will be happening in the console and through alerts, so make sure to ctrl+shift+i");
//	alert("The grid will be outputed in the console. \nX is player one. Y is player two. \nItems are I. Empty spaces are - \nEach player will be promted to move.")
	var n =  10 //prompt("How large is the board?");
	//initialize grid
	var grid = new Array(n);
	for (var i = 0; i < n; i++) {
	  grid[i] = new Array(n);
	}

	///NOTE need to make sure initial coordinates are not the same for robots and items


	var x1 = Math.floor(Math.random() * n); //x coordinate of p1
	var y1 = Math.floor(Math.random() * n); //y coordinate of p1 
	var x2 = Math.floor(Math.random() * n); //x coordinate of p2
	var y2 = Math.floor(Math.random() * n); //y coordinate of p2
	grid[x1][y1] = new Bot();
	grid[x2][y2] = new Bot();

	//Ive decided that half the dimention of the grid is an appropriate number of items 
	for (var i = 0; i < Math.ceil(n/2); i++) {
		var y = Math.floor(Math.random() * n);
		var option = Math.floor(Math.random() * 4) + 1;
		grid[i][y] = new Item(option);
	}

	generateGrid(grid, n, x1, y1);

})


