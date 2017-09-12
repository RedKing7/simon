const SPEED = 2000; //2 seconds

const GREEN = 0;
const RED = 1;
const YELLOW = 2;
const BLUE = 3;

var sequence;
var guess;
var running;
var playersTurn;

$('.simon-button').on({
    'mouseover': function(event){
        if(running && playersTurn){
            $button = $(event.target);
            switch($button.attr('id')){
                case 'green':
                    $('#green').css('background-color', 'green');
                    break;

                case 'red':
                    $('#red').css('background-color', 'firebrick');
                    break;

                case 'yellow':
                    $('#yellow').css('background-color', 'goldenrod');
                    break;

                case 'blue':
                    $('#blue').css('background-color', 'mediumblue');
                    break;

                default: alert("something broke");
            }
        }
    },

    'mouseleave': function(event){
        if(running && playersTurn){
            $button = $(event.target);
            switch($button.attr('id')){
                case 'green':
                    $('#green').css('background-color', 'darkgreen');
                    break;

                case 'red':
                    $('#red').css('background-color', 'darkred');
                    break;

                case 'yellow':
                    $('#yellow').css('background-color', 'darkgoldenrod');
                    break;

                case 'blue':
                    $('#blue').css('background-color', 'darkblue');
                    break;

                default: alert("something broke");
            }
        }
    },
    
    'click': function(event){
        if(running && playersTurn){
            $button = $(event.target);
            switch($button.attr('id')){
                case 'green':
                    $('#green').css('background-color', 'lime');
                    guess.push(GREEN);
                    setTimeout(function(){$('#green').css('background-color', 'darkgreen')}, 200);
                    break;

                case 'red':
                    $('#red').css('background-color', 'red');
                    guess.push(RED);
                    setTimeout(function(){$('#red').css('background-color', 'darkred')}, 200);
                    break;

                case 'yellow':
                    $('#yellow').css('background-color', 'yellow');
                    guess.push(YELLOW);
                    setTimeout(function(){$('#yellow').css('background-color', 'darkgoldenrod')}, 200);
                    break;

                case 'blue':
                    $('#blue').css('background-color', 'blue');
                    guess.push(BLUE);
                    setTimeout(function(){$('#blue').css('background-color', 'darkblue')}, 200);
                    break;

                default: alert("something broke"); //this should never happen
            }

            for(let i = 0; i < guess.length; i++){
                if(guess[i] !== sequence[i]){
                    gameOver();
                    return;
                }
            }

            if(guess.length === sequence.length){// wait 1 second before starting next sequence
                playersTurn = false;
                updateScore();
                setTimeout(function(){computersTurn()}, 1000);
            }
        }
    }
});

const computersTurn = () =>{
    playersTurn = false;
    console.log('COMPUTERS TURN');

    let newColor = Math.floor(Math.random() * 4);
    sequence.push(newColor);
    console.log(sequence);
    lightSequence();

    setTimeout(function(){ //wait 1 second before letting player click
        console.log('PLAYERS TURN');
        guess = []; // reset guess array
        playersTurn = true;
    }, 1000);
}

const lightSequence = () =>{
    console.log('LIGHT SEQUENCE');
    sequence.forEach(function(color) {
        switch(color){
            case GREEN:
                setTimeout(function(){
                    $('#green').css('background', 'lime');                    
                }, 500);
                setTimeout(function(){
                    $('#green').css('background', 'darkgreen');
                }, 500);
                break;

            case RED:
                setTimeout(function(){
                    $('#red').css('background', 'red');
                }, 500);
                setTimeout(function(){
                    $('#red').css('background', 'darkred');                    
                }, 500);
                break;

            case YELLOW:
                setTimeout(function(){
                    $('#yellow').css('background', 'yellow');
                }, 500);
                setTimeout(function(){
                    $('#yellow').css('background', 'darkgoldenrod');                    
                }, 500);
                break;

            case BLUE:
                setTimeout(function(){    
                    $('#blue').css('background', 'blue');
                }, 500);
                setTimeout(function(){
                    $('#blue').css('background', 'darkblue');                    
                }, 500);
                break;

            default:
                alert('ERROR');
                //this should never happen
        }
    });
}

const updateScore = () =>{
    console.log('UPDATE SCORE');
    $('#score').text(`Score: ${sequence.length}`);
}

const gameOver = () =>{
    console.log('GAME OVER');
    running = false;
}

$('#display').on({
    'click': function(event){
        if(!running){
            console.log('START');
            sequence = [];
            guess = [];
            running = true;
            updateScore();
            setTimeout(function(){ // wait 1 second before starting
                computersTurn();
            }, 1000);
        }
    }
})