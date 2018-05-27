// @flow

import {Background, Color, Direction, getImage} from "./ChessImage";
import BoardManager from "../BoardManager";
import type {BackgroundType, ColorType, DirectionType, FigureType} from "./ChessImage";
import Point from "../util/Point";

class ChessFigure {
    location: Point;
    width: number;
    height: number;

    isSelected: boolean;
    isMouseOver: boolean;
    isAlive: boolean;

    color: ColorType;
    type: FigureType;
    direction: DirectionType;
    image: Image;
    canvas: Object;
    canvasContext: Object;
    background: string;

    constructor(location: Point, color: ColorType, type: FigureType, direction: DirectionType) {
        if (new.target === ChessFigure) {
            throw new TypeError("Cannot construct ChessFigure instances directly");
        }

        this.location = location;

        this.isSelected = false;
        this.isAlive = true;

        this.color = color;
        this.type = type;
        this.direction = direction;
    }

    updateImage = (background: BackgroundType): void => {
        this.background = background;
        const image = getImage(this.color, this.background, this.type, this.direction);
        image.onload = () => {
            this.image = image;
        }
    };

    setCanvas = (canvas: Object): void => {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d");
        this.width = this.canvas.width / 8;
        this.height = this.canvas.height / 8;
    };

    moveTo = (newLocation: Point): void => {
        this.location = newLocation;
    };

    render = (): void => {
        if (this.isSelected) {
            this.canvasContext.fillStyle = "#ccc";
            this.canvasContext.fillRect(this.location.x * this.width, this.location.y * this.height,
                this.width, this.height);
        } else if (this.isMouseOver) {
            this.canvasContext.fillStyle = "#ccc";
            this.canvasContext.fillRect(this.location.x * this.width, this.location.y * this.height,
                this.width, this.height);
        }

        if (this.image) {
            this.canvasContext.drawImage(this.image, this.location.x * this.width, this.location.y * this.height,
                this.width, this.height);
        }
    };

    onMouseEnter = (): void => {
        this.isMouseOver = true;
    };

    onMouseLeave = (): void => {
        this.isMouseOver = false;
    };

    onClick = (): void => {
        this.isSelected = !this.isSelected;
    };

    kill = (): void => {
        this.isAlive = false;
    };

    canMoveTo = (point: Point, boardManager: BoardManager): boolean => {
        console.log("check if can move from " + this.location.toString() + " to " + point.toString())
        const fieldsItCanMoveTo = this.getPlacesItCanMoveTo(boardManager);
        for (const field of fieldsItCanMoveTo) {
            if (field.x === point.x && field.y === point.y) {
                return true;
            }
        }
        return false;
    };

    getPlacesItCanMoveTo = (gameManager: BoardManager): Array<Point> => {
        throw new Error("This method has to be implemented in a subclass")
    };

}

export default ChessFigure;