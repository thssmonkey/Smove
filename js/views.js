Smove.init = function() {
    cav = document.getElementById('scene');
    cav.addEventListener("click", Smove.onclick, false);
    // add touch start end listener
    cav.addEventListener("touchstart", Smove.touchStart, false);
    cav.addEventListener("touchend", Smove.touchEnd, false);

    mCanvas.init();
    board.init();
    whiteBall.init();
    square.init();
    blackBall.init();
}

Smove.draw = function() {
    cav = document.getElementById('scene');
    ctx = cav.getContext('2d');
    ctx.clearRect(0, 0, mCanvas.width, mCanvas.height);
    mCanvas.update_level();
    mCanvas.draw();
    board.draw();
}

Smove.update = function() {
    if (mCanvas.level_times <= 0) {
        whiteBall.detectBlackballCollision();
        whiteBall.draw();
        square.draw();
        whiteBall.detectSquareCollision();
        if (Smove.times <= 0) {
            blackBall.move();
        }
    }
}
