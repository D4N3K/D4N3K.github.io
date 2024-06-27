class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        angle = angle * (Math.PI / 180);
        this.dir = [Math.cos(angle), Math.sin(angle)];
    }

    updatePosition(pos) {
        this.pos = pos;
    }

    drawBase() {
        let r = 20;
        let end = [this.pos[0] + this.dir[0] * r, this.pos[1] + this.dir[1] * r];
        stroke(255);
        strokeWeight(1);
        line(this.pos[0], this.pos[1], end[0], end[1]);
    }

    drawRay(point) {
        if (point === null) {
            point = [this.pos[0] + this.dir[0] * (10**4), this.pos[1] + this.dir[1] * (10**4)];
        }
        stroke(255);
        strokeWeight(1);
        line(this.pos[0], this.pos[1], point[0], point[1]);
    }

    getIntersectionPoint(wall) {
        let x1 = this.pos[0];
        let y1 = this.pos[1];
        let x2 = x1 + this.dir[0];
        let y2 = y1 + this.dir[1];

        let x3 = wall.pos1[0];
        let y3 = wall.pos1[1];
        let x4 = wall.pos2[0];
        let y4 = wall.pos2[1];

        let den = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);
        let t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4))/den;
        let u = -((x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3))/den;

        if (u >= 0 && u <= 1 && t > 0) {
            let Px = x1 + t * (x2 - x1);
            let Py = y1 + t * (y2 - y1);
            return [Px, Py];
        }
        else return null;
    }
}