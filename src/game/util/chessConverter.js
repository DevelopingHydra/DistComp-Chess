// @flow

import ChessMove from "../ChessMove";
import ChessFigure from "../figures/ChessFigure";
import {Color, Direction, Figure} from "../figures/ChessImage";
import Bishop from "../figures/Bishop";
import Rook from "../figures/Rook";
import type {ColorType, DirectionType, FigureType} from "../figures/ChessImage";
import Knight from "../figures/Knight";
import Point from "./Point";

export function boardStringToArray(board: string): Array<ChessFigure> {
    const figuresData: Array<{
        x: number, y: number, color: ColorType, direction: DirectionType, type: FigureType
    }> = JSON.parse(board);

    let figures = [];
    for (const figureData of figuresData) {
        switch (figureData.type) {
            case Figure.rook:
                figures.push(new Rook(new Point(figureData.x, figureData.y), figureData.color, figureData.direction));
                break;
            case Figure.bishop:
                figures.push(new Bishop(new Point(figureData.x, figureData.y), figureData.color, figureData.direction));
                break;
            case Figure.knight:
                figures.push(new Knight(new Point(figureData.x, figureData.y), figureData.color, figureData.direction));
                break;
            default:
                // figures.push(new Bishop(1, 1, Color.white, Direction.normal));
        }
    }
    return figures;
}

export function moveToString(move: ChessMove): string {
    return move.toChessNotation();
}