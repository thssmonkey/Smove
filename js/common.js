randomPos = function() {
    var pos = [];
    pos[0] = parseInt(Math.random() * board.cell_num);
    pos[1] = parseInt(Math.random() * board.cell_num);
    return pos;
};

randomBall = function() {
    var tmp = 0;
    do {
        tmp = parseInt(Math.random() * blackBall.num * board.cell_num * 2);
    } while(blackBall.born[tmp] == true)
    return tmp;
};

randomOffset = function() {
    return parseInt(Math.random() * blackBall.dis_offset * 2);
};

randomSpeed = function() {
    var sign = (Math.random() >= 0.5) ? 1 : -1;
    return sign * parseInt(Math.random()  * 2);
};

max = function(num1, num2) {
    num1 = (num1 > blackBall.max_spd) ? blackBall.max_spd : num1;
    num2 = (num2 > blackBall.max_spd) ? blackBall.max_spd : num2;
    return (num1 > num2) ? num1 : num2;
}
