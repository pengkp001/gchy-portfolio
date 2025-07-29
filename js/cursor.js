const canvas = document.getElementById("sparkle");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const particles = [];
const maxParticles = 100;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.alpha = 1;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.shadowColor = "white";
    ctx.shadowBlur = 8;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 5; i++) {
    if (particles.length < maxParticles) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    } else {
      p.draw();
    }
  }
  requestAnimationFrame(animate);
}
animate();
