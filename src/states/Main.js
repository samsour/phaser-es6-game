import ExampleObject from 'objects/ExampleObject';

export default class Main extends Phaser.State {

	create() {

		console.log('create');
		//Enable Arcade Physics
		// this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//Set the games background colour
		// this.game.stage.backgroundColor = '#cecece';

		//Example of including an object
		//let exampleObject = new ExampleObject(this.game);

		// var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: this.preload, create: create, update: update });

	}

	update() {
		// update frames
		console.log('update;');
	}

	preload() {
		// load assets
		console.log('preload');
	}

	create() {
		// create assets / world
		console.log('create');
	}

}