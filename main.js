var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255,0,0,0.5)';
// c.fillRect(100, 100, 100, 100);

var mouse = {
  x: undefined,
  y: undefined,
};
var maxRad = 40;
var minRad = Math.max(Math.random() * 10, 5);

var colorArray = ['#4BC6B9', '#73C1C6', '#96C3CE', '#A79AB2', '#B57BA6'];

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  console.log(mouse);
});
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// var xy = 50;
// for (let i = 0; i < canvas.width / 50; i++) {
//   c.beginPath();
//   c.moveTo(xy, 0);
//   c.lineTo(xy, canvas.height);
//   c.strokeStyle = '#7CDAEF';
//   c.stroke();
//   x = x + 50;
// }

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * 5)];
  this.minRad = radius;
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = 'blue';
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };
  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //Interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRad) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRad) {
      this.radius -= 1;
    }
    this.draw();
  };
}

var circleArray = [];
function init() {
  circleArray = [];
  for (var i = 0; i < 1000; i++) {
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dy = Math.random() - 0.5;
    var dx = Math.random() - 0.5;
    var radius = Math.max(Math.random() * 10, 2);
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}
init();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < 1000; i++) {
    circleArray[i].update();
  }
}

animate();
