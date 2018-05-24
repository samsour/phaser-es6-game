export default class Weapon extends Phaser.Weapon {

	constructor(game){
        super();

        this.game = game;
    }

    spawn() {
        this.bulletSpeed = 600;
    }
}