class Element1 {
  constructor() {
    this.x = width;
    this.y = 680;
    this.size = 50;
    this.speed = 6;
  }

  show() {
    image(elementImg1, this.x, this.y, 90, 50);
  }

  move() {
    this.x -= this.speed;
  }
}

class Element2 {
  constructor() {
    this.x = width;
    this.y = 680;
    this.size = 50;
    this.speed = 7;
  }
  show() {
    image(elementImg2, this.x, this.y, 90, 50);
  }

  move() {
    this.x -= this.speed;
  }
}

class Element3 {
  constructor() {
    this.x = width;
    this.y = 680;
    this.size = 50;
    this.speed = 8;
  }
  show() {
    image(elementImg3, this.x, this.y, 90, 50);
  }

  move() {
    this.x -= this.speed;
  }
}

class Element4 {
  constructor() {
    this.x = width;
    this.y = 680;
    this.size = 50;
    this.speed = 5;
  }
  show() {
    image(elementImg4, this.x, this.y, 90, 50);
  }

  move() {
    this.x -= this.speed;
  }
}
