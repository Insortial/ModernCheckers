const titleScreen = document.querySelector("#frontPage");
const gameScreen = document.querySelector("#gameScreen")
const canvas = document.querySelector("#animation");
const home = document.querySelector("#home");
const board = document.querySelector("#board");
const modal = document.querySelector("#modalscreen");
const form = document.querySelector("#modalForm");
const textBox = document.querySelector("#name");
const textBoxLabel = document.querySelector("#nameLabel");
const player1Name = document.querySelector("#player1");
const player2Name = document.querySelector("#player2");
const player1Score = document.querySelector("#player1score");

var c = canvas.getContext('2d');
canvasWidth = 2000;
canvas.width = canvasWidth;
canvas.height = 400;


const Mouse = {x: 0, y: 0, lastPiece: null};

board.addEventListener('mousedown', function(e) {
    let boardLocation = board.getBoundingClientRect();
    Mouse.x = e.x - boardLocation.left;
    Mouse.y = e.y - boardLocation.top;
    for(let i = 0; i < newG.players.length; i++) {
        if(newG.players[i].active) {
            let currentPlayer = newG.players[i];
            for(let i = 0; i < currentPlayer.pieces.length; i++) {
                let currentPiece = currentPlayer.pieces[i];
                if(currentPiece.contains(Mouse.x, Mouse.y)) {
                    if(!currentPiece.active) {
                        SelectPiece(currentPiece, currentPlayer, true);
                        CheckSpaces(currentPiece, currentPlayer, true);
                        Mouse.lastPiece = currentPiece;
                        Mouse.lastPiece = null;
                        console.log('yes');
                    }  else if(currentPiece.active) {
                        SelectPiece(currentPiece, currentPlayer, false);
                        CheckSpaces(currentPiece, currentPlayer, false);
                        Mouse.lastPiece = null;
                        console.log('yes2');
                    } else if(currentPiece != Mouse.lastPiece) {
                        SelectPiece(Mouse.lastPiece, currentPlayer, false);
                        CheckSpaces(Mouse.lastPiece, currentPlayer, false);
                        Mouse.lastPiece = null;
                        console.log('yes3');
                    } else {
                        break;
                    }
                } else {
                    if(Mouse.lastPiece != null) {
                        SelectPiece(Mouse.lastPiece, currentPlayer, false);
                        CheckSpaces(Mouse.lastPiece, currentPlayer, false);
                        console.log('no');
                    }
                }
            }
        } 
    }
});





//May use in the future.
// function UpdateState() {
//     for(let i = 0; i < newG.board.size; i++) {
//         for(let j = 0; j < newG.board.size; j++) {
//             newG.board.boardSpaces[i][j].drawDefault();
//         }    
//     }

//     for(let i = 0; i < 2; i++) {
//         for(let j = 0; j < newG.players[i].pieces.length; j++) {
//             newG.players[i].pieces[j].draw();
//         }    
//     }
// }

function SelectPiece(piece, player, state) {
    if(player.id === 0) {
        piece.active = state;
        piece.color = state ? activecolors[0] : colors[0];
        piece.draw()
    } else {
        piece.active = state;
        piece.color = state ? activecolors[1] : colors[1];
        piece.draw();
    }
}

function CheckSpaces(piece, player, state) {
    let operator = null;
    /*if(player.id === 0) {
        operator = addition;
    } else {
        operator = subtraction;
    }*/

    if(piece.row % 2 === 0) {
        //4 is the right space 5 is the left space; 0 is always right
        //1 is always left
        let selections = [Direction(piece.spacenumber, 4),
                          Direction(piece.spacenumber, 5)];
        if(piece.x === 37.5) {
            return HighlightSpace(player, selections[0], state);
        } else if(piece.x === 562.5) {
            return HighlightSpace(player, selections[1], state);
        } else {
            HighlightSpace(player, selections[0], state);
            HighlightSpace(player, selections[1], state);
            return selections;
        }
    } else {

    }
}

function Direction(piecenumber, number) {
    for(let i = 0; i < newG.board.playableSpaces.length; i++) {
        let selectspace = newG.board.playableSpaces[i]
        if(selectspace.spaceNumber === piecenumber + number) {
            return selectspace;
        }
    }
}

function HighlightSpace(player, space, state) {
    if(!space.occupied) {
        space.color = state ? '#d0d6e0': '#BCA377';
        space.draw();
        return false;
    }  else if(space.occupied) {
        CheckSpaces(player, space, true);
        return true;
    }
}


function modalPopup() {
    modal.style.display = 'flex';
}

let count = 0;

function Clear() {
    titleScreen.style.display = 'none';
    canvas.style.display = 'none';
    modal.style.display = 'none';
    gameScreen.id = 'active';
}

function Home() {
    titleScreen.style.display = 'block';
    canvas.style.display = 'block';
    gameScreen.id = 'gameScreen';
}

titleScreen.addEventListener('click', x => {
    if(x.target.className === 'button') {
        modalPopup();
    }
});

gameScreen.addEventListener('click', x => {
    if(x.target.id === 'home') {
        Home();
    }
});

/*Classes*/
class Game {
    constructor() {
        this.board = new Board(8);
        this.player1;
        this.player2;
        this.players;
        this.lastPiece;
    }

    createPlayers() {
        let activeplayers = [new Player(this.player1, 0, true, this.board.playableSpaces),
         new Player(this.player2, 1, false, this.board.playableSpaces)];
        this.players = activeplayers;
    }

    startGame() {
        if(textBox.value != '' && count === 0) {
            this.board.createSpaces();
            this.player1 = textBox.value;
            textBoxLabel.textContent = 'Player 2';
            textBox.value = '';
            count++;
        } else if(textBox.value != '' && count === 1) {
            newG.player2 = textBox.value;
            textBox.value = '';
            textBoxLabel.textContent = 'Player 1';
            count = 0;
            modal.style.display = 'none';
            this.createPlayers();
            this.players[0].place();
            this.players[1].place();
            player1Name.textContent = this.player1;
            player2Name.textContent = this.player2;
            Clear();
        }
        console.log(newG);
    }
}

class Player {
    constructor(name, id, active, availableSpaces) {
        this.name = name;
        this.id = id;
        this.active = active;
        this.pieces = this.placePieces(name, active, availableSpaces, id);
    }

    placePieces(owner, active, availableSpace, id) {
        let playerPieces = [];
        if(id === 0) {
            for(let i = 0; i < availableSpace.length; i++) {
                if(availableSpace[i].spaceNumber < 12) {
                    playerPieces.push(this.assignPiece(availableSpace[i], owner, active));
                    availableSpace[i].occupied = 'true';
                }
            }
        } else if(id === 1) {
            for(let i = 0; i < availableSpace.length; i++) {
                if(availableSpace[i].spaceNumber > 19) {
                    let placedPiece = this.assignPiece(availableSpace[i], owner, active);
                    playerPieces.push(placedPiece);
                    availableSpace[i].occupied = 'true';
                }
            }
        }
        return playerPieces;
    }

    assignPiece(space, owner, active) {
        return new Piece(space.x + circleSet, space.y + circleSet, circleRadius, owner, space.spaceNumber, space, active ? colors[0] : colors[1], space.row);
    }

    place() {
        for(let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].draw();
        }
    }
}

class Board {
    constructor(size) {
        this.size = size;
        this.boardSpaces = [];
        this.playableSpaces = [];
    }

    createSpaces() {
        let x = 0 - spaceLength;
        let y = 0 - spaceLength;
        let colorNumber = 0;
        let count = 32;
        let rowNumber = 0;

        for(let i = 0; i < this.size; i++) {
            let column = [];
            y += spaceLength;
            colorNumber = PatternMaker(colorNumber);
            rowNumber++;
            for(let j = 0; j < this.size; j++) {
                x += spaceLength;
                if(x >= boardSides) {
                    x = 0;
                }
                colorNumber = PatternMaker(colorNumber);
                column.push(new Space(x, y, rowNumber, boardColors[colorNumber]));
            }
            this.boardSpaces.push(column);
        }

        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                if(this.boardSpaces[i][j].color === '#BCA377') {
                    count--; 
                    this.boardSpaces[i][j].spaceNumber = count;
                    if(typeof(this.boardSpaces[i][j].spaceNumber) == 'number') {
                        this.playableSpaces.push(this.boardSpaces[i][j]);
                    }
                }
                this.boardSpaces[i][j].draw();
            }
        }
    console.log(this.boardSpaces);
    console.log(this.playableSpaces);
    }
}

class Space {
    constructor(x, y, row, color) {
        this.x = x;
        this.y = y;
        this.row = row;
        this.color = color;
        this.sideLength = boardSides / 8;  
        this.spaceNumber = null;
        this.occupied = false;
    }

    draw() {
        b.fillStyle = this.color;
        b.fillRect(this.x, this.y, spaceLength, spaceLength);
    }

    contains(mx, my) {
        return  (mx < this.x + this.sideLength / 2) && (mx > this.x - this.sideLength / 2)
             && (my < this.y + this.sideLength / 2) && (my > this.y - this.sideLength / 2)
    }
}

class Piece {
    constructor(x, y, radius, owner, spacenumber, space, color, row) {
        this.x = x;
        this.y = y;
        this.row = row;
        this.radius = radius;
        this.owner = owner;
        this.spacenumber = spacenumber
        this.space = space; 
        this.color = color;
        this.inuse = true; 
        this.active = null;
    }

    draw() {
        b.beginPath();
        b.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        b.fillStyle = this.color;
        b.fill();
    }

    contains(mx, my) {
        return  (mx < this.x + this.radius) && (mx > this.x - this.radius)
                && (my < this.y + this.radius) && (my > this.y - this.radius)
    }
}

//Chess Piece Animation

function Circle(x, y, dx, radius, color, row) {
    this.x = x;
    this.y = y; 
    this.dx = dx;
    this.radius = radius;
    this.color = color;
    this.row = row;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if(this.x > canvasWidth  || this.x < 0) {
            this.dx = -this.dx;
        }
    
        this.x += this.dx;

        this.draw();
    }

}

let circleArray = [];
let colors = ['rgb(194, 105, 105)', 'rgb(67, 67, 67)'];
let activecolors = ['rgb(122, 57, 57)', 'rgb(0, 0, 0)'];

for(let i = 0; i < 65; i++) {
    let radius = (Math.random() * ((150 - 90) + 1)) + 90;
    let x = Math.random() * (canvasWidth - radius * 2) + radius;
    let y = 320;
    let dx = (Math.random() - 0.5) * 3;
    let color = colors[Math.floor(Math.random() * 2)];
    circleArray.push(new Circle(x, y, dx, radius, color));
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvasWidth, 400);

for(let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
    }
}

animate();

//Board
let b = board.getContext('2d');
let boardSides = 600;
let spaceLength = boardSides / 8;
let circleSet = spaceLength / 2;
let circleRadius = spaceLength / 2.2;
let boardColors = ['#FFFFFF', '#BCA377'];
board.width = boardSides;
board.height = boardSides;

function PatternMaker(spaceColor) {
    if(spaceColor === 0) {
        return 1;
    } else if(spaceColor === 1) {
        return 0;
    }
}

const newG = new Game();
