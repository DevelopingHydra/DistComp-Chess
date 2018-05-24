// @flow

import {Background, Color, Direction, getImage, Type} from "./ChessImage";
import GameManager from "../GameManager";

class ChessFigure {
    x: number;
    y: number;
    width: number;
    height: number;

    isSelected: boolean;
    isMouseOver: boolean;
    isAlive: boolean;

    color: Color;
    type: Type;
    direction: Direction;
    image: Image;

    constructor(x: number, y: number, color: Color,  type: Type, direction: Direction) {
        if (new.target === ChessFigure) {
            throw new TypeError("Cannot construct ChessFigure instances directly");
        }

        this.x = x;
        this.y = y;

        this.isSelected = false;
        this.isAlive = true;

        this.color = color;
        this.type = type;
        this.direction = direction;
    }

    setCanvas: void = (canvas) => {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d");
        this.width = this.canvas.width / 8;
        this.height = this.canvas.height / 8;
    };

    updateImage: void = (background: Background) => {
        this.background = background;
        const image = getImage(this.color, this.background, this.type, this.direction);
        image.onload = () => {
            this.image = image;
        }
    };

    moveTo: void = (x: number, y: number) => {
        if (this.canMoveTo(x, y)) {
            this.x = x;
            this.y = y;
        }
    };

    render = () => {
        if (this.isSelected) {
            this.canvasContext.fillStyle = "#ccc";
            this.canvasContext.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
        } else if (this.isMouseOver) {
            this.canvasContext.fillStyle = "#ccc";
            this.canvasContext.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
        }

        if (this.image) {
            this.canvasContext.drawImage(this.image, this.x * this.width, this.y * this.height, this.width, this.height);
        }
    };

    onMouseEnter: void = () => {
        this.isMouseOver = true;
    };

    onMouseLeave: void = () => {
        this.isMouseOver = false;
    };

    onClick: void = () => {
        this.isSelected = !this.isSelected;
    };

    kill: void = () => {
        this.isAlive = false;
    };

    canMoveTo: boolean = (x: number, y: number) => {
        throw new Error("This method has to be implemented in a subclass")
    };
    getPlacesItCanMoveTo: [] = (gameManager:GameManager) => {
        throw new Error("This method has to be implemented in a subclass")
    };

}

export default ChessFigure;