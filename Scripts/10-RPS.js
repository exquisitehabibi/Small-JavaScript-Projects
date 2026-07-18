let wins = 0;
        let losses = 0;
        let draws = 0;
        function rps(u){
            let num = Math.random();
            let c = '';
            if(num >= 0 && num <= 1/3){ c='Rock';}
            else if(num > 1/3 && num < 2/3){ c ='Paper';}
            else{c='Scissors';}
            let user = u+'.png';
            let comp = c+'.png';
            document.querySelector('.selection').innerHTML=`You <img src="${user}" alt="${u}" height="50px"> V/S <img src="${comp}" alt="${c}" height="50px">Computer `;
            if((u=='Rock' && c =='Rock') || (u=='Paper' && c =='Paper') ||(u=='Scissors' && c =='Scissors')){
                document.querySelector('.res').innerHTML="It's a draw!";
                draws++;
            }
            else if((u=='Rock' && c =='Scissors') || (u=='Paper' && c =='Rock')||(u=='Scissors' && c =='Paper')){
                document.querySelector('.res').innerHTML="You win!";
                wins++;
            } 
            else{
                document.querySelector('.res').innerHTML="You lose!";
                losses++;
            }
            document.querySelector('.rec').innerHTML=`Wins: ${wins}, Losses: ${losses} and Draws: ${draws}.`;
        }
        function resB(){
            wins = 0;
            losses = 0;
            draws = 0;
            document.querySelector('.res').innerHTML="";
            document.querySelector('.selection').innerHTML="";
            document.querySelector('.rec').innerHTML=`Wins: ${wins}, Losses: ${losses} and Draws: ${draws}.`;

        }