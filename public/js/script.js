function problemsR(table, numbers){
    var element = document.createElement('label');
    var row = document.createElement('tr');
    table.appendChild(row);
    table.appendChild(element);
    var text = document.createTextNode('#'+numbers);
    element.appendChild(text);
    element.setAttribute('for','reading'+numbers);
    var input = document.createElement('input');
    input.className = 'reading';
    input.setAttribute('id','reading'+numbers);
    input.setAttribute('name','reading'+numbers);
    input.setAttribute('class','text-center');
    input.setAttribute('maxlength','1');
    if(numbers != 52){
    input.setAttribute('onkeyup','moveCursorR(this,'+'reading'+(numbers+1)+')');
    }else{
        input.setAttribute('onkeyup','moveCursorR(this,writing1)');
    }
    
    table.appendChild(input);
}

var qsR = (start,end) => {
    var table = document.querySelector('.reading');
    var div = document.createElement('div');
    div.className = "line";
    table.appendChild(div);
    for(var i = start; i<=end;i++){
        problemsR(div,i);
    }
}

function moveCursorR(fromTextBox,next) {
    if(fromTextBox.value == 1){
        fromTextBox.value = 'A';
    } else if(fromTextBox.value == 2){
        fromTextBox.value = 'B';
    } else if(fromTextBox.value == 3){
        fromTextBox.value = 'C';
    } else if(fromTextBox.value == 4){
        fromTextBox.value = 'D';
    }
    var length = fromTextBox.value.length;
    var maxLength = fromTextBox.getAttribute("maxlength");
    if(length == maxLength){
        var currentID = fromTextBox.getAttribute('id');
    //  console.log(fromTextBox.getAttribute('id').slice(7));
        if(next !==""){ 
        next.focus();
    }
    }
}

qsR(1,14);
qsR(15,28);
qsR(29,42);
qsR(43,52);

/* --------------------- Writing Section ----------------------------*/
/* --------------------- Writing Section ----------------------------*/
/* --------------------- Writing Section ----------------------------*/

function problemsW(table, numbers){
    var element = document.createElement('label');
    var row = document.createElement('tr');
    table.appendChild(row);
    table.appendChild(element);
    var text = document.createTextNode('#'+numbers);
    element.appendChild(text);
    element.setAttribute('for','writing'+numbers);
    var input = document.createElement('input');
    input.className = 'writing';
    input.setAttribute('id','writing'+numbers);
    input.setAttribute('name','writing'+numbers);
    input.setAttribute('class','text-center');
    input.setAttribute('maxlength','1');
    if(numbers != 44){
        input.setAttribute('onkeyup','moveCursorR(this,'+'writing'+(numbers+1)+')');
    }else{
        input.setAttribute('onkeyup','moveCursorR(this,mathnoc1)');
    }
    table.appendChild(input);
}

var qsW = (start,end) => {
    var table = document.querySelector('.writing');
    var div = document.createElement('div');
    div.className = "line";
    table.appendChild(div);
    for(var i = start; i<=end;i++){
        problemsW(div,i);
    }
}

function moveCursorW(fromTextBox,next) {
    if(fromTextBox.value == 1){
        fromTextBox.value = 'A';
    } else if(fromTextBox.value == 2){
        fromTextBox.value = 'B';
    } else if(fromTextBox.value == 3){
        fromTextBox.value = 'C';
    } else if(fromTextBox.value == 4){
        fromTextBox.value = 'D';
    }
    var length = fromTextBox.value.length;
    var maxLength = fromTextBox.getAttribute("maxlength");
    if(length == maxLength){
        var currentID = fromTextBox.getAttribute('id');
    //  console.log(fromTextBox.getAttribute('id').slice(7));
        next.focus();
    }
}

qsW(1,12);
qsW(13,24);
qsW(25,36);
qsW(37,44);

/* --------------------- Math-1 Section ----------------------------*/
/* --------------------- Math-1 Section ----------------------------*/
/* --------------------- Math-1 Section ----------------------------*/

function problemsM(table, numbers){
    var element = document.createElement('label');
    var row = document.createElement('tr');
    table.appendChild(row);
    table.appendChild(element);
    var text = document.createTextNode('#'+numbers);
    element.appendChild(text);
    element.setAttribute('for','mathnoc'+numbers);
    var input = document.createElement('input');
    input.className = 'mathnoc';
    input.setAttribute('id','mathnoc'+numbers);
    input.setAttribute('class','text-center');
    input.setAttribute('name','mathnoc'+numbers);
    input.setAttribute('maxlength','1');
    if(numbers != 20){
        if(numbers<=15){
            input.setAttribute('onkeyup','moveCursorM(this,'+'mathnoc'+(numbers+1)+',true)');
        }else{
            input.setAttribute('onkeyup','moveCursorM(this,'+'mathnoc'+(numbers+1)+',false)');
        }
    }else{
        input.setAttribute('onkeyup','moveCursorM(this,mathwic1,false)');
    }
    table.appendChild(input);
    if(numbers >=16){
        input.removeAttribute('maxlength');
        input.setAttribute('maxlength','4');
    }
}

var qsM = (start,end) => {
    var table = document.querySelector('.mathnoc');
    var div = document.createElement('div');
    div.className = "line";
    table.appendChild(div);
    for(var i = start; i<=end;i++){
        problemsM(div,i);
    }
}

function moveCursorM(fromTextBox,next,bool) {
    if(bool === true){
        if(fromTextBox.value == 1){
            fromTextBox.value = 'A';
        } else if(fromTextBox.value == 2){
            fromTextBox.value = 'B';
        } else if(fromTextBox.value == 3){
            fromTextBox.value = 'C';
        } else if(fromTextBox.value == 4){
            fromTextBox.value = 'D';
        }
    }
    var length = fromTextBox.value.length;
    var maxLength = fromTextBox.getAttribute("maxlength");
    if(length == maxLength){
        var currentID = fromTextBox.getAttribute('id');
    //  console.log(fromTextBox.getAttribute('id').slice(7));
        next.focus();
    }
}

qsM(1,5);
qsM(6,10);
qsM(11,15);
qsM(16,20);

/* --------------------- Math-2 Section ----------------------------*/
/* --------------------- Math-2 Section ----------------------------*/
/* --------------------- Math-2 Section ----------------------------*/

function problemsC(table, numbers){
    var element = document.createElement('label');
    var row = document.createElement('tr');
    table.appendChild(row);
    table.appendChild(element);
    var text = document.createTextNode('#'+numbers);
    element.appendChild(text);
    element.setAttribute('for','mathwic'+numbers);
    var input = document.createElement('input');
    input.className = 'mathwic';
    input.setAttribute('id','mathwic'+numbers);
    input.setAttribute('name','mathwic'+numbers);
    input.setAttribute('class','text-center');
    input.setAttribute('maxlength','1');
    if(numbers<=30){
        input.setAttribute('onkeyup','moveCursorM(this,'+'mathwic'+(numbers+1)+',true)');
    }else{
        input.setAttribute('onkeyup','moveCursorM(this,'+'mathwic'+(numbers+1)+',false)');
    }
    table.appendChild(input);
    if(numbers > 30){
        input.removeAttribute('maxlength');
        input.setAttribute('maxlength','4');
    }
}

var qsC = (start,end) => {
    var table = document.querySelector('.mathwic');
    var div = document.createElement('div');
    div.className = "line";
    table.appendChild(div);
    for(var i = start; i<=end;i++){
        problemsC(div,i);
    }
}

function moveCursorC(fromTextBox,next) {
    if(fromTextBox.value == 1){
        fromTextBox.value = 'A';
    } else if(fromTextBox.value == 2){
        fromTextBox.value = 'B';
    } else if(fromTextBox.value == 3){
        fromTextBox.value = 'C';
    } else if(fromTextBox.value == 4){
        fromTextBox.value = 'D';
    }
    var length = fromTextBox.value.length;
    var maxLength = fromTextBox.getAttribute("maxlength");
    if(length == maxLength){
        var currentID = fromTextBox.getAttribute('id');
    //  console.log(fromTextBox.getAttribute('id').slice(7));
        next.focus();
    }
}

qsC(1,10);
qsC(11,20);
qsC(21,30);
qsC(31,38);
