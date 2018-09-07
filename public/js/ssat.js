window.onload = function(){
    let mathI = document.querySelector('#mathI');
    createRow(mathI,"mathI",[1,7,8,14,15,21,22,25]);
    let reading = document.querySelector('#reading');
    createRow(reading,"reading",[1,10,11,20,21,30,31,40]);
    let verbal = document.querySelector('#verbal');
    createRow(verbal,"verbal",[1,15,16,30,31,45,46,60]);
    let mathII = document.querySelector('#mathII');
    createRow(mathII,"mathII",[1,7,8,14,15,21,22,25]);
    let lastMathI = document.getElementsByName('mathI25')[0];
    lastMathI.removeAttribute('onkeyup');
    lastMathI.setAttribute('onkeyup','moveNext(this,reading1)');
    let lastReading = document.getElementsByName('reading40')[0];
    lastReading.removeAttribute('onkeyup');
    lastReading.setAttribute('onkeyup','moveNext(this,verbal1)');
    let lastVerbal = document.getElementsByName('verbal60')[0]; 
    lastVerbal.removeAttribute('onkeyup');
    lastVerbal.setAttribute('onkeyup','moveNext(this,mathII1)');
    let lastMathII = document.getElementsByName('mathII25')[0]; 
    lastMathII.removeAttribute('onkeyup');
    lastMathII.setAttribute('onkeyup','moveNext(this,this)');

}
function moveNext(first,next,math){
    if(!(math)){
        switch(first.value){
            case "1":
                first.value = 'A';
                break;
            case "2":
                first.value = 'B';
                break;
            case "3":
                first.value = 'C';
                break;
            case "4":
                first.value = 'D';
                break;
        }
    }
    if(first.value.length === 1){
        next.focus();
    }
}

function createInputs(name,table,start,end){
    let row = document.createElement('div');
    row.setAttribute('class','col-3 text-center');
    for(let i = start;i<=end;i++){
        let div = document.createElement('div');
        let input = document.createElement('input');
        let text = document.createTextNode(''+i);
        input.setAttribute('maxLength','1');
        input.setAttribute('class','w-25 text-center');
        input.setAttribute('name',`${name}${i}`);
        input.setAttribute('onkeyup',`moveNext(this,${name+(i+1)})`);
        div.appendChild(text);
        div.appendChild(input);
        row.appendChild(div);
    }
    table.appendChild(row);
}

function createRow(table,name,total){
    
    createInputs(name,table,total[0],total[1]);
    createInputs(name,table,total[2],total[3]);
    createInputs(name,table,total[4],total[5]);
    createInputs(name,table,total[6],total[7]);
}