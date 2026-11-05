//this was made in p5.js

let ballvel, slider2y, slidervel;
let ball = [];
let sliderholder = [];
let sliderholder2 = [];
let player1points = 0;
let player2points = 0;
let makenewball = 0;
let makebackground = 0;

//setup function + makes ball
function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(30);
  fill("white");
  text("Pong, click to start", 350, 100);
  makeSlider();
  makeSlider2();
  i = random(1, 2);

  if (i >= 1.5) {
    ballvel = createVector(random(4, 5), random(-4, 4));
  } else {
    ballvel = createVector(random(-4, -5), random(-4, 4));
  }

  slider2y = windowHeight / 2 - 55;
}

//adds ball on mouseclick
function mouseClicked() {
  makebackground = 1;

  if (ball.length < 1) {
    ball.push(new movingBall(windowWidth / 2, windowHeight / 2));
  }
}

//"draws" the text values and updates the ball + slider positions 
function draw() {
  text(player1points + "     " + player2points, windowWidth / 2 - 40, 50);

  if (player1points === 9 || player2points === 9) {
    if (player1points == 9) {
      text("Player 1 wins!", 70, 70);
    } else {
      text("Player 2 wins!", windowWidth - 270, 70);
    }
  }

  stroke("white");
  strokeWeight(10);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
  strokeWeight(1);

  if (makebackground === 1) {
    background(0, 0, 0, 60);
    text("ai", windowWidth - (windowWidth / 4), 50);
  }

  for (let b = 0; b < ball.length; b++) {
    ball[b].show();
    ball[b].move();
    //madrzejsze ai
    //ball[b].ai(slider2);
    //glupsze ai
    ball[b].ai2(slider2);
    ball[b].collision(slider);
    sliderholder[b].showslider();
    ball[b].collision2(slider2);
    sliderholder2[b].showslider();
  }
}

//ball info + logic
class movingBall {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 15;
    this.vel = ballvel;
  }

  show() {
    let p = this.pos;
    fill("white");
    circle(p.x, p.y, this.size);
  }

  //madrzejsze ai
  /*ai(slider2) {
    let slidervel = this.vel.y / 1.2;
    slider2y += slidervel;
  }*/

  //glupsze ai
  //adds speeds or subtracts speed according to where it and the ball is
  ai2(slider2) {
    if (this.vel.y >= 1.5 && slider2y < windowHeight - 110) {
      slidervel = 2;
      slider2y += slidervel;
    } else if (
      this.vel.y > 0 &&
      this.vel.y < 1.5 &&
      slider2y < windowHeight - 110
    ) {
      slidervel = 1;
      slider2y += slidervel;
    } else if (this.vel.y <= -1.5 && slider2y > 1) {
      slidervel = -2;
      slider2y += slidervel;
    } else if (this.vel.y > -1.5 && this.vel.y < 0 && slider2y > 1) {
      slidervel = -1;
      slider2y += slidervel;
    }
  }

  //if the ball touches one of the sides logic
  move() {
    this.pos.add(this.vel);

    if (
      this.pos.x - this.size / 2 <= 0 ||
      this.pos.x + this.size / 2 >= windowWidth - 0
    ) {
      if (this.pos.x - this.size / 2 < 1) {
        this.pos.x += this.size / 2;
        this.vel.x = 0;
        this.vel.y = 0;
        player2points++;
        makenewball = 1;
        slidervel = 0;
      } else {
        this.pos.x -= this.size / 2;
        this.vel.x = 0;
        this.vel.y = 0;
        player1points++;
        makenewball = 1;
        slidervel = 0;
      }
    }

    //logic to continue playing when the ball touched one of the sides
    if (makenewball == 1 && player1points !== 9 && player2points !== 9) {
      text("Click to resume playing", windowWidth / 2 + 15, 100);

      if (mouseIsPressed == true) {
        let a = random(1, 2);
        if (a > 1.5) {
          makenewball = 0;
          this.pos.x = windowWidth / 2;
          this.pos.y = windowHeight / 2;
          this.vel = createVector(random(-4, -5), random(-4, 4));
        } else {
          makenewball = 0;
          this.pos.x = windowWidth / 2;
          this.pos.y = windowHeight / 2;
          this.vel = createVector(random(4, 5), random(-4, 4));
        }
      }
    }

    if (
      this.pos.y - this.size / 2 <= 0 ||
      this.pos.y + this.size / 2 >= windowHeight
    ) {
      this.vel.y *= -1;
    }
  }

  //logic to change speed and direction when bounced off of left slider
  collision(slider) {
    for (let i = 0; i < sliderholder.length; i++) {
      let movingslider = sliderholder[i];

      if (
        this.pos.x + this.size / 2 >= 10 &&
        this.pos.x - this.size / 2 <= 25 &&
        this.pos.y + this.size / 2 >= mouseY &&
        this.pos.y - this.size / 2 <= mouseY + 110
      ) {
        this.vel.x *= -1;
        if (this.pos.y <= mouseY + 36 && this.vel.y < 0) {
          this.vel.x *= 1.02;
          this.vel.y *= 1.02;
        } else if (this.pos.y >= mouseY + 72 && this.vel.y < 0) {
          this.vel.x *= 0.97;
          this.vel.y *= 0.97;
        } else if (this.pos.y <= mouseY + 36 && this.vel.y > 0) {
          this.vel.x *= 0.97;
          this.vel.y *= 0.97;
        } else if (this.pos.y >= mouseY + 72 && this.vel.y > 0) {
          this.vel.x *= 1.02;
          this.vel.y *= 1.02;
        }
      }
    }
  }


  //logic to change speed and direction when bounced off of right slider
  collision2(slider2) {
    for (let j = 0; j < sliderholder2.length; j++) {
      let movingslider2 = sliderholder2[j];

      if (
        this.pos.x + this.size / 2 >= windowWidth - 25 &&
        this.pos.x - this.size / 2 <= windowWidth - 10 &&
        this.pos.y + this.size / 2 >= slider2y &&
        this.pos.y - this.size / 2 <= slider2y + 110
      ) {
        this.vel.x *= -1;
        if (this.pos.y <= slider2y + 36 && this.vel.y < 0) {
          this.vel.x *= 1.02;
          this.vel.y *= 1.02;
        } else if (this.pos.y >= slider2y + 72 && this.vel.y < 0) {
          this.vel.x *= 0.97;
          this.vel.y *= 0.97;
        } else if (this.pos.y <= slider2y + 36 && this.vel.y > 0) {
          this.vel.x *= 0.97;
          this.vel.y *= 0.97;
        } else if (this.pos.y >= slider2y + 72 && this.vel.y > 0) {
          this.vel.x *= 1.02;
          this.vel.y *= 1.02;
        }
      }
    }
  }
}

//left slider info
class slider {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.slidercolor = "white";
  }

  showslider() {
    fill(this.slidercolor);
    rect(10, mouseY, 15, 100);
  }
}

//right slider info
class slider2 {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.slidercolor = "white";
  }

  showslider() {
    fill(this.slidercolor);

    /* if (keyIsDown(38) === true && slider2y > 0) {
      slider2y -= 3;
    } else if (keyIsDown(40) === true && slider2y < windowHeight - 110) {
      slider2y += 3;
    }*/

    rect(windowWidth - 25, slider2y, 15, 110);
  }
}

//makes left slider
function makeSlider() {
  let newslider = new slider(10, mouseY, 15, 110);
  sliderholder.push(newslider);
}

//makes right slider
function makeSlider2() {
  let newslider2 = new slider2(windowWidth - 25, mouseY, 15, 110);
  sliderholder2.push(newslider2);
}
