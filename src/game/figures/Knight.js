// @flow

import ChessFigure from "./ChessFigure"
import {getImage, Background, Color, Direction, Figure} from "./ChessImage";
import BoardManager from "../BoardManager";
import type {ColorType, DirectionType} from "./ChessImage";
import Point from "../util/Point";

class Knight extends ChessFigure {
    constructor(location: Point, color: ColorType, direction: DirectionType) {
        super(location, color, Figure.knight, direction);
    }

    getPlacesItCanMoveTo = (gameManager: BoardManager): Array<Point> => {
        const possibleFields = [
            {
                x: this.location.x - 2,
                y: this.location.y + 1
            }, {
                x: this.location.x - 1,
                y: this.location.y - 2
            }, {
                x: this.location.x + 1,
                y: this.location.y - 2
            }, {
                x: this.location.x + 2,
                y: this.location.y - 1
            }, {
                x: this.location.x - 2,
                y: this.location.y + 1
            }, {
                x: this.location.x - 1,
                y: this.location.y + 2
            }, {
                x: this.location.x + 1,
                y: this.location.y + 2
            }, {
                x: this.location.x + 2,
                y: this.location.y + 1
            }
        ];

        return possibleFields.filter((field: { x: number, y: number }) =>
            (gameManager.isFieldOnBoard(new Point(field.x, field.y)) && !gameManager.isFieldOccupied(new Point(field.x, field.y)))
        ).map((field) => new Point(field.x, field.y));
    };
}

export default Knight;