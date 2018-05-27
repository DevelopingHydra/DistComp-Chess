// @flow

import ChessFigure from "./ChessFigure"
import {getImage, Background, Color, Figure, Direction} from "./ChessImage";
import BoardManager from "../BoardManager";
import type {ColorType, DirectionType} from "./ChessImage";
import Point from "../util/Point";

class Rook extends ChessFigure {
    constructor(location: Point, color: ColorType, direction: DirectionType) {
        super(location, color, Figure.rook, direction);
    }

    getPlacesItCanMoveTo = (gameManager: BoardManager): Array<Point> => {
        let fields = [];
        let isFieldOccupied = false;

        // left
        for (let i = this.location.x - 1; i >= 0 && !isFieldOccupied; i--) {
            isFieldOccupied = gameManager.isFieldOccupied(new Point(i, this.location.y));
            if (!isFieldOccupied)
                fields.push({x: i, y: this.location.y});
        }

        // right
        isFieldOccupied = false;
        for (let i = this.location.x + 1; i <= 7 && !isFieldOccupied; i++) {
            isFieldOccupied = gameManager.isFieldOccupied(new Point(i, this.location.y));
            if (!isFieldOccupied)
                fields.push({x: i, y: this.location.y});
        }

        // bottom
        isFieldOccupied = false;
        for (let i = this.location.y + 1; i <= 7 && !isFieldOccupied; i++) {
            isFieldOccupied = gameManager.isFieldOccupied(new Point(this.location.x, i));
            if (!isFieldOccupied)
                fields.push({x: this.location.x, y: i});
        }

        // top
        isFieldOccupied = false;
        for (let i = this.location.y - 1; i >= 0 && !isFieldOccupied; i--) {
            isFieldOccupied = gameManager.isFieldOccupied(new Point(this.location.x, i));
            if (!isFieldOccupied)
                fields.push({x: this.location.x, y: i});
        }

        return fields.map((field) => new Point(field.x, field.y));
    }
}

export default Rook;