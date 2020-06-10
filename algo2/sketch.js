
let data = [];
let query = [];
let hulls = [];
let Uhulls = [];

let cascadeLst = [];
let curr_edge;

let qline;
let tanpt;
let tanline;
let query_ind;

let hullColorR = [0,  250,   0, 235,   0, 125, 255, 0,0,0,0,0,0];
let hullColorG = [0,  250, 235,   0, 200, 15,  100, 0,0,0,0,0,0];
let hullColorB = [255,  0,   0, 255, 200, 255,  50, 0,0,0,0,0,0];

//let value = 0;
let PT_SIZE = 5;      //size of a point
let MAX_DIST = 5;     //distance between points
let DIMEN = 600;

let MODE = 'NONE';
let DIRECTIONS = '';

let canvas;
let modeP;

let textLst = [];
let stepsText;
let step = 0;
let scenes = [];
let MAXSTEP = 6;

let tanLineFound = 0;


//for if an entire hull is above or below query
let aboveQuery = false;
let belowQuery = false;
let report_lst = [];



function setup() {
  modeP = createP('');
  modeP.position(10,0);
  stepsText = createP('<br>');
  stepsText.position(10,700);

  createP('<br>');
  make_buttons();
  createP('');

  canvas = createCanvas(2*DIMEN + 200,DIMEN);
  canvas.position(10, 90);

  textLst.push("Create layered convex hulls.");
  textLst.push("Make lists with each upper hull as a list.");
  textLst.push("Add fraction cascading properties with the list.");
  textLst.push("Find the position the query line would be in the top level list. If the edge in that position is not an edge of the top level hull, we move the position to the next edge on the top level hull.");
  textLst.push("If we draw the query line such that it passes the point between those edges on the list on the outer hull, we get a tangent line to the outer hull with the same slope as the query line.");
  textLst.push("To be continued...");

  reset();
  //home_buttons();
}

function draw() {
  background(220);

  modeP.html(DIRECTIONS);                            //TEMP

  //border between left and right
  strokeWeight(10);
  stroke(0);
  line(DIMEN,0,DIMEN,DIMEN);
  strokeWeight(1);
  noStroke();

  fill(255);
  
  if (step <= MAXSTEP)  show_query();

   //shows data points
  //  draw_points(data);

  if (MODE != "DEMO") {
    mode_actions();
    draw_points(data);
  }
  else{
    // stepsText.html(textLst[step]);

    if (hulls.length == 0){

      //=========================== Making Convex Hulls ==========================

      //create hulls edges list
      let tmp_data = [...data];
      while (tmp_data.length > 0){
        hulls.push(make_hull(tmp_data));
      }

      for (let i = 0; i < hulls.length; i++) {
        for (let j = 0; j < hulls[i].length;j++) {
          hulls[i][j].R = hullColorR[i];
          hulls[i][j].G = hullColorG[i];
          hulls[i][j].B = hullColorB[i];
        }
      }

      scenes.push(new Scene("Create layered convex hulls.", 1));


      //=========================== Making Upper Hulls List ==========================
      
      //create upper hull edges list
      for (let i = 0; i < hulls.length; i++){
        Uhulls.push(upperhull_edges(hulls[i],i));
      }

      scenes.push(new Scene("Make lists with each upper hull as a list.", 0,1,1));


      //=========================== Making Cascading Lists ==========================

      //create fractional cascading edge lists
      cascadeLst.push(Uhulls[Uhulls.length - 1]);
      for (let i = Uhulls.length-1; i > 0; i--){
        cascadeLst.unshift(cascade(Uhulls[i-1], cascadeLst[0]));
      }

      scenes.push(new Scene("Add fraction cascading properties to the list.", 0,1,0,1));

    
      // for (let i = 0; i < cascadeLst.length; i++){
      //   let str = "";
      //   for (let j = 0; j < cascadeLst[i].length; j++){
      //     str += cascadeLst[i][j].layer + "  ";
      //   }
      //   console.log(str);
      // }


      //=========================== Finding Tangent on Outer Hull + Mark Points ==========================

      //search for where query line would be in root list. Need to adjust query angle.
      qline = new Edge(query[0], query[1], 255,0,0);
      if (qline.angle > 180) qline.angle -= 180;
      else if (qline.angle < 180) qline.angle += 180;
      query_ind = find_ind(cascadeLst[0], qline);
      curr_edge = cascadeLst[0][query_ind];

      scenes.push(new Scene("Binary search to find the position the query line would be in the top level list. If the edge in that position is not an edge of the top level hull, we move the position to the next edge on the top level hull.", 1,0,0,1,1));
      
      for (let i = 0; i < cascadeLst.length; i++){
        if ((!aboveQuery) && (!belowQuery)){
          set_tan_line(i);
  
          scenes.push(new Scene("If we draw the query line such that it passes that point, we get a tangent line to the outer hull with the same slope as the query line.", 1,0,0,1,1,0,1));
          
          if (check_above(tanpt)){
            let tanInd = hulls[i].indexOf(tanpt);
            tanpt.mark();

            let nextL = tanInd+1;
            let nextR = tanInd-1;

            if (nextR < 0) nextR = hulls[i].length-2;
            if (nextL >= hulls[i].length-1) nextL = 0;

            let nextScene = new Scene("This point is above the query line, so we mark it, and continue to the left and right points of the hull.", 1,0,0,1,1);
            
            let v0 = createVector(hulls[i][nextL].x - 30, hulls[i][nextL].y);
            let v1 = createVector(20, 0);
            nextScene.arrows.push([v0,v1]);

            v0 = createVector(hulls[i][nextR].x + 30, hulls[i][nextR].y);
            v1 = createVector(-20, 0);
            nextScene.arrows.push([v0,v1]);

            scenes.push(nextScene);

            let indL = tanInd+1;
            let indR = tanInd-1;
            let Lcont = true;
            let Rcont = true;
            while (Lcont || Rcont){
              if (indR < 0) indR = hulls[i].length-2;
              if (indL == hulls[i].length-1) indL = 0;

              let currL = hulls[i][indL];
              let currR = hulls[i][indR];

              nextL = indL+1;
              nextR = indR-1;

              if (nextR < 0) nextR = hulls[i].length-2;
              if (nextL >= hulls[i].length-1) nextL = 0;
          
              if (Lcont && Rcont){
                if (currL.isAbove){
                  aboveQuery = true;
                  Lcont = false;
                  Rcont = false;
                }
                else if (check_above(currL) && check_above(currR)){
                  currL.mark();
                  if (!currR.isAbove) currR.mark();
                  nextScene = new Scene("Both of the points are above the query, so we update them and move to the next points for both.", 1,0,0,1,1);

                  v0 = createVector(hulls[i][nextL].x - 30, hulls[i][nextL].y);
                  v1 = createVector(20, 0);
                  nextScene.arrows.push([v0,v1]);

                  v0 = createVector(hulls[i][nextR].x + 30, hulls[i][nextR].y);
                  v1 = createVector(-20, 0);
                  nextScene.arrows.push([v0,v1]);

                  scenes.push(nextScene);

                }
                else if (check_above(currL)){
                  currL.mark();
                  Rcont = false;
                  nextScene = (new Scene("Only the left point is above the query, so we mark that point and continue only on the left.", 1,0,0,1,1));
                
                  v0 = createVector(hulls[i][nextL].x - 30, hulls[i][nextL].y);
                  v1 = createVector(20, 0);
                  nextScene.arrows.push([v0,v1]);

                  scenes.push(nextScene);
                
                }
                else if (check_above(currR)){
                  currR.mark();
                  Lcont = false;
                  nextScene = (new Scene("Only the right point is above the query, so we mark that point and continue only on the right.", 1,0,0,1,1));
                
                  v0 = createVector(hulls[i][nextR].x + 30, hulls[i][nextR].y);
                  v1 = createVector(-20, 0);
                  nextScene.arrows.push([v0,v1]);

                  scenes.push(nextScene);
                
                }
                else{
                  Lcont = false;
                  Rcont = false;
                  scenes.push(new Scene("Both points are below the query, so we stop.", 1,0,0,1,1));
                }
              }
              else if (Lcont){
                if (check_above(currL)){
                  currL.mark();
                  nextScene = (new Scene("The left point is above the query, so we mark that point and continue on the left.", 1,0,0,1,1));
                
                  v0 = createVector(hulls[i][nextL].x - 30, hulls[i][nextL].y);
                  v1 = createVector(20, 0);
                  nextScene.arrows.push([v0,v1]);

                  scenes.push(nextScene);
                
                }
                else{
                  Lcont = false;
                  scenes.push(new Scene("The left point is below the query, so we stop.", 1,0,0,1,1));
                }
              }
              else{ //Rcont is true
                if (check_above(currR)){
                  currR.mark();
                  nextScene = (new Scene("The right point is above the query, so we mark that point and continue on the right.", 1,0,0,1,1));
                
                  v0 = createVector(hulls[i][nextR].x + 30, hulls[i][nextR].y);
                  v1 = createVector(-20, 0);
                  nextScene.arrows.push([v0,v1]);

                  scenes.push(nextScene);

                }
                else{
                  Rcont = false;
                  scenes.push(new Scene("The right point is below the query, so we stop.", 1,0,0,1,1));
                }
              }

              indR--;
              indL++;
        
            }
          }

          else{
            belowQuery = true;
          }
        }
        else if (aboveQuery){
          for (let j = 0; j < hulls[i].length-1; j++){
            hulls[i][j].mark();
          }
        }
      }//ends tan pt and marking

      if (aboveQuery){
        scenes.push(new Scene("Since all the points in the convex hull is marked, we know that all the points inside the hull is also above the query, so we can mark all of them.", 1,0,0,1,1));
      }
      else if (belowQuery) {
        scenes.push(new Scene("Since the tangent point is below the query, we know that all the points in the hull is below the query, so we can stop.", 1,0,0,1,1));
      }
      
      scenes.push(new Scene("We have now marked every point above the query.",0,0,0,0,0,0,0,true));


    }//ends pre-processinng


    MAXSTEP = scenes.length-1;

    scenes[step].display();
    
    if (step == MAXSTEP){
      incStep.hide();
      doneButton.show();
    }
    else{
      incStep.show();
      doneButton.hide();
    }

  }
  
}



function mouseClicked() {

  if (MODE == 'ADD'){
    click_add();
  }
  if (MODE == 'DELETE'){
    click_del();
  }
  if (MODE == 'LINE'){
    click_line();
  }

}
// function keyPressed() {
//}

