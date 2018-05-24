export default class Player {

	constructor(game){
		this.game = game;

		this.moving = {
            left: false,
            right: false
		}

		this.hp = 100;
		this.mp = 20;
		this.attackDamage = 1;
		this.magicDamage = 1;
		this.speed = 150;
		this.jumpability = 420;

		this.gravity = 600;
		this.bounce = 0.2;
	}

	spawn(x,y) {
		
	    this.sprite = this.game.add.sprite(x, y, 'dude');
	    //  Enable physics on the player
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.enableBody = true;

	    //  Player physics properties. Give the little guy a slight bounce.
	    this.sprite.body.gravity.y = this.gravity;
	    this.sprite.body.bounce.y = this.bounce;
	    this.sprite.body.collideWorldBounds = true;

		// Center the sprite image
		this.sprite.anchor.setTo(0.5,0.5);

	    //  Our two animations, walking left and right.
	    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
		this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
	}

	moveLeft() {
		this.sprite.body.velocity.x = -(this.speed);
		this.sprite.animations.play('left');
	}

	moveRight() {
		this.sprite.body.velocity.x = this.speed;
		this.sprite.animations.play('right');
	}

	jump() {
		this.sprite.body.velocity.y = -(this.jumpability);
	}

	idle() {
		this.sprite.animations.stop();
		this.sprite.frame = 4;
	}

	setName(name) {
		this.name = name;
	}
}