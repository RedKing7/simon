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


$('#display').on({
    'click': function(event){
        console.log('START');
        let colors = [];
        //setTimeout(computersTurn(colors), SPEED);
    }
})