let BOXSIZE = 40;

function Edge(p1, p2, layer, R, G, B){
    this.pt1 = p1;
    this.pt2 = p2;
    this.angle = Math.floor(-1 * get_angle(p1, p2));
    if (this.angle < 0){
        this.angle += 360;
    }

    this.R = R;
    this.G = G;
    this.B = B;
    this.layer = layer;
    this.next = 0;
    this.down = 0;

    this.print = function(){
        console.log(this.angle);
    }

    this.show = function(){
        stroke(hullColorR[this.layer],hullColorG[this.layer],hullColorB[this.layer]);
        line(this.pt1.x,this.pt1.y,this.pt2.x,this.pt2.y);
        noStroke();
        this.pt1.show();
        this.pt2.show();
    }

    this.show_lst = function(pos){
       
        // stroke(hullColorR[this.layer],hullColorG[this.layer],hullColorB[this.layer]);
        // fill(hullColorR[this.layer],hullColorG[this.layer],hullColorB[this.layer]);

        stroke(this.R, this.G, this.B);
        fill(this.R, this.G, this.B);

        let ul = [(pos * BOXSIZE)+DIMEN+100   , this.layer * (BOXSIZE*2) + 100];
        let ur = [ul[0] + BOXSIZE            , ul[1]];
        let bl = [ul[0]                      , ul[1] + BOXSIZE];
        let br = [ur[0]                      , bl[1]];

        //Draws the boxes
        line(ul[0], ul[1], ur[0], ur[1]);
        line(ul[0], ul[1], bl[0], bl[1]);
        line(bl[0], bl[1], br[0], br[1]);
        line(ur[0], ur[1], br[0], br[1]);

        text(this.angle, ul[0]+BOXSIZE/2 - 10, ul[1]+BOXSIZE/2 + 5);

        //Shows line going down the cascadinng lists
        if (this.down){
            if (cascadeLst[this.layer+1]){
                let curr_px = ul[0] + BOXSIZE / 2;
                let curr_py = br[1];

                let next_ind = cascadeLst[this.layer+1].indexOf(this.down);
                let down_px = (next_ind * BOXSIZE)+DIMEN+100 + BOXSIZE/2;

                line(curr_px, curr_py, down_px, curr_py+BOXSIZE);
            }
        }

        fill(0);
        noStroke();
    }
}

function show_hull_lst(lst){
    for (let i = 0; i < lst.length; i++){
        lst[i].show_lst(i);
    }
}

//creates the list of upper hull edges
function upperhull_edges(lst, index) {
    let edge_lst = [];
    let minmax = min_max_X(lst);
    let minX = minmax[0];
    let maxX = minmax[1];
    let i = maxX;

    while(i != minX){
        let ind1 = i;
        let ind2 = i+1;
        if (i == lst.length-2) {
            ind2 = 0;
        }
        // console.log("(" + ind1 + "," + ind2 + ")");
        // lst[ind1].show();
        // lst[ind2].show();
        edge_lst.push (new Edge(lst[ind1], lst[ind2], index, hullColorR[index],hullColorG[index],hullColorB[index]));
        edge_lst[edge_lst.length-1].show();
        if (i == lst.length-2){
            i = -1;
        }
        i++;
    }

    return edge_lst;
}

//finds the min and max x index of hull
function min_max_X(lst) {
    let minX_ind = 0;
    let maxX_ind = 0;

    for (let i = 1; i < lst.length; i++) {
        if ((lst[i].x < lst[minX_ind].x) || (lst[i].x == lst[minX_ind].x && lst[i].y < lst[minX_ind].y)){
            minX_ind = i;
        }

        if ((lst[i].x > lst[maxX_ind].x) || (lst[i].x == lst[maxX_ind].x && lst[i].y < lst[maxX_ind].y)){
            maxX_ind = i;
        }
    }
    return [minX_ind, maxX_ind];
}

function draw_edges(lst){
    if (lst){
        for (let i = 0; i < lst.length; i++){
            lst[i].show();
        }
    }
}

