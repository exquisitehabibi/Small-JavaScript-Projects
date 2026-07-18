const arr = ["hi", "hello", "search"];
const food = ["egg", "hello", "search","egg","hi"];

function fin(c,word){
    for(let i = 0; i < c.length; i++){
        if(c[i]==word){
            console.log(i);
            return;
        }
        
    }
    console.log(-1);
}

function removeEgg(ar){
    let i = 0;

    for(let j = 0; j < ar.length ; j++){
        if(ar[j]=="egg"){
            i=j;
            break;
        }
    }

    for(let j = i+1; j < ar.length; j++){
        if(ar[j]!="egg"){

            let w = ar[j];
            ar[j] = ar[i];
            ar[i]=w;
            i=j;
        }
    }

    while(ar.length>0 && ar[ar.length-1]=="egg"){
        ar.pop();
    }

}

// fin(arr,"search");

// removeEgg(food);
// console.log(food);

// for(let i = 1; i<= 20; i++){
//     if(i%3==0 && i%5==0){
//         console.log("FizzBuzz");
//     }
//     else if(i%3==0){
//         console.log("Fizz");
//     }
//     else if(i%5==0){
//         console.log("Buzz");
//     }
//     else{
//         console.log(i);
//     }
// }

function ch(ar,word){
    for(let i = 0; i < ar.length; i++){
        if(ar[i]==word) return true;
    }
    return false;
}
const he=[];
function uni(ar){
    for(let i = 0; i < ar.length; i++){
        if(!ch(he,ar[i])){
            he.push(ar[i]);
        }
    }
}

uni(food);
console.log(he);
