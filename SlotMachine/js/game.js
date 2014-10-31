/// <reference path="jquery.js" />
/// <reference path="http://code.createjs.com/createjs-2013.12.12.min.js" />
/// <reference path="createjs-2013.12.12.min.js" />

/**
File Name: game.js
Author: Blake Murdock
Website Name: Slot Machine
Purpose: This file contains all of the javascript and jQuery functions that are used by the 
slot machine application. 
*/

var stage;
var game;
var queue;
var slotMachineImage;
var spinButton;
var spinButtonHover;
var resetButton;
var resetButtonHover;
var exitButton;
var winText;
var reel1;
var reel2;
var reel3;
var jackpotText;
var winningsText;
var playerMoneyText;
var winNumberText;
var lossNumberText;
var winRatioText;
var turnText;

// Bet Buttons
var betPlaced = false;
var bet5Red;
var bet5Blue;
var bet10Red;
var bet10Blue;
var bet20Red;
var bet20Blue;
var bet50Red;
var bet50Blue;
var bet100Red;
var bet100Blue;
var bet200Red;
var bet200Blue;
var bet500Red;
var bet500Blue;
var bet1000Red;
var bet1000Blue;

var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

function loadQueue() {
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    createjs.Sound.alternateExtensions = ["wav"];
    queue.addEventListener("complete", init);
    
    queue.loadManifest([
        { id: "slotMachineImage", src: "img/A_Vector_Art_Slot_Machine_Revised.png" },
        { id: "bananaImage", src: "img/bananas2.png" },
        { id: "grapesImage", src: "img/grapes2.png" },
        { id: "barsImage", src: "img/bar2.png" },
        { id: "bellsImage", src: "img/bells2.png" },
        { id: "cherriesImage", src: "img/cherries2.png" },
        { id: "orangesImage", src: "img/oranges2.png" },
        { id: "sevensImage", src: "img/7-2.png" },
        { id: "blankImage", src: "img/blank.png" },
        { id: "spinHoverButtonImage", src: "img/Spin-Blue.png" },
        { id: "spinButtonImage", src: "img/Spin.png" },
        { id: "spin-reel", src: "img/spin-reel.png" },
        { id: "reset_button_red", src: "img/Reset-Button-Red-98x78-2.png" },
        { id: "reset_button_blue", src: "img/Reset-Button-Blue-98x78-2.png" },
        { id: "exit", src: "img/exit-2.png" },
        { id: "bet5RedImage", src: "img/bet5-red.png" },
        { id: "bet10RedImage", src: "img/bet10-red.png" },
        { id: "bet20RedImage", src: "img/bet20-red.png" },
        { id: "bet50RedImage", src: "img/bet50-red.png" },
        { id: "bet100RedImage", src: "img/bet100-red.png" },
        { id: "bet200RedImage", src: "img/bet200-red.png" },
        { id: "bet500RedImage", src: "img/bet500-red.png" },
        { id: "bet1000RedImage", src: "img/bet1000-red.png" },
        { id: "bet5BlueImage", src: "img/bet5-blue.png" },
        { id: "bet10BlueImage", src: "img/bet10-blue.png" },
        { id: "bet20BlueImage", src: "img/bet20-blue.png" },
        { id: "bet50BlueImage", src: "img/bet50-blue.png" },
        { id: "bet100BlueImage", src: "img/bet100-blue.png" },
        { id: "bet200BlueImage", src: "img/bet200-blue.png" },
        { id: "bet500BlueImage", src: "img/bet500-blue.png" },
        { id: "bet1000BlueImage", src: "img/bet1000-blue.png" }
        //{ id: "coin_sound", src: "audio/coin.wav" },
        //{ id: "jackpot_sound", src: "audio/jackpot.wav" }
    ]);
}

/* Utility function to show Player Stats */
function showPlayerStats()
{
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");

}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
    betPlaced = false;
    bet5Red.visible = true;
    bet5Blue.visible = false;
    bet10Red.visible = true;
    bet10Blue.visible = false;
    bet20Red.visible = true;
    bet20Blue.visible = false;
    bet50Red.visible = true;
    bet50Blue.visible = false;
    bet100Red.visible = true;
    bet100Blue.visible = false;
    bet200Red.visible = true;
    bet200Blue.visible = false;
    bet500Red.visible = true;
    bet500Blue.visible = false;
    bet1000Red.visible = true;
    bet1000Blue.visible = false;

    game.removeChild(reel1);
    game.removeChild(reel2);
    game.removeChild(reel3);
    reel1 = new createjs.Bitmap(queue.getResult('spin-reel'));
    reel1.x = 130;
    reel1.y = 165;
    game.addChild(reel1);
    reel2 = new createjs.Bitmap(queue.getResult('spin-reel'));
    reel2.x = 243;
    reel2.y = 165;
    game.addChild(reel2);
    reel3 = new createjs.Bitmap(queue.getResult('spin-reel'));
    reel3.x = 355;
    reel3.y = 165;
    game.addChild(reel3);


    updateStats();
  
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        winnings += jackpot;

        jackpot = 1000;
    }

    updateStats();
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;

    updateStats();

    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    jackpot += parseInt(playerBet);
    winnings = 0;

    updateStats();

    $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = queue.getResult('blankImage');
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = queue.getResult('grapesImage');
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = queue.getResult('bananaImage');
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = queue.getResult('orangesImage');
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = queue.getResult('cherriesImage');
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = queue.getResult('barsImage');
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = queue.getResult('bellsImage');
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = queue.getResult('sevensImage');
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (blanks == 0)
    {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if(bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else
    {
        lossNumber++;
        showLossMessage();
    }
    
}

/* When the player clicks the spin button the game kicks off */
function gameStart () {
    //playerBet = $("div#betEntry>input").val();
    console.log("You bet " + playerBet);

    if (playerMoney == 0)
    {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        //fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        //$("div#result>p").text(fruits);
        game.removeChild(reel1);
        game.removeChild(reel2);
        game.removeChild(reel3);
        reel1 = new createjs.Bitmap(spinResult[0]);
        reel1.x = 130;
        reel1.y = 165;
        game.addChild(reel1);
        reel2 = new createjs.Bitmap(spinResult[1]);
        reel2.x = 243;
        reel2.y = 165;
        game.addChild(reel2);
        reel3 = new createjs.Bitmap(spinResult[2]);
        reel3.x = 355;
        reel3.y = 165;
        game.addChild(reel3);
        determineWinnings();
        turn++;
        updateStats();
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }
    
};

// Utility function to update reeks and all text on slot machine canvas
function updateStats() {
    game.removeChild(jackpotText);

    jackpotText = new createjs.Text(jackpot, "13px Arial", "White");
    jackpotText.x = 270;
    jackpotText.y = 343;
    game.addChild(jackpotText);

    game.removeChild(winningsText);

    winningsText = new createjs.Text(winnings, "13px Arial", "White");
    winningsText.x = 105;
    winningsText.y = 343;
    game.addChild(winningsText);

    game.removeChild(playerMoneyText);

    playerMoneyText = new createjs.Text(playerMoney, "13px Arial", "White");
    playerMoneyText.x = 462;
    playerMoneyText.y = 343;
    game.addChild(playerMoneyText);

    game.removeChild(winNumberText);

    winNumberText = new createjs.Text(winNumber, "13px Arial", "White");
    winNumberText.x = 493;
    winNumberText.y = 175;
    game.addChild(winNumberText);

    game.removeChild(lossNumberText);

    lossNumberText = new createjs.Text(lossNumber, "13px Arial", "White");
    lossNumberText.x = 493;
    lossNumberText.y = 229;
    game.addChild(lossNumberText);

    game.removeChild(turnText);

    turnText = new createjs.Text(turn, "13px Arial", "White");
    turnText.x = 73;
    turnText.y = 175;
    game.addChild(turnText);

    game.removeChild(winRatioText);

    if (turn == 0 || winRatio == 0) {
        winRatioText = new createjs.Text("0.00%", "13px Arial", "White");
        winRatioText.x = 479;
        winRatioText.y = 280;
        game.addChild(winRatioText);
    }
    else {
        winRatio = winNumber / turn;
        winRatioText = new createjs.Text((winRatio * 100).toFixed(2) + "%", "13px Arial", "White");
        winRatioText.x = 479;
        winRatioText.y = 280;
        game.addChild(winRatioText);
    };

    stage.addChild(game);

};

function placeBetButtons() {
    bet5Red = new createjs.Bitmap(queue.getResult('bet5RedImage'));
    bet5Red.x = 59;
    bet5Red.y = 395;
    game.addChild(bet5Red);
    bet5Blue = new createjs.Bitmap(queue.getResult('bet5BlueImage'));
    bet5Blue.x = 59;
    bet5Blue.y = 395;
    game.addChild(bet5Blue);
    bet5Blue.visible = false;
    bet5Red.addEventListener("click", function (event) {
        if (!betPlaced) {
            betPlaced = true;
            bet5Red.visible = false;
            bet5Blue.visible = true;
            playerBet = 5;
        };
    });
    bet5Blue.addEventListener("click", function (event) {
        betPlaced = false;
        bet5Red.visible = true;
        bet5Blue.visible = false;
        playerBet = 0;
    });

    bet10Red = new createjs.Bitmap(queue.getResult('bet10RedImage'));
    bet10Red.x = 129;
    bet10Red.y = 395;
    game.addChild(bet10Red);
    bet10Blue = new createjs.Bitmap(queue.getResult('bet10BlueImage'));
    bet10Blue.x = 129;
    bet10Blue.y = 395;
    game.addChild(bet10Blue);
    bet10Blue.visible = false;
    bet10Red.addEventListener("click", function (event) {
        if (!betPlaced) {
            betPlaced = true;
            bet10Red.visible = false;
            bet10Blue.visible = true;
            playerBet = 10;
        };
    });
    bet10Blue.addEventListener("click", function (event) {
        betPlaced = false;
        bet10Blue.visible = false;
        bet10Red.visible = true;
        playerBet = 0;
    });

    bet20Red = new createjs.Bitmap(queue.getResult('bet20RedImage'));
    bet20Red.x = 199;
    bet20Red.y = 395;
    game.addChild(bet20Red);
    bet20Blue = new createjs.Bitmap(queue.getResult('bet20BlueImage'));
    bet20Blue.x = 199;
    bet20Blue.y = 395;
    game.addChild(bet20Blue);
    bet20Blue.visible = false;
    bet20Red.addEventListener("click", function (event) {
        if (!betPlaced) {
            betPlaced = true;
            bet20Red.visible = false;
            bet20Blue.visible = true;
            playerBet = 20;
        };
    });
    bet20Blue.addEventListener("click", function (event) {
        betPlaced = false;
        bet20Blue.visible = false;
        bet20Red.visible = true;
        playerBet = 0;
    });

    bet50Red = new createjs.Bitmap(queue.getResult('bet50RedImage'));
    bet50Red.x = 269;
    bet50Red.y = 395;
    game.addChild(bet50Red);
    bet50Blue = new createjs.Bitmap(queue.getResult('bet50BlueImage'));
    bet50Blue.x = 269;
    bet50Blue.y = 395;
    game.addChild(bet50Blue);
    bet50Blue.visible = false;
    bet50Red.addEventListener("click", function (event) {
        if (!betPlaced) {
            betPlaced = true;
            bet50Red.visible = false;
            bet50Blue.visible = true;
            playerBet = 50;
        };
    });
    bet50Blue.addEventListener("click", function (event) {
        betPlaced = false;
        bet50Blue.visible = false;
        bet50Red.visible = true;
        playerBet = 0;
    });

    bet100Red = new createjs.Bitmap(queue.getResult('bet100RedImage'));
    bet100Red.x = 59;
    bet100Red.y = 435;
    game.addChild(bet100Red);
    bet100Blue = new createjs.Bitmap(queue.getResult('bet100BlueImage'));
    bet100Blue.x = 59;
    bet100Blue.y = 435;
    game.addChild(bet100Blue);
    bet100Blue.visible = false;
    bet100Red.addEventListener("click", function (event) {
        if (!betPlaced) {
            betPlaced = true;
            bet100Red.visible = false;
            bet100Blue.visible = true;
            playerBet = 100;
        };
    });
    bet100Blue.addEventListener("click", function (event) {
        betPlaced = false;
        bet100Blue.visible = false;
        bet100Red.visible = true;
        playerBet = 0;
    });

    bet200Red = new createjs.Bitmap(queue.getResult('bet200RedImage'));
    bet200Red.x = 129;
    bet200Red.y = 435;
    game.addChild(bet200Red);
    bet200Blue = new createjs.Bitmap(queue.getResult('bet200BlueImage'));
    bet200Blue.x = 129;
    bet200Blue.y = 435;
    game.addChild(bet200Blue);
    bet200Blue.visible = false;
    bet200Red.addEventListener("click", function (event) {
        if (!betPlaced) {
            betPlaced = true;
            bet200Red.visible = false;
            bet200Blue.visible = true;
            playerBet = 200;
        };
    });
    bet200Blue.addEventListener("click", function (event) {
        betPlaced = false;
        bet200Blue.visible = false;
        bet200Red.visible = true;
        playerBet = 0;
    });

    bet500Red = new createjs.Bitmap(queue.getResult('bet500RedImage'));
    bet500Red.x = 199;
    bet500Red.y = 435;
    game.addChild(bet500Red);
    bet500Blue = new createjs.Bitmap(queue.getResult('bet500BlueImage'));
    bet500Blue.x = 199;
    bet500Blue.y = 435;
    game.addChild(bet500Blue);
    bet500Blue.visible = false;
    bet500Red.addEventListener("click", function (event) {
        if (!betPlaced) {
            betPlaced = true;
            bet500Red.visible = false;
            bet500Blue.visible = true;
            playerBet = 500;
        };
    });
    bet500Blue.addEventListener("click", function (event) {
        betPlaced = false;
        bet500Blue.visible = false;
        bet500Red.visible = true;
        playerBet = 0;
    });

    bet1000Red = new createjs.Bitmap(queue.getResult('bet1000RedImage'));
    bet1000Red.x = 269;
    bet1000Red.y = 435;
    game.addChild(bet1000Red);
    bet1000Blue = new createjs.Bitmap(queue.getResult('bet1000BlueImage'));
    bet1000Blue.x = 269;
    bet1000Blue.y = 435;
    game.addChild(bet1000Blue);
    bet1000Blue.visible = false;
    bet1000Red.addEventListener("click", function (event) {
        if (!betPlaced) {
            betPlaced = true;
            bet1000Red.visible = false;
            bet1000Blue.visible = true;
            playerBet = 1000;
        };
    });
    bet1000Blue.addEventListener("click", function (event) {
        betPlaced = false;
        bet1000Blue.visible = false;
        bet1000Red.visible = true;
        playerBet = 0;
    });
};

function init() {
    //alert("Game Loaded");
    stage = new createjs.Stage(document.getElementById("mainCanvas"));
    stage.enableMouseOver(20);
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    drawSlotMachine();
};

function handleTick() {
    stage.update();
};

function handleLoad() {

};


function drawSlotMachine() {
    game = new createjs.Container();
    slotMachineImage = new createjs.Bitmap(queue.getResult('slotMachineImage'));
    game.addChild(slotMachineImage);

    spinButton = new createjs.Bitmap(queue.getResult('spinButtonImage'));
    spinButtonHover = new createjs.Bitmap(queue.getResult('spinHoverButtonImage'));
    spinButton.x = 430;
    spinButton.y = 390;
    spinButtonHover.x = 430;
    spinButtonHover.y = 390;
    spinButtonHover.visible = false;
    spinButton.addEventListener("mouseover", function (event) {
        spinButton.visible = false;
        spinButtonHover.visible = true;
        if (!betPlaced) {
            spinButtonHover.alpha = 0.5;
        } else {
            spinButtonHover.alpha = 1.0;
        };
    });
    spinButtonHover.addEventListener("mouseout", function (event) {
        spinButton.visible = true;
        spinButtonHover.visible = false;
    });
    spinButtonHover.addEventListener("click", function (event) {
        if (betPlaced) {
            gameStart();
        } else {
            alert("Please place a bet before you click spin!");
        };
    })
    game.addChild(spinButton);
    game.addChild(spinButtonHover);

    resetButton = new createjs.Bitmap(queue.getResult('reset_button_red'));
    resetButtonHover = new createjs.Bitmap(queue.getResult('reset_button_blue'));
    resetButton.x = 332;
    resetButton.y = 390;
    resetButtonHover.x = 332;
    resetButtonHover.y = 390;
    resetButtonHover.visible = false;
    resetButton.addEventListener("mouseover", function (event) {
        resetButton.visible = false;
        resetButtonHover.visible = true;
    });
    resetButtonHover.addEventListener("mouseout", function (event) {
        resetButtonHover.visible = false;
        resetButton.visible = true;
    });
    resetButtonHover.addEventListener("click", function (event) {
        if (confirm("Are you sure you would like to reset the game?")) {
            resetAll();
            showPlayerStats();
        };
    });
    game.addChild(resetButton);
    game.addChild(resetButtonHover);

    exitButton = new createjs.Bitmap(queue.getResult('exit'));
    exitButton.x = 574;
    exitButton.y = 10;
    exitButton.addEventListener("click", function (event) {
        if (confirm("Are you sure you would like to leave the game?")) {
            window.location.replace("http://www.blakemurdock.ca");
        };
    });
    game.addChild(exitButton);

    reel1 = new createjs.Bitmap(queue.getResult('spin-reel'));
    reel1.x = 130;
    reel1.y = 165;
    game.addChild(reel1);
    reel2 = new createjs.Bitmap(queue.getResult('spin-reel'));
    reel2.x = 243;
    reel2.y = 165;
    game.addChild(reel2);
    reel3 = new createjs.Bitmap(queue.getResult('spin-reel'));
    reel3.x = 355;
    reel3.y = 165;
    game.addChild(reel3);

    placeBetButtons();

    jackpotText = new createjs.Text(jackpot, "13px Arial", "White");
    jackpotText.x = 270;
    jackpotText.y = 343;
    game.addChild(jackpotText);

    winningsText = new createjs.Text(winnings, "13px Arial", "White");
    winningsText.x = 105;
    winningsText.y = 343;
    game.addChild(winningsText);

    playerMoneyText = new createjs.Text(playerMoney, "13px Arial", "White");
    playerMoneyText.x = 462;
    playerMoneyText.y = 343;
    game.addChild(playerMoneyText);

    winNumberText = new createjs.Text(winNumber, "13px Arial", "White");
    winNumberText.x = 493;
    winNumberText.y = 175;
    game.addChild(winNumberText);

    lossNumberText = new createjs.Text(lossNumber, "13px Arial", "White");
    lossNumberText.x = 493;
    lossNumberText.y = 229;
    game.addChild(lossNumberText);

    turnText = new createjs.Text(turn, "13px Arial", "White");
    turnText.x = 73;
    turnText.y = 175;
    game.addChild(turnText);

    winRatioText = new createjs.Text(winRatio + "%", "13px Arial", "White");
    winRatioText.x = 487;
    winRatioText.y = 280;
    game.addChild(winRatioText);



    stage.addChild(game);
}