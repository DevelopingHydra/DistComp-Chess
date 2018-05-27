// @flow

import Rook from "./figures/Rook";
import ChessFigure from "./figures/ChessFigure";
import {Background, Color, Direction} from "./figures/ChessImage";
import type {BackgroundType, ColorType} from "./figures/ChessImage";
import ChessMove from "./ChessMove";
import Point from "./util/Point";
import GameManager from "./GameManager";

class BoardManager {
    canvas: {
        height: number, width: number,
        getContext: Function, getBoundingClientRect: Function
    };

    isGameRunning: boolean;
    lastHoveredFigure: ?ChessFigure;
    lastClickedFigure: ?ChessFigure;
    figures: Array<ChessFigure>;
    moves: Array<ChessMove>;

    playerColor: ColorType;

    frameMeasureTime: number;
    frameCount: number;
    lastUpdate: number;
    fps: number;
    notifyFPS: Function;
    fpsInterval: number;
    currentFPS: number;

    bgBlack: string = "#a5a5a5";
    bgWhite: string = "#fff";

    figureBackground: BackgroundType = Background.none;

    gameManager: GameManager;

    constructor(gameManager: GameManager, canvas: Object, cbNotifyFPS: Function) {
        this.canvas = canvas;
        this.figures = [];
        this.isGameRunning = false;
        this.moves = [];

        this.fps = 10;
        this.frameCount = 0;
        this.notifyFPS = cbNotifyFPS;

        this.gameManager = gameManager;
    }

    setFigureBackground = (background: BackgroundType): void => {
        this.figureBackground = background;
        this.figures.forEach((figure: ChessFigure) => {
            figure.updateImage(this.figureBackground);
        });
    };

    startGame = (playerColor: ColorType): void => {
        this.figures = [];
        this.playerColor = playerColor;
        this.isGameRunning = true;
        this.fpsInterval = 1000 / this.fps;
        this.frameMeasureTime = Date.now();
        this.lastUpdate = this.frameMeasureTime;
        window.requestAnimationFrame(this.gameLoop);
    };

    gameLoop = (): void => {
        if (this.isGameRunning) {
            window.requestAnimationFrame(this.gameLoop);

            const elapsedTime = Date.now() - this.lastUpdate;
            if (elapsedTime > this.fpsInterval) {
                this.lastUpdate = Date.now() - (elapsedTime % this.fpsInterval);
                this.updateAnimation();

                // if one second passed update variables for FPS calculation
                if (Date.now() > this.frameMeasureTime + 1000) {
                    this.currentFPS = Math.round(1000 / ((Date.now() - this.frameMeasureTime) / this.frameCount) * 100) / 100;
                    if (this.notifyFPS) {
                        this.notifyFPS(this.currentFPS);
                    }

                    this.frameMeasureTime = Date.now();
                    this.frameCount = 0;
                }
                this.frameCount++;
            }
        }
    };

    updateAnimation = (): void => {
        this.paintBackground();

        // update figures
        const livingFigures = this.figures.filter((figure: ChessFigure) => (figure.isAlive));
        livingFigures.forEach((figure: ChessFigure) => figure.render());

        // maybe mark fields
        this.paintMarkFields();
    };

    paintBackground = (): void => {
        let isWhite = true;
        const tileWidth = this.canvas.width / 8;
        const tileHeight = this.canvas.height / 8;
        const context = this.canvas.getContext("2d");
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (isWhite)
                    context.fillStyle = this.bgWhite;
                else
                    context.fillStyle = this.bgBlack;
                isWhite = !isWhite;
                context.fillRect(j * tileWidth, i * tileHeight, tileWidth, tileHeight);
            }
            isWhite = !isWhite;
        }
    };

    paintMarkFields = (): void => {
        if (this.lastClickedFigure) {
            const tileWidth = this.canvas.width / 8;
            const tileHeight = this.canvas.height / 8;
            const context = this.canvas.getContext("2d");
            const fieldsItCanMoveTo = this.lastClickedFigure.getPlacesItCanMoveTo(this);
            // console.log(fieldsItCanMoveTo)
            fieldsItCanMoveTo.forEach((field: { x: number, y: number }) => {
                const centerX = field.x * tileWidth + tileWidth / 2;
                const centerY = field.y * tileHeight + tileHeight / 2;
                const radius = tileWidth / 2;

                context.beginPath();
                context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                context.lineWidth = 5;
                context.strokeStyle = 'red';
                context.stroke();
            });
        }
    };

    onMouseClick = (event: Object): void => {
        const newLocation = this.getFieldUnderMouse(event);
        const figure: ChessFigure = this.getFigureUnderMouse(event);
        if (figure) {
            if (figure.color === this.playerColor) {
                // the player clicked on one of his own figures --> just make the new one the clicked one
                if (this.lastClickedFigure) {
                    if (this.lastClickedFigure === figure) {
                        this.lastClickedFigure = null;
                    } else {
                        this.lastClickedFigure.onClick();
                        this.lastClickedFigure = figure;
                    }
                } else {
                    this.lastClickedFigure = figure;
                }
                figure.onClick();
            }
        }

        if (this.lastClickedFigure) {
            if (figure && figure.color !== this.playerColor) {
                // the player has a figure marked and now clicked on an enemy figure --> maybe kill it
                if (this.lastClickedFigure.canMoveTo(figure.location, this)) {
                    // make the killing move
                    const move = new ChessMove(
                        this.lastClickedFigure.location,
                        figure.location,
                        this.lastClickedFigure.type,
                        this.playerColor
                    );
                    figure.kill();
                    this.lastClickedFigure.moveTo(figure.location);
                    this.moves.push(move);
                    this.gameManager.makeMove(move);
                }
            } else if (figure === null) {
                // Player clicked on empty field --> maybe move there
                if (this.lastClickedFigure.canMoveTo(newLocation, this)) {
                    const move = new ChessMove(
                        this.lastClickedFigure.location,
                        newLocation,
                        this.lastClickedFigure.type,
                        this.playerColor
                    );
                    this.lastClickedFigure.moveTo(newLocation);
                    this.moves.push(move);
                    this.gameManager.makeMove(move);
                }
            }
        }
    };

    onMouseOver = (event: Object): void => {
        const figure: ChessFigure = this.getFigureUnderMouse(event);
        if (figure) {
            if (this.lastHoveredFigure && this.lastHoveredFigure !== figure) {
                this.lastHoveredFigure.onMouseLeave();
            }

            this.lastHoveredFigure = figure;

            figure.onMouseEnter();
        } else {
            this.onMouseLeave();
        }
    };

    onMouseLeave = (): void => {
        if (this.lastHoveredFigure) {
            this.lastHoveredFigure.onMouseLeave();
        }

        this.lastHoveredFigure = undefined;
    };

    isFieldOccupied = (location: Point): boolean => {
        const figuresOnThisField = this.figures.filter((figure: ChessFigure) =>
            (figure.location.x === location.x && figure.location.y === location.y && figure.isAlive && figure.color === this.playerColor));
        // console.log("is occupied? [" + x + "-" + y + "]: " + (figuresOnThisField.length === 1).toString());
        return figuresOnThisField.length === 1;
    };

    isFieldOnBoard = (location: Point): boolean => {
        return location.x >= 0 && location.y >= 0 && location.y <= 7 && location.y <= 7;
    };

    getFigureUnderMouse = (event: Object): ChessFigure => {
        const tile = this.getFieldUnderMouse(event);
        const foundFigure = this.figures.filter((figure: ChessFigure) =>
            (figure.isAlive && figure.location.x === tile.x && figure.location.y === tile.y)
        );
        if (foundFigure && foundFigure.length === 1) {
            return foundFigure[0];
        } else {
            return null;
        }
    };

    getFieldUnderMouse = (event: Object): Point => {
        const canvasRect = this.canvas.getBoundingClientRect();

        const realX = event.clientX - canvasRect.left;
        const realY = event.clientY - canvasRect.top;

        let x = Math.floor(realX / this.canvas.width * 8);
        let y = Math.floor(realY / this.canvas.height * 8);

        if (x > 7) x = 7;
        if (y > 7) y = 7;
        if (x < 0) x = 0;
        if (y < 0) y = 0;

        return new Point(x, y);
    };

    setFigures = (figures: Array<ChessFigure>): void => {
        this.figures = figures;
        this.figures.forEach((figure: ChessFigure) => {
            console.log(figure)
            figure.setCanvas(this.canvas);
            figure.updateImage(this.figureBackground);
        });
    };
}

export default BoardManager;