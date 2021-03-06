function Point(x,y){
    this.x = x;
    this.y = y;
    
    this.R = 0;
    this.G = 0;
    this.B = 0;

    this.isAbove = false;

    this.show = function(){
      fill(this.R, this.G, this.B);
      stroke(this.R, this.G, this.B);
      ellipse(this.x, this.y, PT_SIZE, PT_SIZE);
      noStroke();
      fill(0);
    }

    this.show_black = function(){
      fill(0);
      stroke(0);
      ellipse(this.x, this.y, PT_SIZE, PT_SIZE);
      noStroke();
      fill(0);
    }

    this.print = function(){
      console.log("(" + this.x + "," + this.y + ")");
    }

    this.mark = function(){
      this.isAbove = true;
      report_lst.push(this);
      //this.print();
    }
}

function draw_points(data){
    for (let i = 0; i < data.length; i++){
      
      data[i].show();
      //text(i, data[i].x, data[i].y);
      
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