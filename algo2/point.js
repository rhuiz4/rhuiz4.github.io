function Point(x,y){
    this.x = x;
    this.y = y;
    
    this.R = 0;
    this.G = 0;
    this.B = 0;

    this.mark = 0;

    this.show = function(){
      fill(this.R, this.G, this.B);
      ellipse(this.x, this.y, PT_SIZE, PT_SIZE);
      fill(0);
    }

    this.print = function(){
      console.log("(" + this.x + "," + this.y + ")");
    }
}

function draw_points(data){
    for (let i = 0; i < data.length; i++){
      PT_SIZE -= 1;     //points appear bigger here for some reason
      data[i].show();
      //text(i, data[i].x, data[i].y);
      PT_SIZE += 1;
    }
  }
  
  function draw_lines(data){
    let prev = 0;
    for (let i = 0; i < data.length; i++){
      if (prev != 0){
        line(prev.x, prev.y, data[i].x, data[i].y);
      }
      prev = data[i];
    }
  }