import Phaser from 'phaser';
import Enemy from './actor/Enemy';
import PlayerController from './controllers/PlayerController';

export default class Preloader {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static preload(scene: Phaser.Scene) {
    PlayerController.preload(scene);
    Enemy.preload(scene);
  }
}
