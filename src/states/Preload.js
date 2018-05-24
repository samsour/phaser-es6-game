export default class Preload extends Phaser.State {

	preload() {
		/* Preload required assets */
		console.log('Preload...');
		this.game.load.image('sky', './assets/sky.png');
	    this.game.load.image('ground', './assets/platform.png');
	    this.game.load.image('star', './assets/star.png');
		
		this.game.load.spritesheet('archer', './assets/archer.png', 16, 16);
		this.game.load.image('arrow', './assets/arrow.png');
	}

	create() {
		//NOTE: Change to GameTitle if required
		this.game.state.start("Main");
	}

}