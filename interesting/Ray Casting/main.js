let size;
let n_walls = 10;
let walls = [];
let n_rays = 80;
let rays = [];
let canvas;

function getMousePosition() {
    return [mouseX, mouseY];
}

function windowResized() {
    size = 0.8 * Math.min(windowWidth, windowHeight);
    resizeCanvas(size, size);
    canvas.center("horizontal");
}

function setup() {
    canvas = createCanvas(size, size);
    windowResized();

    // Wall creation
    for (let i = 0; i < n_walls; i++) {
        coords = [];
        for (let j = 0; j < 4; j++) {
            r = random(0, 1);
            coords[j] = r * size;
        }
        walls[i] = new Wall(coords[0], coords[1], coords[2], coords[3]);
    } 
    
    // Ray definiton
    for (let i = 0; i < n_rays; i++) {
        let angle = i * (360 / n_rays);
        rays[i] = new Ray(getMousePosition(), angle);
    }

}
  
function draw() {
    background(2, 195, 230);

    for (let i = 0; i < n_walls; i++) {
        walls[i].show();
    }

    for (let i = 0; i < n_rays; i++) {
        rays[i].updatePosition(getMousePosition());
        let point = analyzeWalls(rays[i]);
        rays[i].drawRay(point);
    }
}

function analyzeWalls(ray) {
    let points = [];
    let idx = 0;
    for (let j = 0; j < n_walls; j++) {
        intersection = ray.getIntersectionPoint(walls[j]); 
        if (intersection === null) continue
        else {
            points[idx] = intersection;
            idx += 1;
        }  
    }
    if (points.length === 0) return null;
    else return getClosestPoint(ray.pos, points);
}

function getClosestPoint(pos, points) {
    let idx = -1;
    let dist = Infinity;
    for (let i = 0; i < points.length; i++) {
        let delta_x = (pos[0] - points[i][0]);
        let delta_y = (pos[1] - points[i][1]);
        let newDist = Math.sqrt(delta_x**2 + delta_y**2);
        if (newDist < dist) {
            dist = newDist;
            idx = i;
        }
    }
    return points[idx];
}