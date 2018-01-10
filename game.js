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
	this.key=feature;
}

//A Bot has health and points
//Bots start with 100 health and 0 points;
function Bot(){
	this.health=100;
	this.point=0;
}


///consumes grid, posn of item, posn of enemy, posn of player
function dealWithItem(grid, ix, iy, ex, ey, px, py){
	if(grid[ix][iy].inH){
		grid[px][py].health+=20;
	}else if(grid[ix][iy].inP){
		grid[px][py].point+=20;
	}else if(grid[ix][iy].deH){
		grid[ex][ey].health-=20;
	}else{
		grid[ex][ey].point-=20;
	}
}



//outputs a 2d array into the console
//consumes grid, grid dimention, and coordinates of player 1
function generateGrid(grid, side, x1, y2){
	var output="Current Grid:\n";
	for (var i = 0; i < side; i++) {
		for (var j = 0; j<side; j++) {
		    if(grid[i][j] instanceof Bot){
		    	if(x1==i && y2 == j){
		    		output+= " X ";
		    	}else{
		    		output+= " Y ";
		    	}
		    }else if (grid[i][j] instanceof Item){
		    	output+= " " + grid[i][j].key + " ";
		    }else{
		    	output+= " - ";
		    }		    
		}
		output+="\n";
	}
	console.log(output);
}

$(document).ready(function(){
	// weird things in this code:
	//xs are actual y when the board is drawn out. 


	var n =  prompt("How large is the board?");
	//initialize grid
	var grid = new Array(n);
	for (var i = 0; i < n; i++) {
	  grid[i] = new Array(n);
	}


	//Ive decided that half the dimention of the grid is an appropriate number of items 
	//I'm tight on time so Im not going to check for coordinate conficts. 
	//Its not a big deal if the items are over written, and the chances of overwritting more than 1 are slim
	for (var i = 0; i < Math.ceil(n/2); i++) {
		var y = Math.floor(Math.random() * n);
		var option = Math.floor(Math.random() * 4) + 1;
		grid[i][y] = new Item(option);
	}


	var x1 = Math.floor(Math.random() * n); //x coordinate of p1
	var y1 = Math.floor(Math.random() * n); //y coordinate of p1 
	//guarentee that bots start atleast 5 blocks away
	if(x1<n/2){
		var x2 = Math.floor((Math.random() * n/2) + n/2) ; 
	}else{
		var x2 = Math.floor(Math.random() * n/2);
	}
	var y2 = Math.floor(Math.random() * n); //y coordinate of p2
	grid[x1][y1] = new Bot();
	grid[x2][y2] = new Bot();

	
	generateGrid(grid, n, x1, y1);
	console.log("Player1: \tHeath: " + grid[x1][y1].health + "\tPoints: " + grid[x1][y1].point);
	console.log("Player2: \tHeath: " + grid[x2][y2].health + "\tPoints: " + grid[x2][y2].point);	

	function general(type) {
		var over = false;
		var moves = ["R", "L", "U", "D"];
		//time for the game!
	 	while(!over){
	 		var p1move;var p2move;
	 		if(type==1){//pvp
	 			p1move = prompt("P1, where do you want to move? [R, L, U, D]");
				p2move = prompt("P2, where do you want to move? [R, L, U, D]");	
	 		}else if(type==2){//cvp
	 			p1move = prompt("P1, where do you want to move? [R, L, U, D]");
	 			p2move = moves[Math.floor(Math.random() * 4)]; // random move
	 		}else{//cvc
	 			p1move = moves[Math.floor(Math.random() * 4)];
	 			p2move = moves[Math.floor(Math.random() * 4)]; // random move
	 			alert("Move on");
	 		}
			
			var nextX1 = x1;var nextY1 = y1;
			var nextX2 = x2;var nextY2 = y2;
			//lets look at where the bots will move
			if(p1move === "R" && y1!=(n-1)){
				nextY1++;
			} else if(p1move === "U" && x1!=0){
				nextX1--;
			} else if(p1move === "D" && x1!=(n-1) ){
				nextX1++;
			} else if(p1move === "L"&&y1!=0){
				nextY1--;
			} else if(type==1 || type ==2){
				alert("Player1, dont be silly!");
			}

			if(p2move === "R" && y2!=(n-1)){
				nextY2++;
			} else if(p2move === "U" && x2!=0){
				nextX2--;
			} else if(p2move === "D" && x2!=(n-1) ){
				nextX2++
			} else if(p2move === "L"&&y2!=0){
				nextY2--;
			} else if(type==1){
				alert("Player2, dont be silly!");
			}

			//deal with a bot hitting an item
			if(grid[nextX2][nextY2] instanceof Item){
				dealWithItem(grid, nextX2, nextY2, x1, y1, x2, y2);			
			}
			if(grid[nextX1][nextY1] instanceof Item){
				dealWithItem(grid, nextX1, nextY1, x2, y2, x1, y1);
			}

			//if bots collide
			if(nextY1==nextY2 && nextX2 == nextX1){
				if(grid[x1][y1].point > grid[x2][y2].point){
					alert("Game over!! Player1 wins.");				
				}else if(grid[x1][y1].point < grid[x2][y2].point){
					alert("Game over!! Player2 wins.");
				}else{ 
					alert("Game over!! Tie!!!");
				}			
				over = true; break;
			}

			//move bots over
			grid[nextX1][nextY1] =grid[x1][y1];
			if(!(nextX1 == x1 && nextY1 == y1)){
				grid[x1][y1] = 0;			
			}
			grid[nextX2][nextY2] =grid[x2][y2];
			if(!(nextX2 == x2 && nextY2 == y2)){
				grid[x2][y2] = 0;			
			}
			x1=nextX1; y1=nextY1;
			x2=nextX2; y2=nextY2;

			//if anyone's health is dead, game over
			if((grid[x1][y1].health < 0) && (grid[x2][y2].health < 0)){
				alert("Game over!! Tie!!!");
				over=true; break;
			}else if(grid[x1][y1].health < 0){
				alert("Game over!! Player2 wins.");
				over=true; break;
			}else if(grid[x2][y2].health < 0){
				alert("Game over!! Player1 wins.");
				over=true; break;
			}

			generateGrid(grid, n, x1, y1);
			
			console.log("Player1: \tHeath: " + grid[x1][y1].health + "\tPoints: " + grid[x1][y1].point);
			console.log("Player2: \tHeath: " + grid[x2][y2].health + "\tPoints: " + grid[x2][y2].point);	
		}    
	}

	$("#PVP").click( function(){
		general(1);
	})

	$("#CVP").click( function(){
		general(2);
	})

	$("#CVC").click( function(){
		general(3);
	})
})


