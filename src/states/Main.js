import Player from 'objects/Player';
import Weapon from 'objects/Weapon';

export default class Main extends Phaser.State {

	create() {

		console.log("Create...")

		// create assets / world
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.game.add.sprite(0, 0, 'sky');
		
	    //  The platforms group contains the ground and the 2 ledges we can jump on
	    this.platforms = this.game.add.group();
	    //  We will enable physics for any object that is created in this group
	    this.platforms.enableBody = true;

	    this.ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
	    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	    this.ground.scale.setTo(2, 2);
	    //  This stops it from falling away when you jump on it
	    this.ground.body.immovable = true;

	    //  Now let's create some ledges
		this.ledge = this.platforms.create(400, 400, 'ground');
		this.ledge = this.platforms.create(450, 100, 'ground');
	    this.ledge = this.platforms.create(-150, 300, 'ground');
	    this.ledge = this.platforms.create(360, 180, 'ground');

		// And add a star

		this.player1 = new Player(this.game);
		this.player2 = new Player(this.game);

		this.player1.spawn(100,this.game.world.height - 250);
		this.player2.spawn(200,this.game.world.height - 250);

		this.addControls();

		


		this.weapon = this.game.add.weapon(30, 'archer');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

		//  The speed at which the bullet is fired
		this.weapon.bulletSpeed = 600;

		//  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
		this.weapon.fireRate = 100;
		this.weapon.trackSprite(this.player1.sprite, 0, 0, true);
	}

	update() {
		// update frames

		this.player1.sprite.hittingPlatform = this.game.physics.arcade.collide(this.player1.sprite, this.platforms);
		this.player1.sprite.body.velocity.x = 0;

		this.player2.sprite.hittingPlatform = this.game.physics.arcade.collide(this.player2.sprite, this.platforms);
		this.player2.sprite.body.velocity.x = 0;

		// Player 1
		if (this.keyboard.a.isDown){
			this.player1.moveLeft();
		} else if (this.keyboard.d.isDown) {
			this.player1.moveRight();
		} else {
			this.player1.idle();
		}
		if (this.keyboard.w.isDown && this.player1.sprite.body.touching.down && this.player1.sprite.hittingPlatform)
		{	
			this.player1.jump();
		}
		if (this.keyboard.space.isDown) {
			console.log("Fire!");
			this.weapon.fire();
		}


		// Player 2
		if (this.keyboard.j.isDown){
			this.player2.moveLeft();
		} else if (this.keyboard.l.isDown) {
			this.player2.moveRight();
		} else {
			this.player2.idle();
		}
		if (this.keyboard.i.isDown && this.player2.sprite.body.touching.down && this.player2.sprite.hittingPlatform)
		{	
			this.player2.jump();
		}
	}

	addControls() {
		this.keyboard = {
			w: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			a: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			d: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
			i: this.game.input.keyboard.addKey(Phaser.Keyboard.I),
			j: this.game.input.keyboard.addKey(Phaser.Keyboard.J),
			l: this.game.input.keyboard.addKey(Phaser.Keyboard.L),
			space: this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
		};
	}
}