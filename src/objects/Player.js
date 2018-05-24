import Weapon from './Weapon.js';

export default class Player {

	constructor(game){
		this.game = game;

		this.hp = 100;
		this.mp = 20;
		this.attackDamage = 1;
		this.magicDamage = 1;
		this.speed = 150;
		this.jumpability = 420;

		this.gravity = 1000;
		this.bounce = 0.3;
	}

	spawn(x,y) {
		
	    this.sprite = this.game.add.sprite(x, y, 'archer');
	    //  Enable physics on the player
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.enableBody = true;

	    //  Player physics properties. Give the little guy a slight bounce.
	    this.sprite.body.gravity.y = this.gravity;
	    this.sprite.body.bounce.y = this.bounce;
	    this.sprite.body.collideWorldBounds = true;

		// Center & enlarge the sprite image
		this.sprite.anchor.setTo(0.5,0.5);
		this.sprite.smoothed = false;
		this.sprite.scale.set(5,5);

	    //  Some animations, walking left and right.
	    this.sprite.animations.add('right', [1, 2], 5, true);
		this.sprite.animations.add('left', [4,5], 5, true);
		this.sprite.animations.add('idle-right', [0,17], 1.5, true);
		this.sprite.animations.add('idle-left', [3,18], 1.5, true);
	}

	moveLeft() {
		this.direction = "left";
		this.sprite.body.velocity.x = -(this.speed);
		this.sprite.animations.play('left');
	}

	moveRight() {
		this.direction = "right";
		this.sprite.body.velocity.x = this.speed;
		this.sprite.animations.play('right');
	}

	jump() {
		this.sprite.body.velocity.y = -(this.jumpability);
	}

	idle() {
		if(this.direction == "right") {
			this.sprite.animations.play('idle-right');
		} else if(this.direction == "left") {
			this.sprite.animations.play('idle-left');
		}

		// this.moving.right = false;
		// this.moving.left = false;
	}

	setName(name) {
		this.name = name;
	}
}