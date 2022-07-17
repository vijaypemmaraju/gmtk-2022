import { ManOutlined } from '@mui/icons-material';
import Phaser from 'phaser';
import Enemy from '../actors/characters/Enemy';
import Collision from '../actors/Collision';
import EnemyController from '../controllers/EnemyController';
import PlayerController from '../controllers/PlayerController';
import InputManager from '../managers/InputManager';
import ProjectileManager from '../managers/ProjectileManager';
import Preloader from '../Preloader';

export default class Main extends Phaser.Scene {
  playerController: PlayerController;

  enemyController: EnemyController;

  inputManager: InputManager;

  projectileManager: ProjectileManager;

  constructor() {
    super('main');
  }

  preload() {
    Preloader.preload(this);
    this.load.tilemapTiledJSON('map', 'assets/levels/1.json');
    this.load.image('tilesheet', 'assets/levels/tilesheet.png');
  }

  create() {
    this.inputManager = new InputManager(this);
    this.projectileManager = new ProjectileManager(this);
    this.playerController = new PlayerController();
    this.playerController.create(this);
    const enemy = new Enemy();
    const enemyController = new EnemyController(enemy, this);
    enemy.create(this);
    this.enemyController = enemyController;
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tilesheet');
    const layer = map.createLayer(0, tileset, 0, 0);
    map.setCollisionBetween(0, 20, true);
    const { layer: layerData } = layer;
    layer
      .getTilesWithin(0, 0, layerData.width, layerData.height, {
        isColliding: true,
      })
      .forEach(tile => {
        const matterBody = new Phaser.Physics.Matter.TileBody(
          this.matter.world,
          tile,
          {
            isStatic: true,
          },
        );

        matterBody.setCollisionCategory(Collision.COLLISION_CATEGORIES.Map);
        matterBody.setCollidesWith(Collision.COLLISION_MASKS.Map);
      });
    this.matter.world.createDebugGraphic();
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update(time: number, delta: number): void {
    this.playerController.update(time, delta, this);
    this.projectileManager.update(time, delta, this);
    this.enemyController.update(time, delta, this);
  }
}
