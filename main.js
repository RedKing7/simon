const SPEED = 2000; //2 seconds

const playersTurn = (colors) =>{
    console.log('PLAYERS TURN');
    $('#green').on({
        'mouseover': function(event){
            $(event.target).css('background-color', 'green')
        },
        'mouseleave': function(event){
            $(event.target).css('background-color', 'DarkGreen')            
        },
        'click': function(event){
            $(event.target).css('background-color', 'lime')
        }
    })

    $('#red').on({
        'mouseover': function(event){
            $(event.target).css('background-color', 'firebrick')            
        },
        'mouseleave': function(event){
            $(event.target).css('background-color', 'darkred')
        },
        'click': function(event){
            $(event.target).css('background-color', 'red')            
        }
    })

    $('#yellow').on({
        'mouseover': function(event){
            $(event.target).css('background-color', 'goldenrod')            
        },
        'mouseleave': function(event){
            $(event.target).css('background-color', 'darkgoldenrod')            
        },
        'click': function(event){
            $(event.target).css('background-color', 'yellow')
        }
    })

    $('#blue').on({
        'mouseover': function(event){
            $(event.target).css('background-color', 'mediumblue')            
        },
        'mouseleave': function(event){
            $(event.target).css('background-color', 'darkblue')            
        },
        'click': function(event){
            $(event.target).css('background-color', 'blue')
        }
    })

    updateScore(colors);
}

const computersTurn = (colors) =>{
    console.log('COMPUTERS TURN');
    $('#green').off();
    $('#red').off();
    $('#yellow').off();
    $('#blue').off();

    let newColor = Math.floor(Math.random() * 4);
    colors.push(newColor);

    lightSequence(colors);
    //playersTurn(colors);
}

const lightSequence = (colors) =>{
    console.log('LIGHT SEQUENCE');
    colors.forEach(function(color) {
        switch(color){
            case 0:
                $('#green').css('background', 'lime');
                setTimeout(function(){
                    $('#green').css('background', 'darkgreen');
                }, SPEED);
                break;

            case 1:
                $('#red').css('background', 'red');
                setTimeout(function(){
                    $('#red').css('background', 'darkred');                    
                }, SPEED);
                break;

            case 2:
                $('#yellow').css('background', 'yellow');
                setTimeout(function(){
                    $('#yellow').css('background', 'darkgoldenrod');                    
                }, SPEED);
                break;

            case 3:
                $('#blue').css('background', 'blue');
                setTimeout(function(){
                    $('#blue').css('background', 'darkblue');                    
                }, SPEED);
                break;

            default:
                alert('ERROR');
        }
    });
}

const updateScore = (colors) =>{
    console.log('UPDATE SCORE');
    $('#score').text(colors.length);
}

const gameOver = () =>{
    console.log('GAME OVER');
}

$('#display').on({
    'click': function(event){
        console.log('START');
        let colors = [];
        computersTurn(colors);
    }
})