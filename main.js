const SPEED = 2000; //2 seconds

const GREEN = 0;
const RED = 1;
const YELLOW = 2;
const BLUE = 3;

var sequence = [];
var guess = [];
var running;
var playersTurn;

var guessIndex;

$('.simon-button').on({
    'mouseover': function(event){
        if(running && playersTurn){
            $button = $(event.target);
            switch($button.attr('id')){
                case 'green':
                    $button.css('background-color', 'green');
                    break;

                case 'red':
                    $button.css('background-color', 'firebrick');
                    break;

                case 'yellow':
                    $button.css('background-color', 'goldenrod');
                    break;

                case 'blue':
                    $button.css('background-color', 'mediumblue');
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
                    $button.css('background-color', 'darkgreen');
                    break;

                case 'red':
                    $button.css('background-color', 'darkred');
                    break;

                case 'yellow':
                    $button.css('background-color', 'darkgoldenrod');
                    break;

                case 'blue':
                    $button.css('background-color', 'darkblue');
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
                    $button.css('background-color', 'lime');
                    guess.push(GREEN);
                    setTimeout(function(){$button.css('background-color', 'darkgreen')}, 700);
                    break;

                case 'red':
                    $button.css('background-color', 'red');
                    guess.push(RED);
                    setTimeout(function(){$button.css('background-color', 'darkred')}, 700);
                    break;

                case 'yellow':
                    $button.css('background-color', 'yellow');
                    guess.push(YELLOW);
                    setTimeout(function(){$button.css('background-color', 'darkgoldenrod')}, 700);
                    break;

                case 'blue':
                    $button.css('background-color', 'blue');
                    guess.push(BLUE);
                    setTimeout(function(){$button.css('background-color', 'darkblue')}, 700);
                    break;

                default: alert("something broke"); //this should never happen
            }

            for(let i = 0; i < guess.length; i++){
                if(guess[i] !== sequence[i]){
                    gameOver();
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
        playersTurn = true;
    }, 1000);
}

const lightSequence = () =>{
    console.log('LIGHT SEQUENCE');
    sequence.forEach(function(color) {
        switch(color){
            case GREEN:
                $('#green').css('background', 'lime');
                setTimeout(function(){
                    $('#green').css('background', 'darkgreen');
                }, SPEED);
                break;

            case RED:
                $('#red').css('background', 'red');
                setTimeout(function(){
                    $('#red').css('background', 'darkred');                    
                }, SPEED);
                break;

            case YELLOW:
                $('#yellow').css('background', 'yellow');
                setTimeout(function(){
                    $('#yellow').css('background', 'darkgoldenrod');                    
                }, SPEED);
                break;

            case BLUE:
                $('#blue').css('background', 'blue');
                setTimeout(function(){
                    $('#blue').css('background', 'darkblue');                    
                }, SPEED);
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
    alert('LOSE');
}

$('#display').on({
    'click': function(event){
        if(!running){
            console.log('START');
            running = true;
            setTimeout(function(){ // wait 1 second before starting
                computersTurn();
            }, 1000);
        }
    }
})