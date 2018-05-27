// @flow

// images from
// https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces

export const Color = Object.freeze({
    white: "l",
    black: "d"
});

export type ColorType = $Values<typeof Color>;

export const Background = Object.freeze({
    light: "l",
    dark: "d",
    none: "t"
});

export type BackgroundType = $Values<typeof Background>;

export const Direction = Object.freeze({
    normal: "normal",
    opponent: "opponent"
});

export type DirectionType = $Values<typeof Direction>;

export const Figure = Object.freeze({
    king: "k",
    queen: "q",
    rook: "r",
    bishop: "b",
    knight: "n",
    pawn: "p",
    // kingOpponent: "f",
    // queenOpponent: "g",
    // rookOpponent: "m",
    // bishopOpponent: "B",
    // knightOpponent: "N",
    // pawnOpponent: "h"
});

export type FigureType = $Values<typeof Figure>;

export function getImage(color: ColorType, background: BackgroundType, figureType: FigureType, direction: DirectionType) {
    let url = window.location.href + "images/Chess_";
    let correctType = figureType;
    if (direction === Direction.opponent) {
        switch (figureType) {
            case Figure.king:
                correctType = "f";
                break;
            case Figure.queen:
                correctType = "g";
                break;
            case Figure.rook:
                correctType = "m";
                break;
            case Figure.bishop:
                correctType = "B";
                break;
            case Figure.knight:
                correctType = "N";
                break;
            case Figure.pawn:
                correctType = "h";
                break;
        }
    }

    url += correctType + color + background + "45.svg";
    console.log("loading image: " + url);

    const image = new Image();
    image.src = url;
    return image;
}

//https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/45px-Chess_kdt45.svg
//https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/45px-Chess_klt45.svg
//https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Chess_kdl45.svg/45px-Chess_kdl45.svg

