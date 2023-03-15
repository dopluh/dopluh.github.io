let murder = [];
let baby_boid;
function setup() {
    alignSlider = createSlider(0, 5, 1, 0.1);
    cohereSlider = createSlider(0, 5, 1, 0.1);
    separateSlider = createSlider(0, 5, 1, 0.1);
    perceptionSlider = createSlider(0, 100, 1, 0.1);
    createCanvas(500, 400);
    stroke(255);
    strokeWeight(10);
    for (let i = 0; i < 200; i++){
        baby_boid = new Boid()
        murder.push(baby_boid);
    }
}

function draw() {
    background(155);
    stroke('purple')
    for (let boid of murder){
        boid.edges()
        boid.flock(murder)
        boid.update()
    }
    for (let boid of murder){
        boid.show()
    }
}

