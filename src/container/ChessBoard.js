// @flow
import React, {Component} from "react"
import GameManager from "../game/GameManager";
import ChessFigure from "../game/figures/ChessFigure";

import "../css/ChessBoard.css"

class ChessBoard extends Component {
    tileWidth: number;
    tileHeight: number;
    lastHoveredFigure: ChessFigure;
    lastClickedFigure: ChessFigure;

    constructor() {
        super();

        this.gameManager = new GameManager();
        this.state = {
            canvasWidth: 300,
            canvasHeight: 300
        }
    }

    componentDidMount() {
        this.canvasContext = this.refs.canvas.getContext("2d");
        this.tileWidth = this.refs.canvas.width / 8;
        this.tileHeight = this.refs.canvas.height / 8;

        this.startGame(); // todo remove
    }

    onMouseClick = (event) => {
        const figure: ChessFigure = this.getClickedFigure(event);

        if (this.lastHoveredFigure) {
            figure.onClick()
        }
    };

    onMouseOver = (event) => {
        const figure: ChessFigure = this.getClickedFigure(event);

        if (this.lastHoveredFigure && this.lastHoveredFigure !== figure) {
            this.lastHoveredFigure.onMouseLeave(this.canvasContext,
                this.lastHoveredFigure.x * this.tileWidth,
                this.lastHoveredFigure.y * this.tileHeight,
                this.tileWidth,
                this.tileHeight
            );
        }

        this.lastHoveredFigure = figure;

        figure.onMouseEnter(this.canvasContext,
            tile.x * this.tileWidth,
            tile.y * this.tileHeight,
            this.tileWidth,
            this.tileHeight
        );
    };

    onMouseLeave = (event) => {
        if (this.lastHoveredFigure) {
            this.lastHoveredFigure.onMouseLeave(this.canvasContext,
                this.lastHoveredFigure.x * this.tileWidth,
                this.lastHoveredFigure.y * this.tileHeight,
                this.tileWidth,
                this.tileHeight
            );
        }

        this.lastHoveredFigure = undefined;
    };

    getClickedFigure = (event) => {
        const tile = this.getMouseFieldOfMouse(event);
        return this.gameManager.board[tile.x][tile.y];
    };

    getMouseFieldOfMouse = (event) => {
        const canvas = this.refs.canvas;
        const canvasRect = canvas.getBoundingClientRect();

        const realX = event.clientX - canvasRect.left;
        const realY = event.clientY - canvasRect.top;

        return {
            x: Math.floor(realX / this.state.canvasWidth * 8),
            y: Math.floor(realY / this.state.canvasHeight * 8)
        }
    };

    startGame = () => {
        console.log("starting game");
        this.gameManager.startGame();
        this.renderBoard();
    };

    renderBoard = () => {
        const board = this.gameManager.board;

        board.forEach((array, x) => {
            array.forEach((figure, y) => {
                figure.render(this.canvasContext,
                    x * this.tileWidth,
                    y * this.tileHeight,
                    this.tileWidth,
                    this.tileHeight
                );
            })
        })
    };

    render() {
        return (
            <div className="chess">
                <button onClick={this.startGame}>Start game</button>
                <br/>
                <canvas onClick={this.onMouseClick}
                        onMouseMove={this.onMouseOver}
                        onMouseLeave={this.onMouseLeave}
                        ref="canvas"
                        height={this.state.canvasHeight} width={this.state.canvasWidth}/>
            </div>
        );
    }
}

export default ChessBoard;