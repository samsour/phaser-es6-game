export default class Player {

	constructor(game){
		
	    //  We need to enable physics on the player
	    this.game.physics.arcade.enable(this.player1);

	    //  Player physics properties. Give the little guy a slight bounce.
	    this.player1.body.bounce.y = 0.2;
	    this.player1.body.gravity.y = 600;
	    this.player1.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    this.player1.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player1.animations.add('right', [5, 6, 7, 8], 10, true);
	}

	spawn() {
		
	}
}