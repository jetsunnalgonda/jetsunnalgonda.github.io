class Vehicle {
  constructor(x, y) {
    // this.pos = createVector(random(50),random(50) + 150);
    this.pos = createVector(random(400),random(400));
    this.target = createVector(x,y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 8;
    this.maxSpeed = 20;
    this.maxForce = 10;
  }

  behaviors() {
    var arrive = this.arrive(this.target);
    this.applyForce(arrive);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    stroke(100, 130, 200);
  	strokeWeight(6);
    point(this.pos.x, this.pos.y);
    // ellipse(this.pos.x, this.pos.y, 8, 8);
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    var steer = p5.Vector.sub(desired - this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  arrive(target) {
    // var desired = p5.Vector.sub(target, this.pos);
    var desired = createVector(target.x - this.pos.x, target.y - this.pos.y);
    var distance = desired.mag();
    var speed = this.maxSpeed;
    if (distance < 100) {
      speed = map(distance, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    // var steer = p5.Vector.sub(desired - this.vel);
    var steer = createVector(desired.x - this.vel.x, desired.y - this.vel.y);
    steer.limit(this.maxForce);
    return steer;
  }
}
