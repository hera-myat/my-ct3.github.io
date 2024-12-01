let stars = []; // Array to hold the star objects
let projectiles = []; // Array to hold the projectiles

// Star class
class Star {
    constructor(x, y, speed, size) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
    }

    // Update star position
    update() {
        this.y += this.speed; // Move the star downward
        if (this.y > height) {
            this.y = 0; // Reset star position when it reaches the bottom
        }
    }

    // Display star
    display() {
        noStroke();
        fill(255, 255, 255, 150); // White with some transparency for the stars
        ellipse(this.x, this.y, this.size, this.size);
    }
}

// Projectile class
class Projectile {
    constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.radius = 10;
    }

    // Update projectile position
    update() {
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
    }

    // Display projectile
    display() {
        fill(255, 0, 0); // Red color for the projectile
        ellipse(this.x, this.y, this.radius * 2);
    }
}

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragEndX = 0;
let dragEndY = 0;

function setup() {
    createCanvas(windowWidth, windowHeight); // Create full-screen canvas

    // Create random stars
    for (let i = 0; i < 200; i++) {
        let star = new Star(random(width), random(height), random(1, 3), random(1, 3));
        stars.push(star);
    }
}

function draw() {
    background(0); // Black background for space

    // Display and update stars
    for (let star of stars) {
        star.update();
        star.display();
    }

    // Display projectiles and update their positions
    for (let i = projectiles.length - 1; i >= 0; i--) {
        projectiles[i].update();
        projectiles[i].display();

        // Remove projectile if it goes off screen
        if (projectiles[i].x < 0 || projectiles[i].x > width || projectiles[i].y < 0 || projectiles[i].y > height) {
            projectiles.splice(i, 1); // Remove projectile from the array
        }
    }

    // Draw the drag line when dragging
    if (isDragging) {
        stroke(255, 0, 0); // Red color for the drag line
        line(dragStartX, dragStartY, dragEndX, dragEndY); // Draw line from start to end of the drag
    }
}

function mousePressed() {
    // Start dragging and save the starting position
    isDragging = true;
    dragStartX = mouseX;
    dragStartY = mouseY;
}

function mouseReleased() {
    // End dragging, calculate the angle and create a new projectile
    isDragging = false;

    // Calculate the angle between the start and end of the drag
    let angle = atan2(dragEndY - dragStartY, dragEndX - dragStartX);
    let speed = dist(dragStartX, dragStartY, dragEndX, dragEndY) / 10; // Adjust speed based on drag distance

    // Create a new projectile at the start position of the drag
    projectiles.push(new Projectile(dragStartX, dragStartY, angle, speed));
}

function mouseDragged() {
    // Update the end position of the drag while the mouse is moving
    dragEndX = mouseX;
    dragEndY = mouseY;
}
