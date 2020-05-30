

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
    let y2 = slope * DIMEN-5 + y1;
    query = [];
    query.push(new Point(0, y1));
    query.push(new Point(DIMEN-5, y2));
}


//======================= On Mouse Click Functions===========================
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


//draws all of the hulls on left screen
function show_hulls(){      
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
function show_cascade_lst(){
  for (let i = 0; i < cascadeLst.length; i++){

    stroke(hullColorR[i],hullColorG[i],hullColorB[i]);
    fill(hullColorR[i],hullColorG[i],hullColorB[i]);

    text("Level " + i + ":", DIMEN + 35, (i+1) * (BOXSIZE*2)+45);

    show_hull_lst(cascadeLst[i]);
  }
}




//==============================================================================