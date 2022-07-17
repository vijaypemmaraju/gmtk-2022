import Phaser from 'phaser';
import PlayerController from './controllers/PlayerController';

export default class Preloader {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static preload(scene: Phaser.Scene) {
    PlayerController.preload(scene);
  }
}
