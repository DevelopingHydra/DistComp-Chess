// @flow

import ChessFigure from "./ChessFigure"
import {getImage, Background, Color, Figure, Direction} from "./ChessImage";
import BoardManager from "../BoardManager";
import type {ColorType, DirectionType, FigureType} from "./ChessImage";
import Point from "../util/Point";

class Bishop extends ChessFigure {
    constructor(location: Point, color: ColorType, direction: DirectionType) {
        super(location, color, Figure.bishop, direction);
    }

    getPlacesItCanMoveTo = (gameManager: BoardManager): Array<Point> => {
        return [];
    };
}

export default Bishop;