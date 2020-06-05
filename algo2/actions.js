

function mode_actions(){
    if (MODE == 'ADD') {
      fill(0,0,255);
      ellipse(mouseX,mouseY,PT_SIZE,PT_SIZE);
      fill(0,0,0);
    }
  
    if (MODE == 'LINE'){                                                    //TOO LAZY TO ORGANIZE THESE
    //   if (query.length == 0){
    //     fill(255);
    //     ellipse(mouseX,mouseY,PT_SIZE,PT_SIZE);
    //     fill(0,0,0);
    //   }
      if (query.length == 1){
        stroke('red');
        fill(255);
        //ellipse(mouseX,mouseY,PT_SIZE,PT_SIZE);
        line(query[0].x, query[0].y, mouseX, mouseY);
        fill(0,0,0);
        noStroke();
      }
      if (query.length == 2){
        extend_line();
        MODE = 'NONE';
      }
    }
  
    if (MODE == 'DELETE') {
      for (let i = 0; i < data.length; i++){
        if ((mouseX - data[i].x < MAX_DIST && data[i].x-mouseX < MAX_DIST) && (mouseY - data[i].y < MAX_DIST && data[i].y-mouseY < MAX_DIST)){
          data[i].R = 255;
        }
        else{
          data[i].R = 0;
        }
      }
    }
}

function extend_line(){
    let slope = (query[0].y - query[1].y) / (query[0].x - query[1].x);
    let y1 = query[0].y - (query[0].x * slope);
    let y2 = slope * (DIMEN-5) + y1;
    query = [];
    query.push(new Point(0, y1));
    query.push(new Point(DIMEN-5, y2));
}


//========================= On Mouse Click Functions===========================
function click_add(){       //addinng points
    let tooClose = false;
    if (mouseX > 0 && mouseX < 590 && mouseY > 0 && mouseY < 600){
      for (let i = 0; i < data.length; i++){
        if ((mouseX - data[i].x < MAX_DIST && data[i].x-mouseX < MAX_DIST) && (mouseY - data[i].y < MAX_DIST && data[i].y-mouseY < MAX_DIST)){
          tooClose = true;
        }
      }
      if (!tooClose) data.push(new Point(mouseX,mouseY)); 
    }
}

function click_del(){       //deleting points
    for (let i = 0; i < data.length; i++){
        if ((mouseX - data[i].x < MAX_DIST && data[i].x-mouseX < MAX_DIST) && (mouseY - data[i].y < MAX_DIST && data[i].y-mouseY < MAX_DIST)){
          data.splice(i,1); 
        }
    }
}

function click_line(){      //making query
    let tooClose = false;
    if (mouseX > 0 && mouseX < 590 && mouseY > 0 && mouseY < 600){
      for (let i = 0; i < query.length; i++){
        if ((mouseX - query[i].x < MAX_DIST && query[i].x-mouseX < MAX_DIST) && (mouseY - query[i].y < MAX_DIST && query[i].y-mouseY < MAX_DIST)){
          tooClose = true;
        }
      }
      if (!tooClose) query.push(new Point(mouseX,mouseY)); 
    }
}
//==============================================================================

//==================================== DEMO ====================================

function show_query() {
  stroke('red');
  draw_lines(query);
  noStroke();
}

//draws all of the hulls on left screen
function show_hulls(hulls){      
  for (let i = 0; i < hulls.length; i++) {
    stroke(hullColorR[i], hullColorG[i], hullColorB[i]);
    for (let j = 0; j < hulls[i].length;j++) {
      hulls[i][j].R = hullColorR[i];
      hulls[i][j].G = hullColorG[i];
      hulls[i][j].B = hullColorB[i];
    }
    draw_lines(hulls[i]);
    draw_points(hulls[i]);
    noStroke();
  }
}


//draws upper hulls on left screen
function show_Uhulls(){     
  for (let i = 0; i < Uhulls.length; i++) draw_edges(Uhulls[i]);
}


//shows upper hull lists on right screen
function show_Uhulls_lst(){ 
  for (let i = 0; i < Uhulls.length; i++){

    stroke(hullColorR[i],hullColorG[i],hullColorB[i]);
    fill(hullColorR[i],hullColorG[i],hullColorB[i]);

    text("Level " + i + ":", DIMEN + 35, (i+1) * (BOXSIZE*2)+45);

    show_hull_lst(Uhulls[i]);
  }
}


//shows cascading listss on right screen
function show_cascade_lst(cascadeLst){
  for (let i = 0; i < cascadeLst.length; i++){

    stroke(hullColorR[i],hullColorG[i],hullColorB[i]);
    fill(hullColorR[i],hullColorG[i],hullColorB[i]);

    text("Level " + i + ":", DIMEN + 35, (i+1) * (BOXSIZE*2)+45);

    show_hull_lst(cascadeLst[i]);
  }
}

function show_query_in_lst(layer, pos){
  let u = [(pos * BOXSIZE)+DIMEN+100   , layer * (BOXSIZE*2) + 100];
  let b = [u[0]                      , u[1] + BOXSIZE];
  //console.log(layer + " , " + pos);

  let v0 = createVector(u[0], u[1] - BOXSIZE + 10);
  let v1 = createVector(0, BOXSIZE -20);
  drawArrow(v0,v1,'red');
  stroke('red');
  line(u[0], u[1], b[0], b[1]);
  noStroke();
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function draw_tan_line(tanline){
  stroke('red');
  line(tanline.pt1.x, tanline.pt1.y, tanline.pt2.x, tanline.pt2.y);
  noStroke();
}

function box_edge(edge, level){

  if (!edge) {
    let pos = cascadeLst[level].length;
    let ul = [(pos * BOXSIZE)+DIMEN+100   , level * (BOXSIZE*2) + 100];
    let bl = [ul[0]                       , ul[1] + BOXSIZE];

    stroke('red');
    line(ul[0], ul[1], bl[0], bl[1]);
    noStroke();
    return;
  }
  stroke(255,0,0);

  let pos = cascadeLst[edge.layer].indexOf(edge);

  let ul = [(pos * BOXSIZE)+DIMEN+100   , edge.layer * (BOXSIZE*2) + 100];
  let ur = [ul[0] + BOXSIZE            , ul[1]];
  let bl = [ul[0]                      , ul[1] + BOXSIZE];
  let br = [ur[0]                      , bl[1]];

  //Draws the boxes
  line(ul[0], ul[1], ur[0], ur[1]);
  line(ul[0], ul[1], bl[0], bl[1]);
  line(bl[0], bl[1], br[0], br[1]);
  line(ur[0], ur[1], br[0], br[1]);

  noStroke();
}

//==============================================================================