let data = [];
let query = [];
let hulls = [];
let Uhulls = [];
let cascadeLst = [];

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

let tanLineFound = 0;

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
  textLst.push("Find the position the query line would be in the top level list. If the position is not next to an edge of the top level hull, we move the position to the next edge on the top level hull.");
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
  
  if (step < 5)  show_query();

   //shows data points
  //  draw_points(data);

  if (MODE != "DEMO") {
    mode_actions();
    draw_points(data);
  }
  else{
    stepsText.html(textLst[step]);

    if (hulls.length == 0){

      qline = new Edge(query[0], query[1], 255,0,0);

      //create hulls edges list
      let tmp_data = [...data];
      while (tmp_data.length > 0){
        hulls.push(make_hull(tmp_data));
      }
      
      //create upper hull edges list
      for (let i = 0; i < hulls.length; i++){
        Uhulls.push(upperhull_edges(hulls[i],i));
      }

      //create fractional cascading edge lists
      cascadeLst.push(Uhulls[Uhulls.length - 1]);
      for (let i = Uhulls.length-1; i > 0; i--){
        cascadeLst.unshift(cascade(Uhulls[i-1], cascadeLst[0]));
      }

    
      // for (let i = 0; i < cascadeLst.length; i++){
      //   let str = "";
      //   for (let j = 0; j < cascadeLst[i].length; j++){
      //     str += cascadeLst[i][j].layer + "  ";
      //   }
      //   console.log(str);
      // }

      //search for where query line would be in root list
      if (qline.angle > 180) qline.angle -= 180;
      else if (qline.angle < 180) qline.angle += 180;
      query_ind = find_ind(cascadeLst[0], qline);
      //console.log(qline.angle);
    }

    if (step == 0) {
      show_hulls();
    }

    else if (step == 1){
      show_Uhulls();
      show_Uhulls_lst();
    }

    else if (step == 2){
      show_Uhulls();
      show_cascade_lst();
    }

    else if (step == 3){
      
      show_hulls();
      show_cascade_lst();
      show_query_in_lst(0, query_ind);

      if (!tanLineFound){
        set_tan_line(0);
      }
    }

    else if (step == 4){
      show_hulls();
      show_cascade_lst();
      show_query_in_lst(0, query_ind);
      draw_tan_line();
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

