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

var c = canvas.getContext('2d');
canvasWidth = 2000;
canvas.width = canvasWidth;
canvas.height = 400;

window.addEventListener('mousemove', function(x) {
    mouse.x = event.x;
    mouse.y = event.y;
});

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
    }

    createPlayers() {
        let activeplayers = [new Players(this.player1, true, this.board.playableSpaces),
         new Players(this.player2, false, this.board.playableSpaces)];
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

class Players {
    constructor(name, active, availableSpaces) {
        this.name = name;
        this.active = active;
        this.pieces = this.placePieces(name, active, availableSpaces);
    }

    placePieces(owner, active, availableSpace) {
        let playerPieces = [];
        if(active === true) {
            for(let i = 0; i < availableSpace.length; i++) {
                if(availableSpace[i].spaceNumber < 13) {
                    playerPieces.push(this.assignPiece(availableSpace[i], owner, active));
                }
            }
        } else if(active === false) {
            for(let i = 0; i < availableSpace.length; i++) {
                if(availableSpace[i].spaceNumber > 20) {
                    playerPieces.push(this.assignPiece(availableSpace[i], owner, active));
                }
            }
        }
        return playerPieces;
    }

    assignPiece(space, owner, active) {
        return new Piece(space.x + circleSet, space.y + circleSet, circleRadius, owner, space.spaceNumber, active ? colors[0] : colors[1]);
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
        let x = 0;
        let y = 0 - spaceLength;
        let colorNumber = 1;
        let count = 33;

        for(let i = 0; i < this.size; i++) {
            let column = [];
            y += spaceLength;
            colorNumber = PatternMaker(colorNumber);
            for(let j = 0; j < this.size; j++) {
                x += spaceLength;
                if(x >= boardSides) {
                    x = 0;
                }
                colorNumber = PatternMaker(colorNumber);
                column.push(new Space(x, y, boardColors[colorNumber]));
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
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.sideLength = boardSides / 8;  
        this.spaceNumber = null;
    }

    draw() {
        b.fillStyle = this.color;
        b.fillRect(this.x, this.y, spaceLength, spaceLength);
    }
}

class Piece {
    constructor(x, y, radius, owner, space, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.owner = owner;
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

    
}

//Chess Piece Animation


function Circle(x, y, dx, radius, color) {
    this.x = x;
    this.y = y; 
    this.dx = dx;
    this.radius = radius;
    this.color = color;

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

var circleArray = [];
var colors = ['rgb(194, 105, 105)', 'rgb(67, 67, 67)'];

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
