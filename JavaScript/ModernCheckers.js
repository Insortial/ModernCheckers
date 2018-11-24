const titleScreen = document.querySelector("#frontPage");
const gameScreen = document.querySelector("#gameScreen")
const canvas = document.querySelector("#animation");
const home = document.querySelector("#home");

function Clear() {
    titleScreen.style.display = 'none';
    canvas.style.display = 'none';
    gameScreen.id = 'active';
}

function Home() {
    titleScreen.style.display = 'block';
    canvas.style.display = 'block';
    gameScreen.id = 'gameScreen';
}

titleScreen.addEventListener('click', x => {
    if(x.target.className === 'button') {
        Clear();
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

    }
}

class Players {
    constructor() {
    }
}

class Board {
    constructor(size) {
        this.size = size;
    }

    createSpaces() {
        let boardSpaces = [];
        for(let i = 0; i < this.size; i++) {
            let column = [];
            for(let j = 0; j < this.size; j++) {
                const space = new Space(i, j);
                column.push(space);
            }
            boardSpaces.push(column);
        }
    }
}

class Space {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    

}

class Piece {
    constructor(owner, space) {
        this.owner = owner;
        this.space = space; 
        this.inuse = false; 
        this.active = true;
    }

    
}

//Chess Piece Animation
var c = canvas.getContext('2d');
canvasWidth = 2000;
canvas.width = canvasWidth;
canvas.height = 400;

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
    let y = 280;
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
