class Game {
	constructor() {
		this.hour = 0;
		this.minute = 0;
		this.second = 0;
		this.time = 0;
		this.level = 1;
		this.score = 0;
	}
	init() {
		this.hour = 0;
		this.minute = 0;
		this.second = 0;

		const timer = document.getElementById('timer');
		timer.innerHTML = '00:00:00';
		game.showTime();
		game.level = 1;
		game.showLevel();
		game.score = 0;
		game.showScore();
	}
	showTime() {
		this.time = setInterval(this.getTime, 1000);		
	}

	getTime() {
		const timer = document.getElementById('timer');	

		if ((game.second < 10)&&(game.minute < 10)&&(game.hour < 10)) {
			timer.innerHTML = `0${game.hour}:0${game.minute}:0${game.second}`;
		}
		else if ((game.hour < 10)&&(game.minute < 10)) {
			timer.innerHTML = `0${game.hour}:0${game.minute}:${game.second}`;
		}
		else if ((game.hour < 10)&&(game.second < 10)) {
			timer.innerHTML = `0${game.hour}:${game.minute}:0${game.second}`;
		}
		else if ((game.minute < 10)&&(game.second < 10)) {
			timer.innerHTML = `${game.hour}:0${game.minute}:0${game.second}`;
		}
		else if (game.hour < 10) {
			timer.innerHTML = `0${game.hour}:${game.minute}:${game.second}`;
		}
		else if (game.minute < 10) {
			timer.innerHTML = `${game.hour}:0${game.minute}:${game.second}`;
		}
		else if (game.second < 10) {
			timer.innerHTML = `${game.hour}:${game.minute}:0${game.second}`;
		}
		else {
			timer.innerHTML = `${game.hour}:${game.minute}:${game.second}`;
		}

		game.second++;

		if (game.second === 60) {
			game.minute += 1;
			game.second = 0;
		}
		else if (game.minute === 60) {
			game.hour += 1;
			game.minute = 0;
		}

	}
	showLevel() {
		const levelCounter = document.getElementById('level');
		levelCounter.innerHTML = `${this.level}`;
	}
	addLevel() {
		this.level++;
		this.showLevel();

		for (const enemy of allEnemies) {
			enemy.updateSpeed();
		}

		allGems.forEach(function(gem) {
			allGems = [];
			allGems.push(orangeGem, greenGem1, greenGem2, greenGem3, blueGem1, blueGem2, blueGem3, blueGem4, blueGem5);
			gem.x = posX[Math.floor(Math.random() * posX.length)];
			gem.y = posY[Math.floor(Math.random() * posY.length)];
		});
	}
	showScore() {
		const scoreCounter = document.getElementById('score');
		scoreCounter.innerHTML = `${this.score}`;
	}
	addScore() {
		this.score +=100;
		this.showScore();
	}
	startAgain() {
		player.x = 522;
		player.y = 550;
		this.addLevel();
		this.addScore();

		allGems = [];
		allGems.push(orangeGem, greenGem1, greenGem2, greenGem3, blueGem1, blueGem2, blueGem3, blueGem4, blueGem5);
		for (const gem of allGems) {
			gem.x = posX[Math.floor(Math.random() * posX.length)];
			gem.y = posY[Math.floor(Math.random() * posY.length)];
		}

		if (game.level % 3 === 0) {
			live.visible = true;
			live.x = posX[Math.floor(Math.random() * posX.length)];
		}
	}
	reset() {
		const lives = document.getElementById('lives');
		lives.lastElementChild.remove();

		if (lives.lastElementChild === null) {
			this.gameOver();
		}

		player.x=522;
		player.y=550;
	}
	gameOver() {
		modal.init();
		modal.gameOverModal();
		modal.show();	
	}

}

let game = new Game();

class Player {
	constructor() {
		this.name = name;
		this.x = 522;
		this.y = 550;
		this.sprite = 'img/char-boy.png';
		this.width = 67;
		this.height = 88;
	}
	update(dt) {
		const boy = document.getElementById('boy');
		const cat = document.getElementById('cat-girl');
		const horn = document.getElementById('horn-girl');
		const pink = document.getElementById('pink-girl');
		const princess = document.getElementById('princess-girl');

		boy.addEventListener('click', () => {
			this.sprite = 'img/char-boy.png';
		});

		cat.addEventListener('click', () => {
			this.sprite = 'img/char-cat-girl.png';
		});

		horn.addEventListener('click', () => {
			this.sprite = 'img/char-horn-girl.png';
		});

		pink.addEventListener('click', () => {
			this.sprite = 'img/char-pink-girl.png';
		});

		princess.addEventListener('click', () => {
			this.sprite = 'img/char-princess-girl.png';
		});	

		// this.checkCollisions();

	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	handleInput(key) {
		switch (key) {
		case 'left': {

			(this.x > 17) ? this.x -= 101 : this.x;

			for (const rock of allRocks) {
				if (((this.x < rock.x + rock.width)&&(this.x + this.width > rock.x)&&(this.y < rock.y + rock.height)&&(this.height + this.y > rock.y))) {
					this.x += 101;
				}
			}

			break;
		}
		case 'up': {

			(this.y >= 166) ? this.y -= 83 : game.startAgain();

			for (const rock of allRocks) {
				if (((this.x < rock.x + rock.width)&&(this.x + this.width > rock.x)&&(this.y < rock.y + rock.height)&&(this.height + this.y > rock.y))) {
					this.y += 83;
				}
			}

			break;
		}
		case 'right': {

			(this.x < 1010) ? this.x += 101 : this.x;		
			
			for (const rock of allRocks) {
				if (((this.x < rock.x + rock.width)&&(this.x + this.width > rock.x)&&(this.y < rock.y + rock.height)&&(this.height + this.y > rock.y))) {
					this.x -= 101;
				}
			}

			break;
		}
		case 'down': {

			(this.y < 483) ? this.y += 83 : this.y;

			for (const rock of allRocks) {
				if (((this.x < rock.x + rock.width)&&(this.x + this.width > rock.x)&&(this.y < rock.y + rock.height)&&(this.height + this.y > rock.y))) {
					this.y -= 83;
				}
			}

			break;			
		}
		}
	}

}

// Place the player object in a variable called player

const player = new Player();

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

const posX = [24, 125, 226, 327, 428, 529, 630, 731, 832, 933, 1034];
const posY = [146, 229, 312, 395];

class Gems {
	constructor(sprite, color, score) {
		this.x = posX[Math.floor(Math.random() * posX.length)];
		this.y = posY[Math.floor(Math.random() * posY.length)];
		this.width = 54;
		this.height = 60;
		this.sprite = sprite;
		this.color = color;
		this.score = score;
		this.collected = false;
	}
	update() {
		this.checkCollisions();
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	checkCollisions() {
		if ((player.x < this.x + this.width)&&(player.x + player.width > this.x)&&(player.y < this.y + this.height)&&(player.height + player.y > this.y)) {
			this.collected = true;
			this.addGemScore();
			this.removeGem();
		}
	}
	addGemScore() {

		if (orangeGem.collected) {
			game.score += 100;
		}
		else if ((greenGem1.collected)||(greenGem2.collected)||(greenGem3.collected)) {
			game.score += 50;
		}
		else {
			game.score += 25;
		}
		game.showScore();
		this.collected = false;
		
	}
	removeGem() {
		let gemIndex = allGems.indexOf(this);
		allGems.splice(gemIndex, 1);
	}
}

const orangeGem = new Gems('img/orange-gem.png', 'orange', 100);
const greenGem1 = new Gems('img/green-gem.png', 'green', 50);
const greenGem2 = new Gems('img/green-gem.png', 'green', 50);
const greenGem3 = new Gems('img/green-gem.png', 'green', 50);
const blueGem1 = new Gems('img/blue-gem.png', 'blue', 25);
const blueGem2 = new Gems('img/blue-gem.png', 'blue', 25);
const blueGem3 = new Gems('img/blue-gem.png', 'blue', 25);
const blueGem4 = new Gems('img/blue-gem.png', 'blue', 25);
const blueGem5 = new Gems('img/blue-gem.png', 'blue', 25);


let allGems = [orangeGem, greenGem1, greenGem2, greenGem3, blueGem1, blueGem2, blueGem3, blueGem4, blueGem5];

class Enemy {

	constructor(y) {
		this.x = 0;
		this.y = y;
		this.sprite = 'img/enemy-bug.png';
		this.speed = Math.floor(Math.random() * 150) + 50;
		this.width = 99;
		this.height = 77;
	}
	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
		if (this.x <= 1111) {
			this.x += this.speed * dt;
		}
		else {
			this.x = -100;
		}
		this.checkCollisions();
	}
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	updateSpeed() {
		if ((game.level >= 1)&&(game.level <= 5)) {
			this.speed = Math.floor(Math.random() * 150) + 50;
		}
		else if ((game.level >= 6)&&(game.level <= 10)) {
			this.speed = Math.floor(Math.random() * 200) + 50;
		}
		else if ((game.level >= 11)&&(game.level <= 15)) {
			this.speed = Math.floor(Math.random() * 250) + 100;
		}
		else if ((game.level >= 16)&&(game.level <= 20)) {
			this.speed = Math.floor(Math.random() * 300) + 150;
		}
		else if ((game.level >= 21)&&(game.level <= 25)) {
			this.speed = Math.floor(Math.random() * 350) + 200;
		}		
		else if ((game.level >= 26)&&(game.level <= 30)) {
			this.speed = Math.floor(Math.random() * 400) + 250;
		}
		else if ((game.level >= 31)&&(game.level <= 35)) {
			this.speed = Math.floor(Math.random() * 450) + 300;
		}
		else {
			this.speed = Math.floor(Math.random() * 500) + 350;
		}
	}
	checkCollisions() {

		if ((player.x < this.x + this.width)&&(player.x + player.width > this.x)&&(player.y < this.y + this.height)&&(player.height + player.y > this.y)) {
			game.reset();
		}
		
	}

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemy1 = new Enemy(141);
const enemy2 = new Enemy(224);
const enemy3 = new Enemy(307);
const enemy4 = new Enemy(390);
let allEnemies = [enemy1, enemy2, enemy3, enemy4];

const rockX = [11, 112, 213, 314, 415, 516, 617, 718, 819, 920, 1021];
const rockY = [143, 226, 309, 392];

class Rocks {
	constructor() {
		this.x = rockX[Math.floor(Math.random() * rockX.length)];
		this.y = rockY[Math.floor(Math.random() * rockY.length)];
		this.sprite = 'img/rock.png';
		this.width = 80;
		this.height = 65;
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	
}

const rock1 = new Rocks();
const rock2 = new Rocks();
const rock3 = new Rocks();
const allRocks = [rock1, rock2, rock3];

class Live {
	constructor() {
		this.x = posX[Math.floor(Math.random() * posX.length)];
		this.y = posY[Math.floor(Math.random() * posY.length)];
		this.sprite = 'img/heart.png';
		this.width = 59;
		this.height = 60;
		this.visible = true;
	}
	render() {
		if (this.visible) {
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
	}
	update() {
		this.checkCollisions();
	}
	checkCollisions() {

		if ((player.x < this.x + this.width)&&(player.x + player.width > this.x)&&(player.y < this.y + this.height)&&(player.height + player.y > this.y)) {

			this.visible = false;
			this.x = this.x + 1200;
			this.addLive();

		}
		
	}
	addLive() {
		const image = document.createElement('img');
		const container = document.getElementById('lives');
		container.appendChild(image);
		image.setAttribute('src', 'img/heart.png');
		image.setAttribute('alt', 'One Live');
		image.classList.add('heart');

	}
}

const live = new Live();

/* MODALS */

const modal = {

	init() {
		const modalContainer = document.createElement('div');
		document.body.appendChild(modalContainer);
		modalContainer.classList.add('modal-container');
		modalContainer.setAttribute('id', 'modal-container');

		const modalContent = document.createElement('div');
		modalContainer.appendChild(modalContent);
		modalContent.classList.add('modal-content');
		modalContent.setAttribute('id', 'modal-content');

		const span = document.createElement('span');
		modalContent.appendChild(span);
		span.classList.add('close');
		span.setAttribute('id', 'close');
		span.innerHTML = '&times;';

		const header = document.createElement('header');
		modalContent.appendChild(header);
		header.classList.add('modal-header');
		
		const image = document.createElement('img');
		header.appendChild(image);
		image.setAttribute('src', './img/logo-memory.svg');
		image.setAttribute('alt', 'Logo');
		image.classList.add('logo-modal');

		span.addEventListener('click', this.closeModal);
		modalContainer.addEventListener('click', this.closeModal);
	},
	startModal() {
		const container = document.getElementById('modal-content');
		const heading = document.createElement('h1');
		container.appendChild(heading);
		heading.classList.add('modal-heading');
		heading.innerHTML = 'Welcome!';

		const modalBody = document.createElement('p');
		container.appendChild(modalBody);
		modalBody.classList.add('modal-body');
		modalBody.innerHTML = 'Click "Start game" button in order to start game. The purpose of this game is to cross the road and reach water. Collect as many gems as possible and earn extra points. Avoid bugs or you will loose one of three lives';

		const startButton = document.createElement('button');
		container.appendChild(startButton);
		startButton.classList.add('start-button');
		startButton.innerHTML = 'Start Game';

		startButton.addEventListener('click', game.init);
	},
	gameOverModal() {
		const container = document.getElementById('modal-content');
		const heading = document.createElement('h1');
		container.appendChild(heading);
		heading.classList.add('modal-heading');
		heading.innerHTML = 'Game Over!';

		const modalBody = document.createElement('p');
		container.appendChild(modalBody);
		modalBody.classList.add('modal-body');
		modalBody.innerHTML = `Sorry, you lost all lives! You gained ${game.score} points. Would you like to play again?`;

		const endButton = document.createElement('button');
		container.appendChild(endButton);
		endButton.classList.add('start-button');
		endButton.innerHTML = 'Play Again!';

		endButton.addEventListener('click', function() {
			window.location.reload();
		});
	},
	show() {
		const modalContainer = document.getElementById('modal-container');
		modalContainer.classList.add('show');
	},
	closeModal() {
		const modalContainer = document.getElementById('modal-container');
		modalContainer.remove();
	},
	startGame() {
		const modalContainer = document.getElementById('modal-container');
		modalContainer.classList.remove('show');
	}
};

document.addEventListener('DOMContentLoaded', function () {
	modal.init();
	modal.startModal();
	modal.show();	
});

// EVENTS TO OPEN & CLOSE SETTINGS MODAL

const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeButton = document.getElementById('close-button');
const inputDefault = document.getElementById('avatar-container').firstElementChild;
const input = document.querySelectorAll('input');

settingsButton.addEventListener('click', function () {
	
	settingsModal.classList.add('transform');
	inputDefault.focus();
	settingsModal.setAttribute('tabindex', '0');
	selectAvatar();
});

closeButton.addEventListener('click', function () {
	settingsModal.classList.remove('transform');
});

function selectAvatar() {
	if (input.activeElement) {
		player.setCurrentPlayer();
	}
}


