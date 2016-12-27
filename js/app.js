var step_x = 101;
var step_y = 83;
var player_x = 202;
var player_y = 380;

// Enemies our player must avoid
var Enemy = function(x,y,row) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.start_x = x;
    this.speed = (Math.random()*100) + 100;
    this.sprite = 'images/enemy-bug.png';
    this.row = row;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x<ctx.canvas.width){
        this.x += (this.speed*dt);
    }
    else
    {
        this.x = this.start_x;
        this.speed = (Math.random()*100)+100;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var Player = function()
{
    this.x = player_x;
    this.y = player_y;
    this.row = 1;
    this.sprite = 'images/char-boy.png';

};

Player.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
};


Player.prototype.reset = function()
{
    this.x = player_x;
    this.y = player_y;
    this.row = 1;
    ctx.clearRect(0, 0, 300, 65);
};


Player.prototype.handleInput = function(key)
{
    switch(key)
    {
        case 'left':
        {
            if(this.x>=step_x)
            {
                this.x -=step_x;
            }
            break;
        }
        case 'right':
        {
            if((this.x + step_x) < ctx.canvas.width)
            {
                this.x += step_x;
            }
            break;
        }
        case 'down':
        {
            if(this.y < player_y)
            {
                this.y += step_y;
                this.row -= 1;
            }
            break;
        }
        case 'up':
        {
            if(this.row === 6)
            {
                this.reset();
            }
            else
            {
                this.y -= step_y;
                this.row += 1;
            }
            break;
        }
        default:
            console.error("Wrong Move");
    }
};

Player.prototype.update = function(){
    for(var i = 0;i < allEnemies.length; i++){
        if(this.row === allEnemies[i].row){
            if(Math.abs(this.x - allEnemies[i].x) <= 50)
            {
                this.reset(); 
				console.log('1');

            }
        }
    }
};





var player = new Player();
var allEnemies = [new Enemy(-200,50,5),
    new Enemy(-200,133,4),
    new Enemy(-300,216,3)
    ];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
