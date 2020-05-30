let snake;
let PAUSED = false;
let ALIVE = true;
let SNAKE_SIZE = 20;
let SPEED = SNAKE_SIZE;
let f;
let SCORE = 0;

function setup() {
  scoreP = createP('Score: 0');

  createCanvas(400,400);
  snake = new Snake();
  frameRate(10);
  f = gen_new_food();

  createP('');
  pausButton = createButton("Pause Game");
  pausButton.mousePressed(pause);
  resButton = createButton("Reset Game");
  resButton.mousePressed(reset);
  
}

function draw() {
  background(0);
  fill(255);
  scoreP.html('Score: ' + SCORE);
  if (!PAUSED && ALIVE) {
    snake.update();
  }
  snake.show();
  f.show();
}

function pause(){
  PAUSED = true;
}

function reset(){
  delete snake;
  snake = new Snake();
  f = gen_new_food();
  ALIVE = true;
  SCORE = 0;
}

function keyPressed() {
  if (key == 'p'){
    PAUSED = !PAUSED;
  }
  if (!PAUSED) {
    if (key == 'w' && snake.ydir == 0){
      snake.ydir = -1*SPEED;
      snake.xdir = 0;
    }
    if (key == 's' && snake.ydir == 0){
      snake.ydir = SPEED;
      snake.xdir = 0;
    }
    if (key == 'a' && snake.xdir == 0){
      snake.ydir = 0;
      snake.xdir = -1*SPEED;
    }
    if (key == 'd' && snake.xdir == 0){
      snake.ydir = 0;
      snake.xdir = SPEED;
    }
    if (!ALIVE && key == 'r'){
      reset();
    }
  }

}
