let jsonData = [];
let users = [];

let colorSeleccionado, formaSeleccionada, texturaSeleccionada, sonidoSeleccionado;

function preload() {
  loadJSON("/project/data", data => {
    jsonData = data;
  });
}

function setup() {
    const contenedor = document.getElementById('contenedor-canvas-p5');
    if (contenedor) {
      const lienzo = createCanvas(600, 400);
      lienzo.parent(contenedor);  
    } 

    for (let obj of jsonData) {
        users.push(new UserData(obj));
      }

}

function draw() {
  background(255);

  for (let obj of users) {
    obj.draw();
  }
}

class UserData {
    constructor(obj) {
      this.data = obj;
      this.name = this.data.name || "Anónimo"; 
      this.x = random(500);
      this.y = random(300);
      this.color = this.mapColor(this.data.color);
      this.shape = this.data.shape || 'circulo'; 
      this.movement = this.data.movement || 'quieto'; 
      this.angle = 0; 
      this.speedX = random(1, 3); 
      this.speedY = random(1, 3);
      this.size = this.mapSize(this.data.size || '10');
      this.randomX = this.x;
      this.randomY = this.y;
    }
      mapColor(colorName) {
        switch (colorName.toLowerCase()) {
          case 'azul':
            return '#1E90FF';
          case 'rojo':
            return '#FF4500';
          case 'amarillo':
            return '#FFD700'; 
          case 'verde':
            return '#32CD32'; 
          case 'morado':
            return '#800080'; 
          default:
            return '#FFF564'; 
        }
      }
      mapSize(sizePercentage) {
        const baseSize = 50;
        const percentage = parseInt(sizePercentage, 10);
        return (percentage / 100) * baseSize;
      }
      applyMovement() {
        switch (this.movement.toLowerCase()) {
          case 'estatico':
            break;
          case 'oscilante':
            this.x += sin(this.angle) * 2;
            this.angle += 0.05;
            break;
          case 'rebote':
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > 600 || this.x < 0) {
              this.speedX *= -1;
            }
            if (this.y > 400 || this.y < 0) {
              this.speedY *= -1;
            }
            break;
          case 'rotacion':
            this.angle += 0.05; 
            break;
          default:
        }
      }
    
  
    draw() {
        let { color, shape, movement, size } = this.data;

        this.applyMovement();

        color = color || 'white'; 
        shape = shape || 'sin forma';
        movement = movement || 'sin movimiento';
        size = size || '1px';
  
      fill(color);
      noStroke();

      push();
    if (this.movement === 'rotacion') {
      translate(this.randomX, this.randomY);
      rotate(this.angle);
      this.x = 0;
      this.y = 0;
    }
      switch (shape) {
        case 'circulo':
            fill(this.color);
          ellipse(this.x, this.y, this.size, this.size);
          break;
        case 'cuadrado':
            fill(this.color);
          rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
          break;
        case 'triangulo':
            fill(this.color);
          triangle(
            this.x, this.y - this.size / 2,
            this.x - this.size / 2, this.y + this.size / 2,
            this.x + this.size / 2, this.y + this.size / 2
          );
          break;
        case 'espiral':
        stroke(this.color);
          this.drawSpiral(this.x, this.y, this.size / 2);
          break;
        case 'línea':
          stroke(this.color);
          line(this.x - this.size / 2, this.y, this.x + this.size / 2, this.y);
          break;
        default:
          ellipse(this.x, this.y, this.size, this.size);
      }
      pop();
      textSize(12);
        fill(0);
        textAlign(CENTER);
        text(this.name, this.x, this.y + this.size / 2 + 15);
    }
    drawSpiral(x, y, radius) {
      noFill();
      beginShape();
      for (let i = 0; i < 360; i++) {
        let angle = radians(i);
        let rad = map(i, 0, 360, 0, radius);
        let x1 = x + rad * cos(angle);
        let y1 = y + rad * sin(angle);
        vertex(x1, y1);
      }
      endShape();
    }
  }