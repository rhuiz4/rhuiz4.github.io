function SnakeBody(x,y){
    this.x = x;
    this.y = y;
  
    this.show = function(){
      fill(0,0,255);
      rect(this.x, this.y, SNAKE_SIZE, SNAKE_SIZE);
    }
  }

function Snake(){
    let body = [new SnakeBody(width/2,height/2)];
    this.xdir = 0;
    this.ydir = -1*SPEED;
    let len = 1;

    this.update = function(){
        for (let i = len-1; i > 0; i--){
            if (body[i].x != body[i-1].x || body[i].y != body[i-1].y){
                body[i].x = body[i-1].x;
                body[i].y = body[i-1].y;
            }
        }
        body[0].x += this.xdir;
        body[0].y += this.ydir;
        if (body[0].x < 0 || body[0].x > width-SPEED || body[0].y < 0 || body[0].y > height-SPEED){
            ALIVE = false;
            alert('GAME OVER!\nFINAL SCORE: ' + SCORE);
        }
        else {
            for (node of body){
                if (body[0] != node){
                    if (body[0].x == node.x && body[0].y == node.y){
                        ALIVE = false;
                        alert('GAME OVER!\nFINAL SCORE: ' + SCORE);
                    }
                }
            }
        }
        if (body[0].x == f.x && body[0].y == f.y){
            SCORE++;
            delete f;
            f = gen_new_food();
            body.push(new SnakeBody(body[len-1]));
            len++;
        }
    }

    this.show = function() {
        for (node of body){
            node.show();
        }
    }
}
