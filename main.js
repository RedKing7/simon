const SPEED = 2000; //2 seconds

const GREEN = 0;
const RED = 1;
const YELLOW = 2;
const BLUE = 3;

var sequence = [];
var guess = [];

let isPlayersTurn;

$('.simon-button').on({
    'mouseover': function(event){
        if(isPlayersTurn){
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
        if(isPlayersTurn){
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
        if(isPlayersTurn){
            $button = $(event.target);
            switch($button.attr('id')){
                case 'green':
                    $button.css('background-color', 'lime');
                    break;

                case 'red':
                    $button.css('background-color', 'red');
                    break;

                case 'yellow':
                    $button.css('background-color', 'yellow');
                    break;

                case 'blue':
                    $button.css('background-color', 'blue');
                    break;

                default: alert("something broke");
            }
        }
    }
})

/*const playersTurn = () =>{
    console.log('PLAYERS TURN');

    playerListeners();

    listenersOff();

    if(guess === sequence){
        guess = [];
        updateScore();
        computersTurn(); 
    } else {
        gameOver();
    }
}*/

const computersTurn = () =>{
    console.log('COMPUTERS TURN');
    playersTurn = false;
    listenersOff();

    let newColor = Math.floor(Math.random() * 4);
    sequence.push(newColor);

    lightSequence();
    playersTurn = true;
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
}

$('#display').on({
    'click': function(event){
        $('#display').off();
        console.log('START');
        computersTurn();
    }
})