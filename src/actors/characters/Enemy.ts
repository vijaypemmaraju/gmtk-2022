import useStore from '../../react/useStore';
import Collision from '../Collision';
import EnemyGrenadeLauncher from '../weapons/EnemyWeapons/EnemyGrenadeLauncher';
import EnemyMissleLauncher from '../weapons/EnemyWeapons/EnemyMissleLauncher';
import EnemyShotgun from '../weapons/EnemyWeapons/EnemyShotgun';
import EnemySimpleGun from '../weapons/EnemyWeapons/EnemySimpleGun';
import SimpleGun from '../weapons/SimpleGun';
import Weapon from '../weapons/Weapon';

export const EnemyStats = {
  maxHealth: 1000,
};

export default class Enemy {
  sprite: Phaser.Physics.Matter.Sprite;

  frames: string[];

  scene: Phaser.Scene;

  health = EnemyStats.maxHealth;

  inventory: Weapon[] = [
    new EnemySimpleGun(),
    new EnemyShotgun(),
    new EnemyGrenadeLauncher(),
    new EnemyGrenadeLauncher(),
    // new EnemyMissleLauncher(),
  ];

  equippedSlot = 0;

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('d4', 'assets/sprites/d4.png', 'assets/sprites/d4.json');
  }

  getEquippedWeapon(): Weapon {
    return this.inventory[this.equippedSlot];
  }

  hit(damage: number) {
    this.health -= damage;
    if (this.health <= 0) {
      this.sprite.destroy();
      useStore.setState({ hasWon: true });
    }

    this.health = Math.max(0, this.health);

    useStore.setState({
      enemyHealth: this.health,
    });
  }

  isAlive(): boolean {
    return this.health > 0;
  }

  create(scene: Phaser.Scene) {
    this.scene = scene;
    this.sprite = scene.matter.add.sprite(0, 0, 'd4');
    (this.sprite.body as MatterJS.BodyType).label = 'enemy';
    this.frames = scene.textures.get('d4').getFrameNames();
    this.sprite.setPosition(800, 250);
    this.sprite.setIgnoreGravity(true);
    this.sprite.setFixedRotation();
    this.sprite.setCollisionCategory(Collision.COLLISION_CATEGORIES.Enemy);
    this.sprite.setCollidesWith(Collision.COLLISION_MASKS.Enemy);

    useStore.setState({
      enemyHealth: this.health,
    });
  }

  update(time: number, delta: number) {
    if (this.isAlive()) {
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(0);
    }
  }
}
