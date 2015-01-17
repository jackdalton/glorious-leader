// "Glorious Leader" game, created by Jack Dalton.
// No JQuery.
// No third-party libraries.
// Two assets (un.png; obama.png)
function init() { // called on page load
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    scoreLoop();
    gameloop();
    detectHits();
}
var c, ctx, unX = [], unY = [],
    then = Date.now(),
    lost = false,
    score = 0;
var obama = {
    x:240,
    y:460,
    render:function() {
        ctx.drawImage(obamaImage, this.x, this.y, 25, 33);
    }
};
var un = {
    render:function() {
        for (var i = 0; i < unX.length; i++) {
            ctx.drawImage(unImage, unX[i], unY[i], 25, 29.619565217);
        }
    },
    generate:function() {
        unX.push(rand(40, 460));
        unY.push(rand(0, -10));
    },
    drop:function() {
        for (var i = 0; i < unY.length; i++) {
            unY[i] += 2;
        }
    }
};
function detectHits() {
    for (var i = 0; i < unX.length; i++) {
        if (
            obama.x <= (unX[i] + 25) &&
            unX[i] <= (obama.x + 25) &&
            obama.y <= (unY[i] + 29.619565217) &&
            unY[i] <= (obama.y + 33)
        ) {
            lost = true;
        }
    }
    window.requestAnimationFrame(detectHits);
}
function scoreLoop() {
    if (!lost) {
        score++;
        setTimeout(scoreLoop, 100);
    }
}
function gameloop() {
    c.width = c.width;
    if (!lost) {
        un.render();
        obama.render();
        if (chance5()) {
            un.generate();
        }
        un.drop();
        var now = Date.now();
        var delta = now - then;
        move(delta / 1000);
        then = now;
        ctx.fillStyle = "red";
        ctx.fillText("Score:" + score, 10, 10);
    }
    else {
        lose();
    }
    window.requestAnimationFrame(gameloop);
}
function lose() {
    document.getElementById("lostmessage").style.opacity = 1;
    document.getElementById("lostmessagetext").innerHTML = "Game Over!<br>Score:" + score + ".";
}
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function removeItem(array, item) {
    var e = array.indexOf(item);
    if (e > -1) {
        array.splice(e, 1);
    }
}
var move = function(m) { // movement function
    if (37 in keysDown && obama.x > 10) { // if left arrow key pressed, move left
        obama.x -= 180 * m;
    }
    if (39 in keysDown && obama.x < 485) { // if right arrow key pressed, move right
        obama.x += 180 * m;
    }
};
function chance50() {
    if (rand(1,2) == 1) {
        return true;
    }
    else {
        return false;
    }
}
function chance5() {
    if (rand(1,20) == 1) {
        return true;
    }
    else {
        return false;
    }
}
var keysDown = {};
addEventListener("keydown", function(e) { // checks for keys down
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) { // checks for keys released
    delete keysDown[e.keyCode];
}, false);
