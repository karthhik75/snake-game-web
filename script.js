const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let direction = "RIGHT";
let score = 0;

// Movement logic
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function updateGame() {
  const head = { ...snake[0] };
  if (direction === "UP") head.y -= 20;
  if (direction === "DOWN") head.y += 20;
  if (direction === "LEFT") head.x -= 20;
  if (direction === "RIGHT") head.x += 20;

  snake.unshift(head);

  // Collision with food
  if (head.x === food.x && head.y === food.y) {
    score += 1;
    food = {
      x: Math.floor(Math.random() * 30) * 20,
      y: Math.floor(Math.random() * 30) * 20,
    };
  } else {
    snake.pop();
  }

  // Collision with wall or self
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    collisionWithSelf(head)
  ) {
    alert("Game Over!");
    resetGame();
  }

  drawGame();
}

function collisionWithSelf(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return true;
  }
  return false;
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "white";
  snake.forEach((segment) => ctx.fillRect(segment.x, segment.y, 20, 20));

  // Draw food
  ctx.fillStyle = "blue";
  ctx.fillRect(food.x, food.y, 20, 20);

  // Draw score
  document.getElementById("scoreBoard").textContent = `Score: ${score}`;
}

function resetGame() {
  snake.length = 0;
  snake.push({ x: 200, y: 200 });
  score = 0;
  direction = "RIGHT";
}

setInterval(updateGame, 100);
