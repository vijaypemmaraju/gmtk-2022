import Phaser from 'phaser';
import Preloader from '../Preloader';

export default class Main extends Phaser.Scene {
  constructor() {
    super('main');
  }

  preload() {
    Preloader.preload(this);
  }

  create() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(time: number, delta: number): void {}
}
