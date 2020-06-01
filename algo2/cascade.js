//================================= Building Cascade ===================================
function cascade(ulst, blst) {

    let ret_lst = ulst.slice();
    for (let i = 0; i < blst.length; i++){
        if (i % 2 == 0){
            promote(ret_lst, blst[i]);
        }
    }
    return ret_lst;
}

function promote(lst, edge){
    
    let i = find_ind(lst, edge);
    let new_edge = new Edge(edge.pt1, edge.pt2, edge.layer, edge.R, edge.G, edge.B);
    new_edge.layer--;
    new_edge.down = edge;
    if (i < lst.length){
        if (lst[i].down){
            new_edge.next = lst[i].next;
        }
        else{
            new_edge.next = lst[i];
        }
    }  
    lst.splice(i, 0, new_edge);
}

function find_ind(lst, edge){
    let i = 0;
    //console.log(edge.angle + " " + lst[0].angle);

    while(edge.angle >= lst[i].angle) {

        if(i+1 == lst.length) {
            return i+1;
        }
        i++;
    }
    return i;
}
//========================================================================================

function set_tan_line(level){
    //console.log(cascadeLst.length);
    if (cascadeLst[level][query_ind].down){
        if (query_ind == 0){
            tanpt=cascadeLst[level][query_ind].next.pt1;
        }
        else if (cascadeLst[level][query_ind-1].down){
            tanpt=cascadeLst[level][query_ind].next.pt1;
        }
        else {
            tanpt=cascadeLst[level][query_ind-1].pt2;
        }
    }
    else{
        tanpt=cascadeLst[level][query_ind].pt1;
    }

    let slope = (query[0].y - query[1].y) / (query[0].x - query[1].x);
    
    let y1 = tanpt.y - (tanpt.x * slope);
    let y2 = slope * DIMEN-5 + y1;

    //console.log(slope);
    let slope2 = (y2-y1) / (DIMEN-5)
    //console.log(slope2);

    let p1 = new Point(0,y1);
    let p2 = new Point(DIMEN-5, y2);
    tanline = new Edge(p1,p2,255,0,0);
    tanLineFound = 1;
}