var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    var audio = new Audio('sounds/' + userChosenColor + '.mp3');
    audio.play();
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1)
})

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNum];

    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio('sounds/' + randomChosenColor + '.mp3');
    audio.play();

}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed")
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function startOver() {
    buttonColors = ["red", "blue", "green", "yellow"];
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}

function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
         if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
                nextSequence()
              }, 1000);

              userClickedPattern = []
        }
    } else{

        var audio = new Audio('sounds/wrong.mp3');
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
           $("body").removeClass("game-over"); 
          }, 200);
          
          $("#level-title").text("Game Over, Press Any Key to Restart");
          startOver();
    }
}

