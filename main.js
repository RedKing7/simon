var SPEED;

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

const greenSound = document.getElementById('green-sound');
const redSound = document.getElementById('red-sound');
const yellowSound = document.getElementById('yellow-sound');
const blueSound = document.getElementById('blue-sound');
const loseSound = document.getElementById('lose-sound');

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
                case 'green': lightGreen(200);
                              guess.push(GREEN); break;

                case 'red': lightRed(200);
                            guess.push(RED); break;

                case 'yellow': lightYellow(200);
                               guess.push(YELLOW); break;

                case 'blue': lightBlue(200);
                             guess.push(BLUE); break;

                default: alert("something broke"); //this should never happen
            }

            for(let i = 0; i < guess.length; i++){
                if(guess[i] !== sequence[i]){
                    gameOver();
                    return;
                }
            }

            if(guess.length === sequence.length){// wait 1 second before starting next sequence
                if(SPEED > 200){
                    SPEED -= 50;
                }
                playersTurn = false;
                updateScore();
                setTimeout(function(){computersTurn()}, 1000);
            }
        }
    }
});

const computersTurn = () =>{
    playersTurn = false;

    let newColor = Math.floor(Math.random() * 4);
    sequence.push(newColor);

    sequenceCounter = 0;
    interval = setInterval(function(){lightSequence(SPEED/2)}, SPEED);
}

const lightSequence = (time) =>{
    switch(sequence[sequenceCounter]){
        case GREEN: lightGreen(time); break;
        case RED: lightRed(time); break;
        case YELLOW: lightYellow(time); break;
        case BLUE: lightBlue(time); break;
        default:
            alert('ERROR');
            //this should never happen
    }
    if(sequenceCounter === (sequence.length - 1)){
        sequenceCounter = 0;
        clearInterval(interval);
        setTimeout(function(){ //wait before letting player click
            guess = []; // reset guess array
            playersTurn = true; // let player click
        }, 700);
    } else {
        sequenceCounter++;
    }
}

const updateScore = () =>{
    $('#score').text(sequence.length);
}

const gameOver = () =>{
    setTimeout(function(){
        lightGreen(500);
        lightRed(500);
        lightBlue(500);
        lightYellow(500);
    }, 500);
    running = false;
}

const lightGreen = (time, sound = true) =>{
    if(sound){
        greenSound.play();
    }
    $('#green').css('background', 'lime');
    setTimeout(function(){
        greenSound.pause();
        greenSound.currentTime = 0;
        $('#green').css('background', 'darkgreen');
    }, time);
}
const lightRed = (time, sound = true) =>{
    if(sound){
        redSound.play();
    }
    $('#red').css('background', 'red');
    setTimeout(function(){
        redSound.pause();
        redSound.currentTime = 0;
        $('#red').css('background', 'darkred');                    
    }, time);
}
const lightYellow = (time, sound = true) =>{
    if(sound){
        yellowSound.play();
    }
    $('#yellow').css('background', 'yellow');
    setTimeout(function(){
        yellowSound.pause();
        yellowSound.currentTime = 0;
        $('#yellow').css('background', 'darkgoldenrod');                    
    }, time);
}
const lightBlue = (time, sound = true) =>{
    if(sound){
        blueSound.play();
    }
    $('#blue').css('background', 'blue');
    setTimeout(function(){
        blueSound.pause();
        blueSound.currentTime = 0;
        $('#blue').css('background', 'darkblue');                    
    }, time);
}

const startupSound = () =>{
    lightGreen(160);
    setTimeout(function(){
        lightRed(160);
        setTimeout(function(){
            lightYellow(160);
            setTimeout(function(){
                lightBlue(160);  
            }, 160);
        }, 160);
    }, 160);    
}

$('#start').on({
    'click': function(event){
        if(!running){
            SPEED = 1000;
            sequence = [];
            guess = [];
            running = true;
            updateScore();
            startupSound();
            setTimeout(function(){ // wait before starting
                computersTurn();
            }, SPEED);
        }
    }
})