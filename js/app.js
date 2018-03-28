var baseObj = function(x, y, img) {
    this.sprite = img;
    this.x = x;
    this.y = y;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var Enemy = function(x, y) {
    baseObj.call(this, x, y, 'images/enemy-bug.png');
    this.constructor = Enemy;

    this.speedMod = getRandomInt(1,4);

    var ts = Math.round((new Date()).getTime() / 1000);
    this.friend = ts + getRandomInt(1,5);
};


Enemy.prototype.update = function(dt) {
    this.x += (90*dt)+this.speedMod;

    var ts = Math.round((new Date()).getTime() / 1000);
    if(this.friend === ts) {
        var randy = getRandomInt(0,3);
        var randx = getRandomInt(1,2) * -100;

        allEnemies[index] = new Enemy(randx,validRows[randy]);
        index++;
        this.friend = 0;
    }

    if(index === 14) {
        index = 0;
    }

};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
    baseObj.call(this, 200, 400, 'images/char-boy.png');
    this.constructor = Player;

    this.moveX = 0;
    this.moveY = 0;

    this.speed = 5;
}

Player.prototype.handleInput = function(key) {
    if(this.moveX !== 0 || this.moveY !== 0) {
        return;
    }

    if(this.x>300 && key === 'right') {
        return;
    }
    if(this.x<100 && key === 'left') {
        return;
    }
    if(this.y<100 && key === 'up') {
        return;
    }
    if(this.y>359 && key === 'down') {
        return;
    }

    if(key === 'up') {
        this.moveY -= 85;
    }
    if(key === 'down') {
        this.moveY += 85;
    }
    if(key === 'left') {
        this.moveX -= 100;
    }
    if(key === 'right') {
        this.moveX += 100;
    }
};

Player.prototype.update = function(dt) {
    if(this.moveX > 0) {
        this.x += this.speed;
        this.moveX -= this.speed;
    }
    if(this.moveX < 0) {
        this.x -= this.speed;
        this.moveX += this.speed;
    }
    if(this.moveY > 0) {
        this.y += this.speed;
        this.moveY -= this.speed;
    }
    if(this.moveY < 0) {
        this.y -= this.speed;
        this.moveY += this.speed;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    e.preventDefault();
    return false;
});


var player = new Player();

var allEnemies = [];

var index = 2;

var validRows = [60,145,230];

allEnemies[0] = new Enemy(-100,validRows[0]);
allEnemies[1] = new Enemy(-250,validRows[1]);
allEnemies[2] = new Enemy(-400,validRows[2]);
