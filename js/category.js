// 画布
var mCanvas = {
    width: 800,
    height: 800,

    //关卡
    level: 0,
    level_times: 0,
    // 分数
    score: 0,
    best_score: 0,

    grad: '',
    max_grad: 10,
    grad_list0: [],
    grad_list1: [],

    init: function() {
        ctx = document.getElementById('scene').getContext('2d');
        this.level = 0;
        this.score = 0;
        // '#FF3E96', '#4FACFE', '#6495ED', '#E0C3FC', '#FBC2EB', '#43E97B', '#A6C1EE',
        // '#FFD39B', '#00F2FE', '#A020F0', '#8EC5FC', '#A18CD1', '#38F9D7', '#FBC2EB',
        this.grad_list0 = ['#FF3E96', '#4FACFE', '#6495ED', '#E0C3FC', '#FBC2EB', '#43E97B', '#A6C1EE'];
        this.grad_list1 = ['#FFD39B', '#00F2FE', '#A020F0', '#8EC5FC', '#A18CD1', '#38F9D7', '#FBC2EB'];
        this.max_grad = this.grad_list0.length;
        this.grad = ctx.createLinearGradient(0, 0, 0, this.height);
        this.grad.addColorStop(0, this.grad_list0[0]);
        this.grad.addColorStop(1, this.grad_list1[0]);
    },

    startGui: function() {
        ctx.fillStyle = '#7EC0EE';
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.font = '150px Verdana';
        ctx.fillStyle = '#90EE90';
        ctx.globalAlpha = 1;
        ctx.fillText("SMOVE", this.width / 2 - 0.7 * this.width / 2, this.height / 2 - 0.3 * this.height / 2);
        ctx.font = '60px Verdana';
        ctx.fillStyle = '#9AFF9A';
        ctx.fillText("WELCOME", this.width / 2  - 0.4 * this.width / 2, this.height / 2 + 0.1 * this.height / 2);
        ctx.font = '40px Verdana';
        ctx.fillStyle = '#98FB98';
        ctx.fillText("CLICK TO PALY", this.width / 2  - 0.4 * this.width / 2, this.height / 2 + 0.4 * this.height / 2);
        ctx.font = '20px Verdana';
        ctx.fillStyle = '#888888';
        ctx.fillText("<< press ↑ ↓ ← → to control direction >>", this.width / 2  - 0.52 * this.width / 2, this.height / 2 + 0.7 * this.height / 2);

        ctx.font = '5px Verdana';
        ctx.fillStyle = '#98FB98';
        ctx.fillText("© 2017 HJG", this.width  - 0.1 * this.width, this.height - 0.01 * this.height )
    },

    endGui: function() {
        ctx.fillStyle = '#7EC0EE';
        ctx.globalAlpha = 0.6;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fill();
        ctx.font = '70px Verdana';
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 1;
        ctx.fillText("GAME OVER", this.width / 2 - 0.5 * this.width / 2, this.height / 2 - 0.4 * this.height / 2);
        ctx.font = '50px Verdana';
        ctx.fillText("SCORE: " + this.score, this.width / 2  - 0.3 * this.width / 2, this.height / 2 - 0.1 * this.height / 2);
        ctx.fillText(" BEST: " + this.best_score, this.width / 2  - 0.3 * this.width / 2, this.height / 2 + 0.2 * this.height / 2);
        ctx.font = '30px Verdana';
        ctx.fillStyle = '#888888';
        ctx.fillText("CLICK TO RESTART", this.width / 2  - 0.35 * this.width / 2, this.height / 2 + 0.6 * this.height / 2);

        ctx.font = '5px Verdana';
        ctx.fillStyle = '#98FB98';
        ctx.fillText("© 2017 HJG", this.width  - 0.1 * this.width, this.height - 0.01 * this.height )
    },

    update_level: function() {
        if (parseInt(mCanvas.score / 10) > mCanvas.level) {
            Smove.times = 100;
            this.level = parseInt(mCanvas.score / 10);
            this.level_times = 100;

            this.grad = ctx.createLinearGradient(0, 0, 0, this.height);
            this.grad.addColorStop(0, this.grad_list0[parseInt(this.level % this.max_grad)]);
            this.grad.addColorStop(1, this.grad_list1[parseInt(this.level % this.max_grad)]);
            board.update(3 + parseInt(this.level / 2));
            blackBall.update(2 + this.level, 2 + this.level);
            whiteBall.update();
            square.update();
        }
    },

    draw: function() {
        ctx.fillStyle = this.grad;
        ctx.globalAlpha = 1;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.font = '50px Verdana';
        ctx.fillStyle = '#C0FF3E';
        ctx.fillText("Score: " + this.score, 20, 50);
        ctx.font = '5px Verdana';
        ctx.fillStyle = '#98FB98';
        ctx.fillText("© 2017 HJG", this.width  - 0.1 * this.width, this.height - 0.01 * this.height )
        if (this.level_times <= 0) {
            ctx.font = '40px Verdana';
            ctx.fillStyle = '#98FB98';
            ctx.fillText("level " + (this.level + 1), this.width / 2 - 0.15 * this.width / 2, this.height / 2 - 0.6 * this.height / 2);
            Smove.times--;
            Smove.times = (Smove.times < 0) ? 0 : Smove.times;
        }
        this.level_times--;
        this.level_times = (this.level_times < 0) ? 0 : this.level_times;

        if (this.level_times > 0) {
            ctx.fillStyle = '#7EC0EE';
            ctx.globalAlpha = 0.3;
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.font = '150px Verdana';
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#90EE90';
            ctx.fillText("level " + (this.level + 1), this.width / 2 - 0.6 * this.width / 2, this.height / 2 + 0.1 * this.height / 2);
        }
    }
};

// 棋盘
var board =  {
    size: 300,
    radius: 30,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    max_cell: 8,
    // 小格
    cell_num: 3,
    cell_size: 0,
    // 棋盘线
    line_width: 5,
    line_space: 0,

    update: function(num) {
        if (num > this.max_cell) {
            num = this.max_cell;
        }
        this.cell_num = num;
        this.left = (mCanvas.width - this.size) / 2;
        this.right = this.left + this.size;
        this.top = this.left;
        this.bottom = this.left + this.size;
        this.cell_size = this.size / this.cell_num;
        this.line_space = 10 - this.cell_num * 0.3;
    },

    init: function() {
        this.update(3);
    },

    draw: function () {
        var left_top = (mCanvas.width - this.size) / 2;
        ctx.lineWidth = board.line_width;
        ctx.strokeStyle = 'white';
        ctx.globalAlpha = 1;
        // 画外边圆角方形
        ctx.beginPath();
        ctx.moveTo(left_top + this.radius, left_top);
        ctx.lineTo(left_top + this.size - this.radius, left_top);
        ctx.arcTo(left_top + this.size, left_top, left_top + this.size, left_top + this.radius, this.radius);
        ctx.lineTo(left_top + this._size, left_top + this.size - this.radius);
        ctx.arcTo(left_top + this.size, left_top + this.size, left_top + this.size - this.radius, left_top + this.size, this.radius);
        ctx.lineTo(left_top + this.radius, left_top + this.size);
        ctx.arcTo(left_top, left_top + this.size, left_top, left_top + this.size - this.radius, this.radius);
        ctx.lineTo(left_top, left_top + this.radius);
        ctx.arcTo(left_top, left_top, left_top + this.radius, left_top, this.radius);
        // 画内部棋盘格线
        for (var i = 1; i < this.cell_num; i++) {
            ctx.moveTo(left_top + this.line_space, left_top + this.cell_size * i);
            ctx.lineTo(left_top + this.size - this.line_space, left_top + this.cell_size * i);
        }
        for (var i = 1; i < this.cell_num; i++) {
            ctx.moveTo(left_top + this.cell_size * i, left_top + this.line_space);
            ctx.lineTo(left_top + this.cell_size * i, left_top + this.size - this.line_space);
        }
        ctx.closePath();
        ctx.stroke();
    }
}
// 黑球
var blackBall = {
    num: 2,
    current_x: [],
    current_y: [],
    scale: 0.8,
    radius: 0,
    base_spd: 2,
    max_spd: 5,
    speed: [],
    spd_offset: 2,
    born: [],
    total_num: 1,
    max_num: 4,
    dis_offset: 10,

    update: function(ball_num, spd) {
        this.num = 2;
        this.dis_offset = this.radius * 3;

        this.total_num = (ball_num > this.max_num) ? this.max_num : ball_num;

        this.base_spd = (spd > this.max_spd) ? this.max_spd : spd;

        this.spd_offset = (this.base_spd <= 3) ? 1 : 2;

        for (var i = 0; i < this.num * board.cell_num * 2; i++) {
            this.speed[i] = max(2, this.base_spd + this.spd_offset * randomSpeed());
        }

        for (var i = 0; i < this.num * board.cell_num * 2; i++) { //
            this.born[i] = false;
            if (i < board.cell_num) {  // 左边
                this.current_x[i] = -this.radius * 2 - randomOffset();
                this.current_y[i] = board.top + board.cell_size / 2 + board.cell_size * (i % (board.cell_num));
            }
            else if (i < this.num * board.cell_num){   // 右边
                this.current_x[i] = mCanvas.width + this.radius * 2 + randomOffset();
                this.current_y[i] = board.top + board.cell_size / 2 + board.cell_size * (i % (board.cell_num));
            }
            else if (i < board.cell_num * 3) {    // 上边
                this.current_x[i] = board.left + board.cell_size / 2 + board.cell_size * (i % (board.cell_num));
                this.current_y[i] = -this.radius * 2 - randomOffset();
            }
            else {      // 下边
                this.current_x[i] = board.left + board.cell_size / 2 + board.cell_size * (i % (board.cell_num));
                this.current_y[i] = mCanvas.height + this.radius * 2 + randomOffset();
            }
        }
        this.radius = board.cell_size * this.scale / 2;
    },

    init: function() {
        this.update(2, 2);
    },

    draw: function () {
        var all_num = 0;
        for (var i = 0; i < this.num * board.cell_num * 2; i++) {
            if (this.born[i])
                all_num++;
        }
        while (all_num < this.total_num) {
            var pos = randomBall();
            this.born[pos] = true;
            all_num++;
        }

        ctx.fillStyle = 'black';
        ctx.globalAlpha = 1;
        for (var i = 0; i < this.num * board.cell_num * 2; i++) {  //this.num * board.cell_num * 2
            if (this.born[i]) {
                ctx.beginPath();
                ctx.arc(this.current_x[i], this.current_y[i], this.radius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            }
        }
    },

    move: function() {
        for (var i = 0; i < this.num * board.cell_num * 2; i++) { //
            if (this.born[i]) {
                if (i < board.cell_num) {
                    if (this.current_x[i] > mCanvas.width + this.radius) {
                        this.current_x[i] = -this.radius * 2 - randomOffset();
                        this.speed[i] = max(2, this.base_spd + this.spd_offset * randomSpeed());
                        this.born[i] = false;
                    }
                    else {
                        this.current_x[i] += this.speed[i];
                    }
                }
                else if (i < this.num * board.cell_num) {
                    if (this.current_x[i] < -this.radius) {
                        this.current_x[i] = mCanvas.width + this.radius * 2 + randomOffset();
                        this.speed[i] = max(2, this.base_spd + this.spd_offset * randomSpeed());
                        this.born[i] = false;
                    }
                    else {
                        this.current_x[i] -= this.speed[i];
                    }
                }
                else if (i < board.cell_num * 3) {
                    if (this.current_y[i] > mCanvas.height + this.radius) {
                        this.current_y[i] = -this.radius * 2 - randomOffset();
                        this.speed[i] = max(2, this.base_spd + this.spd_offset * randomSpeed());
                        this.born[i] = false;
                    }
                    else {
                        this.current_y[i] += this.speed[i];
                    }
                }
                else {
                    if (this.current_y[i] < -this.radius) {
                        this.current_y[i] = mCanvas.height + this.radius * 2 + randomOffset();
                        this.speed[i] = max(2, this.base_spd + this.spd_offset * randomSpeed());
                        this.born[i] = false;
                    }
                    else {
                        this.current_y[i] -= this.speed[i];
                    }
                }
            }
        }
        this.draw();  // this.num * board.cell_num * 2
    }
}
// 白球
var whiteBall = {
    current_x: 0,
    current_y: 0,
    scale: 0.7,
    radius: 0,
    blackball_collision: false,
    offset: 5,
    elastic_times: 0,
    elastic_dis: 6,
    direction: {'x': 0, 'y': 0},

    update: function() {
        this.elastic_times = 0;
        this.elastic_dis = board.cell_size * 0.06;
        this.direction = {'x': 0, 'y': 0};
        this.current_x = board.left + board.cell_size * 3 / 2;
        this.current_y = board.top + board.cell_size * 3 / 2;
        this.radius = board.cell_size * this.scale / 2;
    },

    init: function() {
        this.update();
    },

    detectSquareCollision: function() {
        // 判断白球与方块是否碰撞
        if (this.current_x + this.radius > square.current_x - square.padding &&
            this.current_x - this.radius < square.current_x + square.padding &&
            this.current_y + this.radius > square.current_y - square.padding &&
            this.current_y - this.radius < square.current_y + square.padding) {
            square.square_collision = true;
            mCanvas.score++;
            mCanvas.best_score = (mCanvas.score > mCanvas.best_score) ? mCanvas.score : mCanvas.best_score;
            ctx.fillStyle = mCanvas.grad;
            ctx.globalAlpha = 1;
            ctx.fillRect(10, 10, 300, 60);
            ctx.font = '50px Verdana';
            ctx.fillStyle = '#C0FF3E';
            ctx.globalAlpha = 1;
            ctx.fillText("Score: " + mCanvas.score, 20, 50);
        }
    },

    detectBlackballCollision: function() {
        // 判断白球与黑球是否碰撞
        for (var i = 0; i < blackBall.num * board.cell_num * 2; i++) { //this.num * board.cell_num * 2
            if (blackBall.born[i] &&
                whiteBall.current_x + whiteBall.radius - this.offset > blackBall.current_x[i] - blackBall.radius&&
                whiteBall.current_x - whiteBall.radius + this.offset < blackBall.current_x[i] + blackBall.radius&&
                whiteBall.current_y + whiteBall.radius - this.offset > blackBall.current_y[i] - blackBall.radius&&
                whiteBall.current_y - whiteBall.radius + this.offset < blackBall.current_y[i] + blackBall.radius){
                Smove.stopGame();
                this.blackball_collision = true;
                ctx.fillStyle = mCanvas.grad;
                ctx.globalAlpha = 1;
                ctx.fillRect(10, 10, 300, 60);
            }
        }
    },

    draw: function() {
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 1;
        if (this.elastic_times <= 0) {
            var ball_x = this.current_x + board.cell_size * this.direction.x;
            var ball_y = this.current_y + board.cell_size * this.direction.y;
            if (ball_x < board.right && ball_x > board.left) {
                this.current_x = ball_x;
            }
            if (ball_y < board.bottom && ball_y > board.top) {
                this.current_y = ball_y;
            }
        }
        if (this.elastic_times <= 0 && (this.direction.x != 0 || this.direction.y != 0)) {
            this.elastic_times = 7;
        }
        this.elastic_times--;
        this.elastic_times = (this.elastic_times < 0) ? 0 : this.elastic_times;
        if (this.elastic_times > 3) {
            if(this.direction.x != 0) {
                this.current_x += this.direction.x * this.elastic_dis;
            }
            else if(this.direction.y != 0) {
                this.current_y += this.direction.y * this.elastic_dis;
            }
        }
        else if(this.elastic_times > 0) {
            if(this.direction.x != 0) {
                this.current_x -= this.direction.x * this.elastic_dis;
            }
            else if(this.direction.y != 0) {
                this.current_y -= this.direction.y * this.elastic_dis;
            }
        }
        ctx.beginPath();
        ctx.arc(this.current_x, this.current_y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        if (this.elastic_times <= 0) {
            this.direction.x = 0;
            this.direction.y = 0;
        }
    }
}
// 方格
var square = {
    current_x: 0,
    current_y: 0,
    angle: 0,
    degree: 0.035,
    scale: 0.5,
    padding: 0,
    square_collision: false,
    start: true,
    times: 0,
    cor: [],
    max_cor: 10,

    update: function() {
        // '#4682B4',
        this.cor = ['#4682B4', 'yellow', '#7FFFD4', '#76EE00', '#4876FF', '#7D26CD', '#000000'];
        this.max_cor = this.cor.length;
        this.current_x = board.left + board.cell_size / 2;
        this.current_y = board.top + board.cell_size / 2;
        this.scale = 0.5;
        this.angle = 0;
        this.padding = board.cell_size * this.scale / 2;
        this.square_collision = false;
        this.start = true;
    },

    init: function() {
        this.update();
    },

    draw: function() {
        // 画方块
        if (this.start) {
            do {
                pos = randomPos();
                this.current_x = board.left + board.cell_size / 2 + board.cell_size * pos[0];
                this.current_y = board.top + board.cell_size / 2 + board.cell_size * pos[1];
            } while (whiteBall.current_x == this.current_x && whiteBall.current_y == this.current_y)
            this.start = false;
        }
        else if (this.square_collision) {
            do {
                pos = randomPos();
                this.current_x = board.left + board.cell_size / 2 + board.cell_size * pos[0];
                this.current_y = board.top + board.cell_size / 2 + board.cell_size * pos[1];
            } while (whiteBall.current_x == this.current_x && whiteBall.current_y == this.current_y)
            this.times = 20;
            this.square_collision = false;
        }
        this.times--;
        this.times = (this.times < 0) ? 0 : this.times;
        if (this.times <= 0) {
            ctx.save();
            ctx.translate(this.current_x, this.current_y);
            ctx.rotate(this.angle);
            this.angle += this.degree;
            ctx.translate(-this.current_x, -this.current_y);

            ctx.fillStyle = this.cor[parseInt(mCanvas.level % this.max_cor)];
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.fillRect(this.current_x - this.padding, this.current_y - this.padding, this.padding * 2, this.padding * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
}
