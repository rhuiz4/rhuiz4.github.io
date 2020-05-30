

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

