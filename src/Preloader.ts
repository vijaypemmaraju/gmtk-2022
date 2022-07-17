import Phaser from 'phaser';
import Enemy from './actors/characters/Enemy';
import PlayerController from './controllers/PlayerController';
import ProjectileManager from './managers/ProjectileManager';
import SoundManager from './managers/SoundManager';

export default class Preloader {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static preload(scene: Phaser.Scene) {
    PlayerController.preload(scene);
    Enemy.preload(scene);
    ProjectileManager.preload(scene);
    SoundManager.preload(scene);
    scene.load.audio('music', 'assets/music/theme.mp3');
    scene.load.spritesheet('particle', 'assets/sprites/explosion.png', {
      frameWidth: 128,
      frameHeight: 128,
    });
  }
}
