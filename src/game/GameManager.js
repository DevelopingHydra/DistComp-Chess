// @flow
import Rook from "./figures/Rook";

class GameManager {
    constructor() {
        this.board = [];
    }

    startGame = () => {
        // init board
        this.board = [];
        for (let i = 0; i < 8; i++) {
            this.board[i] = [];
            for (let j = 0; j < 8; j++) {
                this.board[i][j] = new Rook(i, j);
            }
        }
    };
}

export default GameManager;