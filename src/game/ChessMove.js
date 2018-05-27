// @flow

import type {ColorType, FigureType} from "./figures/ChessImage";

class ChessMove {
    lastPosition: { x: number, y: number };
    newPosition: { x: number, y: number };
    figureType: FigureType;
    player: ColorType;

    constructor(lastPosition: { x: number, y: number }, newPosition: { x: number, y: number }, figureType: FigureType, player: ColorType) {
        this.lastPosition = lastPosition;
        this.newPosition = newPosition;
        this.figureType = figureType;
        this.player = player;
    }

    toChessNotation = (): string => {
        return "todo";
    }
}

export default ChessMove;