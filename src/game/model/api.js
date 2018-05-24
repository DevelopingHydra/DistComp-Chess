// @flow

import ChessFigure from "../figures/ChessFigure";
import Rook from "../figures/Rook";
import {Background, Color, Direction} from "../figures/ChessImage";
import Bishop from "../figures/Bishop";
import Knight from "../figures/Knight";

export function loadBoard(): [ChessFigure] {
    const figures = [
        new Rook(0, 0, Color.white, Direction.normal),
        new Knight(1, 0, Color.white, Direction.normal),
        new Bishop(2, 0, Color.white, Direction.normal),
    ];
    return figures;
}