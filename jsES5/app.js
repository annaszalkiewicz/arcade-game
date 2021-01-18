'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game() {
		_classCallCheck(this, Game);

		this.hour = 0;
		this.minute = 0;
		this.second = 0;
		this.time = 0;
		this.level = 1;
		this.score = 0;
	}

	_createClass(Game, [{
		key: 'init',
		value: function init() {
			this.hour = 0;
			this.minute = 0;
			this.second = 0;

			var timer = document.getElementById('timer');
			timer.innerHTML = '00:00:00';
			game.showTime();
			game.level = 1;
			game.showLevel();
			game.score = 0;
			game.showScore();
		}
	}, {
		key: 'showTime',
		value: function showTime() {
			this.time = setInterval(this.getTime, 1000);
		}
	}, {
		key: 'getTime',
		value: function getTime() {
			var timer = document.getElementById('timer');

			if (game.second < 10 && game.minute < 10 && game.hour < 10) {
				timer.innerHTML = '0' + game.hour + ':0' + game.minute + ':0' + game.second;
			} else if (game.hour < 10 && game.minute < 10) {
				timer.innerHTML = '0' + game.hour + ':0' + game.minute + ':' + game.second;
			} else if (game.hour < 10 && game.second < 10) {
				timer.innerHTML = '0' + game.hour + ':' + game.minute + ':0' + game.second;
			} else if (game.minute < 10 && game.second < 10) {
				timer.innerHTML = game.hour + ':0' + game.minute + ':0' + game.second;
			} else if (game.hour < 10) {
				timer.innerHTML = '0' + game.hour + ':' + game.minute + ':' + game.second;
			} else if (game.minute < 10) {
				timer.innerHTML = game.hour + ':0' + game.minute + ':' + game.second;
			} else if (game.second < 10) {
				timer.innerHTML = game.hour + ':' + game.minute + ':0' + game.second;
			} else {
				timer.innerHTML = game.hour + ':' + game.minute + ':' + game.second;
			}

			game.second++;

			if (game.second === 60) {
				game.minute += 1;
				game.second = 0;
			} else if (game.minute === 60) {
				game.hour += 1;
				game.minute = 0;
			}
		}
	}, {
		key: 'showLevel',
		value: function showLevel() {
			var levelCounter = document.getElementById('level');
			levelCounter.innerHTML = '' + this.level;
		}
	}, {
		key: 'addLevel',
		value: function addLevel() {
			this.level++;
			this.showLevel();

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = allEnemies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var enemy = _step.value;

					enemy.updateSpeed();
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			allGems.forEach(function (gem) {
				allGems = [];
				allGems.push(orangeGem, greenGem1, greenGem2, greenGem3, blueGem1, blueGem2, blueGem3, blueGem4, blueGem5);
				gem.x = posX[Math.floor(Math.random() * posX.length)];
				gem.y = posY[Math.floor(Math.random() * posY.length)];
			});
		}
	}, {
		key: 'showScore',
		value: function showScore() {
			var scoreCounter = document.getElementById('score');
			scoreCounter.innerHTML = '' + this.score;
		}
	}, {
		key: 'addScore',
		value: function addScore() {
			this.score += 100;
			this.showScore();
		}
	}, {
		key: 'startAgain',
		value: function startAgain() {
			player.x = 522;
			player.y = 550;
			this.addLevel();
			this.addScore();

			allGems = [];
			allGems.push(orangeGem, greenGem1, greenGem2, greenGem3, blueGem1, blueGem2, blueGem3, blueGem4, blueGem5);
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = allGems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var gem = _step2.value;

					gem.x = posX[Math.floor(Math.random() * posX.length)];
					gem.y = posY[Math.floor(Math.random() * posY.length)];
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			if (game.level % 3 === 0) {
				live.visible = true;
				live.x = posX[Math.floor(Math.random() * posX.length)];
			}
		}
	}, {
		key: 'reset',
		value: function reset() {
			var lives = document.getElementById('lives');
			lives.lastElementChild.remove();

			if (lives.lastElementChild === null) {
				this.gameOver();
			}

			player.x = 522;
			player.y = 550;
		}
	}, {
		key: 'gameOver',
		value: function gameOver() {
			modal.init();
			modal.gameOverModal();
			modal.show();
		}
	}]);

	return Game;
}();

var game = new Game();

var Player = function () {
	function Player() {
		_classCallCheck(this, Player);

		this.name = name;
		this.x = 522;
		this.y = 550;
		this.sprite = 'img/char-boy.png';
		this.width = 67;
		this.height = 88;
	}

	_createClass(Player, [{
		key: 'update',
		value: function update(dt) {
			var _this = this;

			var boy = document.getElementById('boy');
			var cat = document.getElementById('cat-girl');
			var horn = document.getElementById('horn-girl');
			var pink = document.getElementById('pink-girl');
			var princess = document.getElementById('princess-girl');

			boy.addEventListener('click', function () {
				_this.sprite = 'img/char-boy.png';
			});

			cat.addEventListener('click', function () {
				_this.sprite = 'img/char-cat-girl.png';
			});

			horn.addEventListener('click', function () {
				_this.sprite = 'img/char-horn-girl.png';
			});

			pink.addEventListener('click', function () {
				_this.sprite = 'img/char-pink-girl.png';
			});

			princess.addEventListener('click', function () {
				_this.sprite = 'img/char-princess-girl.png';
			});

			// this.checkCollisions();
		}
	}, {
		key: 'render',
		value: function render() {
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
	}, {
		key: 'handleInput',
		value: function handleInput(key) {
			switch (key) {
				case 'left':
					{

						this.x > 17 ? this.x -= 101 : this.x;

						var _iteratorNormalCompletion3 = true;
						var _didIteratorError3 = false;
						var _iteratorError3 = undefined;

						try {
							for (var _iterator3 = allRocks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
								var rock = _step3.value;

								if (this.x < rock.x + rock.width && this.x + this.width > rock.x && this.y < rock.y + rock.height && this.height + this.y > rock.y) {
									this.x += 101;
								}
							}
						} catch (err) {
							_didIteratorError3 = true;
							_iteratorError3 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion3 && _iterator3.return) {
									_iterator3.return();
								}
							} finally {
								if (_didIteratorError3) {
									throw _iteratorError3;
								}
							}
						}

						break;
					}
				case 'up':
					{

						this.y >= 166 ? this.y -= 83 : game.startAgain();

						var _iteratorNormalCompletion4 = true;
						var _didIteratorError4 = false;
						var _iteratorError4 = undefined;

						try {
							for (var _iterator4 = allRocks[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
								var _rock = _step4.value;

								if (this.x < _rock.x + _rock.width && this.x + this.width > _rock.x && this.y < _rock.y + _rock.height && this.height + this.y > _rock.y) {
									this.y += 83;
								}
							}
						} catch (err) {
							_didIteratorError4 = true;
							_iteratorError4 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion4 && _iterator4.return) {
									_iterator4.return();
								}
							} finally {
								if (_didIteratorError4) {
									throw _iteratorError4;
								}
							}
						}

						break;
					}
				case 'right':
					{

						this.x < 1010 ? this.x += 101 : this.x;

						var _iteratorNormalCompletion5 = true;
						var _didIteratorError5 = false;
						var _iteratorError5 = undefined;

						try {
							for (var _iterator5 = allRocks[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
								var _rock2 = _step5.value;

								if (this.x < _rock2.x + _rock2.width && this.x + this.width > _rock2.x && this.y < _rock2.y + _rock2.height && this.height + this.y > _rock2.y) {
									this.x -= 101;
								}
							}
						} catch (err) {
							_didIteratorError5 = true;
							_iteratorError5 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion5 && _iterator5.return) {
									_iterator5.return();
								}
							} finally {
								if (_didIteratorError5) {
									throw _iteratorError5;
								}
							}
						}

						break;
					}
				case 'down':
					{

						this.y < 483 ? this.y += 83 : this.y;

						var _iteratorNormalCompletion6 = true;
						var _didIteratorError6 = false;
						var _iteratorError6 = undefined;

						try {
							for (var _iterator6 = allRocks[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
								var _rock3 = _step6.value;

								if (this.x < _rock3.x + _rock3.width && this.x + this.width > _rock3.x && this.y < _rock3.y + _rock3.height && this.height + this.y > _rock3.y) {
									this.y -= 83;
								}
							}
						} catch (err) {
							_didIteratorError6 = true;
							_iteratorError6 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion6 && _iterator6.return) {
									_iterator6.return();
								}
							} finally {
								if (_didIteratorError6) {
									throw _iteratorError6;
								}
							}
						}

						break;
					}
			}
		}
	}]);

	return Player;
}();

// Place the player object in a variable called player

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

var posX = [24, 125, 226, 327, 428, 529, 630, 731, 832, 933, 1034];
var posY = [146, 229, 312, 395];

var Gems = function () {
	function Gems(sprite, color, score) {
		_classCallCheck(this, Gems);

		this.x = posX[Math.floor(Math.random() * posX.length)];
		this.y = posY[Math.floor(Math.random() * posY.length)];
		this.width = 54;
		this.height = 60;
		this.sprite = sprite;
		this.color = color;
		this.score = score;
		this.collected = false;
	}

	_createClass(Gems, [{
		key: 'update',
		value: function update() {
			this.checkCollisions();
		}
	}, {
		key: 'render',
		value: function render() {
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
	}, {
		key: 'checkCollisions',
		value: function checkCollisions() {
			if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {
				this.collected = true;
				this.addGemScore();
				this.removeGem();
			}
		}
	}, {
		key: 'addGemScore',
		value: function addGemScore() {

			if (orangeGem.collected) {
				game.score += 100;
			} else if (greenGem1.collected || greenGem2.collected || greenGem3.collected) {
				game.score += 50;
			} else {
				game.score += 25;
			}
			game.showScore();
			this.collected = false;
		}
	}, {
		key: 'removeGem',
		value: function removeGem() {
			var gemIndex = allGems.indexOf(this);
			allGems.splice(gemIndex, 1);
		}
	}]);

	return Gems;
}();

var orangeGem = new Gems('img/orange-gem.png', 'orange', 100);
var greenGem1 = new Gems('img/green-gem.png', 'green', 50);
var greenGem2 = new Gems('img/green-gem.png', 'green', 50);
var greenGem3 = new Gems('img/green-gem.png', 'green', 50);
var blueGem1 = new Gems('img/blue-gem.png', 'blue', 25);
var blueGem2 = new Gems('img/blue-gem.png', 'blue', 25);
var blueGem3 = new Gems('img/blue-gem.png', 'blue', 25);
var blueGem4 = new Gems('img/blue-gem.png', 'blue', 25);
var blueGem5 = new Gems('img/blue-gem.png', 'blue', 25);

var allGems = [orangeGem, greenGem1, greenGem2, greenGem3, blueGem1, blueGem2, blueGem3, blueGem4, blueGem5];

var Enemy = function () {
	function Enemy(y) {
		_classCallCheck(this, Enemy);

		this.x = 0;
		this.y = y;
		this.sprite = 'img/enemy-bug.png';
		this.speed = Math.floor(Math.random() * 150) + 50;
		this.width = 99;
		this.height = 77;
	}
	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks


	_createClass(Enemy, [{
		key: 'update',
		value: function update(dt) {
			if (this.x <= 1111) {
				this.x += this.speed * dt;
			} else {
				this.x = -100;
			}
			this.checkCollisions();
		}
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.

	}, {
		key: 'render',
		value: function render() {
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
	}, {
		key: 'updateSpeed',
		value: function updateSpeed() {
			if (game.level >= 1 && game.level <= 5) {
				this.speed = Math.floor(Math.random() * 150) + 50;
			} else if (game.level >= 6 && game.level <= 10) {
				this.speed = Math.floor(Math.random() * 200) + 50;
			} else if (game.level >= 11 && game.level <= 15) {
				this.speed = Math.floor(Math.random() * 250) + 100;
			} else if (game.level >= 16 && game.level <= 20) {
				this.speed = Math.floor(Math.random() * 300) + 150;
			} else if (game.level >= 21 && game.level <= 25) {
				this.speed = Math.floor(Math.random() * 350) + 200;
			} else if (game.level >= 26 && game.level <= 30) {
				this.speed = Math.floor(Math.random() * 400) + 250;
			} else if (game.level >= 31 && game.level <= 35) {
				this.speed = Math.floor(Math.random() * 450) + 300;
			} else {
				this.speed = Math.floor(Math.random() * 500) + 350;
			}
		}
	}, {
		key: 'checkCollisions',
		value: function checkCollisions() {

			if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {
				game.reset();
			}
		}
	}]);

	return Enemy;
}();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


var enemy1 = new Enemy(141);
var enemy2 = new Enemy(224);
var enemy3 = new Enemy(307);
var enemy4 = new Enemy(390);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var rockX = [11, 112, 213, 314, 415, 516, 617, 718, 819, 920, 1021];
var rockY = [143, 226, 309, 392];

var Rocks = function () {
	function Rocks() {
		_classCallCheck(this, Rocks);

		this.x = rockX[Math.floor(Math.random() * rockX.length)];
		this.y = rockY[Math.floor(Math.random() * rockY.length)];
		this.sprite = 'img/rock.png';
		this.width = 80;
		this.height = 65;
	}

	_createClass(Rocks, [{
		key: 'render',
		value: function render() {
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}
	}]);

	return Rocks;
}();

var rock1 = new Rocks();
var rock2 = new Rocks();
var rock3 = new Rocks();
var allRocks = [rock1, rock2, rock3];

var Live = function () {
	function Live() {
		_classCallCheck(this, Live);

		this.x = posX[Math.floor(Math.random() * posX.length)];
		this.y = posY[Math.floor(Math.random() * posY.length)];
		this.sprite = 'img/heart.png';
		this.width = 59;
		this.height = 60;
		this.visible = true;
	}

	_createClass(Live, [{
		key: 'render',
		value: function render() {
			if (this.visible) {
				ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
			}
		}
	}, {
		key: 'update',
		value: function update() {
			this.checkCollisions();
		}
	}, {
		key: 'checkCollisions',
		value: function checkCollisions() {

			if (player.x < this.x + this.width && player.x + player.width > this.x && player.y < this.y + this.height && player.height + player.y > this.y) {

				this.visible = false;
				this.x = this.x + 1200;
				this.addLive();
			}
		}
	}, {
		key: 'addLive',
		value: function addLive() {
			var image = document.createElement('img');
			var container = document.getElementById('lives');
			container.appendChild(image);
			image.setAttribute('src', 'img/heart.png');
			image.setAttribute('alt', 'One Live');
			image.classList.add('heart');
		}
	}]);

	return Live;
}();

var live = new Live();

/* MODALS */

var modal = {
	init: function init() {
		var modalContainer = document.createElement('div');
		document.body.appendChild(modalContainer);
		modalContainer.classList.add('modal-container');
		modalContainer.setAttribute('id', 'modal-container');

		var modalContent = document.createElement('div');
		modalContainer.appendChild(modalContent);
		modalContent.classList.add('modal-content');
		modalContent.setAttribute('id', 'modal-content');

		var span = document.createElement('span');
		modalContent.appendChild(span);
		span.classList.add('close');
		span.setAttribute('id', 'close');
		span.innerHTML = '&times;';

		var header = document.createElement('header');
		modalContent.appendChild(header);
		header.classList.add('modal-header');

		var image = document.createElement('img');
		header.appendChild(image);
		image.setAttribute('src', './img/logo-memory.svg');
		image.setAttribute('alt', 'Logo');
		image.classList.add('logo-modal');

		span.addEventListener('click', this.closeModal);
		modalContainer.addEventListener('click', this.closeModal);
	},
	startModal: function startModal() {
		var container = document.getElementById('modal-content');
		var heading = document.createElement('h1');
		container.appendChild(heading);
		heading.classList.add('modal-heading');
		heading.innerHTML = 'Welcome!';

		var modalBody = document.createElement('p');
		container.appendChild(modalBody);
		modalBody.classList.add('modal-body');
		modalBody.innerHTML = 'Click "Start game" button in order to start game. The purpose of this game is to cross the road and reach water. Collect as many gems as possible and earn extra points. Avoid bugs or you will loose one of three lives';

		var startButton = document.createElement('button');
		container.appendChild(startButton);
		startButton.classList.add('start-button');
		startButton.innerHTML = 'Start Game';

		startButton.addEventListener('click', game.init);
	},
	gameOverModal: function gameOverModal() {
		var container = document.getElementById('modal-content');
		var heading = document.createElement('h1');
		container.appendChild(heading);
		heading.classList.add('modal-heading');
		heading.innerHTML = 'Game Over!';

		var modalBody = document.createElement('p');
		container.appendChild(modalBody);
		modalBody.classList.add('modal-body');
		modalBody.innerHTML = 'Sorry, you lost all lives! You gained ' + game.score + ' points. Would you like to play again?';

		var endButton = document.createElement('button');
		container.appendChild(endButton);
		endButton.classList.add('start-button');
		endButton.innerHTML = 'Play Again!';

		endButton.addEventListener('click', function () {
			window.location.reload();
		});
	},
	show: function show() {
		var modalContainer = document.getElementById('modal-container');
		modalContainer.classList.add('show');
	},
	closeModal: function closeModal() {
		var modalContainer = document.getElementById('modal-container');
		modalContainer.remove();
	},
	startGame: function startGame() {
		var modalContainer = document.getElementById('modal-container');
		modalContainer.classList.remove('show');
	}
};

document.addEventListener('DOMContentLoaded', function () {
	modal.init();
	modal.startModal();
	modal.show();
});

// EVENTS TO OPEN & CLOSE SETTINGS MODAL

var settingsButton = document.getElementById('settings-button');
var settingsModal = document.getElementById('settings-modal');
var closeButton = document.getElementById('close-button');
var inputDefault = document.getElementById('avatar-container').firstElementChild;
var input = document.querySelectorAll('input');

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
