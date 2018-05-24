// @flow

import Rook from "./figures/Rook";
import ChessFigure from "./figures/ChessFigure";
import {Background, Color, Direction} from "./figures/ChessImage";
import {loadBoard} from "./model/api";

class GameManager {
    canvas: {};
    figures: [];
    // deadFigures: [];

    isGameRunning: boolean;
    lastHoveredFigure: ChessFigure;
    lastClickedFigure: ChessFigure;

    startTime: number;
    frameCount: number;
    lastUpdate: number;
    fpsInterval: number;
    currentFPS: number;

    bgBlack: string = "#a5a5a5";
    bgWhite: string = "#fff";

    figureBackground: Background = Background.none;

    constructor(canvas, cbNotifyFPS) {
        this.canvas = canvas;
        this.board = [];
        this.isGameRunning = false;

        this.fps = 10;
        this.frameCount = 0;
        this.notifyFPS = cbNotifyFPS;
    }

    setFigureBackground = (background: Background) => {
        this.figureBackground = background;
        this.figures.forEach((figure: ChessFigure) => {
            figure.updateImage(this.figureBackground);
        });
    };

    startGame: void = () => {
        // init board
        this.figures = [];
        this.setFigures(loadBoard());
        // now start
        this.isGameRunning = true;
        this.fpsInterval = 1000 / this.fps;
        this.startTime = Date.now();
        this.lastUpdate = this.startTime;
        window.requestAnimationFrame(this.gameLoop);
    };

    gameLoop: void = () => {
        if (this.isGameRunning) {
            window.requestAnimationFrame(this.gameLoop);

            const elapsedTime = Date.now() - this.lastUpdate;
            if (elapsedTime > this.fpsInterval) {
                this.lastUpdate = Date.now() - (elapsedTime % this.fpsInterval);
                this.currentFPS = Math.round(1000 / ((Date.now() - this.startTime) / ++this.frameCount) * 100) / 100;
                if (this.notifyFPS) {
                    this.notifyFPS(this.currentFPS);
                }

                this.updateAnimation();
            }
        }
    };

    updateAnimation: void = () => {
        this.paintBackground();

        // update figures
        const livingFigures = this.figures.filter((figure: ChessFigure) => (figure.isAlive));
        livingFigures.forEach((figure: ChessFigure) => figure.render());

        // maybe mark fields
        this.paintMarkFields();
    };

    paintBackground: void = () => {
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

    paintMarkFields: void = () => {
        if (this.lastClickedFigure) {
            const tileWidth = this.canvas.width / 8;
            const tileHeight = this.canvas.height / 8;
            const context = this.canvas.getContext("2d");
            const fieldsItCanMoveTo = this.lastClickedFigure.getPlacesItCanMoveTo(this);
            console.log(fieldsItCanMoveTo)
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

    onMouseClick: void = (event) => {
        const figure: ChessFigure = this.getFigureUnderMouse(event);
        if (figure) {
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
    };

    onMouseOver: void = (event) => {
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

    onMouseLeave: void = () => {
        if (this.lastHoveredFigure) {
            this.lastHoveredFigure.onMouseLeave();
        }

        this.lastHoveredFigure = undefined;
    };

    isFieldOccupied: boolean = (x: number, y: number) => {
        const figuresOnThisField = this.figures.filter((figure: ChessFigure) => (figure.x === x && figure.y === y && figure.isAlive));
        console.log("is occupied? [" + x + "-" + y + "]: "+(figuresOnThisField.length === 1));
        return figuresOnThisField.length === 1;
    };

    isFieldOnBoard: boolean = (x: number, y: number) => {
        return x >= 0 && y >= 0 && y <= 7 && y <= 7;
    };

    getFigureUnderMouse: ChessFigure = (event) => {
        const tile = this.getMouseFieldOfMouse(event);
        const foundFigure: [] = this.figures.filter((figure: ChessFigure) =>
            (figure.isAlive && figure.x === tile.x && figure.y === tile.y)
        );
        if (foundFigure && foundFigure.length === 1) {
            return foundFigure[0];
        } else {
            return null;
        }
    };

    getMouseFieldOfMouse: { x: number, y: number } = (event) => {
        const canvasRect = this.canvas.getBoundingClientRect();

        const realX = event.clientX - canvasRect.left;
        const realY = event.clientY - canvasRect.top;

        let x = Math.floor(realX / this.canvas.width * 8);
        let y = Math.floor(realY / this.canvas.height * 8);

        if (x > 7) x = 7;
        if (y > 7) y = 7;
        if (x < 0) x = 0;
        if (y < 0) y = 0;

        return {x, y};
    };

    setFigures: void = (figures: [ChessFigure]) => {
        this.figures = figures;
        this.figures.forEach((figure: ChessFigure) => {
            figure.setCanvas(this.canvas);
            figure.updateImage(this.figureBackground);
        });
    };
}

export default GameManager;