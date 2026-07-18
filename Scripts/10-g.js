let prev = "";
function f(c){
    if(prev){
        prev.classList.remove('clckd');
    }
    document.querySelector(`.${c}`).classList.add('clckd');
    
    prev = document.querySelector(`.${c}`);
}