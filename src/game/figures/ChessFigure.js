class ChessFigure {
    constructor(x: number, y: number, canvas) {
        if (new.target === ChessFigure) {
            throw new TypeError("Cannot construct ChessFigure instances directly");
        }

        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d");
    }

    moveTo = (x: number, y: number) => {
        if (this.canMoveTo(x, y)) {
            this.x = x;
            this.y = y;
        }
    };

    getTileWidth = () => (this.canvas.width / 8);

    render = () => {
        throw new Error("This method has to be implemented in a subclass")
    };

    onMouseEnter = () => {
        throw new Error("This method has to be implemented in a subclass")
    };

    onMouseLeave = () => {
        throw new Error("This method has to be implemented in a subclass")
    };

    onClick = () => {
        throw new Error("This method has to be implemented in a subclass")
    };

    canMoveTo: boolean = (x: number, y: number) => {
        throw new Error("This method has to be implemented in a subclass")
    };
    getPlacesItCanMoveTo = () => {
        throw new Error("This method has to be implemented in a subclass")
    };

}

export default ChessFigure;