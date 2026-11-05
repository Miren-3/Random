//make 'powerups' (optional).
//this was made in p5.js

let xx, yy;
let ball = [];
let allbricks = [];
let sliderholder = [];
let brickwidth = 80;
let brickheight = 40;
let pointcounter = 0;
let poziom = 1;

//happens at load, sets up canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  xx = mouseX + windowWidth / 2;
  yy = windowHeight - 80 - 19 / 2;
  makebricks();
  makeSlider();
}

//makes new ball when mouse clicked
function mouseClicked() {
  if (ball.length < 1) {
    ball.push(new movingBall(xx, yy));
  }
}

//updates view (balls and sliders) everytime its called
function draw() {
  fill("white");
  textSize(18);
  text("Punkty: " + pointcounter, 10, windowHeight - 40);
  text("Poziom: " + poziom, 10, windowHeight - 20);
  background(0, 0, 0, 70);

  for (let b = 0; b < ball.length; b++) {
    ball[b].show();
    ball[b].move();
    ball[b].collision(bricks);
    ball[b].collision2(slider);
    sliderholder[b].showslider();
  }

  for (let c = 0; c < allbricks.length; c++) {
    allbricks[c].showbricks();
  }
}

//makes the moving ball + some extra logic
class movingBall {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 17;
    this.vel = createVector(random(1.8, 2), random(-2.2, -2.5));
  }

  show() {
    let p = this.pos;
    fill("white");
    circle(p.x, p.y, this.size);
  }

  move() {
    this.pos.add(this.vel);
    if (
      this.pos.x - this.size / 2 <= 0 ||
      this.pos.x + this.size / 2 >= windowWidth
    ) {
      this.vel.x *= -1;
    }

    if (this.pos.y - this.size / 2 <= 0) {
      this.vel.y *= -1;
    }

    if (this.pos.y + this.size / 2 >= windowHeight - 1) {
      this.vel.x = 0;
      this.vel.y = 0;
      fill("white");
      textSize(23);
      text(
        "You lost lol, try again",
        windowWidth / 2 - 120,
        windowHeight - 160
      );
    }

    if (allbricks.length == 0) {
      this.vel.x = 0;
      this.vel.y = 0;
      textSize(23);
      fill("white");
      poziom += 1;
      text(
        "Poziom ukonczony. Teraz czas na " +
        poziom +
        " poziom, ilosc punktow: " +
        pointcounter,
        windowWidth / 2 - 310,
        windowHeight / 2 - 100
      );
      poziom -= 1;
      if ((mouseIsPressed == true) && (allbricks.length == 0)) {
        makebricks();
        this.pos.x = xx;
        this.pos.y = yy;
        this.vel = createVector(random(1.5, 2), random(-2, -2.5));
        poziom++;
      }
    }
  }

  collision(bricks) {
    for (let i = 0; i < allbricks.length; i++) {
      let brick = allbricks[i];

      if (
        this.pos.x + this.size / 2 >= brick.pos.x &&
        this.pos.x - this.size / 2 <= brick.pos.x + brickwidth &&
        this.pos.y + this.size / 2 >= brick.pos.y &&
        this.pos.y - this.size / 2 <= brick.pos.y + brickheight
      ) {
        if (
          (this.vel.y < 0 &&
            this.pos.x > brick.pos.x + brickwidth &&
            this.pos.x < brick.pos.x + brickwidth + 20 &&
            this.pos.y - this.size / 2 < brick.pos.y + brickheight &&
            this.pos.y - this.size / 2 > brick.pos.y) ||
          (this.vel.y > 0 &&
            this.pos.x < brick.pos.x &&
            this.pos.x > brick.pos.x - 20 &&
            this.pos.y + this.size / 2 < brick.pos.y + brickheight &&
            this.pos.y + this.size / 2 > brick.pos.y) ||
          (this.vel.y < 0 &&
            this.pos.x < brick.pos.x &&
            this.pos.x > brick.pos.x - 20 &&
            this.pos.y - this.size / 2 < brick.pos.y + brickheight &&
            this.pos.y - this.size / 2 > brick.pos.y) ||
          (this.vel.y > 0 &&
            this.pos.x > brick.pos.x + brickwidth &&
            this.pos.x < brick.pos.x + brickwidth + 20 &&
            this.pos.y + this.size / 2 < brick.pos.y + brickheight &&
            this.pos.y + this.size / 2 > brick.pos.y)
        ) {
          allbricks.splice(i, 1);
          pointcounter++;
          this.vel.x *= -1.02;
          //this.vel.x *= 1.02;
          break;
        } else {
          allbricks.splice(i, 1);
          pointcounter++;
          this.vel.y *= -1.02;
          //this.vel.y *= 1.02;
          break;
        }
      }
    }
  }

  collision2(slider) {
    for (let i = 0; i < sliderholder.length; i++) {
      let movingslider = sliderholder[i];

      if (
        this.pos.x + this.size / 2 >= mouseX - 55 &&
        this.pos.x - this.size / 2 <= mouseX + 55 &&
        this.pos.y + this.size / 2 >= windowHeight - 80 &&
        this.pos.y - this.size / 2 <= windowHeight - 65
      ) {
        if (
          this.pos.x < mouseX &&
          this.pos.y <= windowHeight - 80 &&
          this.vel.x > 0
        ) {
          this.vel.x *= -1;
          this.vel.y *= -1;
          this.vel.x -= dist(this.pos.x, this.pos.y, mouseX, this.pos.y) / 150;
          this.vel.y += dist(this.pos.x, this.pos.y, mouseX - 55, this.pos.y) / 150;
        } else if (
          this.pos.x > mouseX &&
          this.pos.y <= windowHeight - 80 &&
          this.vel.x > 0
        ) {
          this.vel.y *= -1;
          this.vel.x += dist(this.pos.x, this.pos.y, mouseX, this.pos.y) / 150;
          this.vel.y -= dist(this.pos.x, this.pos.y, mouseX + 55, this.pos.y) / 150;
        } else if (
          this.pos.x > mouseX &&
          this.pos.y <= windowHeight - 80 &&
          this.vel.x < 0
        ) {
          this.vel.x *= -1;
          this.vel.y *= -1;
          this.vel.x -= dist(this.pos.x, this.pos.y, mouseX, this.pos.y) / 150;
          this.vel.y += dist(this.pos.x, this.pos.y, mouseX + 55, this.pos.y) / 150;
        } else if (
          this.pos.x < mouseX &&
          this.pos.y <= windowHeight - 80 &&
          this.vel.x < 0
        ) {
          this.vel.y *= -1;
          this.vel.x += dist(this.pos.x, this.pos.y, mouseX, this.pos.y) / 150;
          this.vel.y -= dist(this.pos.x, this.pos.y, mouseX - 55, this.pos.y) / 150;
        }
      }
    }
  }
}

//info for the bricks
class bricks {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.brickcolor = brcol();
  }

  showbricks() {
    fill(this.brickcolor);
    rect(this.pos.x, this.pos.y, 80, 40);
  }
}

//makes bricks :3
function makebricks() {
  allbricks = [];
  const xOffset = 20;
  const yOffset = 15;
  const paddingX = 20;
  const paddingY = 15;

  const spacingX = brickwidth + paddingX;
  const spacingY = brickheight + paddingY;

  const maxColumns = Math.floor((windowWidth - xOffset) / spacingX);
  const maxRows = Math.floor((windowHeight - 300) / spacingY);

  for (let i = 0; i < maxColumns; i++) {
    for (let j = 0; j < maxRows; j++) {
      let newbrick = new bricks(
        xOffset + spacingX * i,
        yOffset + spacingY * j
      );

      allbricks.push(newbrick);
    }
  }

  origbrickammount = allbricks.length;
}

/*function makebricks() {
  for (let i = 0; i <= (Math.trunc((windowWidth - brickwidth / 2) / brickwidth) - 3); i++) {
    for (let j = 0; j <= Math.trunc((windowHeight - 194) / 70); j++) {
      let newbrick = new bricks(
        20 + 110 * i,
        15 + 55 * j,
        brickwidth,
        brickheight
      );
      allbricks.push(newbrick);
      console.log(i,j, (Math.trunc((windowWidth - brickwidth / 2) / brickwidth) - 3));
    }
  }
  origbrickammount = allbricks.length;
}*/

//info for the slider
class slider {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.slidercolor = "cyan";
  }

  showslider() {
    fill(this.slidercolor);
    rect(mouseX - 55, windowHeight - 80, 110, 15);
  }
}

//makes slides duhhh
function makeSlider() {
  let newslider = new slider(mouseX - 55, windowHeight - 80, 110, 15);
  sliderholder.push(newslider);
}

//"brickscolor", makes a random color for each brick
function brcol() {
  return color(random(50, 255), random(50, 255), random(50, 255));
}
