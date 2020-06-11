
function make_buttons(){

  let buttonY = 50;
  let buttonX = 10;
  let buttonSpace = 100;

  resButton = createButton("Reset");
  resButton.mousePressed(reset);
  resButton.position(buttonX, buttonY);
  resButton.size(100, 35);

  addButton = createButton("Add points");
  addButton.mousePressed(add_pt);
  addButton.position(buttonX + buttonSpace, buttonY);
  addButton.size(100, 35);

  lineButton = createButton("Choose Line");
  lineButton.mousePressed(add_line);
  lineButton.position(buttonX + 2*buttonSpace, buttonY);
  lineButton.size(100, 35);

  delButton = createButton("Delete points");
  delButton.mousePressed(del_pt);
  delButton.position(buttonX + 3*buttonSpace, buttonY);
  delButton.size(100, 35);

  fillButton = createButton("Auto");
  fillButton.mousePressed(fillpts);
  fillButton.position(buttonX + 4*buttonSpace, buttonY);
  fillButton.size(100, 35);

  demoButton = createButton("Start Demo");
  demoButton.mousePressed(demoStart);
  demoButton.position(buttonX + 5*buttonSpace + 50, buttonY);
  demoButton.size(100, 35);


  // resHButton = createButton("Reset Hull");
  // resHButton.mousePressed(rehull);

  // printButton = createButton("Print");
  // printButton.mousePressed(printpts);
  // printButton.position(0,0);


  decStep = createButton("Prev");
  decStep.mousePressed(dec_step);
  decStep.position(buttonX + 1*buttonSpace + 400, buttonY);
  decStep.size(100, 35);

  incStep = createButton("Next");
  incStep.mousePressed(inc_step);
  incStep.position(buttonX + 2*buttonSpace + 400, buttonY);
  incStep.size(100, 35);

  doneButton = createButton("Done");
  doneButton.mousePressed(done);
  doneButton.position(buttonX + 2*buttonSpace + 400, buttonY);
  doneButton.size(100, 35);

  lastButton = createButton("Go to End");
  lastButton.mousePressed(lastStep);
  lastButton.position(buttonX + buttonSpace, buttonY);
  lastButton.size(100, 35);
  
}

function lastStep(){
  step = MAXSTEP;
}

function done(){
  MODE = 'NONE';
  DIRECTIONS = '';
  hulls = [];
  Uhulls = [];
  cascadeLst = [];
  stepsText.html("<br>");
  step = 0;
  home_buttons();
  tanLineFound = 0;
  scenes = [];

  aboveQuery = false;
  belowQuery = false; 
  report_lst = [];

  for (let i = 0; i < data.length; i++){
    data[i].R = 0;
    data[i].B = 0;
    data[i].G = 0;
    data[i].isAbove = false;
  }
}

function demo_buttons(){
  addButton.hide();
  lineButton.hide();
  delButton.hide();
  demoButton.hide();
  fillButton.hide();
  
  doneButton.hide();
  lastButton.show();
  incStep.show();
  decStep.show();
}

function home_buttons(){
  addButton.show();
  lineButton.show();
  delButton.show();
  demoButton.show();
  fillButton.show();

  doneButton.hide();
  lastButton.hide();
  incStep.hide();
  decStep.hide();
}

function inc_step(){
  if (step < MAXSTEP) step++;
}

function dec_step(){
  if (step > 0) step--;
}

function rehull(){
  hulls = [];
  MODE = 'NONE';
}
  
function add_pt(){
  MODE = 'ADD';
  DIRECTIONS = 'Click on the left panel to add points.'
}

function add_line(){
  MODE = 'LINE';
  DIRECTIONS = 'Click in 2 different places on the left panel to add a line.';
  query = [];
}

function del_pt(){
  MODE = 'DELETE';
  DIRECTIONS = 'Click on any points in the left panel to remove it.'
}

function demoStart() {
  if (data.length == 0) {
    errorText.html("Please enter a data set.")
  }
  else if (query.length == 0){
    errorText.html("Please choose a query line.")
  }
  else{
    errorText.html("");
    MODE = 'DEMO';
    DIRECTIONS = '';
    demo_buttons();
  }
}

function reset(){
  MODE = 'NONE';
  DIRECTIONS = '';
  data = [];
  query = [];
  hulls = [];
  Uhulls = [];
  cascadeLst = [];
  stepsText.html("<br>");
  step = 0;
  home_buttons();
  tanLineFound = 0;
  scenes = [];

  aboveQuery = false;
  belowQuery = false; 
  report_lst = [];
}

function printpts(){
  //MODE = 'NONE';
  ret = '';
  for (let i = 0; i < data.length; i++){
    ret += 'data.push(new Point(' + data[i].x + ',' + data[i].y + '));\n';
    //ret += data[i].x + " " + data[i].y + "\n";
  }

  // for (let i = 0; i < Uhulls[0].length; i++){
  //   Uhulls[0][i].print();
  // }

  console.log(ret);
}

function fillpts(){
  reset();
  data.push(new Point(163,32));
  data.push(new Point(58,121));
  data.push(new Point(25,292));
  data.push(new Point(67,468));
  data.push(new Point(130,496));
  data.push(new Point(352,556));
  data.push(new Point(554,381));
  data.push(new Point(545,167));
  data.push(new Point(382,36));
  data.push(new Point(268,87));
  data.push(new Point(141,122));
  data.push(new Point(118,252));
  data.push(new Point(136,379));
  data.push(new Point(282,469));
  data.push(new Point(437,380));
  data.push(new Point(458,224));
  data.push(new Point(416,131));
  data.push(new Point(299,184));
  data.push(new Point(200,229));
  data.push(new Point(178,340));
  data.push(new Point(284,366));
  data.push(new Point(391,302));
  data.push(new Point(388,193));
  data.push(new Point(302,246));
  data.push(new Point(239,267));
  data.push(new Point(257,315));
  data.push(new Point(367,262));


//   data.push(new Point(437,380));
// data.push(new Point(178,340));
// data.push(new Point(284,366));
// data.push(new Point(302,246));
// data.push(new Point(239,267));
// data.push(new Point(252,240));
// data.push(new Point(351,240));
// data.push(new Point(421,246));
// data.push(new Point(80,383));
// data.push(new Point(546,431));

  query.push(new Point(0,DIMEN / 2 - 40));
  query.push(new Point(DIMEN-5,DIMEN / 2 + 10));
}