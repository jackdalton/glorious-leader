// "Glorious Leader" game, created by Jack Dalton.
// No JQuery.
// No third-party libraries.
// Two assets (un.png; obama.png)
function init() { // called on page load
    c = document.getElementById("canvas"); // get canvas
    ctx = c.getContext("2d"); // get context
    // c.addEventListener("mousedown", getPosition, false);
    startMenu();
}
function startGame() { // game starting function
    playing = true;
    scoreLoop();
    gameloop();
    detectHits();
}
var c, ctx, unX = [], unY = [],
    then = Date.now(),
    lost = false,
    score = 0,
    playing = false; // misc vars
var obama = { // main obama var
    x:240,
    y:460,
    render:function() {
        ctx.drawImage(obamaImage, this.x, this.y, 25, 33); // draws image of obama
    }
};
var un = { // main un var
    render:function() {
        for (var i = 0; i < unX.length; i++) {
            ctx.drawImage(unImage, unX[i], unY[i], 25, 29.619565217); // draws image of un
        }
    },
    generate:function() { // generates new instances of un
        unX.push(rand(40, 460));
        unY.push(rand(0, -10));
    },
    drop:function() { // makes un instances fall
        for (var i = 0; i < unY.length; i++) {
            unY[i] += 2;
        }
    }
};
function detectHits() { // detects collisions between obama and un
    for (var i = 0; i < unX.length; i++) {
        if (
            obama.x <= (unX[i] + 25) &&
            unX[i] <= (obama.x + 25) &&
            obama.y <= (unY[i] + 29.619565217) &&
            unY[i] <= (obama.y + 33)
        ) {
            lost = true; // if player touches an instance of un, player loses
        }
    }
    window.requestAnimationFrame(detectHits); // does it all again
}
function scoreLoop() { // main score loop
    if (!lost) { // if player hasn't lost yet, their score increases
        score++;
        setTimeout(scoreLoop, 100); // does it all again every 10th of a second
    }
}
function gameloop() { // main game loop
    c.width = c.width; // clears canvas
    if (!lost) { // if player hasn't lost
        un.render(); // renders un
        obama.render(); // renders obama
        if (chance5()) { // 5% chance of un instance being generated
            un.generate();
        }
        un.drop(); // makes the fat man fall :)
        var now = Date.now(); // time delta stuff *
        var delta = now - then; //*
        move(delta / 1000); // *
        then = now; // *
        ctx.fillStyle = "red"; // sets text color
        ctx.fillText("Score:" + score, 10, 10); // displays score
    }
    else {
        lose();
        startResetButton();
    }
    window.requestAnimationFrame(gameloop); // does it all again
}
function lose() { // displays loss message
    document.getElementById("lostmessage").style.opacity = 1;
    document.getElementById("lostmessagetext").innerHTML = "Game Over!<br>Score:" + score + ".";
}
function rand(min, max) { //  random number generator
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function removeItem(array, item) { // removes item from given array
    var e = array.indexOf(item);
    if (e > -1) {
        array.splice(e, 1);
    }
}
var move = function(m) { // movement function
    if (37 in keysDown && obama.x > 10) { // if left arrow key pressed, move left
        obama.x -= 180 * m; // obama movement
    }
    if (39 in keysDown && obama.x < 485) { // if right arrow key pressed, move right
        obama.x += 180 * m; // obama movement
    }
};
function chance50() { // 50 percent chance
    if (rand(1,2) == 1) {
        return true;
    }
    else {
        return false;
    }
}
function chance5() { // 5 percent chance
    if (rand(1,20) == 1) {
        return true;
    }
    else {
        return false;
    }
}
var keysDown = {}; // keys pressed
addEventListener("keydown", function(e) { // checks for keys down
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) { // checks for keys released
    delete keysDown[e.keyCode];
}, false);
/*function getPosition(event) {
    var x = event.x;
    var y = event.y;
    x -= c.offsetLeft;
    y -= c.offsetTop;
    buttonCheck(x,y);
}
function buttonCheck(x,y) {
    if (
        x >= 300 &&
        y >= 125 &&
        y <= 335 &&
        x <= 475
    ) {
        startGame();
    }
}*/
window.onkeypress = checkKey;
function checkKey(e) {
    if (e.keyCode == 32 && playing === false) {
        startGame();
    }
    if (e.keyCode == 32 && lost === true) {
        window.location.assign(window.location);
    }
}
function startMenu() { // starts game menu
    c.width = c.width; // clears canvas
    ctx.font = "normal 32px Verdana"; // sets up menu *
    ctx.strokeRect(100, 30, 300, 100); // *
    ctx.strokeStyle = "red"; // *
    ctx.strokeText("Glorious Leader", 130, 90); // *
    ctx.strokeStyle = "black"; // *
    ctx.strokeRect(125, 300, 250, 75); // *
    ctx.strokeText("Space to play.", 145, 350); // **
    if (!playing) { // if play button has not been pressed, rerender menu
        window.requestAnimationFrame(startMenu);
    }
}
function startResetButton() { // sets up reset button
    ctx.strokeRect(125, 300, 250, 75);
    ctx.font = "normal 32px Verdana";
    ctx.strokeText("Space to reset.", 165, 350);
}
