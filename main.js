const SPEED = 1500; //1.5 seconds

const GREEN = 0;
const RED = 1;
const YELLOW = 2;
const BLUE = 3;

var sequence;
var guess;
var running;
var playersTurn;

var interval;
var sequenceCounter;

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

    sequenceCounter = 0;
    interval = setInterval(function(){lightSequence()}, SPEED);
}

const lightSequence = () =>{
    console.log('LIGHT SEQUENCE');
    switch(sequence[sequenceCounter]){
        case GREEN:
            $('#green').css('background', 'lime');
            setTimeout(function(){
                $('#green').css('background', 'darkgreen');
            }, 500);            
            break;

        case RED:
            $('#red').css('background', 'red');
            setTimeout(function(){
                $('#red').css('background', 'darkred');                    
            }, 500);
            break;

        case YELLOW:
            $('#yellow').css('background', 'yellow');
            setTimeout(function(){
                $('#yellow').css('background', 'darkgoldenrod');                    
            }, 500);
            break;

        case BLUE:
            $('#blue').css('background', 'blue');
            setTimeout(function(){
                $('#blue').css('background', 'darkblue');                    
            }, 500);
            break;

        default:
            alert('ERROR');
            //this should never happen
    }
    if(sequenceCounter === (sequence.length - 1)){
        sequenceCounter = 0;
        clearInterval(interval);
        setTimeout(function(){ //wait 1 second before letting player click
            console.log('PLAYERS TURN');
            guess = []; // reset guess array
            playersTurn = true; // let player click
        }, 1000);
    } else {
        sequenceCounter++;
    }
}

const updateScore = () =>{
    console.log('UPDATE SCORE');
    $('#score').text(sequence.length);
}

const gameOver = () =>{
    console.log('GAME OVER');
    alert('Game Over');
    running = false;
}

$('#start').on({
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