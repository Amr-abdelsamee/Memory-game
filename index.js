// select all the available blocks with the class btn
var btns = document.querySelectorAll('.btn')

var gameBlocks = btns.length;
var blocks = []; // used to generate the patterns  , will be filled with tthe values in line 16 in the loop
var level = 1; // indicate te level get increased when the check is correct
var clicks = 0; // indicate how many clicks the user has done , used to triger game over screen or to go to nextt level

var userEntry = []; // stores the ids off the blocks that the user has clicke
var pattern = []; // game pattern get generateed randomly and thhe length of the pattern depends on te level (same as level)


// the loop is used to do the folllowing:
// 1- fill the bocks array with the ids of te blocks
// 2- fill the backkground coor of each block as the color values are stored as a class in each block tag name
// 3- onclick event is added to each block
for (let i = 0; i < gameBlocks; i++) {

    blocks.push("B" + i) //get the ids of the blocks tto create a pattern from them

    btns[i].style.backgroundColor = btns[i].classList[1]

    btns[i].addEventListener("click", function () {

        play(this.id)
        clicks++;
        userEntry.push(btns[i].id)

        console.log("current:: level: " + level + " #click: " + clicks + " clicked block: "+ btns[i].id);
        if (clicks == level) {
            clicks = 0;
            if (check(pattern, userEntry)) {
                level += 1;
                console.log("***WIN***");
                win()
            }
            else {
                level = 1;
                lose()
            }
            userEntry = [];
        }

    })
}



$("#start").click(function () {
    playSound("start")
    $("#gameName").slideUp();
    $("#start").slideUp();                   // start text goes away

    setTimeout(function () {
        $(".container").css("display", "block"); // game blocks get displayed

        $(".level").text("Level " + level);      // current level text get displayed
        $(".again").text("< Again >");              // again button get displayed

        pattern = patternGenerator(level);
        setTimeout(showPattern, 150, pattern)

    }, 500)
})



$(".again").click(function () {
    console.log("Agian triggered your clicks are reset!! ")
    clicks = 0;
    userEntry = [];
    showPattern(pattern)
})


function patternGenerator(num) {
    let moves = []
    for (let i = 0; i < num; i++) {
        moves.push(blocks[Math.floor(Math.random() * gameBlocks)])
    }
    console.log(">>> pattern generated: " + moves)
    return moves
}



function showPattern(pattern) {
    for (let i = 0; i < pattern.length; i++) {
        setTimeout(play, i * 700, document.querySelector("#" + pattern[i]).id)
    }
}



function play(blockID) {
    playSound(blockID)
    animation(blockID)
}



// animation function get triggered when user click on of the keys by mouse
function animation(blockID) {
    var activeBtn = document.querySelector('#' + blockID);
    activeBtn.classList.add("pressed");
    setTimeout(function () {
        activeBtn.classList.remove("pressed")
    }, 300)
}



function playSound(soundName) {
    new Audio("src//sounds//" + soundName + ".mp3").play()
}



function check(pattern, userEntry) {
    return pattern.join() == userEntry.join()
}



function win() {
    setTimeout(playSound, 150, "correct")
    $(".level").text("Level " + level);
    pattern = patternGenerator(level);
    setTimeout(showPattern, 500, pattern)
}



function lose() {
    setTimeout(playSound, 150, "wrong")
    console.log("***LOSE***")
    $(".container").css("display", "none")

    $(".level").text("")
    $(".again").text("")

    $("#start").show()
    $("#start").text("Game Over")
}
