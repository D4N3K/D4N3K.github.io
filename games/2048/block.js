let COLOR_LOOKUP = {2: "#E3E3E3",
                    4: "#E8E0C3",
                    8: "#E69F4E",
                    16: "#CF6038",
                    32: "#FA7357",
                    64: "#C21010",
                    128: "#FFF459",
                    256: "#FFD92E",
                    512: "#EBC107",
                    1024: "#C7A302",
                    2048: "#967405"};
let textShift = 5;

class Block {
    constructor(pos, size, radius, value) {
        this.pos = pos;
        this.size = size
        this.radius = radius;
        this.value = value;
        this.color = COLOR_LOOKUP[value];
    }

    drawBlock() {
        noStroke();
        fill(this.color);
        rect(this.pos[0], this.pos[1], this.size, this.size, this.radius);

        if (this.value <= 4) fill(80);
        else fill(255);
        textStyle(BOLD);
        textSize(0.1*size);
        textAlign(CENTER, CENTER);
        text(String(this.value), this.pos[0] + (this.size/2), this.pos[1] + (this.size/2) + textShift);
    }
}