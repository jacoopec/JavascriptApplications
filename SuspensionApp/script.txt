const car = document.getElementById('car');
const ctx = document.getElementById('graphCanvas').getContext('2d');

let mass = 1;
let damping = 0.8;
let springK = 15;
let force = 20;

let position = 0;
let velocity = 0;
let time = 0;
let dataPoints = [];

const dt = 0.016;

function updateValuesFromUI() {
  mass = parseFloat(document.getElementById('mass').value);
  damping = parseFloat(document.getElementById('damping').value);
  springK = parseFloat(document.getElementById('springK').value);
  force = parseFloat(document.getElementById('force').value);

  document.getElementById('massVal').textContent = mass;
  document.getElementById('dampingVal').textContent = damping;
  document.getElementById('springKVal').textContent = springK;
  document.getElementById('forceVal').textContent = force;
}

['mass', 'damping', 'springK', 'force'].forEach(id =>
  document.getElementById(id).addEventListener('input', updateValuesFromUI)
);

function applyForce() {
  updateValuesFromUI();
  position = 0;
  velocity = 0;
  time = 0;
  dataPoints = [];
  simulate();
}

function simulate() {
  let interval = setInterval(() => {
    const acceleration = (force - damping * velocity - springK * position) / mass;
    velocity += acceleration * dt;
    position += velocity * dt;
    time += dt;
    dataPoints.push({ x: time, y: position });

    car.style.top = `${100 + position * 100}px`;

    if (dataPoints.length > 500 || (Math.abs(velocity) < 0.01 && Math.abs(position) < 0.01)) {
      clearInterval(interval);
    }

    drawGraph();
    force = 0;
  }, dt * 1000);
}

function drawGraph() {
  ctx.clearRect(0, 0, 500, 200);
  ctx.beginPath();
  ctx.moveTo(0, 100);
  dataPoints.forEach((pt, i) => {
    const x = i;
    const y = 100 - pt.y * 50;
    ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#3498db';
  ctx.stroke();
}
