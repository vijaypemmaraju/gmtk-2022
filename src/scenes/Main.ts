import Phaser from 'phaser';
import PlayerController from '../controllers/PlayerController';
import InputManager from '../managers/InputManager';
import Preloader from '../Preloader';

export default class Main extends Phaser.Scene {
  playerController: PlayerController;

  constructor() {
    super('main');
  }

  preload() {
    Preloader.preload(this);
    this.load.tilemapTiledJSON('map', 'assets/levels/1.json');
    this.load.image('tilesheet', 'assets/levels/tilesheet.png');
  }

  create() {
    const inputManager = new InputManager(this);
    const playerController = new PlayerController(this);
    playerController.create(this);
    this.playerController = playerController;
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tilesheet');
    const layer = map.createLayer(0, tileset, 0, 0);
    map.setCollisionBetween(0, 20, true);
    this.matter.world.convertTilemapLayer(layer);

    this.matter.world.createDebugGraphic();
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(time: number, delta: number): void {
    this.playerController.update(time, delta);
  }
}
