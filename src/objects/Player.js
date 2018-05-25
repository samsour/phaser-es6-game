import Weapon from './Weapon.js';

export default class Player {

	constructor(game){
		this.game = game;
	}

	spawn(x,y) {

		this.hp = 100;
		this.mp = 20;
		this.attackDamage = 1;
		this.magicDamage = 1;
		this.attackSpeed = 400;
		this.speed = 150;
		this.jumpability = 420;

		this.direction = "right";
		this.gravity = 1000;
		this.bounce = 0.3;
		
	    this.sprite = this.game.add.sprite(x, y, 'archer');
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
		this.sprite.body.setSize(10,14,0,0);

		this.addAnimations();
		this.addWeapon();
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

	fire() {
		if(this.direction == "right"){
			console.log("shooting right");
			this.sprite.animations.play('attack-right');
			this.weapon.bulletSpeed = this.bulletSpeed;
			this.weapon.bullets.forEach((b) => {
				b.angle = 90;
				b.body.updateBounds();
			}, this);
		} else {
			console.log("shooting left");
			this.sprite.animations.play('attack-left');
			this.weapon.bulletSpeed = -(this.bulletSpeed);
			this.weapon.bullets.forEach((b) => {
				b.angle = -90;
				b.body.updateBounds();
			}, this);
		}
		
		this.weapon.fire();
	}

	addAnimations() {
		this.sprite.animations.add('right', [1, 2], 5, true);
		this.sprite.animations.add('left', [4,5], 5, true);
		this.sprite.animations.add('idle-right', [0,17], 1.5, true);
		this.sprite.animations.add('idle-left', [3,18], 1.5, true);
		this.sprite.animations.add('attack-left', [11,12,13,14,15], 10, true);
		this.sprite.animations.add('attack-right', [6,7,8,9,10], 10, true);
	}

	addWeapon() {
		this.weapon = this.game.add.weapon(30, 'arrow');
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

		//  The speed at which the bullet is fired
		this.bulletSpeed = 400;
		this.weapon.bulletSpeed = this.bulletSpeed;
		
		//  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
		this.weapon.fireRate = this.attackSpeed;
		this.weapon.trackSprite(this.sprite, 0, 0, true);

		this.weapon.bullets.forEach((b) => {
			b.scale.setTo(5, 5);
			b.angle = 90;
		}, this);
	}
}