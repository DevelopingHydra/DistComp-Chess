// @flow

import ChessFigure from "./ChessFigure"
import {getImage, Background, Color, Type, Direction} from "./ChessImage";
import GameManager from "../GameManager";

class Rook extends ChessFigure {
    constructor(x, y, color: Color, direction: Direction) {
        super(x, y, color, Type.rook, direction);
    }

    canMoveTo: boolean = (x: number, y: number) => {
        return true;
    };

    getPlacesItCanMoveTo: [] = (gameManager: GameManager) => {
        let fields = [];
        let isFieldOccupied = false;

        // left
        for (let i = this.x - 1; i >= 0 && !isFieldOccupied; i--) {
            isFieldOccupied = gameManager.isFieldOccupied(i, this.y);
            if (!isFieldOccupied)
                fields.push({x: i, y: this.y});
        }

        // right
        isFieldOccupied = false;
        for (let i = this.x + 1; i <= 7 && !isFieldOccupied; i++) {
            isFieldOccupied = gameManager.isFieldOccupied(i, this.y);
            if (!isFieldOccupied)
                fields.push({x: i, y: this.y});
        }

        // bottom
        isFieldOccupied = false;
        for (let i = this.y + 1; i <= 7 && !isFieldOccupied; i++) {
            isFieldOccupied = gameManager.isFieldOccupied(this.x, i);
            if (!isFieldOccupied)
                fields.push({x: this.x, y: i});
        }

        // top
        isFieldOccupied = false;
        for (let i = this.y - 1; i >= 0 && !isFieldOccupied; i--) {
            isFieldOccupied = gameManager.isFieldOccupied(this.x, i);
            if (!isFieldOccupied)
                fields.push({x: this.x, y: i});
        }

        return fields;
    };
}

export default Rook;