const qrInput = document.getElementById("qrInput");
const qrCodeDiv = document.getElementById("qrcode");
const downloadBtn = document.getElementById("downloadBtn");

// QR Code Generator Logic
function generateQRCode(text) {
  qrCodeDiv.innerHTML = "";
  if (!text.trim()) {
    downloadBtn.style.display = "none";
    return;
  }

  QRCode.toDataURL(text, { width: 200 }, function (err, url) {
    if (err) return console.error(err);

    const img = new Image();
    img.src = url;
    qrCodeDiv.appendChild(img);

    downloadBtn.href = url;
    downloadBtn.style.display = "inline-block";
    downloadBtn.textContent = "Download QR Code";
  });
}

qrInput.addEventListener("input", () => {
  generateQRCode(qrInput.value);
});


// === Floating Circles Animation ===
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let circles = [];
const total = 60;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createCircles() {
  circles = [];
  for (let i = 0; i < total; i++) {
    circles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 4 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }
}
createCircles();

function drawCircles() {
  ctx.clearRect(0, 0, width, height);
  for (let c of circles) {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fill();
    c.x += c.dx;
    c.y += c.dy;

    // Bounce off edges
    if (c.x < 0 || c.x > width) c.dx *= -1;
    if (c.y < 0 || c.y > height) c.dy *= -1;
  }
  requestAnimationFrame(drawCircles);
}
drawCircles();

// Cursor or tap attraction
window.addEventListener('mousemove', (e) => {
  attractCircles(e.clientX, e.clientY);
});
window.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  attractCircles(touch.clientX, touch.clientY);
});

function attractCircles(x, y) {
  for (let c of circles) {
    const dx = c.x - x;
    const dy = c.y - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      c.dx += dx / dist * 0.05;
      c.dy += dy / dist * 0.05;
    }
  }
}
