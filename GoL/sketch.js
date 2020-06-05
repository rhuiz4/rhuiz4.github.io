let ROWS = 50;
let COLS = 50;

function setup() {
  createCanvas(500,500);
  grid = makeGrid(ROWS,COLS);
  for (row of grid){
    for (let i = 0; i < row.length; i++){
      row[i] = floor(random(2));
    }
  } 
}

function draw() {
  background(0);
  showGrid();
  grid = updateGrid();
}

function makeGrid(rows,cols){
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++){
    arr[i] = new Array(cols);
  }
  return arr;
}

function showGrid(){
  for (let row = 0; row < grid.length; row++){
    for (let col = 0; col < grid[row].length; col++){
      if (grid[row][col]){
        fill(0,255,0);
      }
      else{
        fill(0);
      }
      rect(row * 500/ROWS, col* 500/COLS, 500/ROWS, 500/COLS);
    }
  } 
}

function updateGrid(){
  new_grid = makeGrid(ROWS,COLS);
  for (let row = 0; row < grid.length; row++){
    for (let col = 0; col < grid[row].length; col++){
      live_neighbors = count_Neighbor(row,col);
      
      if (grid[row][col]){  //cell is alive
        if (live_neighbors < 2 || live_neighbors > 3){
          new_grid[row][col] = 0;
        }
        else{
          new_grid[row][col] = 1;
        }
      }
      else{
        if (live_neighbors == 3){
          new_grid[row][col] = 1;
        }
        else{
          new_grid[row][col] = 0;
        }
      }
    }
  }
  return new_grid;
}

function count_Neighbor(row, col){
  let live_neighbors = 0;
  /*
  //Top 3 cells
  if (row > 0){
    live_neighbors += grid[row-1][col];
    if (col > 0){
      live_neighbors += grid[row-1][col-1];
    }
    if (col < grid[row].length-1){
      live_neighbors += grid[row-1][col+1];
    }
  }
  print(live_neighbors);
  //Cells to the side
  if (col > 0){
    live_neighbors += grid[row][col-1];
  }
  if (col < grid[row].length-1){
    live_neighbors += grid[row][col+1];
  }
  
  //Bottom 3 cells
  if (row < grid.length-1){
    live_neighbors += grid[row+1][col];
    if (col > 0){
      live_neighbors += grid[row+1][col-1];
    }
    if (col < grid[row].length-1){
      live_neighbors += grid[row+1][col+1];
    }
  } //Finished counting neighbors
  */

  //Top 3 cells
  if (row > 0){
    if (grid[row-1][col])
      live_neighbors++; 
    if (col > 0){
      if (grid[row-1][col-1])
        live_neighbors++;
    }
    if (col < grid[row].length-1){
      if (grid[row-1][col+1])
        live_neighbors++;
    }
  }

  //Cells to the side
  if (col > 0){
    if (grid[row][col-1])
      live_neighbors++;
  }
  if (col < grid[row].length-1){
    if (grid[row][col+1])
      live_neighbors++;
  }
  
  //Bottom 3 cells
  if (row < grid.length-1){
    if (grid[row+1][col])
      live_neighbors++;
    if (col > 0){
      if (grid[row+1][col-1])
        live_neighbors++; 
    }
    if (col < grid[row].length-1){
      if (grid[row+1][col+1])
        live_neighbors++;
    }
  } //Finished counting neighbors
  
  //print(live_neighbors);
  return live_neighbors;
}