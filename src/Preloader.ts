import Phaser from 'phaser';
import Enemy from './actor/Enemy';
import ProjectileOne from './actors/weapons/PlayerWeapons/WeaponOne/ProjectileOne';
import PlayerController from './controllers/PlayerController';

export default class Preloader {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static preload(scene: Phaser.Scene) {
    PlayerController.preload(scene);
    Enemy.preload(scene);
    ProjectileOne.preload(scene);
    scene.load.spritesheet('particle', 'assets/sprites/explosion.png', {
      frameWidth: 128,
      frameHeight: 128,
    });
  }
}
