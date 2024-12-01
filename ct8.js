let stars = []; // Array to hold stars
let shootingStars = []; // Array to hold shooting stars

function setup() {
    createCanvas(windowWidth, windowHeight); // Fullscreen canvas
    noStroke();
    
    // Generate a number of stars to create a starry background
    for (let i = 0; i < 1000; i++) {
        stars.push(new Star(random(width), random(height), random(1, 3)));
    }

    // Add click event listener to the alien image
    const alienImage = document.querySelector('.alien-image');
    alienImage.addEventListener('click', triggerShootingStars);
}

function draw() {
    background(0); // Set the background to black
    
    // Loop through the stars and display them
    for (let star of stars) {
        star.update();
        star.show();
    }

    // Loop through the shooting stars and update their position
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        shootingStars[i].update();
        shootingStars[i].show();

        // Remove the shooting star when it's off-screen
        if (shootingStars[i].x < 0 || shootingStars[i].x > width || shootingStars[i].y < 0 || shootingStars[i].y > height) {
            shootingStars.splice(i, 1);
        }
    }
}

// Function to trigger the shooting stars when the image is clicked
function triggerShootingStars() {
    for (let i = 0; i < 5; i++) { // Create 5 shooting stars on each click
        shootingStars.push(new ShootingStar(random(width), random(height), random(3, 6)));
    }
}

// Star class to represent each star in the sky
class Star {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.originalSize = size;
        this.brightness = random(100, 255); // Initial random brightness
        this.alpha = 255; // Fully visible initially
    }

    update() {
        // Interact with the stars: Mouse movement affects their brightness and size
        let d = dist(mouseX, mouseY, this.x, this.y);
        
        // If mouse is close to the star, it fades out and grows larger
        if (d < 100) {
            this.brightness = map(d, 0, 100, 0, 255);  // Fade out as mouse approaches
            this.alpha = map(d, 0, 100, 255, 0);      // Decrease alpha to create fading effect
            this.size = map(d, 0, 100, this.originalSize * 2, this.originalSize); // Grow the star
        } else {
            this.brightness = map(d, 100, 500, 100, 255); // Regular brightness at distance
            this.alpha = 255;  // Full opacity when not near the mouse
            this.size = this.originalSize; // Restore original size
        }
    }

    show() {
        // Draw the star with its current brightness and size
        fill(this.brightness, this.brightness, this.brightness, this.alpha); // Add alpha for fading effect
        ellipse(this.x, this.y, this.size, this.size);
    }
}

// ShootingStar class to represent shooting stars triggered on image click
class ShootingStar {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = random(5, 10);
        this.alpha = 255; // Full opacity for shooting star
    }

    update() {
        // Move the shooting star diagonally from bottom-left to top-right
        this.x += this.speed;
        this.y -= this.speed;

        // Fade out the shooting star
        this.alpha -= 5;
    }

    show() {
        // Draw the shooting star with a trail effect (thin lines)
        stroke(255, this.alpha);
        strokeWeight(this.size);
        point(this.x, this.y);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Resize canvas if the window is resized
}
