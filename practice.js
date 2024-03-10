
let idColors = ["red", "yellow", "green", "blue"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;


// -------------------------generatre random number between 0-4 ----------------------------------------------------
function generateRandomNumber (){
    let randomNumber = Math.floor(Math.random()* 4)
    return randomNumber
}
// ------------------------this function makes a sound using a passing key ------------------------------------------
function makeSound(key){
    let audio = new Audio("sounds/"+key+".mp3");
    audio.play();
}
// ----------------------------- does the computer side -------------------------------------------------------------
function computerSequece (){
    userPattern = [];
    level ++;
    $("#level-title").text("level " + level)
    let randomColor = idColors[generateRandomNumber()]
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100)
    makeSound(randomColor);
}

// --------------------------add btns click listener and play sounds -------------------------------------------------

$(".btn").on("click", function() {
    makeSound(this.id);
    animatedClick(this.id);
    userPattern.push(this.id)
    let userPatternLength = userPattern.length - 1 ;
    checkAnswer(userPatternLength);
})
// -------------------------this function makes the user click anaimated --------------------------------------------

function animatedClick(key){
    $("#"+key).addClass("pressed")
    setTimeout(function(){
        $("#"+ key).removeClass("pressed")
    },50)
}
// -----------------------doesn't start the game till e key was pressed ----------------------------------------------
$(document).on("keydown", function (){
    if (!started){
        computerSequece()
        started = true
    }})
// ----------------------function to check the answer ----------------------------------------------------------------

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel]=== userPattern[currentLevel]){
        console.log("success!");

        if (gamePattern.length === userPattern.length) {
            setTimeout(function(){
                computerSequece();
            },1000);
        }
    } else {
        let wrongAudio = new Audio("sounds/wrong.mp3")
        wrongAudio.play();
        $('body').css("background-color","red");
        setTimeout(function(){
            $('body').css("background-color", "#011F3F")
        },200)

        $("h1").text("Game Over! Press any key To Restart! ")
        startOver()
    }

}


function startOver (){
    
    level = 0;
    gamePattern = [];
    started = false
    
}
