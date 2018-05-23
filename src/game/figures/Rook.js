// @flow

import ChessFigure from "./ChessFigure"

class Rook extends ChessFigure {
    constructor(x, y, canvas) {
        super(x, y, canvas);
    }

    canMoveTo: boolean = (x: number, y: number) => {
        return true;
    };

    getPlacesItCanMoveTo = () => {
        return [];
    };

    render = () => {
        const width=this.canvas.width;
        console.log("rendering rook at: " +
            "[" + x + ", " + y + "] [" + width + ", " + height + "]");
        this.canvasContext.fillStyle = "#ccc";
        this.canvasContext.fillRect(x, y, width, height);
    };

    onMouseEnter = () => {
        console.log("hovering over rook at: " +
            "[" + x + ", " + y + "] [" + width + ", " + height + "]");
        this.canvasContext.fillStyle = "#ddd";
        this.canvasContext.fillRect(x, y, width, height);
    };

    onMouseLeave = () => {
        console.log("leaving rook");
        this.render();
    };

    onClick = () => {
        console.log("clicking rook at: " +
            "[" + x + ", " + y + "] [" + width + ", " + height + "]");
        canvasContext.fillStyle = "#fff";
        canvasContext.fillRect(x, y, width, height);
    };
}

export default Rook;