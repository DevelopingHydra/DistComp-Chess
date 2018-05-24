// @flow

import ChessFigure from "./ChessFigure"
import {getImage, Background, Color, Type, Direction} from "./ChessImage";
import GameManager from "../GameManager";

class Bishop extends ChessFigure {
    constructor(x, y, color: Color, direction: Direction) {
        super(x, y, color, Type.bishop, direction);
    }

    canMoveTo: boolean = (x: number, y: number) => {
        return true;
    };

    getPlacesItCanMoveTo: [{ x: number, y: number }] = (gameManager: GameManager) => {
        return [];
    };
}

export default Bishop;