//Functions related to constructing a convex hull

function make_hull(lst){
    let curr_hull = [];
    if (lst.length <= 3){       //less than 3 points left = all 3 points in hull
        for (let i = 0; i < lst.length; i++){
            curr_hull.push(lst[i]);
        }
        curr_hull.push(lst[0]);
        while(lst.length > 0){
            lst.pop();
        }
        return curr_hull;
    }


    //highest point is always in hull 
    let curr_vertex = least_Y(lst);
    let curr_ind = lst.indexOf(curr_vertex);
    curr_hull.push(curr_vertex);

    let prev_ang = 181;
    //keeps looking for more hull points until you reach the begining, starting from top point
    while ((curr_hull[0] != curr_vertex) || (curr_hull.length == 1)) {
        let hi_ang = -181;//get_angle(curr_vertex, tmp[0]);

        //these 2 are dummy values
        let next_vertex = lst[0];  
        let next_ind = 0;

        //console.log(tmp);
        //hi_ang = 360;
        for (let i = 0; i < lst.length; i++){
            let curr_ang = get_angle(curr_vertex, lst[i]);
            
            if ( (curr_ang >= hi_ang && curr_ang <= prev_ang) && 
                 (curr_hull[0] != lst[i] || curr_hull.length > 1) ) {   //so the first elem can't be counted again immediately
                //console.log(curr_ang + " , " + hi_ang + " , " + prev_ang + " , " + i);
                next_vertex = lst[i];
                next_ind = i;
                hi_ang = curr_ang;
            }
        }
        //console.log(low_ang);
        curr_hull.push(next_vertex);
        lst.splice(next_ind,1);
        curr_vertex = next_vertex;
        curr_ind = next_ind;
        prev_ang = hi_ang;
    }

    return curr_hull;
}

function get_angle(pt1, pt2){
    // x_diff = pt1.x - pt2.x;
    // y_diff = pt1.y - pt2.y;

    // return degrees(atan(y_diff / x_diff));

    let v0 = createVector(1,0);
    let v1 = createVector(pt2.x-pt1.x,pt2.y-pt1.y);

    return degrees(v0.angleBetween(v1));
    
}

function least_Y(lst){
    let leastY = lst[0];
    let leastInd = 0;
    for (let i = 1; i < lst.length; i++){
        if (lst[i].y < leastY.y){
            leastY = lst[i];
            leastInd = i;
        }
        if (lst[i].y == leastY.y){
            if (lst[i].x > leastY.x){
                leastY = lst[i];
                leastInd = i;
            }
        }
    }
    return leastY;
}