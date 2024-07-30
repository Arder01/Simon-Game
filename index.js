$(document).ready(function() {
    var gamepattern = [];
    var buttonColors = ["green", "red", "yellow", "blue"];
    var round = 1;
    var userClickedPattern = [];
    var waitingForUser = true; 

    async function nextsequence(round) {
        gamepattern.length = 0; 
        userClickedPattern.length = 0; 
        console.log("Round -> " + round);
        $("h1").text("Round " + round);
        waitingForUser = false; 
        for (var i = 0; i < round; i++) {
            var randomNum = Math.floor(Math.random() * 4);
            var randomChosenColor = buttonColors[randomNum];
            gamepattern.push(randomChosenColor);
            console.log(randomChosenColor);
            playSound(randomChosenColor);

            await flashButton(randomChosenColor);
            await delay(500);
        }

        waitingForUser = true; 
    }

    function flashButton(color) {
        $(this).sou
        return new Promise(resolve => {
            $("#" + color).fadeOut(500).fadeIn(500, resolve);
        });
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    $(document).keydown(function() {
        if (!waitingForUser) return; 
        nextsequence(round);
    });

    $(".btn").click(function() {
        if (!waitingForUser) return;
        $(this).fadeOut(500).fadeIn(500);

        var userChosenColor = $(this).attr("id");
        playSound(userChosenColor)
        userClickedPattern.push(userChosenColor);

        if (userClickedPattern.length === gamepattern.length) {
            if (arraysEqual(gamepattern, userClickedPattern)) {
                $("h1").text("You win! Press a Key to start the next round");
                round++;
                waitingForUser = false;
                $(document).one('keydown', function() { 
                    nextsequence(round);
                });
            } else {
                $("h1").text("Game Over! Press a Key to restart");
                round = 1;
                waitingForUser = false; 
                $(document).one('keydown', function() { 
                    nextsequence(round);
                });
            }
        }
    });

    function arraysEqual(arr1, arr2) {
        if (arr2.length < arr1.length) return false;

        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
      }
});