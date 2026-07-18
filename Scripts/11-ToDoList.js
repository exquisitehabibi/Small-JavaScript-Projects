alert("Supports localStorage, So that you don't miss your important tasks! ;)");

let arr = JSON.parse(localStorage.getItem("tasks")) || [];

let ATI = document.querySelector('.AT');
let DMYI = document.querySelector('.DMY');
let disp = document.querySelector('.disp');

function func(){
    if(ATI.value=="" || DMYI.value==""){
        alert('Both Fields Mandatory!');
        return;
    }
    arr.push({work:ATI.value, date:DMYI.value});
    ATI.value="";
    DMYI.value="";
    saveData();
    dis();
}

function rem(ind){
    arr.splice(ind,1);
    saveData();
    dis();
}

function dis(){
    disp.innerHTML="";

    for(let i=0; i<arr.length; i++){
        
        disp.innerHTML+=`<div class="row">
        <p>${arr[i].work}</p>
        <p>${arr[i].date}</p>
        <p><button onclick="rem(${i})">Remove</button></p>
        </div> <br>`;
    }
}

function saveData(){
    localStorage.setItem("tasks",JSON.stringify(arr));
}

dis();

// const arr =[];
// let count=0;

// let ATI = document.querySelector('.AT');
// let DMYI = document.querySelector('.DMY');
// let TaskD = document.querySelector('.Taskdisp');
// let DateD = document.querySelector('.Datedisp');
// let RemD = document.querySelector('.Remdisp');

// function func(){
//     arr.push({work:ATI.value, date:DMYI.value});
//     ATI.value="";
//     DMYI.value="";
//     TaskD.innerHTML+=`${arr[count].work} <br>`;
//     DateD.innerHTML+=`${arr[count].date} <br>`;
//     RemD.innerHTML+=`<button onclick="rem(${count})">Remove</button> <br>`;
//     count++;
// }

// function rem(ind){
//     arr.splice(ind,1);
//     dis();
// }

// function dis(){
//     TaskD.innerHTML="";
//     DateD.innerHTML="";
//     RemD.innerHTML="";
//     count = arr.length;
//     for(let i=0; i<arr.length; i++){
//         TaskD.innerHTML+=`${arr[i].work} <br>`;
//         DateD.innerHTML+=`${arr[i].date} <br>`;
//         RemD.innerHTML+=`<button onclick="rem(${i})">Remove</button> <br>`;
//     }
// }
