
function Scene(desc, h = 0, uh = 0, uhl = 0, c = 0, e=0, n=0, t=0, end = false){

    this.text = desc;
    //stores copies of stuff to be shown at the current time
    this.data = [...data];
    this.hulls = [...hulls];
    this.casc = [...cascadeLst];
    this.edge = curr_edge;
    this.next = 0;
    this.tanLine = tanline;
    this.tanPt = tanpt;
    this.currLevel = 0;
    this.end = end;

    this.repLst = [...report_lst];
    this.arrows = [];


    //variables to decide what to display
    this.disHull = h;
    this.disUHull = uh;
    this.disUHullLst = uhl; 
    this.disCasc = c;
    this.disEdge = e;
    this.disNext = n;
    this.disTan = t;


    this.display = function(){
        stepsText.html(this.text);

        if (this.end){
            for (let i = 0; i < data.length; i++){
                if (!data[i].isAbove){
                    data[i].show_black();
                }
            }
            show_report_lst(this.repLst);
        }
        else{
            if (this.disHull) show_hulls(this.hulls);
            if (this.disUHull) show_Uhulls();
            if (this.disUHullLst) show_Uhulls_lst();
            if (this.disCasc) show_cascade_lst(this.casc);
            if (this.disEdge) box_edge(this.edge, this.currLevel);
            if (this.disNext) arrow_edge(this.next, this.currLevel);
            if (this.disTan) draw_tan_line(this.tanLine);
            if (this.repLst.length) show_report_lst(this.repLst);

            for (let i = 0; i < this.arrows.length; i++) {
                drawArrow(this.arrows[i][0], this.arrows[i][1],'red');
            }

        }
    }


}