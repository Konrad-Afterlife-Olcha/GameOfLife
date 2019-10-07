window.addEventListener("DOMContentLoaded", function (e) {
    function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.getElementById("board");
        this.cells = [];
        this.arrayNewGeneration = [];
        this.createBoard = function () {
            this.board.style.width = this.width * 10 + "px";
            this.board.style.height = this.height * 10 + "px";
            let boardCells = this.width * this.height;

            for (let i = 0; i < boardCells; i++) {
                let div = document.createElement("div");
                this.board.appendChild(div);
            }
            let that = this;
            this.board.querySelectorAll("div").forEach(function (item) {
                that.cells.push(item);
            });
            this.cells.forEach(function (item) {
                item.addEventListener("click", function (e) {
                    item.classList.toggle("live")
                })
            })
        };
        this.showDiv = function (x, y) {
            let indeks = x + y * this.width;
            return this.cells[indeks]
        };
        this.setCellState = function (x, y, state) {
            if (state === "live") {
                this.showDiv(x, y).classList.add("live")
            } else {
                this.showDiv(x, y).classList.remove("live")
            }
        };
        this.firstGlider = function () {
            this.setCellState(2, 2, "live");
            this.setCellState(3, 2, "live");
            this.setCellState(3, 1, "live");
            this.setCellState(4, 4, "live");
            this.setCellState(2, 0, "live");

        };
        this.computeCellNextState = function (x, y) {
            let counter = 0;

            if (this.showDiv(x - 1, y - 1) !== undefined && this.showDiv(x - 1, y - 1).classList.contains("live")) {
                counter++
            }
            if (this.showDiv(x, y - 1) !== undefined && this.showDiv(x, y - 1).classList.contains("live")) {
                counter++

            }
            if (this.showDiv(x + 1, y - 1) !== undefined && this.showDiv(x + 1, y - 1).classList.contains("live")) {
                counter++

            }
            if (this.showDiv(x - 1, y) !== undefined && this.showDiv(x - 1, y).classList.contains("live")) {
                counter++

            }
            if (this.showDiv(x + 1, y ) !== undefined && this.showDiv(x + 1, y).classList.contains("live")) {
                counter++

            }
            if (this.showDiv(x - 1, y + 1) !== undefined && this.showDiv(x - 1, y + 1).classList.contains("live")) {
                counter++

            }
            if (this.showDiv(x , y + 1) !== undefined && this.showDiv(x, y + 1).classList.contains("live")) {
                counter++

            }
            if (this.showDiv(x + 1, y + 1) !== undefined && this.showDiv(x + 1, y + 1).classList.contains("live")) {
                counter++

            }

            if (this.showDiv(x, y).classList.contains("live")) {
                if (counter < 2) {
                    return 0
                }
                if (counter > 3) {
                    return 0
                } else {
                    return 1
                }
            }
            if (!this.showDiv(x, y).classList.contains("live") && counter === 3) {
                return 1
            } else return 0


        };

        this.computeNextGeneration = function () {
            this.arrayNewGeneration = [];
            for (let i=0; i<this.height; i++) {
                for( let j=0; j<this.width; j++) {
                    this.arrayNewGeneration.push(this.computeCellNextState(j,i))
            }
            }
            return this.arrayNewGeneration

        };
        // let that = this;
        this.printNextGeneration = function () {
            for (let i=0; i<400; i++) {
                if(this.arrayNewGeneration[i] === 1) {
                    this.cells[i].classList.add("live")
                }
                if(this.arrayNewGeneration[i] === 0) {
                    this.cells[i].classList.remove("live")
                }
            }



        };

    }



    let game = new GameOfLife(20,20);

    game.createBoard();
    game.showDiv(10,10);
    game.firstGlider();

document.getElementById("play").addEventListener("click", function (e) {
    const time = setInterval(function () {
        game.computeNextGeneration();
        game.printNextGeneration()
    }, 1000)
    document.getElementById("pause").addEventListener("click", function () {
        clearInterval(time)
    })
})




































});