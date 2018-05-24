import Player from 'objects/Player';

export default class Main extends Phaser.State {

	create() {

		console.log("Create...")

		// create assets / world
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

	    //  A simple background for our game
	    this.game.add.sprite(0, 0, 'sky');

	    //  The platforms group contains the ground and the 2 ledges we can jump on
	    this.platforms = this.game.add.group();

	    //  We will enable physics for any object that is created in this group
	    this.platforms.enableBody = true;

	    // Here we create the ground.
	    this.ground = this.platforms.create(0, this.game.world.height - 64, 'ground');

	    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	    this.ground.scale.setTo(2, 2);

	    //  This stops it from falling away when you jump on it
	    this.ground.body.immovable = true;

	    //  Now let's create two ledges
	    this.ledge = this.platforms.create(400, 400, 'ground');

	    this.ledge.body.immovable = true;

	    this.ledge = this.platforms.create(-150, 250, 'ground');

	    this.ledge.body.immovable = true;




	    // The player 1 and its settings
	    this.player1 = this.game.add.sprite(32, this.game.world.height - 250, 'dude');

	    //  We need to enable physics on the player
	    this.game.physics.arcade.enable(this.player1);

	    //  Player physics properties. Give the little guy a slight bounce.
	    this.player1.body.bounce.y = 0.2;
	    this.player1.body.gravity.y = 600;
	    this.player1.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    this.player1.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player1.animations.add('right', [5, 6, 7, 8], 10, true);


	    // The player 2 and its settings
	    this.player2 = this.game.add.sprite(64, this.game.world.height - 650, 'dude');

	    //  We need to enable physics on the player
	    this.game.physics.arcade.enable(this.player2);

	    //  Player physics properties. Give the little guy a slight bounce.
	    this.player2.body.bounce.y = 0.2;
	    this.player2.body.gravity.y = 600;
	    this.player2.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    this.player2.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player2.animations.add('right', [5, 6, 7, 8], 10, true);

		this.keyboard = {
			w: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			a: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			s: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
			d: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
			i: this.game.input.keyboard.addKey(Phaser.Keyboard.I),
			j: this.game.input.keyboard.addKey(Phaser.Keyboard.J),
			k: this.game.input.keyboard.addKey(Phaser.Keyboard.K),
			l: this.game.input.keyboard.addKey(Phaser.Keyboard.L)
		};

		this.playerList = [
			this.player1, this.player2
		];
		console.log(this.playerList);
	}

	update() {
		// update frames
		

		this.playerList.forEach( player => {
			player.hittingPlatform = this.game.physics.arcade.collide(player, this.platforms);

			//  Reset the players velocity (movement)
			player.body.velocity.x = 0;
		});

		// Player 1
		if (this.keyboard.a.isDown){
			//  Move to the left
			this.player1.body.velocity.x = -150;
			this.player1.animations.play('left');
		} else if (this.keyboard.d.isDown) {
			//  Move to the right
			this.player1.body.velocity.x = 150;
			this.player1.animations.play('right');
		} else {
			//  Stand still
			this.player1.animations.stop();
			this.player1.frame = 4;
		}

		//  Allow the player to jump if they are touching the ground
		if (this.keyboard.w.isDown && this.player1.body.touching.down && this.player1.hittingPlatform)
		{	
			console.log("Jump!");
			this.player1.body.velocity.y = -300;
		}


		// Player 2
		if (this.keyboard.j.isDown){
			//  Move to the left
			this.player2.body.velocity.x = -150;
			this.player2.animations.play('left');
		} else if (this.keyboard.l.isDown) {
			//  Move to the right
			this.player2.body.velocity.x = 150;
			this.player2.animations.play('right');
		} else {
			//  Stand still
			this.player2.animations.stop();
			this.player2.frame = 4;
		}

		//  Allow the player to jump if they are touching the ground
		if (this.keyboard.i.isDown && this.player2.body.touching.down && this.player2.hittingPlatform)
		{	
			console.log("Jump!");
			this.player2.body.velocity.y = -300;
		}
	}
}