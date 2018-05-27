// @flow

import BoardManager from "./BoardManager";
import GameAPI from "./model/GameAPI";
import ChessMove from "./ChessMove";
import {boardStringToArray, moveToString} from "./util/chessConverter";
import Rook from "./figures/Rook";
import {Color, Direction} from "./figures/ChessImage";

class GameManager {
    boardManager: BoardManager;
    gameAPI: GameAPI;

    showMessageCallback: Function;

    constructor(canvas: Object, cbNotifyFPS: Function, cbShowMessage: Function) {
        this.boardManager = new BoardManager(this, canvas, cbNotifyFPS);
        this.gameAPI = new GameAPI(this.setBoard, this.setMessage);

        this.showMessageCallback = cbShowMessage;
    }

    startGame = (): void => {
        this.gameAPI.establishConnection();
        this.boardManager.startGame(Color.black);
    };

    makeMove = (move: ChessMove): void => {
        this.gameAPI.sendOperation(moveToString(move));
    };

    setBoard = (boardJSON: string): void => {
        try {
            const figures = boardStringToArray(boardJSON);
            // this.boardManager.setFigures(figures);
            this.boardManager.setFigures(figures);
        } catch (e) {
            this.setMessage("Unable to parse the current board received from the API");
        }
    };

    setMessage = (message: string): void => {
        console.log("received message from API: " + message);
        this.showMessageCallback(message);
    };


}

export default GameManager;