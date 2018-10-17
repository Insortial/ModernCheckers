const titleScreen = document.querySelector("#frontPage");

titleScreen.addEventListener('click', x => {
    if(x.target.className === 'button') {
        let top = x.target.parentNode;
        top.parentNode.style.display = 'none';
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
