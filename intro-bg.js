let stars = [];
let shootingStars = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Set a black background to simulate the universe
    background(0);
    // Generate stars
    for (let i = 0; i < 100; i++) {
        stars.push(new Star(random(width), random(height)));
    }
}

function draw() {
    // Keep the background black to simulate the universe
    background(0, 0, 0, 25); // Alpha value makes it fade smoothly
    
    // Draw stars
    for (let star of stars) {
        star.show();
        star.update();
    }
    
    // Draw and animate shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        shootingStars[i].update();
        shootingStars[i].show();
        
        // Remove shooting star when it's out of the screen
        if (shootingStars[i].isOffScreen()) {
            shootingStars.splice(i, 1);
        }
    }

    // Occasionally add new shooting stars
    if (random() < 0.05) {
        shootingStars.push(new ShootingStar());
    }
}

// Star class that simulates a normal star in the sky
class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(1, 3);
    }

    show() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.size, this.size);
    }

    update() {
        // Stars move slightly to simulate a dynamic sky
        this.x += random(-0.1, 0.1);
        this.y += random(-0.1, 0.1);
    }
}

// ShootingStar class that simulates a shooting star effect
class ShootingStar {
    constructor() {
        this.x = random(windowWidth);
        this.y = random(windowHeight); // Start from the top half of the canvas
        this.length = random(40, 100);
        this.speed = random(5, 10);
        this.angle = random(PI / 6, PI / 3);
    }

    show() {
        stroke(255);
        strokeWeight(2);
        line(this.x, this.y, this.x - this.length * cos(this.angle), this.y + this.length * sin(this.angle));
    }

    update() {
        this.x -= this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
    }

    isOffScreen() {
        return (this.x < 0 || this.y > height);
    }
}

// Resize the canvas when the window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
