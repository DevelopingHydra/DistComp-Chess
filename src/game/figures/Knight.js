// @flow

import ChessFigure from "./ChessFigure"
import {getImage, Background, Color, Type, Direction} from "./ChessImage";
import GameManager from "../GameManager";

class Knight extends ChessFigure {
    constructor(x, y, color: Color, direction: Direction) {
        super(x, y, color, Type.knight, direction);
    }

    canMoveTo: boolean = (x: number, y: number) => {
        return true;
    };

    getPlacesItCanMoveTo: [{ x: number, y: number }] = (gameManager: GameManager) => {
        const possibleFields = [
            {
                x: this.x - 2,
                y: this.y + 1
            }, {
                x: this.x - 1,
                y: this.y - 2
            }, {
                x: this.x + 1,
                y: this.y - 2
            }, {
                x: this.x + 2,
                y: this.y - 1
            }, {
                x: this.x - 2,
                y: this.y + 1
            }, {
                x: this.x - 1,
                y: this.y + 2
            }, {
                x: this.x + 1,
                y: this.y + 2
            }, {
                x: this.x + 2,
                y: this.y + 1
            }
        ];

        return possibleFields.filter((field: { x: number, y: number }) =>
            (gameManager.isFieldOnBoard(field.x, field.y) && !gameManager.isFieldOccupied(field.x, field.y))
        );
    };
}

export default Knight;