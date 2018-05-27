// @flow

import Rook from "../figures/Rook";
import {Background, Color, Direction} from "../figures/ChessImage";
import Bishop from "../figures/Bishop";
import Knight from "../figures/Knight";
import Point from "../util/Point";
import ChessFigure from "../figures/ChessFigure";

class GameAPI {
    setBoardCallback: Function;
    setMessageCallback: Function;

    constructor(setBoardCallback: Function, setMessageCallback: Function) {
        this.setBoardCallback = setBoardCallback;
        this.setMessageCallback = setMessageCallback;
    }

    establishConnection = (): boolean => {
        // todo
        // connect to the sever
        // set up the methods to handle a message receive
        //      on receive -> call the setBoardCallback

        // dummy
        console.log("connect to api");
        setTimeout(() => {
            const figures = [
                this.toSimpleObject(new Rook(new Point(0, 0), Color.white, Direction.normal)),
                this.toSimpleObject(new Knight(new Point(1, 0), Color.white, Direction.normal)),
                this.toSimpleObject(new Bishop(new Point(2, 0), Color.white, Direction.normal)),
                this.toSimpleObject(new Rook(new Point(0, 7), Color.black, Direction.opponent)),
                this.toSimpleObject(new Rook(new Point(1, 7), Color.black, Direction.opponent)),
                this.toSimpleObject(new Rook(new Point(2, 7), Color.black, Direction.opponent)),
            ];
            this.setBoardCallback(JSON.stringify(figures));

            this.setBoardCallback("game started");
            console.log("sending from api")
        }, Math.random() * 1000);


        return true;
    };

    // todo remove, because is dummy
    toSimpleObject = (figure: ChessFigure): Object => {
        return {
            x: figure.location.x,
            y: figure.location.y,
            color: figure.color,
            type: figure.type,
            direction: figure.direction
        }
    };

    sendOperation = (operation: string): boolean => {
        // todo
        // send the string to the server

        // dummy
        // simulates that some will come back
        console.log("making move");

        return true;
    }
}

export default GameAPI;
