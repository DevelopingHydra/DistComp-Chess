// @flow

import React, {Component} from "react"
import BoardManager from "../game/BoardManager";
import ChessFigure from "../game/figures/ChessFigure";

import "../css/ChessBoard.css"
import {Background} from "../game/figures/ChessImage";
import GameManager from "../game/GameManager";

type Props = {};
type State = {
    canvasWidth: number,
    canvasHeight: number,
    currentFPS: number,
    message: string
}

class ChessBoard extends Component<Props, State> {
    lastHoveredFigure: ChessFigure;
    lastClickedFigure: ChessFigure;
    canvas: Object;
    gameManager: GameManager;

    constructor() {
        super();

        this.state = {
            canvasWidth: 300,
            canvasHeight: 300,
            currentFPS: 0,
            message: ""
        };
        this.canvas = React.createRef();
    }

    componentDidMount() {
        this.gameManager = new GameManager(this.canvas.current, this.onUpdateFPS, this.onShowMessage);
        this.gameManager.startGame(); // todo remove
    }

    onMouseClick = (event: Object): void => {
        this.gameManager.boardManager.onMouseClick(event);
    };

    onMouseOver = (event: Object): void => {
        this.gameManager.boardManager.onMouseOver(event);
    };

    onMouseLeave = (): void => {
        this.gameManager.boardManager.onMouseLeave();
    };

    onChangeBackground = (event: Object): void => {
        this.gameManager.boardManager.setFigureBackground(event.target.value);
    };

    onUpdateFPS = (currentFPS: number) => {
        this.setState({currentFPS: currentFPS});
    };

    onShowMessage = (message: string) => {
        this.setState({message: message});
    };

    render() {
        let controls = <React.Fragment/>;
        if (this.gameManager) {
            controls = <div>
                <button onClick={this.gameManager.startGame}>Start game</button>
                <br/>
                FPS: {this.state.currentFPS}
                <br/>
                Background:
                <select onChange={this.onChangeBackground}>
                    <option value={Background.none}>None</option>
                    <option value={Background.light}>Light</option>
                    <option value={Background.dark}>Dark</option>
                </select>
            </div>;
        }

        return (
            <div className="chess">
                {controls}
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