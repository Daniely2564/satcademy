window.onload = () =>{
    english();
    math();
    reading();
    science();
}

function english(){
    const section = "english";
    const head = document.getElementById(section);
    const table = document.createElement("div");
    table.setAttribute("class","row"); 
    head.appendChild(table);
    
    const partA = document.createElement("div");
    partA.setAttribute("class","col-3");
    const partB = document.createElement("div");
    partB.setAttribute("class","col-3");
    const partC = document.createElement("div");
    partC.setAttribute("class","col-3");
    const partD = document.createElement("div");
    partD.setAttribute("class","col-3");
    addProblems(1,20,section,partA);
    addProblems(21,40,section,partB);
    addProblems(41,60,section,partC);
    addProblems(61,75,section,partD,"math1");

    table.appendChild(partA);
    table.appendChild(partB);
    table.appendChild(partC);
    table.appendChild(partD);
}

function math(){
    const section = "math";
    const head = document.getElementById(section);
    const table = document.createElement("div");
    table.setAttribute("class","row"); 
    head.appendChild(table);
    
    const partA = document.createElement("div");
    partA.setAttribute("class","col-3");
    const partB = document.createElement("div");
    partB.setAttribute("class","col-3");
    const partC = document.createElement("div");
    partC.setAttribute("class","col-3");
    const partD = document.createElement("div");
    partD.setAttribute("class","col-3");
    addProblems(1,15,section,partA);
    addProblems(16,30,section,partB);
    addProblems(31,45,section,partC);
    addProblems(46,60,section,partD,"reading1");

    table.appendChild(partA);
    table.appendChild(partB);
    table.appendChild(partC);
    table.appendChild(partD);
}

function reading(){
    const section = "reading";
    const head = document.getElementById(section);
    const table = document.createElement("div");
    table.setAttribute("class","row"); 
    head.appendChild(table);
    
    const partA = document.createElement("div");
    partA.setAttribute("class","col-3");
    const partB = document.createElement("div");
    partB.setAttribute("class","col-3");
    const partC = document.createElement("div");
    partC.setAttribute("class","col-3");
    const partD = document.createElement("div");
    partD.setAttribute("class","col-3");
    addProblems(1,10,section,partA);
    addProblems(11,20,section,partB);
    addProblems(21,30,section,partC);
    addProblems(31,40,section,partD,"science1");

    table.appendChild(partA);
    table.appendChild(partB);
    table.appendChild(partC);
    table.appendChild(partD);
}

function science(){
    const section = "science";
    const head = document.getElementById(section);
    const table = document.createElement("div");
    table.setAttribute("class","row"); 
    head.appendChild(table);
    
    const partA = document.createElement("div");
    partA.setAttribute("class","col-3");
    const partB = document.createElement("div");
    partB.setAttribute("class","col-3");
    const partC = document.createElement("div");
    partC.setAttribute("class","col-3");
    const partD = document.createElement("div");
    partD.setAttribute("class","col-3");
    addProblems(1,10,section,partA);
    addProblems(11,20,section,partB);
    addProblems(21,30,section,partC);
    addProblems(31,40,section,partD, "science40");

    table.appendChild(partA);
    table.appendChild(partB);
    table.appendChild(partC);
    table.appendChild(partD);
}


function addProblems(start, end, section, target, last){
    for(let i = start; i<=end;i++){
        let label = document.createElement("label");
        label.setAttribute("class","font-weight-bold lead");
        label.innerText = i;
        let input = document.createElement("input");
        input.setAttribute("name",`${section}${i}`);
        input.setAttribute("class","answerInput text-center");
        input.setAttribute("maxLength","1");
        if(last && i ===end){
            if(i % 2 == 1){
                input.setAttribute("onkeyup", `changeA(this,${last})`);
            } else {
                input.setAttribute("onkeyup", `changeB(this,${last})`);
            }
        }else{
            if(i % 2 == 1){
                input.setAttribute("onkeyup", `changeA(this,${section+(i+1)})`);
            } else {
                input.setAttribute("onkeyup", `changeB(this,${section+(i+1)})`);
            }
        }
        
        
        label.appendChild(input);
        target.appendChild(label);
    }


    
    
}

function changeA(item, next){
    if(item.value == '1'){
        item.value = 'A';
    } else if(item.value == '2'){
        item.value = 'B';
    } else if(item.value == '3'){
        item.value = 'C';
    } else if(item.value == '4'){
        item.value = 'D';
    } else if(item.value == '5'){
        item.value = 'E';
    }
    if(item.value.length === 1){
        next.focus();
    }
}

function changeB(item, next){
    if(item.value == '1'){
        item.value = 'F';
    } else if(item.value == '2'){
        item.value = 'G';
    } else if(item.value == '3'){
        item.value = 'H';
    } else if(item.value == '4'){
        item.value = 'J';
    } else if(item.value == '5'){
        item.value = 'K';
    }

    if(item.value.length === 1){
        next.focus();
    }
}

