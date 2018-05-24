export default class Player {

	constructor(game){
		this.game = game;

		this.moving = {
            left: false,
            right: false
		}
	}

	spawn(x,y) {
		
	    this.sprite = this.game.add.sprite(x, y, 'dude');
	    //  Enable physics on the player
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.enableBody = true;

	    //  Player physics properties. Give the little guy a slight bounce.
	    this.sprite.body.gravity.y = 600;
	    this.sprite.body.bounce.y = 0.2;
	    this.sprite.body.collideWorldBounds = true;

		// Center the sprite image
		this.sprite.anchor.setTo(0.5,0.5);

	    //  Our two animations, walking left and right.
	    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
		this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
	}

	moveLeft() {
		this.sprite.body.velocity.x = -150;
		this.sprite.animations.play('left');
	}

	moveRight() {
		this.sprite.body.velocity.x = 150;
		this.sprite.animations.play('right');
	}

	jump() {
		this.sprite.body.velocity.y = -300;
	}

	idle() {
		this.sprite.animations.stop();
		this.sprite.frame = 4;
	}

	setName(name) {
		this.name = name;
	}
}