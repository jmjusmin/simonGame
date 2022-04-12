//create a variable to store the pattern
var gamePattern = [];
var userClickedPattern = [];
//create a string array to hold color
var buttonColours = ["red", "blue", "green", "yellow"];
//variable to store level
var level = 0;
//tracking
var started = false;

//start a game when a keyboard pressed
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//check which button clicked
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //calling function to play sound and flashing
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

//check if the user got the correct answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      //reset the userClicked array
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    //add sound
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    //change h1
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //call function to start over
    startOver();
  }
}

//create a random sequence and added to array
function nextSequence() {
  //reset userClickedPattern array
  userClickedPattern = [];

  //increasing level each time the function was called
  level++;
  $("#level-title").text("Level " + level);

  //generate the random number
  var randomNumber = Math.floor(Math.random() * 4);

  //generate a random color
  var randomChosenColor = buttonColours[randomNumber];

  //add it to the gamePattern array
  gamePattern.push(randomChosenColor);

  //add animation
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //calling function to play sound
  playSound(randomChosenColor);
}

//add sound
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

//add css class to selected button
function animatePress(currentColour) {
  var id = "#" + currentColour;
  $(id).addClass('pressed');
  setTimeout(function() {
    $(id).removeClass('pressed');
  }, 100);
}

//reset value
function startOver(){
  started = false;
  gamePattern = [];
  level = 0;
}
