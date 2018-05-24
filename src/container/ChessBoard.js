// @flow

import React, {Component} from "react"
import GameManager from "../game/GameManager";
import ChessFigure from "../game/figures/ChessFigure";

import "../css/ChessBoard.css"
import {Background} from "../game/figures/ChessImage";

class ChessBoard extends Component {
    lastHoveredFigure: ChessFigure;
    lastClickedFigure: ChessFigure;
    canvas: object;
    gameManager: GameManager;

    constructor() {
        super();

        this.state = {
            canvasWidth: 300,
            canvasHeight: 300
        };
        this.canvas = React.createRef();
    }

    componentDidMount() {
        this.gameManager = new GameManager(this.canvas.current, (currentFPS) => {
            this.setState({currentFPS: currentFPS})
        });
        this.gameManager.startGame(); // todo remove
    }

    onMouseClick = (event) => {
        this.gameManager.onMouseClick(event);
    };

    onMouseOver = (event) => {
        this.gameManager.onMouseOver(event);
    };

    onMouseLeave = () => {
        this.gameManager.onMouseLeave();
    };

    onChangeBackground=(event)=>{
        this.gameManager.setFigureBackground(event.target.value);
    };

    render() {
        return (
            <div className="chess">
                <button onClick={this.startGame}>Start game</button>
                <br/>
                FPS: {this.state.currentFPS}
                <br/>
                Background:
                <select onChange={this.onChangeBackground}>
                    <option value={Background.none}>None</option>
                    <option value={Background.light}>Light</option>
                    <option value={Background.dark}>Dark</option>
                </select>
                <br/>
                <canvas onClick={this.onMouseClick}
                        onMouseMove={this.onMouseOver}
                        onMouseLeave={this.onMouseLeave}
                        ref={this.canvas}
                        height={this.state.canvasHeight} width={this.state.canvasWidth}/>
            </div>
        );
    }
}

export default ChessBoard;