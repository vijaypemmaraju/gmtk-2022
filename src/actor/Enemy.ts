import useStore from '../react/useStore';

const EnemyStats = {
  maxHealth: 100,
};

export default class Enemy {
  sprite: Phaser.Physics.Matter.Sprite;

  frames: string[];

  scene: Phaser.Scene;

  health = EnemyStats.maxHealth;

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('d4', 'assets/sprites/d4.png', 'assets/sprites/d4.json');
  }

  hit(damage: number) {
    this.health -= damage;
    if (this.health <= 0) {
      this.sprite.destroy();
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
