const svg = document.getElementById("wingSim");
const flowGroup = document.getElementById("flowLines");
const wing = document.getElementById("wing");
const wingGroup = document.getElementById("wingGroup");
const liftDisplay = document.getElementById("liftForce");
const angleInput = document.getElementById("angleInput");

const rho = 1.225;
const area = 0.5;

let animationId;

function computeLift(vTop, vBottom) {
  const deltaP = 0.5 * rho * (vBottom * vBottom - vTop * vTop);
  return Math.round(deltaP * area);
}

function updateWingColor(vTop, vBottom) {
  const pressureDiff = 0.5 * rho * (vBottom * vBottom - vTop * vTop);
  let pressureRatio = Math.min(Math.max((pressureDiff + 500) / 1000, 0), 1);
  let red = Math.round(255 * (1 - pressureRatio));
  let blue = Math.round(255 * pressureRatio);
  wing.setAttribute("fill", `rgb(${red},100,${blue})`);
}

function colorGradient(t) {
  // t=0 red, t=0.5 blue, t=1 green
  if (t < 0.5) {
    const r = 255;
    const g = Math.round(255 * (t / 0.5));
    const b = Math.round(255 * (t / 0.5));
    return `rgb(${r},${g},${b})`;
  } else {
    const r = Math.round(255 * (1 - (t - 0.5) / 0.5));
    const g = 255;
    const b = Math.round(255 * (1 - (t - 0.5) / 0.5));
    return `rgb(${r},${g},${b})`;
  }
}

function startSimulation() {
  cancelAnimationFrame(animationId);
  flowGroup.innerHTML = "";
  const baseSpeed = parseFloat(document.getElementById("inputSpeed").value);
  const angle = parseFloat(angleInput.value);
  wingGroup.setAttribute("transform", `rotate(${angle}, 200, 200)`);

  const vTop = baseSpeed * (1 + angle / 30);
  const vBottom = baseSpeed * (1 - angle / 30);
  const lift = computeLift(vTop, vBottom);
  liftDisplay.textContent = lift;
  updateWingColor(vTop, vBottom);

  const lines = 30;
  const spacing = 10;
  const flowLines = [];

  for (let i = 0; i < lines; i++) {
    const y = 50 + i * spacing;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    line.setAttribute("r", 2);
    line.setAttribute("cy", y);
    line.setAttribute("cx", 0);
    const speed = i < lines / 2 ? vTop : vBottom;
    const relativeSpeed = (speed - baseSpeed) / (vTop - vBottom + 0.01);
    line.setAttribute("fill", colorGradient(relativeSpeed));
    flowGroup.appendChild(line);
    flowLines.push({ el: line, y, speed });
  }

  function animate() {
    flowLines.forEach(f => {
      let cx = parseFloat(f.el.getAttribute("cx"));
      cx += f.speed * 0.2;
      if (cx > 800) cx = 0;
      f.el.setAttribute("cx", cx);
    });
    animationId = requestAnimationFrame(animate);
  }

  animate();
}
