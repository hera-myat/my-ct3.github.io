// Game setup and configuration
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let score = 0;
let ufo;
let spacecrafts = [];
let gameInterval;
let alienSpeed = 2; // Starting speed for spacecrafts
let ufoSpeed = 5;
let gameOver = false;
let isPaused = false;

// Buttons
const pauseButton = document.getElementById("pauseButton");
const continueButton = document.getElementById("continueButton");

// Load images
const ufoImg = new Image();
ufoImg.src = 'media/ufo.png'; // Replace with the path to your UFO image
const spacecraftImg = new Image();
spacecraftImg.src = 'media/spacecraft.png'; // Replace with the path to your spacecraft image

// UFO class
class UFO {
  constructor() {
    this.x = canvas.width / 2 - 25;
    this.y = canvas.height - 50;
    this.width = 50;
    this.height = 50;
    this.speed = ufoSpeed;
  }

  move(left, right) {
    if (left && this.x > 0) {
      this.x -= this.speed;
    }
    if (right && this.x < canvas.width - this.width) {
      this.x += this.speed;
    }
  }

  draw() {
    ctx.drawImage(ufoImg, this.x, this.y, this.width, this.height);
  }
}

// Spacecraft class
class Spacecraft {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
  }

  update() {
    this.y += alienSpeed;
  }

  draw() {
    ctx.drawImage(spacecraftImg, this.x, this.y, this.width, this.height);
  }
}

// Game functions
function createSpacecraft() {
  const x = Math.random() * (canvas.width - 40);
  spacecrafts.push(new Spacecraft(x, 0));
}

function drawGame() {
  if (isPaused || gameOver) return; // Skip drawing when paused or game over

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw UFO
  ufo.draw();

  // Draw spacecrafts and update positions
  spacecrafts.forEach((spacecraft, index) => {
    spacecraft.update();
    spacecraft.draw();

    // Check for collision with UFO
    if (
      spacecraft.x < ufo.x + ufo.width &&
      spacecraft.x + spacecraft.width > ufo.x &&
      spacecraft.y < ufo.y + ufo.height &&
      spacecraft.y + spacecraft.height > ufo.y
    ) {
      endGame(); // End the game on collision
      return;
    }

    // Remove off-screen spacecrafts
    if (spacecraft.y > canvas.height) {
      spacecrafts.splice(index, 1);
      score++; // Increase score for avoiding spacecraft

      // Increase difficulty after score 10
      if (score === 10) {
        alienSpeed += 2; // Increase falling speed
      }
    }
  });

  // Update score
  document.getElementById("score").textContent = score;
}

function endGame() {
  clearInterval(gameInterval); // Stop the game loop
  gameOver = true;
  drawGameOverScreen(); // Show Game Over screen
}

function drawGameOverScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  ctx.fillStyle = "black"; // Background overlay
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Display Game Over text
  ctx.fillStyle = "red";
  ctx.font = "48px 'Press Start 2P', sans-serif"; // Pixel-like font
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);

  // Display final score
  ctx.fillStyle = "white";
  ctx.font = "24px 'Press Start 2P', sans-serif";
  ctx.fillText(`FINAL SCORE: ${score}`, canvas.width / 2, canvas.height / 2 + 20);

  // Restart instructions
  ctx.fillStyle = "yellow";
  ctx.font = "16px 'Press Start 2P', sans-serif";
  ctx.fillText("PRESS R TO RESTART", canvas.width / 2, canvas.height / 2 + 60);
}

function startGame() {
  ufo = new UFO();
  spacecrafts = [];
  score = 0;
  alienSpeed = 2; // Reset speed on game start
  gameOver = false;
  isPaused = false;
  document.getElementById("score").textContent = score;

  // Reset buttons
  pauseButton.disabled = false;
  continueButton.disabled = true;

  // Create spacecrafts every 2 seconds
  setInterval(createSpacecraft, 2000);

  gameInterval = setInterval(() => {
    if (!isPaused && !gameOver) {
      moveUFO();
      drawGame();
    }
  }, 1000 / 60); // 60 FPS
}

// Handle key events for UFO movement and restart
let left = false;
let right = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    left = true;
  }
  if (e.key === "ArrowRight") {
    right = true;
  }
  if (e.key === "r" || e.key === "R") {
    if (gameOver) {
      startGame(); // Restart the game
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") {
    left = false;
  }
  if (e.key === "ArrowRight") {
    right = false;
  }
});

// Pause and Continue button logic
pauseButton.addEventListener("click", () => {
  isPaused = true;
  pauseButton.disabled = true;
  continueButton.disabled = false;
});

continueButton.addEventListener("click", () => {
  isPaused = false;
  pauseButton.disabled = false;
  continueButton.disabled = true;
});

// Update UFO position on each frame
function moveUFO() {
  ufo.move(left, right);
}

// Start the game
startGame();

// Go Back button functionality
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", () => {
  history.back(); // Navigate to the previous page
});

