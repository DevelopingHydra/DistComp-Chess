// @flow

// images from
// https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces

export const Color = Object.freeze({
    white: "d",
    black: "l"
});

export const Background = Object.freeze({
    light: "l",
    dark: "d",
    none: "t"
});

export const Direction = Object.freeze({
    normal: "normal",
    opponent: "opponent"
});

export const Type = Object.freeze({
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

export function getImage(color: Color, background: Background, figureType: Type, direction: Direction) {
    let url = window.location.href + "images/Chess_";
    let correctType = figureType;
    if (direction === Direction.opponent) {
        switch (figureType) {
            case Type.king:
                correctType = "f";
                break;
            case Type.queen:
                correctType = "g";
                break;
            case Type.rook:
                correctType = "m";
                break;
            case Type.bishop:
                correctType = "B";
                break;
            case Type.knight:
                correctType = "N";
                break;
            case Type.pawn:
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

