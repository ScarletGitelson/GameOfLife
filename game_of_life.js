
const squares = 1225;
let gameBoard = document.querySelector('.gameBoard');
const rows = Math.floor(Math.sqrt(squares));
let neighbors_dict = {}
const drawing = [164, 165, 166, 167, 168, 169, 170, 198, 204, 205, 232, 238, 240, 266, 272, 275, 300, 306, 310, 334, 340, 345, 368, 374, 380, 402, 436, 470, 504, 538, 572, 606, 408, 442, 476, 510, 544, 578, 612, 646, 680, 714, 414, 448, 482, 516, 550, 584, 618, 652, 686, 720, 754, 788, 822, 640, 639, 638, 672, 676, 707, 712, 743, 748, 779, 784, 820, 814, 815, 920, 848, 851, 856, 882, 886, 887, 891, 916, 920, 923, 926, 950, 954, 959, 960, 984, 988, 1019, 1022, 1055, 1056];


let gridRows = 'repeat(' + rows + ', 1fr)';
gameBoard.style.gridTemplateColumns = gridRows;
//sets some variables to use later

//switches the color of a grid square
function changeColor(event){
	let clicked = event.target;
	if (clicked.style.backgroundColor === "black"){
		clicked.style.backgroundColor = 'rgb(184, 20, 6)';
		clicked.style.color = 'rgb(184, 20, 6)';
	} else {
		clicked.style.backgroundColor = "black";
		clicked.style.color = "black";
	}
}

//adds the neighbors of a square (as numbers) to a list called neighbors to be put into neighbors_dict
//called for every square when that square is initialized
function setNeighbors(i) {
	let neighbors;
	if (i === 0) {
		neighbors = [1, rows, (rows+1)];
	} else if (i === (squares - 1)) {
		neighbors = [squares - 2, squares - rows, squares - rows - 1];
	} else if (i === (squares - rows)) {
		neighbors = [squares - rows + 2, squares - rows - rows + 1, squares - rows - rows + 2];
	} else if (i === (rows - 1)) {
		neighbors = [ rows + rows - 1, rows + rows - 2, rows - 2];
	} else if ( (i % rows) === 0){
		neighbors = [i + 1, i - rows, i - rows + 1, i + rows, i + rows + 1];
	} else if (i < rows) {
		neighbors = [ i + 1, i - 1, i+rows-1, i+rows+1, i+rows];
	} else if (i > (squares - rows)) {
		neighbors = [ i + 1, i - 1, i-rows-1, i-rows+1, i-rows];
	} else if ((i % rows) === (rows - 1)) {
		neighbors = [i - 1, i - rows, i - rows - 1, i + rows, i + rows - 1];
	} else {
		neighbors = [i - 1, i - rows, i - rows - 1, i + rows, i + rows - 1, i + 1, i - rows + 1, i + rows + 1];
	}
	return(neighbors);
}

//checks the square bordering a grid to see how many are alive
function countNeighbors(i){
	let count = 0;
	let numNeighbors = neighbors_dict[i].length;
	for (let j = 0; j < numNeighbors; j++){
		let square = document.getElementById(neighbors_dict[i][j]);
		let bgColor = square.style.backgroundColor;
		if ((bgColor) === 'rgb(184, 20, 6)') {
			count++;
		}
	}
	return count;
}

//looks at every square and decides whether it should be alive for the next generation, that implements those statuses
function playGame(){
		let toSelect = [];
		for (i = 0; i < squares; i++) {
			let neighborsColored = countNeighbors(i);
			let currentSquare = document.getElementById(i);
			if (currentSquare.style.backgroundColor === 'rgb(184, 20, 6)'){
				if (neighborsColored === 2 || neighborsColored === 3) {
					toSelect.push(i);
				}
			} else {
				if (neighborsColored === 3) {
					toSelect.push(i);
				}
			}
		}
		for (k = 0; k< squares; k++){
			let select = document.getElementById(k);
			if (toSelect.includes(k)){
				select.style.backgroundColor = 'rgb(184, 20, 6)';
				select.style.color = 'rgb(184, 20, 6)';
			} else {
				select.style.backgroundColor = "black";
				select.style.color = "black";
			}
	}
}

//sets all grid squares to dead
function clearBoard() {
	for (let i = 0; i < squares; i++) {
		let currentSquare = document.getElementById(i);
		currentSquare.style.backgroundColor = 'black';
		currentSquare.style.color = 'black';
	}
}

//initializes the squares, only substantial code run automatically
for (let i = 0; i < squares; i++) {
    let newSquare = document.createElement('p');
    newSquare.setAttribute('id', i);
    newSquare.innerHTML = ".";
    newSquare.setAttribute('class', 'buttons');
    gameBoard.appendChild(newSquare);
    newSquare.style.border = 'black 1px solid';
    newSquare.style.backgroundColor = 'black';
    newSquare.addEventListener("click", changeColor);
    neighbors_dict[i] = setNeighbors(i);
    if (drawing.includes(i)) {
    	newSquare.style.backgroundColor = 'rgb(184, 20, 6)';
    	newSquare.style.color = 'rgb(184, 20, 6)';
    }
}

//sets the game to run when play is clicked
playButton = document.querySelector('#play');
playButton.addEventListener("click", playGame);

//sets the board to clear when clear is clicked
clearButton = document.querySelector('#clear');
clearButton.addEventListener("click", clearBoard);
