// Define canvas const

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Linear gradient takes 6 parameters : x1, y1, r1, x2, y2, r2
// let gradient = ctx.createRadialGradient(
//   canvas.width / 2,
//   canvas.height / 2,
//   100,
//   canvas.width / 2,
//   canvas.height / 2,
//   200
// );

// let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
// gradient.addColorStop(0, "red");
// gradient.addColorStop(0.2, "yellow");
// gradient.addColorStop(0.4, "green");
// gradient.addColorStop(0.6, "cyan");
// gradient.addColorStop(0.8, "blue");
// gradient.addColorStop(1, "magenta");

// Create and manage each individual object
class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = ""; // random character from this.characters define above
    this.canvasHeight = canvasHeight;
  }
  // randomize current character and joined on canvas an a specific position
  draw(context) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    // takes on character of the string
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.99) {
      this.y = 0;
    } else this.y += 1;
  }
}

// Manage the entire rain effect, all symbols at once
class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
    console.log(this.symbols);
  }
  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);

// Add timestamp and delta time to control FPS
let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

// Animation loop
function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if (timer > nextFrame) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.textAlign = "center";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle =  "#0aff0a"; // gradient;
    ctx.font = effect.fontSize + "px monospace";
    effect.symbols.forEach((symbol) => symbol.draw(ctx));
    timer = 0;
  } else timer += deltaTime;
  requestAnimationFrame(animate);
}
animate(0);

// Responsive

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  effect.resize(canvas.width, canvas.height);
});
