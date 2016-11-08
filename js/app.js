'use strict';  //UPDATE - Added 'use strict'; tag
// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/taxi.png';

    /*this.x = x;
     this.y = y;
     this.speed = speed;*/

    this.x = 0;
    this.y = 62 + (85.5 * (Math.floor(Math.random() * 3)));
    this.speed = (Math.random() * 200) + 100; //between 100 ad 200
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //loop
    if (this.x >= 505) {
        this.x = 0;
        this.y = 62 + (85.5 * (Math.floor(Math.random() * 3)));
        this.speed = 100 + (Math.random() * 200) + 100; //between 100 ad 300
    } else {
        this.x += dt * this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (URL, x, y) {
    this.sprite = URL || ''; //URL of the image

    this.x = x || 202;
    this.y = y || 404;
    this.score = 0;
};

Player.prototype.update = function () {
    /*If player has reach the water, reset his location to the origin and
     *increment runs completed counter by one
     */
    if (this.y <= 0) {
        this.score += 1;
        this.y = 404;
        bonus = new Bonus();
        //increaseDifficulty(score);
    }

    //Prevent the player from moving outside of the gride
    if (this.x <= 0) {
        this.x = 0;
    }
    if (this.x >= 405) {
        this.x = 405;
    }
    if (this.y >= 405) { //doesn't scroll the browser
        this.y = 405;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    var direction = {
        'left': [-101, 0],
        'up': [0, -85.5],
        'right': [101, 0],
        'down': [0, 85.5],
        'enter': [0, 0]
    };

    this.x += direction[key][0];
    this.y += direction[key][1];
};


var Bonus = function () {
    var sprites = [
        'images/char-pink-girl.png',
        'images/char-boy.png',
        'images/char-horn-girl.png',
        'images/char-princess-girl.png'
    ];

    this.value = Math.floor((Math.random() * 3) + 1); //number between 1 and 3
    this.sprite = sprites[this.value];
    this.multiplier = 5 * (this.value + 1);


    this.x = 0 + (101 * Math.floor(Math.random() * 5));
    this.y = 62 + (85.5 * (Math.floor(Math.random() * 3)));

};

Bonus.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Selector = function () {
    this.sprite = 'images/Selector.png';

    this.x = 101;
    this.y = 303;
};

Selector.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Selector.prototype.update = function () {
    if (this.x <= 0) {
        this.x = 0;
    }
    if (this.x >= 404) {
        this.x = 404;
    }
    if (this.y >= 404) {
        this.y = 404;
    }
};

Selector.prototype.handleInput = function (key) {
    var direction = {
        'left': [-101, 0],
        'up': [0, 0],
        'right': [101, 0],
        'down': [0, 0],
        'enter': [0, 0]
    };

    this.x += direction[key][0];
};

//Doesn't work :(

/*var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy = new Enemy();
allEnemies.push(enemy);
var selector = new Selector();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    selector.handleInput(allowedKeys[e.keyCode]);
});