class Obstacle {
  constructor() {
    this.x = width;
    this.y = 680;
    this.size = 50;
    this.speed = 9;
  }

  show() {
    // rect( this.x,this.y,this.size);
    image(obImg, this.x, this.y, 90, 50);
  }

  move() {
    this.x -= this.speed;
  }
}
