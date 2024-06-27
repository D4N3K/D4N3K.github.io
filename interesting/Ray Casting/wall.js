class Wall {
    constructor(x1, y1, x2, y2) {
        this.pos1 = [x1, y1];
        this.pos2 = [x2, y2];
    }

    show() {
        stroke(255);
        strokeWeight(3);
        line(this.pos1[0], this.pos1[1], this.pos2[0], this.pos2[1]);
    }
}