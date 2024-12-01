let stars = [];
let shootingStars = [];
let canvas;

function setup() {
    // Create a full-page canvas
    canvas = createCanvas(windowWidth, max(windowHeight, document.body.scrollHeight));
    canvas.position(0, 0);
    canvas.style('z-index', '-1'); // Place canvas behind content
    canvas.style('position', 'fixed'); // Fix canvas to viewport
    
    // Generate stars
    for (let i = 0; i < 300; i++) {
        stars.push(new Star());
    }
    
    // Add event listeners for images to create shooting stars
    const images = document.querySelectorAll('.selfies-grid img');
    images.forEach(image => {
        image.addEventListener('click', () => {
            shootingStars.push(new ShootingStar());
        });
    });
}

function draw() {
    background(0, 0, 20); // Dark space-like background

    // Draw and update stars
    for (let star of stars) {
        star.update();
        star.show();
    }

    // Draw and update shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        let shootingStar = shootingStars[i];
        shootingStar.update();
        shootingStar.show();

        // Remove the shooting star if it has moved off the screen
        if (shootingStar.isOffScreen()) {
            shootingStars.splice(i, 1);
        }
    }
}

class Star {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.z = random(width); // Depth of the star (controls speed and size)
        this.pz = this.z; // Previous z for trail effect
    }

    update() {
        this.z -= 10; // Speed of the star's movement

        if (this.z < 1) {
            this.z = width; // Reset to the farthest distance
            this.x = random(width); // Randomize x position
            this.y = random(height); // Randomize y position
            this.pz = this.z;
        }
    }

    show() {
        fill(255); // White color for stars
        noStroke();

        // Calculate the 2D position of the star based on its depth (z)
        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);

        // Map the size based on its depth (the closer the star, the larger)
        let r = map(this.z, 0, width, 8, 0);
        ellipse(sx, sy, r, r);

        // Draw a line connecting to its previous position to create a tail effect
        let px = map(this.x / this.pz, 0, 1, 0, width);
        let py = map(this.y / this.pz, 0, 1, 0, height);

        this.pz = this.z;

        stroke(255);
        line(px, py, sx, sy);
    }
}

class ShootingStar {
    constructor() {
        this.x = random(width);
        this.y = random(height / 2); // Start from top half of the screen
        this.length = random(50, 150); // Length of the shooting star
        this.speed = random(15, 30); // Speed of the shooting star
        this.alpha = 255; // Initial transparency
        this.angle = random(PI / 4, 3 * PI / 4); // Angle of the shooting star's path
    }

    update() {
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;
        this.alpha -= 5; // Fade out effect

        // Reset the shooting star if it's off the screen
        if (this.alpha <= 0) {
            this.alpha = 255;
            this.x = random(width);
            this.y = random(height / 2); // Start from top half again
        }
    }

    show() {
        stroke(255, this.alpha);
        strokeWeight(2);
        line(this.x, this.y, this.x - this.length * cos(this.angle), this.y - this.length * sin(this.angle));
    }

    isOffScreen() {
        return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, max(windowHeight, document.body.scrollHeight));
}
