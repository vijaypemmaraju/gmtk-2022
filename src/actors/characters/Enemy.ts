import EnemyController from '../../controllers/EnemyController';
import useStore from '../../react/useStore';
import Main from '../../scenes/Main';
import Collision from '../Collision';
import EnemyGrenadeLauncher from '../weapons/EnemyWeapons/EnemyGrenadeLauncher';
import EnemyShotgun from '../weapons/EnemyWeapons/EnemyShotgun';
import EnemySimpleGun from '../weapons/EnemyWeapons/EnemySimpleGun';
import Weapon from '../weapons/Weapon';
import EnemyState from './states/EnemyState';
import EnemyStateFour from './states/EnemyStateFour';
import EnemyStateOne from './states/EnemyStateOne';
import EnemyStateThree from './states/EnemyStateThree';
import EnemyStateTwo from './states/EnemyStateTwo';

export const EnemyStats = {
  maxHealth: 1000,
  speed: 2.5,
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

  states: { [key: string]: EnemyState } = {
    1: new EnemyStateOne(),
    2: new EnemyStateTwo(),
    3: new EnemyStateThree(),
    4: new EnemyStateFour(),
  };

  state: EnemyState = this.states['1'];

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

  setState(
    key: string,
    controller: EnemyController,
    time: number,
    delta: number,
    scene: Main,
  ) {
    this.state = this.states[key];
    this.state.onEnter(controller, this, time, delta, scene);
  }

  update(
    controller: EnemyController,
    time: number,
    delta: number,
    scene: Main,
  ) {
    if (this.isAlive()) {
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(0);

      this.state.update(controller, this, time, delta, scene);
    }
  }
}
