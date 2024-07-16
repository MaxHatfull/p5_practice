function createPoints() {
    let points = [];
    colorMode(HSB, 360, 100, 100, 100)
    for (let i = 0; i < 100; i++) {
        points.push(
            {
                x: random(0, width),
                y: random(0, height),
                hue: random(0, 360),
                pixels: []
            }
        )
    }
    return points;
}

function findClosestPoint(points, x, y) {
    let min = 1000000;
    let minIndex = 0;
    for (let k = 0; k < points.length; k++) {
        const d = dist(x, y, points[k].x, points[k].y);
        if (d < min) {
            min = d;
            minIndex = k;
        }
    }
    return points[minIndex];
}

function drawVoronoi(points) {
    strokeWeight(2);

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const closest = findClosestPoint(points, i, j);
            closest.pixels.push({x: i, y: j});
            let d = dist(i, j, closest.x, closest.y);
            stroke(color(closest.hue, 100, 20 + 100 / (1 + d / 70)));
            point(i, j);
        }
    }
}

function drawPoints(points) {
    stroke(color("black"));
    for (let i = 0; i < points.length; i++) {
        fill(color("white"));
        strokeWeight(1);
        ellipse(points[i].x, points[i].y, 5, 5);
    }
}

function drawCentroids(points) {
    stroke(color("white"));
    for (let i = 0; i < points.length; i++) {
        let sumX = 0;
        let sumY = 0;
        for (let j = 0; j < points[i].pixels.length; j++) {
            sumX += points[i].pixels[j].x;
            sumY += points[i].pixels[j].y;
        }
        const x = sumX / points[i].pixels.length;
        const y = sumY / points[i].pixels.length;
        fill(color("black"));
        strokeWeight(1);
        ellipse(x, y, 5, 5);
    }
}

function setup() {
    createCanvas(1000, 750);
    background(64);
    const points = createPoints();
    drawVoronoi(points);
    //drawPoints(points);
    //drawCentroids(points);
}

function draw() {
}
