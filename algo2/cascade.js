//================================= Building Cascade ===================================
function cascade(ulst, blst) {

    let ret_lst = ulst.slice();
    for (let i = 0; i < blst.length; i++){
        if (i % 2 == 0){
            promote(ret_lst, blst[i]);
        }
    }

    for (let i = ret_lst.length-1; i > 0; i--){
        if (!ret_lst[i-1].down){
            if (ret_lst[i].down){
                ret_lst[i-1].next = ret_lst[i];
            }
            else{
                ret_lst[i-1].next = ret_lst[i].next;
            }
            //console.log(ret_lst[i-1].angle + " , next:  " + ret_lst[i-1].next.angle);
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
    // if (cascadeLst[level][query_ind].down){
    //     if (query_ind == 0){
    //         tanpt=cascadeLst[level][query_ind].next.pt1;
    //     }
    //     else if (cascadeLst[level][query_ind-1].down){
    //         tanpt=cascadeLst[level][query_ind].next.pt1;
    //     }
    //     else {
    //         tanpt=cascadeLst[level][query_ind-1].pt2;
    //     }
    // }
    // else{
    //     tanpt=cascadeLst[level][query_ind].pt1;
    // }

    //first layer
    if (level == 0){

        //curr edge is at the end of the list in the curr level
        if (!curr_edge){
            tanpt = Uhulls[level][Uhulls[level].length -1].pt2;
            scenes.push(new Scene("In this case, the binary search reached the end of the top level cascade list, so the query line would have been the last element of the outer upper hull. We can then look at last edge in that level that wasn't promoted and use the second point from that edge as the tangent point.", 1,0,0,1,1));
        }

        //curr edge is promoted
        else if (curr_edge.down){
            if (curr_edge.next){
                tanpt = curr_edge.next.pt1;
                let nextScene = new Scene("In this case, the binary search reached an edge that was promoted from a list on the lower level. Since each promoted edge has a pointer to the next edge from the current level, we can go to that edge, and use the first point of that edge as the tangent point.", 1,0,0,1,1,1);
                nextScene.next = curr_edge.next;
                scenes.push(nextScene);
            }
            else {
                tanpt = Uhulls[level][Uhulls[level].length -1].pt2;
                let nextScene = new Scene("In this case, the binary search reached an edge that was promoted from a list on the lower level. Each promoted edge has a pointer to the next edge from the current level, but since there are no more edges from the current level after that edge, the query line would have been the last element of the outer upper hull. We can then look at last edge in that level that wasn't promoted and use the second point from that edge as the tangent point.", 1,0,0,1,1,1);
                nextScene.next = Uhulls[level][Uhulls[level].length -1]
                scenes.push(nextScene);
            }
        }

        //curr edge is originally on the curr level
        else{
            tanpt=curr_edge.pt1;
            scenes.push(new Scene("In this case, the binary search reached an edge that was originally on the top level, so we can just use the first point on that edge as the tangent point.", 1,0,0,1,1));
        }
    }

    //other layers
    else{
        let nextScene;

        //only one pt in the last hull
        if (cascadeLst[level].length == 0){
            tanpt = hulls[level][0];
            nextScene = new Scene("Since there's only one point here, we can use tht point as the tangent point.", 1,0,0,1,1);
            nextScene.currLevel = level;
            nextScene.curr_edge = 0;
            scenes.push(nextScene);
        }

                                            // --- MOVING TO THE NEXT LEVEL ---

        //Query ended up after the last edge in prev level, check angle with last edge in curr level
        if (!curr_edge){
            nextScene = new Scene("Since we know that the query line would fall after the last edge on the current level, we can move to the end of the next level in constant time.", 1,0,0,1,1);
            nextScene.currLevel = level;
            scenes.push(nextScene);

        }

        //curr edge on prev level is a promoted edge, move down one level and compare with the edge before
        else if (curr_edge.down){
            curr_edge = curr_edge.down;
            nextScene = new Scene("Since the current edge we're looking at was promoted, we can move down to the same edge in the next level in constant time.", 1,0,0,1,1);
            nextScene.currLevel = level;
            scenes.push(nextScene);
        }

        //curr edge on prev level is not promoted, move to next promoted edge and go down
        else{
            curr_edge = curr_edge.next;
            nextScene = new Scene("Since the current edge we're looking at was not promoted, we can move to the next promoted edge in constant time.", 1,0,0,1,1);
            nextScene.currLevel = level-1;
            scenes.push(nextScene);

            if (curr_edge){
                curr_edge = curr_edge.down;
                nextScene = new Scene("Now, we can move down to the next level.", 1,0,0,1,1);
                nextScene.currLevel = level-1;
                scenes.push(nextScene);
            }
            else{
                nextScene = new Scene("Since there is not promoted edges after this edge, we can just move to the end of the list in the next level.", 1,0,0,1,1);
                nextScene.currLevel = level;
                scenes.push(nextScene);
            }
        }

        let prev_ind;

        if (curr_edge) {prev_ind = cascadeLst[level].indexOf(curr_edge) - 1;}
        else {prev_ind = cascadeLst[level].length-1;}

        nextScene = new Scene("We can then compare the slope of the edge before that edge with the slope of the query.", 1,0,0,1,1,1);
        nextScene.currLevel = level;
        nextScene.next = cascadeLst[level][prev_ind];
        scenes.push(nextScene);

        //if the edge before is steeper, move curr edge to it.
        if ( cascadeLst[level][prev_ind].angle >= qline.angle ){
            curr_edge = cascadeLst[level][prev_ind];
            nextScene = new Scene("Since the edge before has a steeper slope than the query, we know that the tangent point would be before that edge, so we move to that edge.", 1,0,0,1,1);
            nextScene.currLevel = level;
            scenes.push(nextScene);
        }

        //if query line is steeper, stay at curr edge
        else{
            nextScene = new Scene("Since the query is steeper, we stay at this edge.", 1,0,0,1,1);
            nextScene.currLevel = level;
            scenes.push(nextScene);
        }
        
                                                //--- FINDING TAN PT ---

        //curr edge is at the end of the curr level, tan pt is second pt of the last edge from the curr level
        if (!curr_edge){
            tanpt = Uhulls[level][Uhulls[level].length -1].pt2;
            nextScene = new Scene("The edge we're looking at is after the last edge of this level, so we can use the second point of the last edge of the current level as the tangent point.", 1,0,0,1,1);
            scenes.push(nextScene);
        }

        //curr edge is promoted
        else if (curr_edge.down){
            if (curr_edge.next){
                tanpt = curr_edge.next.pt1;
                let nextScene = new Scene("This edge was promoted from a list on the lower level. Since each promoted edge has a pointer to the next edge from the current level, we can go to that edge, and use the first point of that edge as the tangent point.", 1,0,0,1,1,1);
                nextScene.next = curr_edge.next;
                scenes.push(nextScene);
            }
            else {
                tanpt = Uhulls[level][Uhulls[level].length -1].pt2;
                let nextScene = new Scene("This edge was promoted from a list on the lower level. We try to move to the next edge from the current level, but since there are no more edges from the current level after that edge, the query line would have been the last element of the outer upper hull. We can then look at last edge in that level that wasn't promoted and use the second point from that edge as the tangent point.", 1,0,0,1,1,1);
                nextScene.next = Uhulls[level][Uhulls[level].length -1]
                scenes.push(nextScene);
            }
        }

        //curr edge is originally on the curr level
        else{
            tanpt=curr_edge.pt1;
            scenes.push(new Scene("This edge was originally on the current level, so we can just use the first point on that edge as the tangent point.", 1,0,0,1,1));
        }
    }

    let slope = (query[0].y - query[1].y) / (query[0].x - query[1].x);
    
    let y1 = tanpt.y - (tanpt.x * slope);
    let y2 = slope * (DIMEN-5) + y1;

    let p1 = new Point(0,y1);
    let p2 = new Point(DIMEN-5, y2);
    tanline = new Edge(p1,p2,255,0,0);
    tanLineFound = 1;
}