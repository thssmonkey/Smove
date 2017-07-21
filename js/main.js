(function() {
    window.Smove = {};
    Smove.status = 0;
    Smove.times = 0;
    Smove.startGame = function() {
        Smove.init();
        window.timer = setInterval(function() {
            if (Smove.status == 0) {
                mCanvas.startGui();
            }
            if (Smove.status == 1) {
                Smove.draw();
                Smove.update();
            }
            if (Smove.status == -1) {
                mCanvas.endGui();
            }
        }, 10);
    }

    Smove.stopGame = function() {
        Smove.status = -1;
        stopKey = true;
        clearInterval(timer);
    }

    var start_x, start_y;
    // touch start listener
    Smove.touchStart = function(event) {
        if (event.cancelable) {
            if (!event.defaultPrevented)
                event.preventDefault();
        }
        //if (!event.touches.length) return;
        if (Smove.status == 0) {
            Smove.status = 1;
        }
        if (Smove.status == -1) {
            Smove.status = 1;
            stopKey = false;
            Smove.startGame();
        }
        var touch = event.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
    }

    // touch end listener
    Smove.touchEnd = function(event) {
        if (event.cancelable) {
            if (!event.defaultPrevented)
                event.preventDefault();
        }
        var touch = event.changedTouches[0];
        var degree_x = touch.pageX - startX;
        var degree_y = touch.pageY - startY;
        if (Math.abs(degree_x) >= Math.abs(degree_y)) {
            if (degree_x > 20) {
                whiteBall.direction.x = 1;
                whiteBall.direction.y = 0;
            }
            else if (degree_x < -20){
                whiteBall.direction.x = -1;
                whiteBall.direction.y = 0;
            }
        }
        else {
            if (degree_y > 20) {
                whiteBall.direction.x = 0;
                whiteBall.direction.y = 1;
            }
            else if (degree_y < -20) {
                whiteBall.direction.x = 0;
                whiteBall.direction.y = -1;
            }
        }
    }

    // 鼠标点击事件
    Smove.onclick = function() {
        // 开始游戏
        if (Smove.status == 0) {
            Smove.status = 1;

        }
        // 结束重新开始
        if (Smove.status == -1) {
            Smove.status = 1;
            stopKey = false;
            Smove.startGame();
        }
    }

    // 键盘事件
    keyEvent = function() {
        var key;
        if (window.event) {
            key = event.keyCode;
        }
        else if (event.which) {
            key = event.which;
        }
        var keyChar = String.fromCharCode(key);
        //alert(keyChar);
        if (!stopKey) {
            switch (keyChar) {
                case "&":
                    whiteBall.direction.x = 0;
                    whiteBall.direction.y = -1;
                    break;
                case "(":
                    whiteBall.direction.x = 0;
                    whiteBall.direction.y = 1;
                    break;
                case "%":
                    whiteBall.direction.x = -1;
                    whiteBall.direction.y = 0;
                    break;
                case "'":
                    whiteBall.direction.x = 1;
                    whiteBall.direction.y = 0;
                    break;
            }
        }
        // if (!stopKey) {
        //     Smove.draw();
        //     Smove.update(direction);
        // }
    }
})();
