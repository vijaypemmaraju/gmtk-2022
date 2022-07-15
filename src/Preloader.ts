import Phaser from 'phaser';

export default class Preloader {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static preload(scene: Phaser.Scene) {
    scene.load.atlas(
      'player',
      'assets/sprites/dice.png',
      'assets/sprites/dice.json',
    );
  }
}
