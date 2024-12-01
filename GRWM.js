let stars = [];
let earth;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    // Initialize star positions
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            z: random(width),
            size: random(2, 5),
        });
    }
}

function draw() {
    background(0);

    // Draw stars in the background (moving towards the viewer)
    for (let star of stars) {
        fill(255);
        let sx = map(star.x / star.z, 0, 1, 0, width);
        let sy = map(star.y / star.z, 0, 1, 0, height);
        let r = map(star.z, 0, width, 5, 0);
        circle(sx, sy, star.size);

        // Move stars towards the viewer
        star.z -= 5;
        if (star.z < 1) {
            star.z = width;
            star.x = random(width);
            star.y = random(height);
        }
    }

    // Draw cosmic elements based on user interaction
    if (mouseIsPressed) {
        drawCosmicElement(mouseX, mouseY);
        popStar(mouseX, mouseY); // Create star when mouse is pressed
    }
}

// Function to draw interactive cosmic elements
function drawCosmicElement(x, y) {
    let brushSize = map(mouseX, 0, width, 10, 50); // Brush size changes with mouse X
    let colorIntensity = map(mouseY, 0, height, 100, 255); // Color changes with mouse Y
    fill(random(150, 255), random(100, colorIntensity), 255, 150);
    ellipse(x, y, brushSize);

    // Add sparkle effect
    for (let i = 0; i < 5; i++) {
        let sparkleX = x + random(-brushSize / 2, brushSize / 2);
        let sparkleY = y + random(-brushSize / 2, brushSize / 2);
        fill(255, random(150, 255), 255, 200);
        ellipse(sparkleX, sparkleY, random(2, 5));
    }
}

// Function to create a star at the clicked position
function popStar(x, y) {
    let star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${x - 20}px`;  // Position the star based on mouse click
    star.style.top = `${y - 20}px`;   // Adjust to center the star on the mouse position
    document.body.appendChild(star);

    // Remove the star after the animation
    setTimeout(() => {
        star.remove();
    }, 600); // Matches the duration of the pop animation
}

// Resize canvas on window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Function to go back to the previous page
function goBack() {
    window.history.back(); // This will take the user to the previous page
}

