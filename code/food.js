function Food(x,y) {
    this.x = x;
    this.y = y;

    this.show = function() {
        fill(255,255,0);
        ellipse(this.x+10,this.y+10,SNAKE_SIZE,SNAKE_SIZE);
    }
}

function gen_rand_grid_val(){
    return Math.floor(random(height/SNAKE_SIZE)) * SNAKE_SIZE;
 }
 
 function gen_new_food(){
   return new Food(gen_rand_grid_val(),gen_rand_grid_val());
 }